# TO-DO-LIST — Dashboard Portfolio

## Agent Rules

- [ ] Read `AGENTS.md`.
- [ ] Read `guide/PRD.md`.
- [ ] Read `guide/DESIGN.md`.
- [ ] Read relevant Next.js docs in `node_modules/next/dist/docs/` before using unfamiliar Next.js 16 APIs.
- [ ] Keep implementation mobile-first.
- [ ] Use Server Components by default.
- [ ] Use Client Components only for interactive UI.
- [ ] Avoid heavy libraries unless required.
- [ ] Keep comments feature optional until confirmed.
- [ ] Run `npm run lint` and `npm run build` before final handoff when code changes are made.

## Status Legend

- `[ ]` Not started
- `[~]` In progress
- `[x]` Done
- `[!]` Blocked
- `[-]` Skipped

## Phase 0 — Product Alignment

- [ ] Confirm primary portfolio target: recruiter, client, or personal branding.
- [ ] Confirm public dashboard direction: SaaS admin, analytics dashboard, or playful card board.
- [ ] Confirm project detail style: short gallery or long case study.
- [ ] Confirm comments timing: MVP or phase 2.
- [ ] Confirm content editor: simple textarea, markdown, MDX, or rich editor.
- [ ] Confirm required reference websites if any.

## Phase 1 — Static Visual Foundation

- [ ] Implement design tokens from `guide/DESIGN.md`.
- [ ] Configure Tailwind CSS v4 theme variables.
- [ ] Set global light theme background.
- [ ] Set base text, border, radius, and shadow styles.
- [ ] Set typography scale based on design guide.
- [ ] Create responsive page container.
- [ ] Create dashboard shell layout feel.
- [ ] Create reusable UI primitives.

### UI Primitives

- [ ] Button.
- [ ] Card.
- [ ] Badge.
- [ ] Section header.
- [ ] Stat widget.
- [ ] Project card.
- [ ] Link card.
- [ ] Empty state.
- [ ] Loading state.

## Phase 2 — Mock Data Foundation

- [ ] Define `Project` TypeScript type.
- [ ] Define `User` TypeScript type.
- [ ] Define `Comment` TypeScript type.
- [ ] Create mock projects dataset.
- [ ] Create mock profile/about data.
- [ ] Create mock dashboard stats.
- [ ] Create mock now/current activity data.
- [ ] Create project helper functions.

### Project Fields

- [ ] `id`.
- [ ] `title`.
- [ ] `slug`.
- [ ] `excerpt`.
- [ ] `description`.
- [ ] `coverImage`.
- [ ] `galleryImages`.
- [ ] `category`.
- [ ] `type`.
- [ ] `status`.
- [ ] `paymentStatus`.
- [ ] `isFeatured`.
- [ ] `techStack`.
- [ ] `tags`.
- [ ] `role`.
- [ ] `clientName`.
- [ ] `startedAt`.
- [ ] `finishedAt`.
- [ ] `liveUrl`.
- [ ] `repoUrl`.
- [ ] `figmaUrl`.
- [ ] `caseStudyUrl`.
- [ ] `metrics`.
- [ ] `sortOrder`.
- [ ] `publishedAt`.
- [ ] `createdAt`.
- [ ] `updatedAt`.

### Project Helpers

- [ ] Get all published projects.
- [ ] Get featured projects.
- [ ] Get project by slug.
- [ ] Filter by category.
- [ ] Filter by stack.
- [ ] Filter by status.
- [ ] Filter by paid/unpaid/confidential.
- [ ] Search project title/excerpt/tags.
- [ ] Sort by newest.
- [ ] Sort by featured.
- [ ] Sort by paid.
- [ ] Sort by complexity.

## Phase 3 — Public Website

### Home Dashboard `/`

- [ ] Build hero section with name, role, tagline, CTA.
- [ ] Build snapshot stats: projects, experience, stack, availability.
- [ ] Build featured projects section.
- [ ] Build latest activity/update section.
- [ ] Build quick links: GitHub, LinkedIn, email, CV, WhatsApp.
- [ ] Add small `Now` widget linking context to `/about`.
- [ ] Ensure visitor understands owner skill under 30 seconds.
- [ ] Ensure dashboard-like card layout.

### Projects Index `/projects`

- [ ] Build project grid/list page.
- [ ] Build responsive project cards.
- [ ] Add category filter.
- [ ] Add stack filter.
- [ ] Add status filter.
- [ ] Add paid/unpaid/confidential filter.
- [ ] Add project search.
- [ ] Add sort by newest.
- [ ] Add sort by featured.
- [ ] Add sort by paid.
- [ ] Add sort by complexity.
- [ ] Add empty state.
- [ ] Keep filter UI lightweight.

### Project Detail `/projects/[slug]`

- [ ] Build dynamic project detail route.
- [ ] Add title.
- [ ] Add short description.
- [ ] Add long description/case study.
- [ ] Add cover image.
- [ ] Add gallery images.
- [ ] Add tech stack badges.
- [ ] Add role/contribution.
- [ ] Add status badge: draft, live, archived.
- [ ] Add project type badge: client, personal, school, experiment.
- [ ] Add payment badge: paid, unpaid, confidential.
- [ ] Add timeline/date.
- [ ] Add links: live demo, GitHub, Figma, case study.
- [ ] Add metrics/result block.
- [ ] Add tags.
- [ ] Add related projects.

### About `/about`

- [ ] Build bio section.
- [ ] Build `Now` section inside About.
- [ ] Build skill matrix.
- [ ] Build tools used section.
- [ ] Build work principles section.
- [ ] Build timeline/experience section.
- [ ] Add CTA to projects/contact.

### Contact `/contact`

- [ ] Build contact CTA.
- [ ] Add email link.
- [ ] Add social links.
- [ ] Add CV link.
- [ ] Add optional contact form placeholder only if confirmed.

## Phase 4 — CMS Planning

- [ ] Decide CMS style: custom admin dashboard or external CMS.
- [ ] Decide database provider: Neon, Supabase, or Vercel Postgres.
- [ ] Decide ORM: Prisma or Drizzle.
- [ ] Decide image storage: Vercel Blob, Cloudinary, or Supabase Storage.
- [ ] Decide auth approach: Google allowlist or simple secret login first.
- [ ] Decide editor approach: markdown textarea, MDX, or rich text editor.

## Phase 5 — Data Layer

- [ ] Add database schema after provider decision.
- [ ] Add `Project` model.
- [ ] Add `User` model.
- [ ] Add `Comment` model only if comments enabled.
- [ ] Add seed data from mock projects.
- [ ] Replace mock project list with database query.
- [ ] Replace mock project detail with database query.
- [ ] Keep tags/tech stack as JSON array for MVP unless complex filters require tables.

## Phase 6 — Admin CMS

### Admin Dashboard `/admin`

- [ ] Create admin layout.
- [ ] Create admin navigation.
- [ ] Show total projects.
- [ ] Show published count.
- [ ] Show draft count.
- [ ] Show featured count.
- [ ] Show comments count only if comments enabled.
- [ ] Add quick create project action.

### Project Management `/admin/projects`

- [ ] Build project list table/cards.
- [ ] Add create project page `/admin/projects/new`.
- [ ] Add edit project page `/admin/projects/[id]`.
- [ ] Add project create action.
- [ ] Add project update action.
- [ ] Add project delete/archive action.
- [ ] Add publish/draft toggle.
- [ ] Add featured toggle.
- [ ] Add paid/unpaid/confidential selector.
- [ ] Add category, stack, and tag management.
- [ ] Add reorder featured projects.
- [ ] Add validation.
- [ ] Add loading states.
- [ ] Add error states.

### Image Management

- [ ] Add cover image field.
- [ ] Add gallery image fields.
- [ ] Add image upload only after storage decision.
- [ ] Add image preview.
- [ ] Add image remove action.
- [ ] Validate file type.
- [ ] Validate file size.

## Phase 7 — Auth

- [ ] Add admin-only login.
- [ ] Add Google provider if selected.
- [ ] Add admin email allowlist if Google auth selected.
- [ ] Protect `/admin` routes.
- [ ] Add login page `/login`.
- [ ] Add logout action.
- [ ] Handle unauthorized access.
- [ ] Verify admin cannot be accessed publicly.

## Phase 8 — Optional Comments

- [ ] Confirm comments are included.
- [ ] Add visitor Google login.
- [ ] Store user name, email, and avatar.
- [ ] Add comment form on project detail.
- [ ] Add comment list on project detail.
- [ ] Add comment status: visible, hidden, deleted, pending.
- [ ] Add admin moderation.
- [ ] Add delete/hide comment action.
- [ ] Add basic anti-spam rate limit.
- [ ] Do not add nested replies for MVP.

## Phase 9 — SEO & Polish

- [ ] Add default metadata.
- [ ] Add homepage metadata.
- [ ] Add project detail metadata.
- [ ] Add Open Graph image strategy.
- [ ] Add sitemap.
- [ ] Add robots.txt.
- [ ] Add canonical URLs.
- [ ] Add loading states.
- [ ] Add error states.
- [ ] Add not-found page.
- [ ] Add mobile polish.
- [ ] Add analytics only after provider decision.

## Phase 10 — Performance

- [ ] Use `next/image` for project images.
- [ ] Define image sizes to avoid layout shift.
- [ ] Lazy-load gallery images.
- [ ] Lazy-load interactive components where possible.
- [ ] Keep command/search/filter components small.
- [ ] Avoid unnecessary Client Components.
- [ ] Add pagination if project count grows.
- [ ] Check mobile layout performance.
- [ ] Check Core Web Vitals.
- [ ] Target Lighthouse performance `90+`.

## Phase 11 — QA

- [ ] Run `npm run lint`.
- [ ] Run `npm run build`.
- [ ] Test homepage.
- [ ] Test projects index.
- [ ] Test project filters.
- [ ] Test project search.
- [ ] Test project detail.
- [ ] Test About page.
- [ ] Test Contact page.
- [ ] Test admin dashboard.
- [ ] Test project CRUD.
- [ ] Test auth redirects.
- [ ] Test image fallback.
- [ ] Test empty project list.
- [ ] Test long project title.
- [ ] Test many tags.
- [ ] Test broken external links.
- [ ] Test keyboard navigation.
- [ ] Test reduced motion.
- [ ] Test mobile, tablet, desktop.

## Phase 12 — Deployment

- [ ] Prepare `.env.example`.
- [ ] Configure production environment variables.
- [ ] Deploy to Vercel.
- [ ] Verify production build.
- [ ] Test admin auth in production.
- [ ] Test image storage in production.
- [ ] Test Google OAuth callback if enabled.
- [ ] Add custom domain if needed.

## Backlog

- [ ] Command menu `Ctrl + K`.
- [ ] Project quick preview modal.
- [ ] Theme accent picker.
- [ ] Blog/articles.
- [ ] Testimonials CMS.
- [ ] Guestbook.
- [ ] Terminal mode easter egg.
- [ ] GitHub contribution sync.
- [ ] Auto-generated Open Graph image.
- [ ] Public analytics dashboard.
- [ ] Resume/CV builder.
