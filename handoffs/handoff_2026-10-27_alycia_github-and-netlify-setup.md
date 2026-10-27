handoff_2026-10-27_alycia_github-and-netlify-setup.md

# Handoff: GitHub repo setup, first prototype, and Netlify deploy

**Name:** Alycia
**Date:** 2026-10-27
**AI tool used:** Claude
**Branch:** `claude/project-thread-o1qmth` (adds this file only; everything else below is already on `main`)

## Summary
Today the team moved onto GitHub: the repo was connected, the handoff system was added, the first 8-page
prototype was built and merged, and Alycia deployed `main` to Netlify. At the end of the day a teammate
(GitHub user `chloehouse752-bit`) replaced `index.html` on `main` with a different single-file design, which
needs a team decision (see Open issues). Details of the prototype itself are in
`handoffs/handoff_2026-10-27_alycia_first-prototype.md`.

## Work done
- Connected the repo `alyciawear13-alt/TasteBites-Website-Prototype-and-Development` to the Claude project.
- PR #1 (merged): added `handoffs/HANDOFF_PROMPT.md` and `handoffs/handoff_TEMPLATE.md`.
- Explained how to invite groupmates: repo **Settings → Collaborators → Add people**. At least
  `chloehouse752-bit` now has write access (they pushed to `main`); not confirmed for the rest of the group.
- PR #2 (merged): first website prototype, 8 plain HTML/CSS/JS pages with fictional SLO sample restaurants.
- Alycia deployed the site on Netlify: "Import an existing project" → this GitHub repo → no build command,
  no publish directory. Netlify redeploys automatically whenever `main` changes.
- After the merge, `chloehouse752-bit` uploaded a new `index.html` straight to `main` (commit `e057fb6`,
  "Add files via upload") and a new `README.md` on branch `chloehouse752-bit-patch-1` (not merged, no PR).

## Files changed
| File | What changed |
|------|--------------|
| `handoffs/HANDOFF_PROMPT.md`, `handoffs/handoff_TEMPLATE.md` | Added (PR #1) |
| `index.html`, `find.html`, `restaurant.html`, `profile.html`, `learn.html`, `for-restaurants.html`, `list-restaurant.html`, `about.html`, `css/styles.css`, `js/*.js`, `README.md` | Added (PR #2); see first-prototype handoff |
| `handoffs/handoff_2026-10-27_alycia_first-prototype.md` | Added (PR #2) |
| `index.html` | Replaced by teammate (`e057fb6`): one self-contained page named "TasteBite", own inline CSS/JS, no links to the other 7 pages |
| `README.md` (branch `chloehouse752-bit-patch-1` only) | Rewritten for GitHub Pages and a single `index.html`; not on `main` |
| `handoffs/handoff_2026-10-27_alycia_github-and-netlify-setup.md` | This file |

## Decisions and reasoning
- **Decision:** Skip Figma for now.
  **Why:** The group has no Figma designs; the site was built from the BUS3310 PDFs, TA #4 and whiteboard sketches.
  **Rejected:** Connecting Figma (nothing in it to use).
- **Decision:** Host on Netlify by importing the GitHub repo, no build settings.
  **Why:** The site is plain files with no build step, and Netlify auto-updates on every change to `main`.
  **Rejected:** Vercel (works too, no reason to switch); GitHub Pages (suggested in the teammate's README branch, not chosen).
- **Decision:** Handoff files live in `handoffs/` and are added through pull requests.
  **Why:** Every teammate and AI tool can find the latest state in one place, and PRs let the group see changes before they go live.

## Open issues / blockers
- **The live home page changed.** Because Netlify deploys `main`, the site now shows the teammate's new
  `index.html`. It has no links to Find restaurants, Allergy guide, For restaurants, Profile, etc., so those
  pages are only reachable by typing their URL. It also uses the name "TasteBite" and different sample restaurants.
  The group needs to choose: keep the 8-page version, keep the new design, or combine them.
- Name is inconsistent: "TasteBites" (site), "TasteBite" (teammate's page), "TrustBites" (`HANDOFF_PROMPT.md`).
- Live Netlify URL hasn't been written down here yet. Netlify site name is still the random default.
- Map on `find.html` hasn't been tested on the live site.
- `$49/month` Certified price in `for-restaurants.html` is a placeholder.
- Unknown whether the other groupmates have accepted their collaborator invites.

## Next steps
1. Group decides which home page to keep; then restore or merge `index.html` through a PR (old version is in commit `31b53fc`).
2. Agree that changes go through pull requests, not direct uploads to `main`, since `main` is the live site.
3. Rename the Netlify site (Site configuration → Change site name) and paste the URL into `README.md`.
4. Open the live site and check the map on the Find restaurants page.
5. Pick a real price and update `for-restaurants.html`; pick one name for the project.
6. Decide what to do with branch `chloehouse752-bit-patch-1` (README rewrite).

## Notes for the next AI session
- Read this file and `handoff_2026-10-27_alycia_first-prototype.md` first.
- Plain HTML/CSS/JS, no install. Preview locally with `python3 -m http.server` in the repo folder → http://localhost:8000.
- `main` = live Netlify site. Check `git log origin/main` before editing; teammates commit via GitHub's "Add files via upload".
- Alycia is new to GitHub: explain branches, PRs and merging in simple terms.
