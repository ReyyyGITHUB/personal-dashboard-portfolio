# PRD — Personal Dashboard Portfolio OS

## 1. Ringkasan

Website portfolio personal berbentuk dashboard multi-page. Bukan one-page scroll. Visitor masuk ke pengalaman seperti membuka personal operating system: ada sidebar tetap, dashboard home, project proof, journey, skill radar, dan contact CTA.

Fokus utama produk:

- Proof: project, case study, result, stack.
- Personality: journey, now/current focus, tone personal.
- Interaction: command menu, hover preview, micro-interactions.

Design mengacu ke `guide/DESIGN.md`: clean, playful, light-first, rounded cards, aksen warna hemat, dashboard feel.

## 2. Tujuan

- Menampilkan karya secara profesional dan mudah discan.
- Membuat visitor paham value dalam kurang dari 30 detik.
- Membuat portfolio terasa hidup, bukan template statis.
- Menjadi fondasi jangka panjang untuk CMS, comments, dan admin dashboard.
- Tetap ringan di semua device.

## 3. Target User

### Visitor

- Orang yang ingin tahu skill, project, dan personality owner.
- Recruiter.
- Client potensial.
- Teman/dev lain.
- Visitor dari sosial media.

### Admin / Owner

- Pemilik portfolio.
- Nanti bisa mengelola project lewat CMS/admin panel.

## 4. Product Direction

Konsep utama: Personal Operating System.

Website terasa seperti dashboard pribadi:

- Sidebar navigasi selalu ada di desktop.
- Konten berubah per route.
- Home sebagai overview.
- Projects sebagai proof utama.
- Journey sebagai personality.
- Stack sebagai skill map.
- Contact sebagai conversion.

Bukan landing page panjang. Bukan UI AI generic. Bukan random gradient cards.

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

## 6. Layout

### Desktop Shell

```txt
┌───────────────┬─────────────────────────────────────────────┐
│ SIDEBAR       │ TOP BAR                                     │
│               │ Current page title      Ctrl+K / Status     │
│ Logo/Name     ├─────────────────────────────────────────────┤
│               │                                             │
│ Home          │ PAGE CONTENT                                │
│ Projects      │ route changes here                          │
│ Journey       │ sidebar stays persistent                    │
│ Stack         │                                             │
│ Contact       │                                             │
│               │                                             │
│ Theme Toggle  │                                             │
│ Collapse      │                                             │
└───────────────┴─────────────────────────────────────────────┘
```

### Mobile Shell

```txt
┌─────────────────────────────────────┐
│ Top Bar                             │
│ Menu / Brand / Ctrl+K               │
├─────────────────────────────────────┤
│ Page Content                        │
│                                     │
│ Sidebar becomes drawer              │
└─────────────────────────────────────┘
```

## 7. Core Pages

### `/` Home Dashboard

Tujuan: memberi overview cepat tentang owner.

Konten:

- Hero identity.
- Role/headline.
- Short personal tagline.
- Stats cards:
  - Projects.
  - Experience.
  - Tech stack.
  - Availability.
- Featured projects.
- Availability card:
  - Open/closed freelance.
  - Response time.
  - Location/timezone.
- Now/current focus preview.
- Journey preview.
- Contact CTA.

Wireframe:

```txt
┌───────────────┬─────────────────────────────────────────────┐
│ SIDEBAR       │ Home                                        │
│               ├─────────────────────────────────────────────┤
│               │ ┌───────────────────────────┬─────────────┐ │
│               │ │ HERO / IDENTITY           │ AVAILABILITY│ │
│               │ │ Name + role               │ Open/Closed │ │
│               │ │ Short direct line         │ Timezone    │ │
│               │ │ CTA buttons               │ Response    │ │
│               │ └───────────────────────────┴─────────────┘ │
│               │                                             │
│               │ ┌────────┬────────────┬────────┬─────────┐ │
│               │ │Projects│Experience  │Stack   │Status   │ │
│               │ └────────┴────────────┴────────┴─────────┘ │
│               │                                             │
│               │ Featured Projects                           │
│               │ [Card] [Card] [Card]                        │
│               │                                             │
│               │ Now / Journey Preview                       │
└───────────────┴─────────────────────────────────────────────┘
```

### `/projects` Project Grid

Tujuan: proof utama.

Fitur:

- Search.
- Filter by:
  - Stack.
  - Category.
  - Paid/type.
  - Featured.
  - Year.
- Project cards interaktif.
- Hover reveal.
- Status badge.
- Stack chips.
- Paid/personal/client label.
- Quick preview modal.
- Poster-first video hover.

Wireframe:

```txt
┌───────────────┬─────────────────────────────────────────────┐
│ SIDEBAR       │ Projects                                    │
│               ├─────────────────────────────────────────────┤
│               │ Search bar                         Ctrl+K   │
│               │                                             │
│               │ Filters                                     │
│               │ [All] [Featured] [Paid] [Next.js] [2026]   │
│               │                                             │
│               │ [Project Card] [Project Card] [Project Card]│
│               │ [Project Card] [Project Card] [Project Card]│
└───────────────┴─────────────────────────────────────────────┘
```

### `/projects/[slug]` Project Case Study

Tujuan: bikin visitor percaya.

Struktur case study:

- Project title.
- Short description.
- Cover/gallery.
- Metadata:
  - Year.
  - Stack.
  - Type.
  - Role.
  - Status.
- Problem.
- Process.
- Solution.
- Result.
- Links:
  - Live demo.
  - Repository.
  - Preview.
- Comments placeholder phase 2.

Wireframe:

```txt
┌───────────────┬─────────────────────────────────────────────┐
│ SIDEBAR       │ Project Detail                              │
│               ├─────────────────────────────────────────────┤
│               │ Title + summary              Meta           │
│               │ [Live] [Repo] [Preview]      Year/Stack     │
│               │                                             │
│               │ Cover / Gallery                             │
│               │                                             │
│               │ Problem | Process | Solution                │
│               │                                             │
│               │ Result / Lessons / Proof                    │
│               │                                             │
│               │ Comments Phase 2                            │
└───────────────┴─────────────────────────────────────────────┘
```

### `/journey` Timeline + Now

Tujuan: personality.

Konten:

- Current focus.
- Currently learning.
- Currently building.
- Timeline milestones.
- Learning notes.
- Personal development story.

Wireframe:

```txt
┌───────────────┬─────────────────────────────────────────────┐
│ SIDEBAR       │ Journey                                     │
│               ├─────────────────────────────────────────────┤
│               │ Now                  Current Focus          │
│               │ Learning             Building               │
│               │                                             │
│               │ Timeline                                    │
│               │ 2026 ──● Portfolio OS                       │
│               │ 2025 ──● Project milestone                  │
│               │ 2024 ──● Web dev focus                      │
└───────────────┴─────────────────────────────────────────────┘
```

### `/stack` Tech Radar

Tujuan: skill map, bukan logo dump.

Model UI: orbit cards.

Zones:

- Core.
- Comfortable.
- Learning.
- Exploring.

Setiap tech punya:

- Name.
- Category.
- Confidence.
- Use case.
- Related projects.

Wireframe:

```txt
┌───────────────┬─────────────────────────────────────────────┐
│ SIDEBAR       │ Stack                                       │
│               ├─────────────────────────────────────────────┤
│               │ Tech Radar                                  │
│               │                                             │
│               │             Learning                        │
│               │        Astro / Motion / AI                  │
│               │                                             │
│               │ Comfortable              Exploring          │
│               │ Tailwind / Prisma        Three.js           │
│               │                                             │
│               │                Core                         │
│               │       Next.js / React / TS                  │
│               │                                             │
│               │ Selected Tech Detail                        │
│               │ - Used for                                  │
│               │ - Confidence                                │
│               │ - Related projects                          │
└───────────────┴─────────────────────────────────────────────┘
```

### `/contact` Contact CTA

Tujuan: conversion.

Konten:

- Direct CTA.
- Availability.
- Email.
- WhatsApp.
- LinkedIn.
- CV download.
- Timezone.
- Response expectation.

Wireframe:

```txt
┌───────────────┬─────────────────────────────────────────────┐
│ SIDEBAR       │ Contact                                     │
│               ├─────────────────────────────────────────────┤
│               │ Let's build something        Status         │
│               │ Short direct copy            Available      │
│               │                              Timezone       │
│               │ [Email] [WhatsApp]           Response       │
│               │ [LinkedIn] [Download CV]                    │
└───────────────┴─────────────────────────────────────────────┘
```

## 8. Intro Preloader

Tujuan:

- Bukan gimmick.
- Preload home-critical images.
- Memberi setup-dashboard feel sebelum shell terbuka.

Behavior:

- Muncul saat first load.
- Light/dark aware.
- Spinner sederhana.
- Status text pendek.
- Setelah asset home siap, dashboard shell muncul.
- Tidak memblokir terlalu lama.
- Jika asset lambat, lanjut dengan timeout aman.

Copy options:

- `Setting up dashboard`
- `Loading workspace`
- `Preparing projects`
- `Opening interface`

Final copy style:

- Minimal.
- Dashboard setup.
- Tidak cinematic berlebihan.
- Tidak terminal-heavy.

## 9. Navigation

Sidebar:

- Persistent di desktop.
- Collapsible.
- Icon-only mode.
- Active route state.
- Theme toggle di bottom.
- Collapse button di bottom.
- Admin Panel button hanya muncul jika admin login nanti.

Mobile:

- Sidebar jadi drawer.
- Top bar berisi menu trigger, brand, command trigger.
- Tidak ada permanent sidebar di mobile.

Routing:

- Multi-page.
- Bukan one-page scroll.
- Page transition subtle.
- Sidebar tetap.

## 10. Theme

Default:

- Light theme.

Theme support:

- Light.
- Dark.

Toggle:

- Sidebar bottom.

Persistence:

- Simpan ke `localStorage`.

Rules:

- Hindari flash theme saat initial load.
- Light mengikuti `guide/DESIGN.md`.
- Dark dibuat manual, bukan invert otomatis.
- Accent color hemat.
- No generic gradient spam.

## 11. Command Menu

Shortcut:

- `Ctrl + K`.

Fungsi MVP:

- Search pages.
- Search projects.
- Search skills.
- Contact actions.

Actions:

- Go to Home.
- Go to Projects.
- Go to Journey.
- Go to Stack.
- Go to Contact.
- Open project.
- Copy email.
- Open WhatsApp.
- Download CV.

Performance:

- Lazy load saat shortcut pertama.
- Search index kecil dari static data.

## 12. Project Card Interaction

Default:

- Poster image.
- Title.
- Short description.
- Stack chips.
- Status badge.
- Type/paid label.
- CTA preview.
- CTA case study.

Hover desktop:

- Reveal extra metadata.
- Lazy attach video source.
- Autoplay muted video.
- Smooth image/video transition.

Mobile:

- No hover dependency.
- Tap opens quick preview.
- Video does not autoplay aggressively.

Video rules:

- `preload="none"`.
- Poster first.
- Source only loaded on demand.
- Respect `prefers-reduced-motion`.

## 13. Quick Preview Modal

MVP behavior:

- Uses screenshot/poster carousel.
- Does not use iframe.
- Shows title, summary, stack, links.
- CTA to full case study.

Reason:

- Iframe preview heavier.
- Screenshot preview faster.
- Better mobile performance.

## 14. Data Strategy

MVP:

- Static mock data.
- Placeholder designed media.
- No database.
- No CMS yet.

Mock data should mirror future CMS shape.

Project fields:

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

## 15. Phase 2 CMS

Scope:

- Project-only admin CMS first.

Features:

- Admin login.
- Project CRUD.
- Upload/manage cover image.
- Upload/manage preview video.
- Edit case study fields.
- Manage stack/tags.
- Publish/draft toggle.
- Featured toggle.

Auth:

- Google login.
- Admin email allowlist.

Admin button:

- Hidden for visitors.
- Visible after admin login.

## 16. Phase 2 Comments

Scope:

- Project comments.

Features:

- Google login.
- Comment per project.
- Admin moderation.
- Hide/delete comments.
- Basic anti-spam.

Default moderation:

- Pending approval first.

## 17. Performance Requirements

Hard rules:

- Optimized code by default.
- Server components by default.
- Client components only for interactive islands.
- No full-page `"use client"`.
- No heavy animation libraries unless needed.
- No video preload on initial page.
- No loading all project media upfront.
- No one massive component file.

Images:

- Use optimized image rendering.
- Explicit width/height.
- Lazy load non-critical images.
- Preload only home-critical images during intro.

Animations:

- Use transform and opacity.
- Avoid layout-heavy animation.
- Respect `prefers-reduced-motion`.

JavaScript:

- Keep initial JS small.
- Lazy load command menu.
- Lazy load modal logic.
- Lazy load video only on interaction.

Mobile:

- Must work well on low-end devices.
- No hover-only required UX.
- Touch targets large enough.
- Layout avoids horizontal overflow.

## 18. UI Quality Rules

No AI slop.

Avoid:

- Generic glassmorphism.
- Random gradients everywhere.
- Same card layout repeated without reason.
- Vague copy like “I craft digital experiences”.
- Decorative animation with no function.
- Overcrowded dashboard widgets.
- Fake analytics that mean nothing.

Require:

- Clear hierarchy.
- Consistent spacing.
- Intentional cards.
- Functional animation.
- Human copy.
- Balanced white space.
- Strong but restrained accents.
- Proof-oriented project content.

## 19. MVP Scope

Included:

- Home dashboard.
- Persistent collapsible sidebar.
- Light/dark theme.
- Spinner preloader.
- Project grid.
- Smart filters.
- Project cards with poster-first hover video.
- Project detail case study.
- Journey page.
- Stack tech radar.
- Contact page.
- Command menu.
- Static mock data.
- Placeholder designed media.
- Responsive layout.

Not included:

- CMS implementation.
- Database.
- Google auth.
- Comments backend.
- Admin dashboard.
- Theme accent picker.
- Easter egg / terminal mode.
- Blog.
- Analytics dashboard.

## 20. Acceptance Criteria

General:

- Site feels like dashboard app, not landing page.
- Sidebar remains persistent on desktop.
- Mobile navigation works through drawer.
- Light theme is default.
- Dark theme works and persists.
- Pages are separate routes.

Home:

- Intro preloader appears.
- Preloader has setup-dashboard copy.
- Home images are prepared before dashboard reveal.
- Dashboard shows stats, featured projects, availability, journey preview.

Projects:

- Filters work.
- Cards show proof metadata.
- Hover video does not load before interaction.
- Mobile can preview without hover.

Project Detail:

- Case study follows problem → process → solution → result.
- Metadata visible.
- Links clear.

Stack:

- Tech radar uses Core, Comfortable, Learning, Exploring.
- Selecting tech shows detail.

Contact:

- Contact actions are visible.
- Availability is clear.

Performance:

- No unnecessary client-side rendering.
- No upfront video preload.
- No obvious layout shift.
- UI remains smooth on mobile.

## 21. Open Content Placeholders

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
