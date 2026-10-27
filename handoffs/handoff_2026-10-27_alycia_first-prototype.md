<!-- Save as: handoff_YYYY-MM-DD_firstname_topic.md  (lowercase, hyphens) -->

# Handoff: First website prototype

**Name:** Alycia
**Date:** 2026-10-27
**AI tool used:** Claude
**Branch:** `claude/project-thread-2q2m20` (pull request into `main`)

## Summary
Built the first working version of the TasteBites website as plain HTML/CSS/JavaScript, based on the BUS3310 project
docs, TA #4, and the three whiteboard sketch photos. All 8 pages work and were tested in a browser (desktop and phone width).

## Work done
- Built 8 pages matching the whiteboard sketches: home/opening screen, find restaurants (map + filters),
  restaurant profile, diner profile, allergy guide, for restaurants (why/pricing/liability), list your restaurant form, mission.
- Created 6 made-up sample SLO restaurants with menus, allergen info and reviews in `js/data.js`.
- Allergy matching: restaurants marked "can accommodate / ask staff / cannot accommodate" per allergen;
  menu dishes that fit the diner's saved allergies are highlighted green.
- Diner reviews ("how was your allergy handled?") and restaurant sign-up both save in the browser (localStorage).
- Rewrote `README.md` with how to open the site, the page list, and how to deploy on Netlify/Vercel.

## Files changed
| File | What changed |
|------|--------------|
| `index.html` | Home: search bar, Diner vs Restaurant choice, disclaimer with "I understand" checkbox, stats, how it works |
| `find.html`, `js/find.js` | Search, filters (allergies, type, meal, price, certified), Leaflet map, sorted results |
| `restaurant.html`, `js/restaurant.js` | Restaurant profile, allergen table, practices, menu highlighting, reviews + review form |
| `profile.html` | Diner profile form (name, email, phone, allergies) |
| `learn.html` | Cross-contact, how it affects customers, server-to-kitchen handoff, top 9 allergens + gluten |
| `for-restaurants.html` | Why TasteBites, 3 pricing tiers, liability section, 90-day free pilot |
| `list-restaurant.html`, `js/list-restaurant.js` | Restaurant profile form with menu builder |
| `about.html` | Mission, problem, trust rules, team blurb |
| `js/data.js` | Allergen list, cuisines, meals, sample restaurants |
| `js/common.js` | Shared helpers: storage, allergy matching, nav menu, disclaimer |
| `css/styles.css` | All styles |
| `README.md` | Setup, structure, deploy steps |

## Decisions and reasoning
- **Decision:** Plain HTML/CSS/JS, no framework or build step.
  **Why:** Anyone can open `index.html` by double-clicking; easy for teammates and other AI tools to read; deploys to Netlify/Vercel with zero settings.
  **Rejected:** React/Next.js (needs Node installs and a build, harder for beginners).
- **Decision:** Fake sample restaurants, not the real ones we interviewed (Luna Red, Urban Cafe, etc.).
  **Why:** Publishing allergy claims about real restaurants could be wrong and unfair to them.
  **Rejected:** Using real names and guessing their practices.
- **Decision:** Save profiles/reviews/restaurant sign-ups in the browser (localStorage).
  **Why:** Lets the demo feel real without a database or accounts.
  **Rejected:** A backend (Firebase/Supabase) for now; too much setup for a first prototype.
- **Decision:** Allergens = FDA top 9 plus "Gluten (celiac)".
  **Why:** Matches the sketches ("top 9") and the celiac focus in our research.
- **Decision:** Pricing shown as Free / Certified $49 per month / Certified Plus custom.
  **Why:** Tiers come from the business model doc. **The $49 is a placeholder**; the team hasn't picked a price.

## Open issues / blockers
- Pricing numbers are placeholders; team needs to decide.
- No real accounts or shared database: what one person saves isn't seen by anyone else.
- Restaurants added through the form get a map pin near downtown SLO (no real address lookup).
- The map couldn't be checked against the live map service in the AI's test setup (it was tested with a local copy of the map library). Check it once the site is online.
- "Contact us" has no real contact details yet.
- Sketch item "water bottle straw that tracks inflammation" was not included (seems like a separate idea).

## Next steps
1. Review the PR, then merge it into `main`.
2. Deploy to Netlify or Vercel (steps in `README.md`) and share the link with the team.
3. Decide on real pricing and update `for-restaurants.html`.
4. Replace or add sample restaurants in `js/data.js` (maybe with permission from interviewed restaurants).
5. Later: add real accounts/database if the class demo needs data shared between people.

## Notes for the next AI session
- No install needed. To preview with a local server (optional): `python3 -m http.server` in the repo folder, then open http://localhost:8000.
- Scripts are loaded with normal `<script>` tags (not ES modules) on purpose, so double-clicking `index.html` works.
  Load order on each page: `js/data.js` → `js/common.js` → page script.
- The header/nav and footer are duplicated in all 8 HTML files; update all of them if you change one.
- localStorage keys are in `STORAGE_KEYS` in `js/common.js`.
