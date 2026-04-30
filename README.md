# Ballet Training Intelligence — GitHub Pages Setup

## Files in this folder
- `index.html` — the full app
- `manifest.json` — makes it installable as a home screen app
- `sw.js` — service worker, enables full offline use after first load
- `icon.svg` — app icon

---

## One-time setup (~5 minutes)

### Step 1 — Create a GitHub account
Go to **github.com** and sign up for a free account if you don't have one.

### Step 2 — Create a new repository
1. Click the **+** icon (top right) → **New repository**
2. Name it exactly: `training`
3. Set it to **Public**
4. Click **Create repository**

### Step 3 — Upload all 4 files
1. In your new repository, click **Add file → Upload files**
2. Drag all 4 files into the upload area:
   - `index.html`
   - `manifest.json`
   - `sw.js`
   - `icon.svg`
3. Click **Commit changes**

### Step 4 — Enable GitHub Pages
1. Go to your repository → **Settings** tab
2. Scroll to **Pages** in the left sidebar
3. Under **Source**, select: **Deploy from a branch**
4. Branch: **main** · Folder: **/ (root)**
5. Click **Save**

### Step 5 — Get your URL
GitHub will show you a URL at the top of the Pages section:
```
https://YOUR-USERNAME.github.io/training
```
It takes about 1–2 minutes to go live after saving.

---

## Install on iPhone 13 (Add to Home Screen)

1. Open **Safari** on your iPhone (must be Safari, not Chrome)
2. Go to your URL: `https://YOUR-USERNAME.github.io/training`
3. Tap the **Share button** (box with arrow) at the bottom of the screen
4. Scroll down and tap **"Add to Home Screen"**
5. Name it **Training** → tap **Add**

The app now lives on your home screen. It works fully offline after the first load.

---

## Updating the app in future

When you receive an updated version of the app:
1. Go to your GitHub repository
2. Click on `index.html` → click the **pencil (edit) icon**
3. Select all → paste the new code → **Commit changes**

Or drag a new file onto the Upload page — GitHub handles the rest.
Your saved training data is stored on your phone and is never affected by app updates.

---

## Data & Privacy
All your training logs and weekly plans are stored **locally on your iPhone** using browser storage.
Nothing is sent to any server. No account needed to use the app.
