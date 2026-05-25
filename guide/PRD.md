# PRD — Personal Dashboard Portfolio

## 1. Ringkasan

Personal Dashboard Portfolio adalah website portfolio multi-page yang terasa seperti personal dashboard OS. Bukan one-page scroll. Visitor masuk ke app shell dengan sidebar desktop, drawer mobile, dashboard home, project proof, journey, stack radar, dan contact CTA.

Fokus utama:

- Proof: project, case study, result, stack.
- Personality: journey, now/current focus, tone personal.
- Interaction: command menu, hover preview, quick preview, micro-interactions.

Design mengikuti `guide/DESIGN.md`: clean, playful, light-first, rounded cards, restrained accent, dashboard feel.

## 2. Goals

- Visitor paham value owner dalam kurang dari 30 detik.
- Project terlihat credible lewat context, role, process, dan result.
- Portfolio terasa hidup tanpa jadi berat.
- UI tidak terasa AI slop atau template generik.
- Code tetap optimized untuk all devices.
- MVP jadi fondasi untuk Supabase CMS, Google auth, dan comments Phase 2.

## 3. Target User

### Visitor

- Orang yang ingin melihat skill, project, dan personality owner.
- Recruiter.
- Potential client.
- Teman/dev lain.
- Visitor dari social media.

### Admin / Owner

- Pemilik portfolio.
- Phase 2: bisa manage project lewat custom CMS.

## 4. Product Direction

Konsep: personal dashboard / portfolio OS.

Rules:

- Multi-page app, bukan one-page scroll.
- Desktop pakai persistent collapsible sidebar.
- Mobile pakai drawer.
- Content berubah per route.
- Home jadi dashboard overview.
- Projects jadi proof utama.
- Journey jadi personality.
- Stack jadi skill map.
- Contact jadi conversion.

## 5. Sitemap

```txt
/
├─ Intro Preloader
│  ├─ spinner
│  ├─ setup-dashboard copy
│  └─ preload home images
│
├─ App Shell
│  ├─ Persistent collapsible sidebar
│  ├─ Mobile drawer
│  ├─ Top utility bar
│  ├─ Ctrl+K command menu
│  └─ Route content area
│
├─ /                    Home Dashboard
├─ /projects            Project Grid
├─ /projects/[slug]     Project Case Study
├─ /journey             Timeline + Now
├─ /stack               Tech Radar
└─ /contact             Contact CTA
```

## 6. Core Pages

### `/` Home Dashboard

Purpose: overview cepat.

Content:

- Hero identity.
- Role/headline placeholder.
- Short direct tagline.
- CTA to projects and contact.
- Stats: projects, experience, tech stack, availability.
- Availability card: open/closed, response time, timezone.
- Featured projects.
- Now/current focus preview.
- Journey preview.
- Contact CTA.

### `/projects` Project Grid

Purpose: proof utama.

Features:

- Search.
- Filter by stack, category, type/payment, featured, year.
- Interactive cards.
- Status badge.
- Stack chips.
- Type/payment label.
- Desktop hover reveal.
- Poster-first hover video.
- Mobile tap preview.
- Quick preview modal.
- Empty state.

### `/projects/[slug]` Project Case Study

Purpose: bikin visitor percaya.

Structure:

- Title.
- Short summary.
- Cover/gallery.
- Metadata: year, stack, type, role, status.
- Links: live demo, repo, preview.
- Case study: problem → process → solution → result.
- Proof/result block.
- Related projects if available.
- Comments placeholder for Phase 2.

### `/journey` Timeline + Now

Purpose: personality.

Content:

- Now/current focus.
- Currently learning.
- Currently building.
- Timeline milestones.
- Learning notes.
- Project links when relevant.

### `/stack` Tech Radar

Purpose: skill map, bukan logo dump.

Model: orbit tech radar.

Zones:

- Core.
- Comfortable.
- Learning.
- Exploring.

Each tech item:

- Name.
- Category.
- Confidence.
- Use case.
- Related projects.

Mobile must have readable fallback if orbit layout is cramped.

### `/contact` Contact CTA

Purpose: conversion.

Content:

- Direct CTA copy.
- Availability.
- Email.
- WhatsApp.
- LinkedIn.
- CV download placeholder.
- Timezone.
- Response expectation.
- Contact form prototype UI only.

Form rule:

- No backend submission in MVP.
- Do not imply message was sent unless backend exists.

## 7. Intro Preloader

Purpose:

- Bukan gimmick.
- Preload home-critical images.
- Give setup-dashboard feel.

Behavior:

- Spinner.
- Short setup copy.
- Light/dark aware.
- Safe timeout.
- Respect reduced motion.
- Reveal app shell after preload or timeout.

Copy options:

- `Setting up dashboard`
- `Loading workspace`
- `Preparing projects`
- `Opening interface`

## 8. Navigation

Desktop:

- Persistent sidebar.
- Collapsible icon-only mode.
- Active route state.
- Theme toggle in sidebar bottom.
- Collapse button in sidebar bottom.

Mobile:

- Drawer navigation.
- Top bar trigger.
- No permanent sidebar.

Admin:

- Admin panel button hidden in MVP.
- Phase 2 visible after auth.

## 9. Theme

- Light default.
- Dark supported.
- Toggle in sidebar bottom.
- Persist to `localStorage`.
- Apply via `data-theme="light|dark"`.
- Prevent initial flash.
- Dark theme manually tuned.
- No auto-invert.

## 10. Command Menu

Shortcut:

- `Ctrl + K`
- `Cmd + K`

MVP functions:

- Search pages.
- Search projects.
- Search skills.
- Contact actions.

Actions:

- Navigate page.
- Open project.
- Copy email.
- Open WhatsApp.
- Download CV placeholder.

Performance:

- Custom implementation.
- Lazy-load on first trigger when practical.
- Static small search index.

## 11. Project Card Interaction

Default:

- Poster image.
- Title.
- Short description.
- Stack chips.
- Status badge.
- Type/payment label.
- Preview CTA.
- Case study CTA.

Desktop hover:

- Reveal extra metadata.
- Attach video source on demand.
- Autoplay muted.
- Smooth transition.

Mobile:

- Tap-to-preview.
- No hover dependency.
- No aggressive autoplay.

Video rules:

- `preload="none"`.
- Poster first.
- Source only loaded on interaction.
- Respect `prefers-reduced-motion`.

## 12. Quick Preview Modal

MVP behavior:

- Screenshot/poster carousel.
- No iframe.
- Shows title, summary, stack, year, type, links.
- CTA to full case study.
- Accessible close behavior.

## 13. Data Strategy

MVP:

- Static TypeScript mock data.
- Placeholder designed media.
- No database.
- No CMS.

Phase 2:

- Supabase database.
- Project-only custom CMS first.

Mock data should mirror future CMS fields:

- `id`
- `slug`
- `title`
- `excerpt`
- `description`
- `category`
- `type`
- `status`
- `year`
- `isFeatured`
- `paymentStatus`
- `stack`
- `tags`
- `coverImage`
- `previewVideo`
- `gallery`
- `role`
- `problem`
- `process`
- `solution`
- `result`
- `liveUrl`
- `repoUrl`

## 14. Phase 2 CMS

Scope:

- Project-only admin CMS first.

Features:

- Admin login.
- Project CRUD.
- Manage cover image and preview media.
- Edit case study fields.
- Manage stack/tags.
- Publish/draft toggle.
- Featured toggle.

Tech direction:

- Supabase database.
- Google admin login.
- Admin email allowlist.
- Storage approach validated before implementation.

## 15. Phase 2 Comments

Scope:

- Project comments.

Features:

- Google visitor login.
- Comment per project.
- Pending approval by default.
- Admin moderation.
- Hide/delete.
- Basic anti-spam.
- No nested replies first.

## 16. Performance Requirements

Hard rules:

- Optimized code by default.
- Server Components by default.
- Client Components only for interactive islands.
- No full-page `"use client"` unless necessary.
- No heavy animation libraries unless justified.
- No video preload on initial page.
- No loading all project media upfront.
- No one massive component file.

Images:

- Optimized image rendering.
- Explicit sizes.
- Lazy-load non-critical images.
- Preload only home-critical images during intro.

Animations:

- Use transform and opacity.
- Avoid layout-heavy animation.
- Respect `prefers-reduced-motion`.

Mobile:

- Low-end device safe.
- No hover-only critical actions.
- Touch targets large enough.
- No horizontal overflow.

## 17. UI Quality Rules

No AI slop.

Avoid:

- Generic glassmorphism.
- Random gradients everywhere.
- Same card repeated without reason.
- Vague copy like “I craft digital experiences”.
- Decorative animation with no function.
- Overcrowded widgets.
- Fake analytics that mean nothing.

Require:

- Clear hierarchy.
- Consistent spacing.
- Intentional cards.
- Functional animation.
- Human copy.
- Balanced white space.
- Strong but restrained accents.
- Proof-oriented content.

## 18. MVP Scope

Included:

- Home dashboard.
- Persistent collapsible sidebar.
- Mobile drawer.
- Light/dark theme.
- Spinner preloader.
- Project grid.
- Smart filters.
- Project cards with poster-first hover video.
- Quick preview modal.
- Project detail case study.
- Journey page.
- Stack tech radar.
- Contact page.
- Contact form prototype UI only.
- Command menu.
- Static mock data.
- Placeholder designed media.
- Responsive layout.

Not included:

- Real database integration.
- CMS implementation.
- Google auth.
- Comments backend.
- Admin dashboard.
- Real contact form submission.
- Theme accent picker.
- Easter egg / terminal mode.
- Blog.
- Analytics dashboard.

## 19. Acceptance Criteria

General:

- Site feels like dashboard app, not landing page.
- Sidebar remains persistent on desktop.
- Mobile navigation works through drawer.
- Light theme is default.
- Dark theme works and persists.
- Pages are separate routes.

Home:

- Intro preloader appears.
- Preloader uses setup-dashboard copy.
- Home images are prepared before dashboard reveal.
- Dashboard shows stats, featured projects, availability, journey preview.

Projects:

- Filters work.
- Cards show proof metadata.
- Hover video does not load before interaction.
- Mobile can preview without hover.

Stack:

- Tech radar uses Core, Comfortable, Learning, Exploring.
- Selecting tech shows detail.
- Mobile fallback remains readable.

Contact:

- Contact actions are visible.
- Availability is clear.
- Prototype form does not claim successful backend delivery.

Performance:

- No unnecessary client-side rendering.
- No upfront video preload.
- No obvious layout shift.
- UI remains smooth on mobile.

## 20. Open Content Placeholders

Use mock-first values for:

- Name.
- Role.
- Bio.
- Projects.
- Skills.
- Timeline.
- Contact links.
- CV link.
- Availability.
- Media assets.

These will be replaced later.
