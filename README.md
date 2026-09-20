# Namaste Spiceland — Website (Node.js)

A small Express server serves the static site. Files:
- `server.js` — Express server
- `package.json` — dependencies (`express`) and the `start` script
- `index.html`, `groceries.html`, `restaurant.html` — pages
- `style.css` — shared styles
- `assets/` — images

## Run locally
```bash
cd namaste-spiceland
npm install
npm start
```
Open **http://localhost:3000** in your browser.

## Push to GitHub
Add a `.gitignore` first so `node_modules` doesn't get committed:
```bash
echo "node_modules/" > .gitignore
```
Then:
```bash
git init
git add .
git commit -m "Namaste Spiceland website"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

## Deploy on Render
1. Go to render.com → **New +** → **Web Service** (not Static Site, since this runs a Node server)
2. Connect the GitHub repo you just pushed
3. Runtime: **Node**
4. Build command: `npm install`
5. Start command: `npm start`
6. Click **Create Web Service** — Render installs dependencies, runs `server.js`, and gives you a live `.onrender.com` URL

Render sets its own `PORT` environment variable automatically — `server.js` already reads `process.env.PORT`, so no changes needed.
