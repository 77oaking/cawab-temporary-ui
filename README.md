# CAWAB Website

**Cantonmentians' Alliance & Welfare Association of Bangladesh** — official website.

This repository currently contains **Phase 1: the Angular frontend UI** with mock data. It is architected so the **Phase 2** backend (Next.js + TypeScript API and MongoDB) can be added without rewriting the UI.

---

## Tech Stack

| Layer | Technology | Status |
|-------|------------|--------|
| Frontend | Angular 17 (standalone components) | ✅ Phase 1 (this repo) |
| API | Next.js + TypeScript | 🔜 Phase 2 |
| Database | MongoDB | 🔜 Phase 2 |
| Admin Panel | Angular (auth-guarded) | 🔜 Phase 2 (placeholder route exists) |

---

## Getting Started

You need **Node.js 18.19+** and npm installed.

```bash
# 1. Install dependencies
npm install

# 2. Run the dev server
npm start
# → open http://localhost:4200

# 3. Production build
npm run build
# → output in dist/cawab-website
```

> If you don't have the Angular CLI globally: `npm install -g @angular/cli`

---

## Project Structure

```
src/
├── index.html, main.ts, styles.scss   # entry + global brand styles
├── environments/                       # env config (apiUrl, useMockData, contact)
├── assets/data/                        # MOCK DATA (Phase 1) — swapped for API in Phase 2
│   ├── institutions.json               # all 112 member institutions
│   ├── departments.json                # 17 departments
│   ├── leadership.json                 # founders, advisory, executive board
│   └── content.json                    # notices, news, gallery, membership tiers
└── app/
    ├── app.routes.ts                    # lazy-loaded routing (+ guarded admin route)
    ├── core/
    │   ├── models/                      # TypeScript interfaces = future Mongo schemas
    │   ├── services/                    # data services (mock now, HTTP in Phase 2)
    │   └── guards/auth.guard.ts         # Phase-1 stub guard for admin
    ├── shared/                          # header, footer, logo, page-banner
    └── pages/                           # home, about, notice, departments,
                                         # department-detail, membership, institution,
                                         # gallery, news, contact, admin
```

---

## Pages

1. **Home** — hero, impact stats, mission timeline, chairman's message, notices, news, CTA
2. **About Us** — overview, history, founders, advisory & executive councils, designation hierarchy
3. **Notice Board** — filterable announcements
4. **Departments** — grid of 17 departments → individual detail pages
5. **Membership** — 4 tiers (Life / General / Associate / Honourary) + application form
6. **Institution** — searchable, filterable directory of all 112 institutions
7. **Gallery** — album-filtered photo grid with lightbox
8. **News Portal** — News / Events / Shows tabs
9. **Contact Us** — info + message form
10. **Admin** — Phase 2 placeholder

---

## Language Toggle

The header has an **English / বাংলা** switch powered by `I18nService`
(`src/app/core/services/i18n.service.ts`). Add translation keys to the `DICT`
object as the content grows. The font automatically switches to *Hind Siliguri*
for Bangla.

---

## Upgrading to Phase 2 (Backend)

The UI was built to make this a near drop-in change:

1. **Build the Next.js API** with endpoints like `/api/institutions`, `/api/departments`, `/api/leadership`, `/api/notices`, etc., returning the same JSON shapes defined in `src/app/core/models/`.
2. In `src/environments/environment.ts`, set:
   ```ts
   useMockData: false,
   apiUrl: 'https://your-api-origin/api'
   ```
3. Every service in `core/services/` already points at `${apiUrl}/...` when `useMockData` is false — **no component changes required**.
4. Replace the body of `core/guards/auth.guard.ts` with a real session/JWT check.
5. Build out the `pages/admin` component into the full dashboard.

---

## Brand Colors

| Token | Hex |
|-------|-----|
| CAWAB Green | `#0D5132` |
| Deep Green | `#083821` |
| Heritage Red | `#C8232C` |
| Laurel Gold | `#F5B614` |

---

## Notes

- **Logo:** rendered as an inline SVG in `shared/cawab-logo`. To use the official artwork, drop the file into `src/assets/img/` and swap the component template for an `<img>`.
- **Mock content** (notices, news, gallery) is placeholder and meant to be replaced with real data via the admin panel in Phase 2.
- `STRUCTURE_DEMO.html` (repo root) is the original approved structure plan — kept for reference.
