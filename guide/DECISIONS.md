# DECISIONS — Personal Dashboard Portfolio

## Purpose

File ini adalah source of truth untuk keputusan yang sudah dikunci. Jika ada konflik antar dokumen, selaraskan dokumen lain ke keputusan di sini dan `guide/PRD.md`.

## Product Direction

- Project name: Personal Dashboard Portfolio.
- Concept: personal dashboard / portfolio OS.
- Focus: proof + personality + interaction.
- Website bukan one-page scroll portfolio.
- Website harus terasa seperti lightweight dashboard app.
- Target utama: personal branding.
- Target sekunder: recruiter dan potential client.

## UX Decisions

- Navigation: multi-page route-based app.
- Desktop navigation: persistent collapsible sidebar.
- Mobile navigation: drawer.
- Sidebar tetap jadi pusat navigasi.
- Content route berubah di main content area.
- Page transition boleh ada, tapi subtle.
- Hover tidak boleh jadi satu-satunya cara akses fitur di mobile.

## Sitemap Decision

Sitemap MVP dikunci:

- `/` — Home Dashboard.
- `/projects` — Project Grid.
- `/projects/[slug]` — Project Case Study.
- `/journey` — Timeline + Now.
- `/stack` — Tech Radar.
- `/contact` — Contact CTA.

## Visual Direction

- Style mengikuti `guide/DESIGN.md`.
- Default theme: light.
- Dark mode: supported.
- Feel: clean, playful, dashboard-like.
- Use rounded cards, stat widgets, badges, subtle borders, restrained accents.
- No AI slop.
- Hindari random gradient, generic glassmorphism, fake analytics, dan filler cards.
- UI harus intentional dan mudah discan.

## Language And Tone

- Bahasa: campuran Indonesia + technical English.
- Tone: direct, human, ringan, tidak corporate.
- Hindari copy generic seperti “I craft digital experiences”.
- Copy harus proof-oriented dan personal.

## MVP Definition

MVP selesai jika public UI sudah usable, responsive, dan terasa seperti dashboard portfolio.

MVP data masih static mock data. Tidak ada database, CMS, auth, atau comments backend di fase pertama.

## MVP Included

- Home dashboard.
- Persistent collapsible sidebar.
- Mobile drawer navigation.
- Light/dark theme.
- Spinner intro preloader.
- Project grid with filters.
- Project cards with poster-first hover video.
- Quick preview modal.
- Project detail case study.
- Journey page.
- Stack tech radar orbit.
- Contact page.
- Contact form prototype UI only.
- Command menu `Ctrl + K`.
- Static mock data.
- Placeholder designed media.

## MVP Not Included

- Database integration.
- CMS CRUD.
- Admin dashboard implementation.
- Google login.
- Comments backend.
- Real contact form submission.
- Image/video upload.
- Rich text editor.
- Blog.
- Full analytics dashboard.
- Theme accent picker.
- Terminal/easter egg mode.

## Architecture Decisions

- Use Next.js 16 App Router.
- Use `src/` directory.
- Use feature-based structure.
- Server Components by default.
- Client Components only for interactive islands.
- No full-page `"use client"` unless absolutely necessary.
- No global state library for MVP.
- No UI component library for MVP.
- Command menu is custom.
- Static data lives in `src/data`.
- Shared types live in `src/types`.
- UI primitives live in `src/components/ui`.
- Layout components live in `src/components/layout`.
- Feature modules live in `src/features`.

## Theme Decision

- Light theme is default.
- Dark mode is supported.
- Theme state persists in `localStorage`.
- Theme applied through `data-theme="light|dark"`.
- Avoid initial theme flash.
- Dark theme is manually tuned, not auto-inverted.

## Data Decision

- MVP uses static TypeScript mock data.
- Data shape should mirror future CMS fields.
- Phase 2 database: Supabase.
- Do not integrate Supabase in MVP.
- Do not add database migrations in MVP.

## CMS Decision

- CMS is Phase 2.
- CMS is custom admin dashboard, not external CMS.
- Phase 2 CMS scope starts with projects only.
- Admin editor should use simple form/editor first.
- Rich text editor is not needed early.

## Auth Decision

- MVP: no real auth.
- MVP admin access can use simple password only if an admin prototype is created.
- Phase 2 admin auth: Google login with admin email allowlist.
- Visitor Google login is only for future comments.

## Comments Decision

- Comments are Phase 2.
- Comments are per-project.
- Comments require Google login.
- Comments require moderation.
- Default moderation: pending approval.
- No nested replies for initial comments version.

## Contact Decision

- Contact CTA is MVP.
- Contact page includes email, WhatsApp, LinkedIn, CV download placeholder, availability, timezone, response expectation.
- Contact form is prototype UI only.
- Contact form has no backend submission in MVP.
- Form must not imply message was sent unless backend exists.

## Media Decision

- MVP uses placeholder designed media.
- Images are poster-first.
- Preview videos are project-card only.
- Video preview uses `preload="none"`.
- Video source loads only on interaction.
- Desktop may autoplay muted video on hover.
- Mobile uses tap-to-preview; no hover dependency.
- Respect `prefers-reduced-motion`.

## Quick Preview Decision

- Quick preview modal is MVP.
- Modal uses screenshot/poster carousel first.
- Do not use iframe in MVP.
- Modal shows title, summary, stack, year, type, and links.
- CTA points to full project case study.

## Stack Page Decision

- `/stack` is MVP.
- UI model: orbit tech radar.
- Zones: Core, Comfortable, Learning, Exploring.
- Each tech item includes use case, confidence, category, and related projects.
- Mobile must have readable fallback if orbit layout is cramped.

## Preloader Decision

- Intro preloader is MVP.
- Preloader uses spinner.
- Copy is setup-dashboard style:
  - `Setting up dashboard`
  - `Loading workspace`
  - `Preparing projects`
  - `Opening interface`
- Function: preload home-critical images only.
- Must include safe timeout.
- Must not block user too long.

## Performance Decision

- Performance is mandatory.
- Optimized code by default.
- Client JS must stay small.
- Lazy-load command menu.
- Lazy-load modal behavior when practical.
- Do not preload videos.
- Do not load all project media upfront.
- Animate transform/opacity where possible.
- Avoid heavy animation libraries unless strongly justified.
- Mobile and low-end device performance matter.

## Phase 2 Decisions

- Database: Supabase.
- Admin auth: Google login + admin email allowlist.
- CMS: custom project-only admin first.
- Comments: Google login + moderation.
- Storage: likely Supabase Storage, but validate again before implementation.

## Related Docs

- `guide/PROJECT-BRIEF.md`
- `guide/PRD.md`
- `guide/ARCHITECTURE.md`
- `guide/TO-DO-LIST.md`
- `guide/DESIGN.md`
- `guide/CSSVARIABLE.md`
- `guide/TAILWINDV4.md`
