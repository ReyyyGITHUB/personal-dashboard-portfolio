# PROJECT BRIEF — Personal Dashboard Portfolio

## Project Name

Personal Dashboard Portfolio.

## One-Liner

A lightweight multi-page portfolio with a personal dashboard OS feel.

## What We Are Building

Portfolio berbasis Next.js yang terasa seperti app/dashboard, bukan landing page panjang.

Core experience:

- Persistent collapsible sidebar di desktop.
- Mobile drawer di small devices.
- Home dashboard sebagai overview.
- Projects sebagai proof utama.
- Project detail sebagai lightweight case study.
- Journey untuk personality dan current focus.
- Stack radar untuk skill map.
- Contact page untuk conversion.

## Why This Exists

Portfolio ini bukan cuma UI cantik.

Tujuannya:

- Bikin visitor cepat paham skill owner.
- Bikin project terlihat credible lewat proof dan case study.
- Bikin personality terasa tanpa jadi blog panjang.
- Bikin interaction cukup memorable.
- Tetap ringan untuk all devices.

Fokus utama:

- Proof.
- Personality.
- Interaction.

## Product Principles

- Proof-first content: project harus punya context, stack, role, dan result.
- Human personality: copy natural, direct, bukan generic AI portfolio text.
- Meaningful interaction: animasi dan hover harus punya fungsi.
- Optimized code: performance default, bukan bonus.
- No AI slop: hindari random gradient, fake analytics, glassmorphism berlebihan, dan card filler.
- Dashboard clarity: layout mudah discan, bukan visual chaos.

## UX Direction

Model UX: multi-page app shell.

Rules:

- No one-page scroll portfolio.
- Sidebar tetap jadi pusat navigasi desktop.
- Mobile pakai drawer.
- Route berubah di content area.
- `Ctrl + K` command menu untuk search dan quick actions.
- Page transition boleh ada, tapi subtle.
- Hover interaction tidak boleh jadi satu-satunya cara akses fitur di mobile.

Main routes:

- `/` — Home Dashboard.
- `/projects` — Project Grid.
- `/projects/[slug]` — Project Case Study.
- `/journey` — Timeline + Now.
- `/stack` — Tech Radar.
- `/contact` — Contact CTA.

## Visual Direction

Base style:

- Light theme default.
- Dark mode supported.
- Clean playful dashboard.
- Rounded cards.
- Strong spacing.
- Subtle borders.
- Restrained accent colors.

Reference:

- `guide/DESIGN.md`
- `guide/CSSVARIABLE.md`
- `guide/TAILWINDV4.md`

Avoid:

- Generic SaaS template feel.
- Too many gradients.
- Unnecessary blur/glass effects.
- Repeated identical cards.
- Overcrowded widgets.

## Performance Philosophy

Performance wajib dijaga sejak awal.

Rules:

- Server Components by default.
- Client Components only for interactive islands.
- No full-page `"use client"` unless absolutely necessary.
- Keep initial JavaScript small.
- Lazy-load command menu.
- Lazy-load modal behavior.
- Poster-first media.
- Video preview only loads on interaction.
- Use `preload="none"` for preview videos.
- Preload only home-critical images during intro.
- Respect `prefers-reduced-motion`.
- Optimize for mobile and low-end devices.

## MVP Summary

MVP fokus ke public UI first.

Included:

- App shell with persistent sidebar.
- Mobile drawer.
- Light/dark theme.
- Spinner intro preloader.
- Home dashboard.
- Project grid with filters.
- Project cards with poster-first hover video.
- Quick preview modal.
- Project detail case study.
- Journey page.
- Stack radar page.
- Contact page.
- Contact form prototype UI only.
- `Ctrl + K` command menu.
- Static mock data.
- Placeholder designed media.

## Not MVP

Tidak masuk MVP pertama:

- Database integration.
- CMS implementation.
- Google auth.
- Comments backend.
- Real contact form submission.
- Admin dashboard.
- Blog.
- Theme accent picker.
- Terminal/easter egg mode.
- Analytics dashboard.

## Long-Term Vision

Setelah public UI solid:

- Add Supabase database.
- Add project-only CMS first.
- Add admin login with Google allowlist.
- Add project CRUD.
- Add media upload after storage validation.
- Add project comments with Google login.
- Add moderation flow.
- Add richer content system when needed.

Long-term rule: tambah fitur hanya kalau memperkuat proof, personality, atau interaction.

## Related Docs

- `guide/PRD.md` — detailed product requirements.
- `guide/DECISIONS.md` — locked decisions.
- `guide/ARCHITECTURE.md` — technical architecture.
- `guide/TO-DO-LIST.md` — execution checklist.
- `guide/DESIGN.md` — visual style reference.
- `guide/CSSVARIABLE.md` — CSS token reference.
- `guide/TAILWINDV4.md` — Tailwind v4 token reference.
