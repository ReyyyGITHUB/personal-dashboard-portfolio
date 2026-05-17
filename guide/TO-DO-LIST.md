# TO-DO-LIST — Personal Dashboard Portfolio

## Agent Rules

- [ ] Read `AGENTS.md`.
- [ ] Read `guide/PROJECT-BRIEF.md`.
- [ ] Read `guide/PRD.md`.
- [ ] Read `guide/DECISIONS.md`.
- [ ] Read `guide/ARCHITECTURE.md`.
- [ ] Read `guide/DESIGN.md`.
- [ ] Read `guide/CSSVARIABLE.md`.
- [ ] Read `guide/TAILWINDV4.md`.
- [ ] Read relevant Next.js docs in `node_modules/next/dist/docs/` before using unfamiliar Next.js 16 APIs.
- [ ] Keep implementation mobile-first.
- [ ] Use Server Components by default.
- [ ] Use Client Components only for interactive islands.
- [ ] Avoid full-page `"use client"`.
- [ ] Avoid heavy dependencies unless clearly needed.
- [ ] Keep UI intentional. No AI slop.
- [ ] Keep media poster-first and lazy.
- [ ] Run `npm run lint` and `npm run build` before final handoff when code changes are made.

## Status Legend

- `[ ]` Not started
- `[~]` In progress
- `[x]` Done
- `[!]` Blocked
- `[-]` Skipped

## Locked Product Decisions

- [x] Product concept: Personal Dashboard Portfolio.
- [x] Main direction: proof + personality + interaction.
- [x] Navigation: multi-page app, not one-page scroll.
- [x] Desktop layout: persistent collapsible sidebar.
- [x] Mobile layout: drawer.
- [x] Theme: light default + dark support.
- [x] MVP data: static mock data.
- [x] MVP media: placeholder designed media.
- [x] MVP CMS: not included.
- [x] MVP contact form: prototype UI only.
- [x] Phase 2 database: Supabase.
- [x] Phase 2 admin auth: Google allowlist.
- [x] Phase 2 CMS: project-only admin first.
- [x] Phase 2 comments: Google login + moderation.
- [x] Quick preview: screenshot/poster modal, not iframe.
- [x] Video preview: project cards only, poster-first, lazy on interaction.
- [x] Stack page: orbit tech radar.
- [x] Command menu: custom MVP feature.

## Phase 0 — Repo Grounding

- [ ] Inspect current app routes and file structure.
- [ ] Inspect `package.json` scripts and dependencies.
- [ ] Inspect current `app/globals.css`, `app/layout.tsx`, and `app/page.tsx`.
- [ ] Read relevant Next.js 16 docs before touching App Router, metadata, image, or route behavior.
- [ ] Confirm no nested `AGENTS.md` applies before editing subdirectories.

## Phase 1 — Architecture Setup

- [ ] Move to `src/` structure when implementation begins.
- [ ] Create `src/app`.
- [ ] Create `src/components/ui`.
- [ ] Create `src/components/layout`.
- [ ] Create `src/features`.
- [ ] Create `src/data`.
- [ ] Create `src/types`.
- [ ] Create `src/lib`.
- [ ] Keep feature-based organization.

## Phase 2 — Design Tokens + Theme Foundation

- [ ] Implement global CSS variables from `guide/DESIGN.md`.
- [ ] Fix invalid or incomplete color tokens if found.
- [ ] Configure Tailwind v4 theme variables.
- [ ] Create light theme as default.
- [ ] Create manually tuned dark theme.
- [ ] Apply theme via `data-theme="light|dark"`.
- [ ] Prevent theme flash on initial render.
- [ ] Add base background, text, border, radius, and shadow styles.
- [ ] Add typography scale from design guide.
- [ ] Add reduced-motion-safe global behavior.

## Phase 3 — Static Data Foundation

- [ ] Define `Project` type.
- [ ] Define `Profile` type.
- [ ] Define `TechItem` type.
- [ ] Define `JourneyItem` type.
- [ ] Create mock profile data.
- [ ] Create mock project data.
- [ ] Create mock tech radar data.
- [ ] Create mock journey data.
- [ ] Create helper: get featured projects.
- [ ] Create helper: get project by slug.
- [ ] Create helper: filter projects by stack/category/type/featured/year.
- [ ] Create helper: search projects and skills.

## Phase 4 — App Shell

- [ ] Build responsive app shell.
- [ ] Build persistent desktop sidebar.
- [ ] Build sidebar collapsed icon-only mode.
- [ ] Persist sidebar state in `localStorage`.
- [ ] Build mobile drawer navigation.
- [ ] Build top utility bar.
- [ ] Show active route state.
- [ ] Add theme toggle in sidebar bottom.
- [ ] Add subtle route/page transition.
- [ ] Ensure keyboard navigation works.

## Phase 5 — Intro Preloader

- [ ] Build spinner preloader.
- [ ] Use setup-dashboard copy.
- [ ] Preload home-critical images only.
- [ ] Add safe timeout.
- [ ] Make preloader light/dark aware.
- [ ] Respect reduced motion.
- [ ] Reveal dashboard shell after preload or timeout.

## Phase 6 — UI Primitives

- [ ] Button.
- [ ] Card.
- [ ] Badge.
- [ ] Section header.
- [ ] Stat widget.
- [ ] Availability card.
- [ ] Project card.
- [ ] Filter chip.
- [ ] Link/action card.
- [ ] Modal shell.
- [ ] Empty state.
- [ ] Loading state.

## Phase 7 — Home Dashboard `/`

- [ ] Build hero identity card.
- [ ] Add role/headline placeholder.
- [ ] Add direct non-generic tagline placeholder.
- [ ] Add CTA buttons: projects and contact.
- [ ] Add stats: projects, experience, tech stack, availability.
- [ ] Add availability card: status, response time, timezone.
- [ ] Add featured projects section.
- [ ] Add Now/current focus preview.
- [ ] Add Journey preview.
- [ ] Add contact CTA.
- [ ] Ensure visitor understands value under 30 seconds.
- [ ] Keep layout dashboard-like, not landing-page-like.

## Phase 8 — Projects `/projects`

- [ ] Build projects route.
- [ ] Build project search.
- [ ] Build filters: stack, category, type/payment, featured, year.
- [ ] Build responsive project grid.
- [ ] Build interactive project cards.
- [ ] Add status badge.
- [ ] Add stack chips.
- [ ] Add type/payment label.
- [ ] Add hover reveal for desktop.
- [ ] Add empty state.
- [ ] Ensure filters stay lightweight.

## Phase 9 — Poster-First Video Preview

- [ ] Render poster image by default.
- [ ] Set video `preload="none"`.
- [ ] Attach video source only on hover/focus/visibility trigger.
- [ ] Autoplay muted video on desktop hover.
- [ ] Use tap-to-preview behavior on mobile.
- [ ] Stop/pause video when interaction ends.
- [ ] Respect `prefers-reduced-motion`.
- [ ] Verify videos are not requested during initial page load.

## Phase 10 — Quick Preview Modal

- [ ] Build project preview modal.
- [ ] Use screenshot/poster carousel.
- [ ] Do not use iframe in MVP.
- [ ] Show title, summary, stack, type, year, and links.
- [ ] Add CTA to full case study.
- [ ] Add accessible close behavior.
- [ ] Lazy-load modal logic if practical.

## Phase 11 — Project Detail `/projects/[slug]`

- [ ] Build dynamic project detail route.
- [ ] Generate static params from mock data.
- [ ] Add title and short summary.
- [ ] Add cover/gallery section.
- [ ] Add metadata: year, stack, type, role, status.
- [ ] Add links: live demo, repository, preview.
- [ ] Add case study sections: problem, process, solution, result.
- [ ] Add proof/result block.
- [ ] Add related projects if data exists.
- [ ] Add comments placeholder labeled Phase 2.
- [ ] Add not-found handling for unknown slug.

## Phase 12 — Journey `/journey`

- [ ] Build Journey route.
- [ ] Add Now/current focus cards.
- [ ] Add currently learning.
- [ ] Add currently building.
- [ ] Add timeline milestones.
- [ ] Add learning notes.
- [ ] Add personal but concise copy.
- [ ] Link relevant milestones to projects when available.

## Phase 13 — Stack `/stack`

- [ ] Build Stack route.
- [ ] Build orbit tech radar.
- [ ] Add zones: Core, Comfortable, Learning, Exploring.
- [ ] Add selectable tech items.
- [ ] Add selected tech detail panel.
- [ ] Show use case, confidence, category, related projects.
- [ ] Ensure radar remains readable on mobile.
- [ ] Provide fallback card/list layout if orbit is cramped.

## Phase 14 — Contact `/contact`

- [ ] Build Contact route.
- [ ] Add direct CTA copy.
- [ ] Add availability status.
- [ ] Add timezone.
- [ ] Add response expectation.
- [ ] Add email action.
- [ ] Add WhatsApp action.
- [ ] Add LinkedIn action.
- [ ] Add CV download placeholder.
- [ ] Add contact form prototype UI only.
- [ ] Do not implement backend submit in MVP.
- [ ] Do not show fake success message.

## Phase 15 — Command Menu `Ctrl + K`

- [ ] Build custom lazy-loaded command menu.
- [ ] Support `Ctrl + K` and `Cmd + K`.
- [ ] Search pages.
- [ ] Search projects.
- [ ] Search skills.
- [ ] Add actions: copy email, open WhatsApp, download CV.
- [ ] Add keyboard navigation.
- [ ] Add empty state.
- [ ] Keep search index small and static.

## Phase 16 — QA

- [ ] Confirm light theme is default.
- [ ] Confirm dark mode toggle works.
- [ ] Confirm theme persists after refresh.
- [ ] Confirm no initial theme flash.
- [ ] Test desktop sidebar expanded/collapsed.
- [ ] Test mobile drawer.
- [ ] Test project filters/search.
- [ ] Test modal on mobile.
- [ ] Test tech radar mobile fallback.
- [ ] Confirm videos do not preload.
- [ ] Confirm non-critical images lazy-load.
- [ ] Check reduced motion behavior.
- [ ] Check no horizontal overflow.
- [ ] Run `npm run lint`.
- [ ] Run `npm run build`.

## Phase 17 — Phase 2 CMS Backlog

- [ ] Add Supabase database.
- [ ] Validate storage approach.
- [ ] Add Google admin auth.
- [ ] Add admin email allowlist.
- [ ] Build `/admin` dashboard.
- [ ] Build project CRUD.
- [ ] Add media upload.
- [ ] Add publish/draft toggle.
- [ ] Add featured toggle.
- [ ] Add validation.

## Phase 18 — Phase 2 Comments Backlog

- [ ] Add Google visitor login.
- [ ] Add comment model.
- [ ] Add project comment form.
- [ ] Add project comment list.
- [ ] Add pending approval by default.
- [ ] Add admin moderation.
- [ ] Add hide/delete action.
- [ ] Add basic anti-spam/rate limit.

## Later Backlog

- [ ] Theme accent picker.
- [ ] Terminal mode easter egg.
- [ ] Blog/articles.
- [ ] Guestbook page.
- [ ] Testimonials CMS.
- [ ] Auto-generated Open Graph images.
- [ ] GitHub contribution sync.
- [ ] Public analytics card if meaningful.
- [ ] Resume/CV builder.
