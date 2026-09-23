# Namaste Spiceland — Website (Node.js)

A small Express server serves the static site. Files:
- `server.js` — Express server
- `package.json` — dependencies (`express`) and the `start` script
- `index.html` — landing page (full-bleed Groceries / Restaurant panels)
- `groceries.html`, `restaurant.html` — shop pages with combo slideshow, sidebar categories, cart, login
- `style.css` — shared styles
- `main.js` — cart, slideshow, mobile nav and login-modal logic (vanilla JS, no build step)
- `assets/` — images (women panels + hover hand-gesture artwork)

## What's new in this version
- Landing photos are full-bleed (edge-to-edge) on both panels.
- Logo is centered in the header; "namaste" and "Spiceland" are the same gold color.
- Groceries and Restaurant each open as their own page with an interactive combo slideshow up top.
- Zomato-style layout: sticky sidebar categories + item grid, each item has an **Add** button.
- A cart (top right) persists across pages via `localStorage`, with qty +/- and a running total.
- Log in / Sign up links open a front-end-only modal (no backend yet — see note below).
- Dish images: a few are real sourced photos (Unsplash/Pexels, free-to-use licenses — samosa, biryani, curries). The rest use custom gold line-art icons matching your brand art, since I couldn't reliably source a full, licensed photo for every single dish in this pass. Swap any `item-icon` block for an `item-media` block with a photo URL to upgrade a specific dish — happy to keep sourcing more on request.

## Run locally
```bash
cd namaste-spiceland
npm install
npm start
```
Open **http://localhost:3000**.

## Push to GitHub
```bash
echo "node_modules/" > .gitignore
git init
git add .
git commit -m "Namaste Spiceland — Zomato-style menu, cart, login"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

## Deploy on Render
1. render.com → **New +** → **Web Service**
2. Connect the repo
3. Runtime: **Node** · Build: `npm install` · Start: `npm start`
4. Create — Render reads `process.env.PORT` automatically, no code changes needed.

## Known limitations to flag
- Log in / Sign up is UI-only — there's no backend/database yet, so it doesn't actually create accounts. Wire it up to a real auth service (Firebase Auth, Supabase, Auth0, etc.) or a custom backend when you're ready.
- The cart is local to each visitor's browser (localStorage) — there's no order-submission backend yet. "Call to Order" still routes to the phone number for now.
- A few dish images are hotlinked from Unsplash/Pexels CDNs — both are free for commercial use, but if you'd rather host your own photos, drop them into `assets/` and swap the `background-image` URLs.
