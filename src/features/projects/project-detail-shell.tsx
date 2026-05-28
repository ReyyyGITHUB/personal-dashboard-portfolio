"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ProjectDescription } from "@/features/projects/project-description";
import type { Project } from "@/types/portfolio";
import { focusRing } from "@/lib/ui";

export function ProjectDetailShell({ project, relatedProjects }: { project: Project; relatedProjects: Project[] }) {
  const [isTheater, setIsTheater] = useState(false);

  return (
    <div className="mx-auto w-full max-w-[1440px] px-4 py-4 sm:px-6 lg:px-8 lg:py-7 xl:px-10">
      <Link href="/projects" className={`mb-4 inline-flex rounded-full border border-dashboard-outline-variant bg-dashboard-surface-lowest px-4 py-2 text-sm font-bold text-dashboard-on-surface-variant shadow-subtle ${focusRing}`}>
        ← Projects
      </Link>

      {isTheater ? (
        <section className="mb-6 rounded-[2.25rem] bg-[radial-gradient(circle_at_top_left,rgba(203,216,16,0.22),transparent_34%),#000] p-3 shadow-subtle ring-1 ring-dashboard-outline-variant sm:p-4 lg:p-5">
          <ProjectPreviewPlayer project={project} isTheater={isTheater} onToggleTheater={() => setIsTheater(false)} />
        </section>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
        <main className="min-w-0 space-y-5">
          {!isTheater ? <ProjectPreviewPlayer project={project} isTheater={isTheater} onToggleTheater={() => setIsTheater(true)} /> : null}
          <ProjectInfo project={project} />
          <ProjectDescription project={project} />
          <MorePortfolioMobile relatedProjects={relatedProjects} />
          <CommentsPlaceholder />
        </main>

        <aside className="hidden space-y-3 lg:sticky lg:top-6 lg:block">
          <RelatedHeader />
          <div className="space-y-3">
            {relatedProjects.map((item) => (
              <RelatedCompact key={item.slug} project={item} />
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}

function ProjectPreviewPlayer({ project, isTheater, onToggleTheater }: { project: Project; isTheater: boolean; onToggleTheater: () => void }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className={`group overflow-hidden rounded-[2rem] bg-pitch-black shadow-subtle ${isTheater ? "mx-auto max-w-[1180px] ring-2 ring-lime-pop/70" : "border border-dashboard-outline-variant"}`}>
      <div className="relative aspect-video bg-pitch-black">
        {isPlaying && project.video ? (
          <video
            src={project.video}
            autoPlay
            controls
            preload="auto"
            className="absolute inset-0 z-30 h-full w-full object-cover"
            playsInline
          />
        ) : (
          <>
            <div className={`absolute -left-20 -top-20 z-10 size-56 rounded-full ${project.accent} opacity-30 blur-3xl`} aria-hidden="true" />
            <div className={`absolute -bottom-24 right-10 z-10 size-64 rounded-full ${project.accent} opacity-20 blur-3xl`} aria-hidden="true" />
            <Image src={project.image} alt="" fill sizes={isTheater ? "1180px" : "(min-width: 1024px) 960px, 100vw"} className={`object-cover transition-transform duration-700 group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100 ${isTheater ? "opacity-100" : "opacity-95"}`} priority />
            <div className="absolute inset-0 z-20 bg-gradient-to-b from-pitch-black/35 via-transparent to-pitch-black/75" />

            <button
              type="button"
              onClick={() => {
                if (project.video) {
                  setIsPlaying(true);
                }
              }}
              className={`absolute inset-0 z-30 grid place-items-center focus:outline-none ${project.video ? "cursor-pointer" : "cursor-default"}`}
              aria-label={project.video ? "Putar video preview" : "Preview gambar"}
            >
              <div className={`grid size-16 place-items-center rounded-full pl-1 text-2xl font-black shadow-subtle ring-4 ring-ghost-white/20 transition-transform group-hover:scale-105 motion-reduce:transition-none ${isTheater ? "bg-lime-pop text-pitch-black" : "bg-ghost-white/95 text-pitch-black"}`}>
                ▶
              </div>
            </button>
          </>
        )}

        <div className="absolute right-4 top-4 z-50 flex gap-2">
          <button type="button" onClick={onToggleTheater} className={`grid size-10 place-items-center rounded-full text-lg font-black backdrop-blur-sm transition-colors ${isTheater ? "bg-lime-pop text-pitch-black" : "bg-pitch-black/70 text-ghost-white hover:bg-pitch-black"} ${focusRing}`} aria-label={isTheater ? "Exit theater mode" : "Enter theater mode"}>
            ▭
          </button>
          <span className="grid size-10 place-items-center rounded-full bg-ghost-white/15 text-lg font-black text-ghost-white ring-1 ring-ghost-white/10 backdrop-blur-sm" aria-hidden="true">⛶</span>
          <span className="grid size-10 place-items-center rounded-full bg-ghost-white/15 text-lg font-black text-ghost-white ring-1 ring-ghost-white/10 backdrop-blur-sm" aria-hidden="true">⋯</span>
        </div>

        {!isPlaying && (
          <div className="absolute inset-x-4 bottom-4 z-30">
            <div className="mb-3 flex items-center justify-between text-xs font-black text-ghost-white/90">
              <span>{isTheater ? "Theater preview" : "Preview"}</span>
              <span>{project.video ? "Video MP4 · HD" : "Gambar Statis"}</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-ghost-white/20">
              <div className={`h-full rounded-full ${project.accent}`} style={{ width: isTheater ? "62%" : "38%" }} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function ProjectInfo({ project }: { project: Project }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const likeCount = 24 + (isLiked ? 1 : 0);

  async function copyProjectLink() {
    await navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    window.setTimeout(() => setIsCopied(false), 1600);
  }

  return (
    <section className="space-y-4">
      <div>
        <h1 className="text-3xl font-black tracking-[-0.05em] sm:text-5xl">{project.title}</h1>
        <p className="mt-2 text-sm font-bold text-dashboard-on-surface-variant sm:text-base">{project.type} · {project.role} · {project.year}</p>
        <p className="mt-3 max-w-4xl text-base font-semibold leading-7 text-dashboard-on-surface-variant">{project.summary}</p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <div className="order-2 -mx-4 flex snap-x flex-nowrap gap-2 overflow-x-auto px-4 pb-1 sm:order-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {project.stack.map((item, index) => (
            <TechStackBadge key={item} label={item} isPrimary={index === 0} accent={project.accent} />
          ))}
        </div>
        <div className="order-1 ml-auto flex flex-nowrap gap-2 sm:order-2" aria-label="Project actions">
          <button
            type="button"
            aria-pressed={isLiked}
            onClick={() => setIsLiked((value) => !value)}
            className={`inline-flex items-center gap-2 rounded-full border-2 px-4 py-2 text-sm font-black shadow-subtle transition-all hover:-translate-y-0.5 active:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${
              isLiked ? "border-pitch-black bg-pitch-black text-ghost-white hover:border-tangerine hover:bg-tangerine hover:text-pitch-black" : `border-dashboard-outline-variant bg-dashboard-surface-low text-dashboard-on-surface hover:border-tangerine hover:bg-tangerine hover:text-pitch-black ${focusRing}`
            }`}
          >
            <span className="grid size-6 place-items-center rounded-full bg-lime-pop text-sm leading-none text-pitch-black">{isLiked ? "♥" : "♡"}</span>
            Like {likeCount}
          </button>
          <button
            type="button"
            onClick={copyProjectLink}
            className={`inline-flex items-center gap-2 rounded-full border-2 border-pitch-black bg-pitch-black px-4 py-2 text-sm font-black text-ghost-white shadow-subtle transition-all hover:-translate-y-0.5 hover:border-lime-pop hover:bg-lime-pop hover:text-pitch-black active:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${focusRing}`}
          >
            <span className="grid size-6 place-items-center rounded-full bg-ghost-white text-sm leading-none text-pitch-black">↗</span>
            {isCopied ? "Copied" : "Copy link"}
          </button>
        </div>
      </div>
    </section>
  );
}

function TechStackBadge({ label, isPrimary, accent }: { label: string; isPrimary: boolean; accent: string }) {
  return (
    <span className="inline-flex shrink-0 snap-start items-center gap-2 rounded-3xl border border-dashboard-outline-variant bg-dashboard-surface-lowest px-3 py-2 text-sm font-black text-dashboard-on-surface shadow-subtle">
      <span className={`grid size-6 place-items-center rounded-full text-[11px] font-black text-pitch-black ${isPrimary ? accent : "bg-dashboard-surface-low"}`}>{getTechIcon(label)}</span>
      {label}
    </span>
  );
}

function getTechIcon(label: string) {
  const key = label.toLowerCase();
  if (key.includes("next")) return "▲";
  if (key.includes("react")) return "⚛";
  if (key.includes("tailwind")) return "#";
  if (key.includes("arduino")) return "⌁";
  if (key.includes("figma")) return "◆";
  if (key.includes("ux") || key.includes("konten")) return "✎";
  if (key.includes("c++")) return "C++";
  return "⌘";
}

function MorePortfolioMobile({ relatedProjects }: { relatedProjects: Project[] }) {
  return (
    <section className="lg:hidden">
      <div className="mb-3 flex items-center justify-between px-1">
        <h2 className="text-2xl font-black tracking-[-0.04em]">More portfolio</h2>
        <Link href="/projects" className={`text-sm font-black text-dashboard-on-surface-variant ${focusRing}`}>All</Link>
      </div>
      <div className="flex snap-x gap-3 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {relatedProjects.map((item) => (
          <RelatedPoster key={item.slug} project={item} />
        ))}
      </div>
    </section>
  );
}

function CommentsPlaceholder() {
  return (
    <section className="rounded-[2rem] border border-dashboard-outline-variant bg-dashboard-surface-lowest p-5 shadow-subtle sm:p-6">
      <h2 className="text-2xl font-black tracking-[-0.04em]">Comments</h2>
      <p className="mt-2 text-sm font-semibold leading-6 text-dashboard-on-surface-variant">Phase 2: Google login + moderation.</p>
      <div className="mt-4 rounded-2xl border border-dashed border-dashboard-outline-variant bg-dashboard-surface-low p-5 text-sm font-black text-dashboard-outline">Coming soon</div>
    </section>
  );
}

function RelatedHeader() {
  return (
    <div className="flex items-center justify-between px-1">
      <h2 className="text-xl font-black tracking-[-0.03em]">Project lain</h2>
      <Link href="/projects" className={`text-sm font-black text-dashboard-on-surface-variant ${focusRing}`}>All</Link>
    </div>
  );
}

function RelatedCompact({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.slug}`} className={`group grid grid-cols-[132px_1fr] gap-3 rounded-2xl border border-transparent p-2 transition-colors hover:border-dashboard-outline-variant hover:bg-dashboard-surface-lowest ${focusRing}`}>
      <div className="relative aspect-video overflow-hidden rounded-xl bg-dashboard-surface-low">
        <Image src={project.image} alt="" fill sizes="132px" className="object-cover transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100" />
      </div>
      <div className="min-w-0 py-1">
        <h3 className="line-clamp-2 text-sm font-black leading-5 tracking-[-0.02em]">{project.title}</h3>
        <p className="mt-1 truncate text-xs font-bold text-dashboard-on-surface-variant">{project.role} · {project.status}</p>
      </div>
    </Link>
  );
}

function RelatedPoster({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.slug}`} className={`group w-[220px] shrink-0 snap-start overflow-hidden rounded-[1.5rem] border border-dashboard-outline-variant bg-dashboard-surface-lowest shadow-subtle transition-colors hover:border-dashboard-outline ${focusRing}`}>
      <div className="relative aspect-[4/3] bg-dashboard-surface-low">
        <Image src={project.image} alt="" fill sizes="220px" className="object-cover transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100" />
      </div>
      <div className="flex min-h-14 items-center justify-between gap-3 px-4 py-3">
        <h3 className="truncate text-sm font-black tracking-[-0.02em]">{project.title}</h3>
        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-pitch-black text-sm font-black text-ghost-white">↗</span>
      </div>
    </Link>
  );
}
