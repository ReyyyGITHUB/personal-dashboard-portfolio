# FIGMA PROMPTS — Personal Dashboard Portfolio

Gunakan prompt ini untuk AI Figma/design generator. Tujuan: desain high-fidelity yang konsisten dengan `guide/PROJECT-BRIEF.md`, `guide/PRD.md`, `guide/DECISIONS.md`, `guide/ARCHITECTURE.md`, dan `guide/DESIGN.md`.

## Master Prompt

```txt
Buat desain website “Personal Dashboard Portfolio” dengan konsep personal dashboard OS.

Konteks produk:
Website ini adalah portfolio multi-page berbasis dashboard, bukan one-page scrolling portfolio. Fokus utama: proof, personality, interaction. Visitor harus merasa seperti masuk ke dashboard personal yang hidup, ringan, rapi, dan credible.

Style visual:
- Light theme default.
- Dark mode supported.
- Clean, playful, dashboard-like.
- Terinspirasi design system Clay: bright, friendly, rounded, spacious, subtle borders.
- Gunakan card, stat widget, sidebar, badges, chips, dan panel dashboard.
- Gunakan warna aksen hemat: blue/violet/orange/lime hanya untuk emphasis.
- Background utama putih/off-white.
- Border subtle.
- Radius besar: 12–40px.
- Typography clean geometric, bold hierarchy.
- Jangan AI slop.
- Jangan random gradient berlebihan.
- Jangan generic glassmorphism.
- Jangan fake analytics yang tidak bermakna.
- Jangan layout landing page biasa.

UX structure:
- Desktop memakai persistent collapsible sidebar.
- Mobile memakai drawer navigation.
- Ada top utility bar dengan page title, status, dan command menu trigger.
- Route utama:
  - Home Dashboard
  - Projects
  - Project Detail
  - Journey
  - Stack
  - Contact
- Command menu menggunakan shortcut Ctrl+K.
- Semua interaksi harus terasa ringan dan fungsional.
- Desain harus mudah diimplementasi di Next.js dan Tailwind.
- Prioritaskan performance: jangan desain yang butuh animasi berat.

Content tone:
Gunakan bahasa campuran Indonesia + technical English. Copy harus direct, human, proof-oriented. Hindari copy generic seperti “I craft digital experiences”.

Output yang diminta:
Buat high-fidelity UI screen untuk desktop 1440px width. Gunakan reusable design system components. Pastikan spacing konsisten dan layout terasa seperti dashboard app.
```

## Screen 1 — Intro Preloader

```txt
Buat screen intro preloader untuk Personal Dashboard Portfolio.

Tujuan screen:
Preloader bukan gimmick. Fungsinya memberi feel “setup dashboard” sambil preload home-critical images.

Layout:
- Fullscreen.
- Background light off-white.
- Center content.
- Simple spinner atau loading ring.
- Status text pendek.
- Small progress indicator atau subtle dots.
- Tidak perlu ilustrasi besar.

Copy:
- Main text: “Setting up dashboard”
- Rotating/support text:
  - “Loading workspace”
  - “Preparing projects”
  - “Opening interface”
- Microcopy kecil: “Optimizing the view for your device”

Visual:
- Minimal.
- Dashboard setup feel.
- Rounded small panel/card di tengah.
- Border subtle.
- Accent kecil biru/violet.
- Jangan terminal-heavy.
- Jangan cinematic berlebihan.
- Jangan loading screen gelap gaming style.

Dark mode variant:
- Background dark neutral.
- Spinner tetap subtle.
- Text contrast jelas.
```

## Screen 2 — Home Dashboard

```txt
Buat screen Home Dashboard untuk Personal Dashboard Portfolio.

Tujuan:
Visitor harus paham value owner dalam kurang dari 30 detik.

Layout desktop:
- Persistent sidebar di kiri.
- Sidebar width sekitar 260px saat expanded.
- Main content di kanan.
- Top utility bar berisi page title “Home”, command trigger “Ctrl K”, dan availability small status.
- Content memakai dashboard grid.

Sidebar:
- Brand/logo kecil: “Portfolio OS”
- User identity: “Rayhan”
- Nav items:
  - Home
  - Projects
  - Journey
  - Stack
  - Contact
- Bottom:
  - Theme toggle
  - Collapse button
- Active item jelas tapi tidak norak.

Main sections:
1. Hero identity card
   - Name placeholder: “Rayhan”
   - Role: “Frontend Developer / Creative Builder”
   - Tagline direct: “Building fast, useful, and human-friendly web interfaces.”
   - CTA: “View Projects”, “Contact”
2. Availability card
   - Status: “Available for selected work”
   - Timezone: “Asia/Jakarta”
   - Response: “Usually replies within 24h”
3. Stats row
   - Projects
   - Experience
   - Tech Stack
   - Availability
4. Featured projects
   - 3 project cards
   - Poster image placeholder
   - Status badge
   - Stack chips
   - Preview action
5. Now / Current Focus
   - Currently building
   - Currently learning
6. Journey preview
   - 2–3 timeline snippets.

Visual:
- Light default.
- White/off-white background.
- Cards rounded 16–32px.
- Subtle borders.
- Sparse accent colors.
- No fake chart overload.
- Dashboard feel, not landing page hero.
- Human copy, no AI-generic tagline.
```

## Screen 3 — Projects Grid

```txt
Buat screen Projects Grid untuk Personal Dashboard Portfolio.

Tujuan:
Projects page adalah proof utama. Harus mudah scan, filter, dan preview.

Layout:
- Persistent sidebar kiri.
- Top bar: title “Projects”, command trigger “Ctrl K”.
- Main content:
  - Header compact.
  - Search input.
  - Filter chips.
  - Project grid.

Filters:
- All
- Featured
- Client
- Personal
- Paid
- Experiment
- Next.js
- Dashboard
- 2026

Project card:
- Poster image besar.
- Hover video area indication, tapi default tampil sebagai static poster.
- Title.
- Short proof-based description.
- Status badge: Live / In Progress / Archived.
- Type/payment label: Client / Personal / Confidential.
- Stack chips: Next.js, Tailwind, TypeScript.
- Buttons:
  - Preview
  - Case Study

Interaction states to show:
- Normal card.
- Hover card with metadata reveal.
- Selected/preview-ready card.

Visual:
- Grid 3 columns desktop.
- Cards jangan identik semua; variasikan accent strip/badge warna secara halus.
- Jangan terlalu banyak gradient.
- Jangan masonry chaos.
- Clear hierarchy.
- Empty state kecil opsional: “No projects match this filter.”
```

## Screen 4 — Project Quick Preview Modal

```txt
Buat modal Quick Preview untuk project.

Tujuan:
User bisa lihat ringkasan project tanpa pindah page.

Layout:
- Overlay ringan.
- Center modal besar.
- Rounded 24–32px.
- Left side: screenshot/poster carousel.
- Right side: project summary.

Content:
- Project title.
- Short summary.
- Year.
- Type.
- Status.
- Stack chips.
- Small result/proof line.
- Links/actions:
  - Open Case Study
  - Live Demo
  - Repository
- Close button.

Important:
- Jangan pakai iframe preview.
- Desain harus terasa ringan.
- Modal harus accessible: close button jelas, overlay tidak terlalu gelap.
- Mobile variant bisa jadi bottom sheet.

Visual:
- Light theme.
- Subtle border.
- No glassmorphism berlebihan.
```

## Screen 5 — Project Detail Case Study

```txt
Buat screen Project Detail Case Study.

Tujuan:
Membuat visitor percaya lewat problem → process → solution → result.

Layout:
- Persistent sidebar kiri.
- Top bar: breadcrumb “Projects / Project Name”, command trigger.
- Main content wide, structured.

Sections:
1. Header
   - Project title.
   - Short summary.
   - CTA: Live Demo, Repository, Preview.
2. Meta panel
   - Year
   - Role
   - Type
   - Status
   - Stack
3. Cover/gallery
   - Large screenshot area.
   - Small thumbnails.
4. Case study cards
   - Problem
   - Process
   - Solution
   - Result
5. Proof/result block
   - Outcome, lesson, impact.
6. Related projects
   - 2 small cards.
7. Comments placeholder Phase 2
   - Small disabled/preview section: “Project comments coming later with Google login.”

Visual:
- Case study tetap ringkas, bukan artikel panjang.
- Gunakan cards dan section blocks.
- Layout readable.
- Proof-oriented.
- Avoid excessive decoration.
```

## Screen 6 — Journey

```txt
Buat screen Journey untuk Personal Dashboard Portfolio.

Tujuan:
Menampilkan personality, progress, dan current focus tanpa jadi blog panjang.

Layout:
- Persistent sidebar kiri.
- Top bar title “Journey”.
- Main grid.

Sections:
1. Now card
   - “Currently building”
   - “Currently learning”
   - “Current focus”
2. Timeline
   - Vertical timeline.
   - 2026, 2025, 2024 milestones.
   - Each milestone punya title, short context, optional related project chip.
3. Learning notes
   - Small cards berisi skill/insight singkat.
4. Personality note
   - Direct personal note, tidak terlalu formal.

Visual:
- Timeline harus clean.
- Jangan terlalu corporate.
- Gunakan accent dot warna hemat.
- Banyak whitespace.
- Copy human dan specific.
```

## Screen 7 — Stack / Tech Radar

```txt
Buat screen Stack dengan UI Tech Radar orbit.

Tujuan:
Skill map yang lebih menarik dari sekadar logo list.

Layout:
- Persistent sidebar kiri.
- Top bar title “Stack”.
- Main content 2 kolom desktop:
  - Kiri: orbit tech radar.
  - Kanan: selected tech detail.

Tech radar zones:
- Core
- Comfortable
- Learning
- Exploring

Isi contoh:
- Core: Next.js, React, TypeScript
- Comfortable: Tailwind, Prisma, Supabase
- Learning: Motion, AI SDK, Astro
- Exploring: Three.js, WebGL, Automation

Selected tech detail:
- Tech name.
- Confidence level.
- Used for.
- Related projects.
- Small notes.

Mobile behavior:
- Orbit boleh berubah jadi grouped cards/list.
- Jangan memaksakan orbit kalau sempit.

Visual:
- Orbit harus readable, bukan diagram rumit.
- Gunakan rounded orbit panels/cards.
- Accent dots/chips.
- Hindari logo dump.
- Tidak perlu chart kompleks.
```

## Screen 8 — Contact

```txt
Buat screen Contact untuk Personal Dashboard Portfolio.

Tujuan:
Conversion page. Visitor bisa langsung menghubungi owner.

Layout:
- Persistent sidebar kiri.
- Top bar title “Contact”.
- Main content 2 kolom desktop.

Left:
- Big CTA card:
  - “Let’s build something useful.”
  - Short direct copy.
  - Buttons:
    - Email
    - WhatsApp
    - LinkedIn
    - Download CV
- Availability summary:
  - Available / selected work
  - Timezone Asia/Jakarta
  - Response expectation

Right:
- Contact form prototype UI only.
- Fields:
  - Name
  - Email
  - Project type
  - Message
- Button: “Preview message”
- Small note: “Prototype form — direct contact links are recommended for now.”

Important:
- Form tidak boleh terlihat seperti sudah punya backend.
- Jangan tampilkan fake success state.
- CTA links harus lebih dominan dari form.

Visual:
- Clean, warm, direct.
- Tidak terlalu salesy.
- No huge generic illustration.
```

## Screen 9 — Command Menu

```txt
Buat UI Command Menu untuk Personal Dashboard Portfolio.

Tujuan:
Quick navigation dan search. Shortcut Ctrl+K.

Layout:
- Center overlay modal.
- Width sekitar 640px desktop.
- Search input di atas.
- Grouped results.

Groups:
1. Pages
   - Home
   - Projects
   - Journey
   - Stack
   - Contact
2. Projects
   - Portfolio OS
   - Dashboard UI
   - Client Work Example
3. Skills
   - Next.js
   - Tailwind
   - TypeScript
4. Actions
   - Copy email
   - Open WhatsApp
   - Download CV

States:
- Empty search.
- Search results.
- Highlighted selected item.
- Keyboard hint.

Visual:
- Light theme default.
- Rounded modal.
- Subtle shadow.
- No heavy blur.
- Results compact and readable.
```

## Screen 10 — Mobile App Shell

```txt
Buat mobile version untuk Personal Dashboard Portfolio.

Viewport:
- 390px width.

Layout:
- No permanent sidebar.
- Top bar:
  - Menu icon
  - Brand “Portfolio OS”
  - Ctrl+K icon/search trigger
- Drawer navigation state:
  - Home
  - Projects
  - Journey
  - Stack
  - Contact
  - Theme toggle
- Content adapts to single column.

Show mobile Home Dashboard:
- Hero card.
- Availability card.
- Stats grid 2 columns.
- Featured project horizontal cards or single column.
- Now card.
- Contact CTA.

Rules:
- Touch targets besar.
- No hover-only UI.
- Video preview via tap, not autoplay hover.
- No horizontal overflow.
- Cards tetap ringan.
```

## Global Negative Prompt

```txt
Jangan buat:
- One-page landing page.
- Generic portfolio template.
- Full glassmorphism dashboard.
- Random neon gradient background.
- Fake analytics chart yang tidak relevan.
- Layout terlalu ramai.
- Semua cards identik.
- Copywriting AI-generic.
- Heavy 3D visuals.
- Desktop-only interaction.
- Mobile sidebar permanen yang sempit.
- Iframe live preview.
```

## Design Token Reminder

```txt
Gunakan arah token ini:
- Background: white / off-white.
- Text: pitch black / dark neutral.
- Border: light gray / warm oatmeal.
- Accent utama: blue/violet.
- Accent sekunder hemat: orange, lime, sky blue.
- Radius: 12px, 16px, 24px, 32px, 40px.
- Shadow: subtle only.
- Typography: geometric sans, clean, bold hierarchy.
```
