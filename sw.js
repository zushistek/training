const CACHE = 'ballet-train-v16';
const ASSETS = ['/', '/index.html', '/manifest.json', '/icon.svg', '/program.json'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  // FIX [Reliability/Moderate]: program.json now uses network-first strategy.
  // The old cache-first approach meant updates to exercise definitions, load
  // thresholds, or tags were silently ignored until the SW cache version was
  // manually bumped — users ran stale program data indefinitely without knowing.
  if (e.request.url.endsWith('/program.json')) {
    e.respondWith(
      fetch(e.request)
        .then(res => {
          if (res && res.status === 200) {
            // Update cache on every successful network fetch so offline still works.
            const clone = res.clone();
            caches.open(CACHE).then(c => c.put(e.request, clone));
          }
          return res;
        })
        .catch(() => caches.match(e.request)) // Offline fallback to cached version.
    );
    return;
  }

  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(res => {
        if (res && res.status === 200 && res.type === 'basic') {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      }).catch(() => {
        // FIX [Security/Nitpick]: Restrict the HTML fallback to navigation requests only.
        // The old blanket catch returned index.html for ALL failed fetches — a JSON or
        // image request that failed offline would silently receive an HTML document,
        // causing a harder-to-debug parse error in the calling code.
        if (e.request.mode === 'navigate') return caches.match('/index.html');
        // For non-navigation requests (API calls, assets), let the failure surface properly.
        return new Response('Network unavailable', { status: 503, statusText: 'Service Unavailable' });
      });
    })
  );
});
