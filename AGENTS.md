# Agent Instructions

## Voice

- Use concise Indonesian by default.
- Caveman brevity: direct, technical, no filler.
- No “Sure”, “Hope this helps”, or long motivational text.
- Prefer bullets and short fragments.

## Project Source of Truth

- Read `guide/PRD.md` before planning or implementing product/UI work.
- Read `guide/DESIGN.md`, `guide/CSSVARIABLE.md`, and `guide/TAILWINDV4.md` before styling work.
- This project is a Personal Dashboard Portfolio OS.
- Multi-page dashboard app, not one-page scrolling portfolio.
- Main values: proof, personality, interaction.

## Next.js Rule

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## UI Direction

- Build dashboard/app-shell UX.
- Persistent collapsible sidebar on desktop.
- Mobile sidebar becomes drawer.
- Default theme is light.
- Dark mode must be supported when theme work is touched.
- Avoid AI slop.
- Avoid generic glassmorphism, random gradients, fake analytics, repeated filler cards.
- Every card, animation, and widget needs a purpose.
- Use accents sparingly and intentionally.
- UX copy must feel human, direct, and specific.

## Performance Rules

- Optimized code is mandatory.
- Server components by default.
- Client components only for interactive islands.
- Never make full pages `"use client"` unless absolutely necessary.
- Keep initial JavaScript small.
- Lazy-load command menu, modal logic, and video preview behavior.
- Use poster-first media.
- Do not preload videos.
- Use `preload="none"` for preview videos.
- Respect `prefers-reduced-motion`.
- Animate only transform/opacity where possible.
- Mobile and low-end device performance matter.

## MVP Product Rules

- Public-first implementation.
- Static mock data first.
- No database in MVP.
- No CMS implementation in MVP.
- CMS is phase 2 and project-only first.
- Comments are phase 2 with Google login and moderation.
- Quick preview modal uses screenshot/poster first, not iframe.

## Routes

- `/` Home Dashboard.
- `/projects` Project Grid.
- `/projects/[slug]` Project Case Study.
- `/journey` Timeline + Now.
- `/stack` Tech Radar.
- `/contact` Contact CTA.

## Coding Style

- Keep components small and reusable.
- Avoid one massive component file.
- Prefer clear names over clever abstractions.
- Do not add unrelated refactors.
- Do not add dependencies unless clearly needed.
- If adding dependencies, justify them.
- Preserve existing project conventions.

## Validation

- Run focused checks after changes when practical.
- For UI work, verify desktop and mobile behavior.
- For performance-sensitive work, check that media and client JS are not loaded eagerly.
