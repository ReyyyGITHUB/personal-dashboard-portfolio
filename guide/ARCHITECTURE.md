# ARCHITECTURE — Personal Dashboard Portfolio

## Purpose

Dokumen ini menjelaskan cara project dibangun secara teknis. Fokusnya struktur, data flow, rendering strategy, state, theme, media, dan performance.

Untuk fitur dan product behavior, baca `guide/PRD.md`. Untuk keputusan yang sudah dikunci, baca `guide/DECISIONS.md`.

## Tech Stack

- Framework: Next.js 16 App Router.
- UI runtime: React 19.
- Language: TypeScript.
- Styling: Tailwind CSS v4 + CSS variables.
- Deployment target: Vercel.
- MVP data: static TypeScript data.
- Phase 2 database: Supabase.
- Phase 2 auth: Google login with admin email allowlist.

## Directory Strategy

Gunakan `src/` dan feature-based architecture.

```txt
src/
├─ app/
│  ├─ page.tsx
│  ├─ projects/
│  │  ├─ page.tsx
│  │  └─ [slug]/
│  │     └─ page.tsx
│  ├─ journey/
│  │  └─ page.tsx
│  ├─ stack/
│  │  └─ page.tsx
│  ├─ contact/
│  │  └─ page.tsx
│  ├─ layout.tsx
│  └─ globals.css
│
├─ components/
│  ├─ ui/
│  └─ layout/
│
├─ features/
│  ├─ shell/
│  ├─ theme/
│  ├─ command-menu/
│  ├─ projects/
│  ├─ journey/
│  ├─ stack/
│  └─ contact/
│
├─ data/
├─ lib/
└─ types/
```

## Route Architecture

Routes dikunci:

- `/` — Home Dashboard.
- `/projects` — Project Grid.
- `/projects/[slug]` — Project Case Study.
- `/journey` — Timeline + Now.
- `/stack` — Tech Radar.
- `/contact` — Contact CTA.

Rules:

- Routes are real pages, not one-page sections.
- Sidebar persists through the app shell.
- Page content changes inside the main content area.
- Dynamic project pages are generated from static project data in MVP.

## Rendering Strategy

Default:

- Server Components.
- Static rendering where possible.
- Minimal client JavaScript.

Client islands only:

- Sidebar collapse.
- Mobile drawer.
- Theme toggle.
- Command menu.
- Project filters/search.
- Quick preview modal.
- Poster-first hover video preview.

Rules:

- Do not make entire pages `"use client"` unless unavoidable.
- Keep interactive components isolated.
- Prefer passing static data from Server Components into small Client Components.

## Component Architecture

### `src/components/ui`

Reusable primitives:

- Button.
- Card.
- Badge.
- Section header.
- Stat widget.
- Filter chip.
- Modal shell.
- Empty state.
- Loading state.

### `src/components/layout`

App-level layout:

- App shell.
- Sidebar.
- Mobile drawer.
- Top utility bar.
- Route title area.

### `src/features`

Feature-specific UI and logic:

- `features/projects`: project grid, filters, card, preview modal, case study blocks.
- `features/command-menu`: command menu UI and search index behavior.
- `features/theme`: theme provider/toggle/client script.
- `features/shell`: sidebar state and navigation helpers.
- `features/journey`: timeline and now widgets.
- `features/stack`: tech radar and selected tech detail.
- `features/contact`: contact CTA and prototype form UI.

## Data Architecture

MVP uses static data.

Recommended files:

```txt
src/data/
├─ profile.ts
├─ projects.ts
├─ journey.ts
└─ stack.ts
```

Recommended types:

```txt
src/types/
├─ profile.ts
├─ project.ts
├─ journey.ts
└─ stack.ts
```

Project data should support:

- slug.
- title.
- excerpt.
- category.
- type/payment label.
- status.
- year.
- featured flag.
- stack.
- tags.
- cover image.
- preview video.
- gallery.
- role.
- problem.
- process.
- solution.
- result.
- live/repo links.

Data rules:

- Mock data should mirror future Supabase/CMS fields.
- Do not add Supabase in MVP.
- Do not add migrations in MVP.
- Keep data helpers pure and easy to replace later.

## State Architecture

No global state library in MVP.

Use:

- Local component state for menus, modal, hover/tap interactions.
- URL search params for project filters/search if useful.
- `localStorage` for theme preference.
- `localStorage` for sidebar collapse preference.

Avoid:

- Redux.
- Zustand.
- Global context for everything.
- Client state for data that can stay static/server-rendered.

## Theme Architecture

Theme:

- Light default.
- Dark supported.
- Applied through `data-theme="light|dark"`.
- Persisted in `localStorage`.

Rules:

- Prevent theme flash before paint.
- Dark theme is manually tuned.
- Do not auto-invert colors.
- Keep accent colors restrained.
- Theme toggle lives in sidebar bottom.

## Command Menu Architecture

Command menu is custom.

Behavior:

- Opens with `Ctrl + K` or `Cmd + K`.
- Searches pages, projects, skills, and actions.
- Supports keyboard navigation.
- Lazy-load on first trigger when practical.

Search index sources:

- Static route list.
- Static project data.
- Static tech stack data.
- Contact actions.

Actions:

- Navigate to page.
- Open project.
- Copy email.
- Open WhatsApp.
- Download CV placeholder.

## Media Architecture

Images:

- Use optimized image rendering.
- Use explicit dimensions.
- Lazy-load non-critical images.
- Preload home-critical images only during intro.

Videos:

- Project cards only in MVP.
- Poster image renders first.
- Use `preload="none"`.
- Attach video source only on interaction.
- Desktop hover may autoplay muted video.
- Mobile uses tap preview.
- Pause/stop when interaction ends.
- Respect `prefers-reduced-motion`.

Quick preview:

- Screenshot/poster carousel.
- No iframe in MVP.
- CTA to full case study.

## Performance Architecture

Hard rules:

- Optimized code by default.
- Server-first.
- Client JS minimal.
- No full-page client rendering for static content.
- No video preload on initial load.
- No loading all project media upfront.
- Avoid heavy animation libraries.
- Use transform/opacity for animations.
- Keep dashboard widgets meaningful and lightweight.

Performance checks:

- Initial page should not request preview videos.
- Command menu should not inflate initial JS unnecessarily.
- Modal behavior should be isolated.
- Mobile should remain smooth.
- Reduced motion should reduce or remove non-essential animation.

## Accessibility Rules

- All icon-only buttons need accessible labels.
- Sidebar collapse button must be keyboard accessible.
- Mobile drawer must manage focus.
- Command menu must support keyboard navigation.
- Modal must support escape close and focus handling.
- Color contrast must pass in light and dark themes.
- No hover-only critical actions.

## Future CMS Architecture

Phase 2:

- Database: Supabase.
- Admin auth: Google login + admin email allowlist.
- CMS scope: projects only first.
- Admin routes live under `/admin`.
- Project CRUD replaces static project data gradually.
- Media upload added after storage approach is validated.

Future data flow:

```txt
Supabase
→ server-side data access
→ route/page rendering
→ small client islands for admin forms
```

Do not build CMS in MVP.

## Future Comments Architecture

Phase 2:

- Comments belong to project detail pages.
- Visitor login uses Google.
- Comment moderation required.
- Default status: pending approval.
- Admin can approve, hide, or delete.
- No nested replies in initial version.

Do not build comments backend in MVP.

## Validation Strategy

Run after code changes:

- `npm run lint`
- `npm run build`

Manual QA:

- Desktop sidebar expanded/collapsed.
- Mobile drawer.
- Light/dark theme persistence.
- Project filters/search.
- Quick preview modal.
- Hover video lazy loading.
- Mobile tap preview.
- Command menu keyboard behavior.
- Reduced motion.
- No horizontal overflow.

## Related Docs

- `guide/PROJECT-BRIEF.md`
- `guide/PRD.md`
- `guide/DECISIONS.md`
- `guide/TO-DO-LIST.md`
- `guide/DESIGN.md`
- `guide/CSSVARIABLE.md`
- `guide/TAILWINDV4.md`
