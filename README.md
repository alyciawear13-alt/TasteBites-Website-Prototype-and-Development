# TasteBites – Website Prototype

TasteBites is a website where **diners with food allergies** and **restaurants** communicate about allergy concerns.
Diners save their allergies once and find restaurants (and dishes) that fit them. Restaurants show the allergy work they
already do, and can get certified.

Class project for BUS 3310 (Intro to Entrepreneurship), Cal Poly SLO. Due end of November 2026.

> All restaurants on the site are **made-up sample data** (see `js/data.js`). They are not the real restaurants we interviewed.

---

## How to look at the site on your computer

No installs needed. It's plain HTML, CSS and JavaScript.

1. Download the code: on GitHub click the green **Code** button → **Download ZIP**, then unzip it.
   (Or, if you use git: `git clone` the repo.)
2. Open the folder and **double-click `index.html`**. It opens in your web browser.

The map on the Find Restaurants page needs an internet connection. Everything else works offline.

## Pages

| Page | File | From the whiteboard sketches |
|------|------|------------------------------|
| Home / opening screen | `index.html` | Search bar, disclaimer with checkbox, "Restaurant or Diner?" choice |
| Find restaurants | `find.html` | Map, filters: allergies, restaurant type, meal, price |
| Restaurant profile | `restaurant.html?id=...` | Name, allergies they can accommodate, bio, menu with highlighting, reviews, "at your own risk" |
| Diner profile | `profile.html` | Name, email, phone, allergies (used to filter restaurants) |
| Allergy guide | `learn.html` | Safe food handling: cross-contact, how it affects customers, top 9 allergens |
| For restaurants | `for-restaurants.html` | Why TasteBites, pricing/subscription, liability concerns |
| List your restaurant | `list-restaurant.html` | Restaurant profile form: menu, food handling practices, allergens in facility, what they accommodate |
| Our mission | `about.html` | Mission |
| Chloe's home page design | `chloe-home.html` | Alternative home page design by Chloe (kept for the team to compare) |

## Folder layout

```
index.html, find.html, ...   one file per page
css/styles.css               all the styling (colors are at the top)
js/data.js                   sample restaurants + list of allergens  ← edit this to change content
js/common.js                 shared helpers used by every page
js/find.js                   Find Restaurants page logic
js/restaurant.js             Restaurant Profile page logic
js/list-restaurant.js        List Your Restaurant form logic
handoffs/                    end-of-session notes (see handoffs/HANDOFF_PROMPT.md)
```

## Things to know before editing

- **No database yet.** A diner's profile, reviews, and restaurants listed through the form are saved in that
  person's own browser (localStorage). Nobody else sees them. Clearing browser data erases them.
- **The header and footer are copied into every page.** If you add a menu link, add it to all 8 HTML files.
- To **add or change a sample restaurant**, edit `js/data.js`. Each restaurant has a comment-explained format.
- The map uses [Leaflet](https://leafletjs.com) and OpenStreetMap, loaded from the internet (no account or key needed).

## Putting it online (Netlify or Vercel)

Both are free for this. There is no build step.

- **Netlify:** sign in with GitHub → "Add new site" → "Import an existing project" → pick this repo →
  leave build command empty, publish directory `/` (or leave blank) → Deploy.
- **Vercel:** sign in with GitHub → "Add New Project" → pick this repo → Framework preset "Other" → Deploy.

After that, every change merged into `main` updates the live site automatically.
