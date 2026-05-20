"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { Project } from "@/lib/portfolio-data";
import { focusRing } from "@/lib/ui";

export function ProjectBrowser({ projects }: { projects: Project[] }) {
  const [query, setQuery] = useState("");
  const [stack, setStack] = useState("All");
  const [previewProject, setPreviewProject] = useState<Project | null>(null);
  const stacks = useMemo(() => ["All", ...Array.from(new Set(projects.flatMap((project) => project.stack)))], [projects]);

  const filteredProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesStack = stack === "All" || project.stack.includes(stack);
      const searchText = `${project.title} ${project.type} ${project.result} ${project.role} ${project.stack.join(" ")}`.toLowerCase();
      return matchesStack && (!normalizedQuery || searchText.includes(normalizedQuery));
    });
  }, [projects, query, stack]);

  return (
    <section className="lg:col-span-12">
      <div className="rounded-[2rem] border border-dashboard-outline-variant bg-dashboard-surface-lowest p-4 shadow-subtle sm:p-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <label className="min-w-0 flex-1">
            <span className="sr-only">Cari project</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Cari project, stack, atau role..."
              className={`w-full rounded-2xl border border-dashboard-outline-variant bg-dashboard-surface-low px-4 py-3 text-sm font-semibold text-dashboard-on-surface outline-none placeholder:text-dashboard-on-surface-variant ${focusRing}`}
            />
          </label>
          <div className="flex gap-2 overflow-x-auto pb-1 lg:max-w-[52%]" aria-label="Filter stack">
            {stacks.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setStack(item)}
                className={`shrink-0 rounded-full border px-3 py-2 text-xs font-bold transition-colors ${focusRing} ${
                  stack === item
                    ? "border-pitch-black bg-pitch-black text-ghost-white"
                    : "border-dashboard-outline-variant bg-dashboard-surface-low text-dashboard-on-surface-variant hover:text-dashboard-on-surface"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      {filteredProjects.length ? (
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {filteredProjects.map((project) => (
            <article key={project.slug} className="overflow-hidden rounded-[2rem] border border-dashboard-outline-variant bg-dashboard-surface-lowest shadow-subtle">
              <div className="relative aspect-[16/10] overflow-hidden border-b border-dashboard-outline-variant bg-dashboard-surface-low">
                <Image src={project.image} alt="" fill sizes="(min-width: 1024px) 420px, 100vw" className="object-cover" />
              </div>
              <div className="p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`size-3 rounded-full ${project.accent}`} />
                  <span className="rounded-full border border-dashboard-outline-variant px-2.5 py-1 text-xs font-bold text-dashboard-on-surface-variant">{project.status}</span>
                  <span className="text-xs font-bold text-dashboard-outline">{project.year}</span>
                </div>
                <h2 className="mt-4 text-2xl font-black tracking-[-0.04em]">{project.title}</h2>
                <p className="mt-2 text-sm font-semibold text-dashboard-on-surface-variant">{project.summary}</p>
                <p className="mt-4 text-sm leading-6 text-dashboard-on-surface-variant">{project.result}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <span key={item} className="rounded-full bg-dashboard-surface-low px-2.5 py-1 text-xs font-bold text-dashboard-on-surface-variant">{item}</span>
                  ))}
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  <button type="button" onClick={() => setPreviewProject(project)} className={`rounded-full border border-dashboard-outline-variant bg-dashboard-surface-low px-4 py-2 text-sm font-bold text-dashboard-on-surface ${focusRing}`}>
                    Quick preview
                  </button>
                  <Link href={`/projects/${project.slug}`} className={`rounded-full bg-pitch-black px-4 py-2 text-sm font-bold text-ghost-white ${focusRing}`}>
                    Baca case study
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-5 rounded-[2rem] border border-dashed border-dashboard-outline-variant bg-dashboard-surface-lowest p-8 text-center">
          <p className="text-lg font-black">Tidak ada project cocok.</p>
          <p className="mt-2 text-sm font-semibold text-dashboard-on-surface-variant">Reset search atau pilih stack lain.</p>
        </div>
      )}
      <ProjectPreviewModal project={previewProject} onClose={() => setPreviewProject(null)} />
    </section>
  );
}

function ProjectPreviewModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  useEffect(() => {
    if (!project) return;

    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center bg-pitch-black/35 p-4 backdrop-blur-[2px]" role="dialog" aria-modal="true" aria-label={`Preview ${project.title}`}>
      <button type="button" aria-label="Tutup preview" className="absolute inset-0" onClick={onClose} />
      <article className="relative w-full max-w-3xl overflow-hidden rounded-[2rem] border border-dashboard-outline-variant bg-dashboard-surface-lowest shadow-subtle">
        <div className="relative aspect-[16/9] bg-dashboard-surface-low">
          <Image src={project.image} alt="" fill sizes="(min-width: 768px) 760px, 100vw" className="object-cover" />
        </div>
        <div className="p-5">
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-dashboard-outline">
            <span>{project.year}</span>
            <span>{project.type}</span>
            <span>{project.status}</span>
          </div>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.05em]">{project.title}</h2>
          <p className="mt-2 text-sm font-semibold leading-6 text-dashboard-on-surface-variant">{project.summary}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <span key={item} className="rounded-full bg-dashboard-surface-low px-2.5 py-1 text-xs font-bold text-dashboard-on-surface-variant">{item}</span>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link href={`/projects/${project.slug}`} onClick={onClose} className={`rounded-full bg-pitch-black px-4 py-2 text-sm font-bold text-ghost-white ${focusRing}`}>Buka case study</Link>
            <button type="button" onClick={onClose} className={`rounded-full border border-dashboard-outline-variant bg-dashboard-surface-low px-4 py-2 text-sm font-bold ${focusRing}`}>Tutup</button>
          </div>
        </div>
      </article>
    </div>
  );
}
