# Cleveland Foundation — Digital Experience Prototype

A clickable prototype of the Foundation's public site and its three signed-in / registered experiences, built as a static site so it can be hosted on GitHub Pages.

> **Prototype only.** All people, funds, balances and grants are fictional. Nothing is sent anywhere: activity is saved in the visitor's own browser, and the Salesforce / Ren iPhi sync shown in the portal is simulated.

## How the site fits together

```
index.html  ─────────────── Landing page (clevelandfoundation.org)
   │
   ├─ Log-In / "I have a fund here" ───────► portal/            Account Holder Portal
   │                                            sign-in → dashboard (DAF + organizational funds)
   ├─ Join the Community → Community Member ► community/         Community Member experience
   ├─ Join the Community → Advisor ─────────► advisors/          Advisor experience
   ├─ Non-profit Partner → Org Fund Account ► portal/?fund=eac   Portal, organizational fund selected
   └─ Impact Map / Calculator (in-page) ────► tools/             loaded only when opened
```

Only **four pages** make up the whole system. Inside each app, moving between modules happens in place — no page reload — and every module still has its own link.

## Folder structure

```
/
├── index.html                    Landing page
├── portal/index.html             Account Holder Portal
├── community/index.html          Community Member experience
├── advisors/index.html           Advisor experience
├── tools/
│   ├── impact-map.html           Landing-page impact map
│   └── impact-calculator.html    Landing-page impact calculator
├── assets/
│   ├── img/                      Logo and images (shared by every page)
│   ├── landing/                  landing.css · landing.js · tracks.js (routing to the three tracks)
│   ├── portal/                   portal.css · data.js · app.js · init.js
│   ├── giving/                   Code shared by community + advisors (styles, map, grants data)
│   ├── community/                Community-only app script
│   ├── advisors/                 Advisor-only styles, app script, Gift Planner, Estate Checklist
│   ├── tools/                    Map + calculator styles and scripts
│   └── js/tcf-bridge.js          Registration hand-off + deep links for community/advisors
├── 404.html                      Friendly not-found page
└── .nojekyll                     Tells GitHub Pages to serve files as-is
```

## Direct links to modules

| App | Link pattern | Examples |
|---|---|---|
| Portal | `portal/#/<module>` | `#/home` `#/performance` `#/allocation` `#/grants` `#/history` `#/contribute` `#/statements` `#/documents` `#/endow` `#/family` `#/advisor` `#/profile` `#/engage` `#/feed` `#/map` `#/legends` `#/quiz` `#/garden` `#/impact` `#/qr` (org funds) |
| Community / Advisors | `community/#/<view>` · `advisors/#/<view>` | `#/home` `#/newsfeed` `#/legends` `#/history` `#/garden` `#/impactmap` `#/calculator` |

Portal links ask the person to sign in once per browser session, then open the module the link pointed to. Community and advisor links skip the intro animation and open the module directly.

## How the pages talk to each other

| Hand-off | How |
|---|---|
| Registration → community / advisors | Landing saves name, email, interests and advisor type as `tcf_registration` in the browser; the app greets the person by name. |
| Landing Log-In → portal | Opens `portal/?signin=1`, which always starts at the sign-in screen. |
| Org fund → portal | Opens `portal/?signin=1&fund=eac` so the dashboard opens on the organizational fund. |
| Sign out (any app) → landing | Returns to `index.html`. |
| Portal profile | Saved as `tcf-donor-portal-profile-v1`; **Profile → Sync & data → Reset demo** clears it. |

## Speed

- Styles, scripts and images live in separate files, so the browser downloads them once and reuses them.
- The community and advisor experiences share roughly 430 KB of identical code (`assets/giving/`), downloaded once for both.
- The landing page's map and calculator load only when someone opens them.
- After the landing page finishes loading, it quietly pre-loads the three apps in the background, so the next click feels instant.

## Preview locally

From the folder that contains this README:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000/>. (Opening `index.html` straight from disk mostly works, but some browsers restrict saved data for `file://` pages, so a local server is closer to the real thing.)

## Publish on GitHub Pages

1. Create a repository and upload **everything in this folder**, keeping the folder structure. `index.html` must be at the top level.
2. In the repository, go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, pick `main` and `/ (root)`, and save.
4. After a minute the site is live at `https://<your-account>.github.io/<repository-name>/`.

Every link is relative, so the site works at that address without any changes.

## Needs internet

Fonts (Google Fonts), the maps (Leaflet + OpenStreetMap tiles) and the portal's QR code library load from public CDNs. Everything else is in this folder.

## Open items

- **Brand font (Paralucent):** licensed, so it isn't included. Add the font files to `assets/fonts/` and switch on the two `@font-face` rules noted at the top of `assets/advisors/advisor.css` and `assets/tools/calc/calc.css`. Until then those pages use Poppins, exactly as the original files did.

- **Grantee Portal link:** set `GRANTEE_PORTAL_URL` in `assets/landing/tracks.js`. While it's blank, that option shows the "Coming soon" window.
- Placeholder content to replace before any public use: Candid seal levels, fund documents, wiring details, spending-policy figures and QR link.
