"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { Project } from "@/lib/portfolio-data";
import { focusRing } from "@/lib/ui";

const projectCategories = [
  {
    title: "Web Development",
    description: "Frontend dashboard, website, app UI, dan struktur route.",
    keywords: ["next.js", "react", "tailwind", "frontend", "web", "dashboard"],
  },
  {
    title: "IoT / Arduino",
    description: "Sensor logic, automation, threshold, dan prototype hardware.",
    keywords: ["arduino", "c++", "iot", "sensor", "automation"],
  },
  {
    title: "UX / Interaction",
    description: "Command UI, preview flow, case study writing, dan aksesibilitas.",
    keywords: ["ux", "ux writing", "command ui", "a11y", "interaction", "konten"],
  },
] as const;

export function ProjectBrowser({ projects }: { projects: Project[] }) {
  const [query, setQuery] = useState("");
  const [stack, setStack] = useState("All");
  const [previewProject, setPreviewProject] = useState<Project | null>(null);
  const stacks = useMemo(() => ["All", ...Array.from(new Set(projects.flatMap((project) => project.stack)))], [projects]);

  const filteredProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesStack = stack === "All" || project.stack.includes(stack);
      const searchText = getProjectSearchText(project);
      return matchesStack && (!normalizedQuery || searchText.includes(normalizedQuery));
    });
  }, [projects, query, stack]);

  const categorizedProjects = projectCategories.map((category) => ({
    ...category,
    projects: filteredProjects.filter((project) => category.keywords.some((keyword) => getProjectSearchText(project).includes(keyword))),
  }));
  const hasProjects = categorizedProjects.some((category) => category.projects.length > 0);

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-dashboard-outline">Project catalog</p>
          <h2 className="mt-2 text-3xl font-black tracking-[-0.06em] sm:text-4xl">Pilih project terbaik</h2>
          <p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-dashboard-on-surface-variant">Dipisah berdasarkan kategori. Scroll horizontal, pilih proof yang mau dicek.</p>
        </div>
        <label className="min-w-0 lg:w-[420px]">
          <span className="sr-only">Cari project</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Cari project, stack, atau role..."
            className={`w-full rounded-full border border-dashboard-outline-variant bg-dashboard-surface-lowest px-5 py-3 text-sm font-bold text-dashboard-on-surface shadow-subtle outline-none placeholder:text-dashboard-on-surface-variant ${focusRing}`}
          />
        </label>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2" aria-label="Filter stack">
        {stacks.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setStack(item)}
            className={`shrink-0 rounded-full border px-4 py-2 text-xs font-black transition-colors ${focusRing} ${
              stack === item
                ? "border-pitch-black bg-pitch-black text-ghost-white"
                : "border-dashboard-outline-variant bg-dashboard-surface-lowest text-dashboard-on-surface-variant shadow-subtle hover:text-dashboard-on-surface"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {hasProjects ? (
        <div className="space-y-10">
          {categorizedProjects.map((category) =>
            category.projects.length ? (
              <ProjectCategoryRow key={category.title} title={category.title} description={category.description} projects={category.projects} onPreview={setPreviewProject} />
            ) : null
          )}
        </div>
      ) : (
        <div className="rounded-[2rem] border border-dashed border-dashboard-outline-variant bg-dashboard-surface-lowest p-10 text-center shadow-subtle">
          <p className="text-2xl font-black tracking-[-0.04em]">Tidak ada project cocok.</p>
          <p className="mt-2 text-sm font-semibold text-dashboard-on-surface-variant">Reset search atau pilih stack lain.</p>
        </div>
      )}
      <ProjectPreviewModal project={previewProject} onClose={() => setPreviewProject(null)} />
    </section>
  );
}

function ProjectCategoryRow({ title, description, projects, onPreview }: { title: string; description: string; projects: Project[]; onPreview: (project: Project) => void }) {
  return (
    <section>
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3 px-1">
        <div>
          <h3 className="text-2xl font-black tracking-[-0.05em] sm:text-3xl">{title}</h3>
          <p className="mt-1 max-w-xl text-sm font-semibold leading-6 text-dashboard-on-surface-variant">{description}</p>
        </div>
        <p className="text-xs font-black uppercase tracking-[0.16em] text-dashboard-outline">{projects.length} item</p>
      </div>
      <div className="flex snap-x gap-4 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {projects.map((project) => (
          <ProjectCatalogCard key={project.slug} project={project} onPreview={onPreview} />
        ))}
      </div>
    </section>
  );
}

function ProjectCatalogCard({ project, onPreview }: { project: Project; onPreview: (project: Project) => void }) {
  return (
    <article className="group flex w-[280px] shrink-0 snap-start flex-col overflow-hidden rounded-[1.75rem] border border-dashboard-outline-variant bg-dashboard-surface-lowest shadow-subtle sm:w-[320px]">
      <div className="relative aspect-[4/3] overflow-hidden bg-dashboard-surface-low">
        <Image src={project.image} alt="" fill sizes="320px" className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100" />
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          <span className="rounded-full bg-ghost-white px-3 py-1 text-[11px] font-black text-pitch-black">{project.status}</span>
          <span className="rounded-full bg-pitch-black/75 px-3 py-1 text-[11px] font-black text-ghost-white">{project.year}</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2">
          <span className={`size-3 rounded-full ${project.accent}`} />
          <p className="text-[11px] font-black uppercase tracking-[0.14em] text-dashboard-outline">{project.type}</p>
        </div>
        <h4 className="mt-3 text-2xl font-black tracking-[-0.05em]">{project.title}</h4>
        <p className="mt-3 line-clamp-3 text-sm font-semibold leading-6 text-dashboard-on-surface-variant">{project.result}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.stack.slice(0, 3).map((item) => (
            <span key={item} className="rounded-full bg-dashboard-surface-low px-2.5 py-1 text-xs font-black text-dashboard-on-surface-variant">{item}</span>
          ))}
        </div>
        <div className="mt-auto flex flex-wrap gap-2 pt-5">
          <button type="button" onClick={() => onPreview(project)} className={`rounded-full border border-dashboard-outline-variant bg-dashboard-surface-low px-4 py-2 text-sm font-black text-dashboard-on-surface ${focusRing}`}>
            Preview
          </button>
          <Link href={`/projects/${project.slug}`} className={`rounded-full bg-pitch-black px-4 py-2 text-sm font-black text-ghost-white ${focusRing}`}>
            Detail →
          </Link>
        </div>
      </div>
    </article>
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
      <article className="relative w-full max-w-4xl overflow-hidden rounded-[2.5rem] border border-dashboard-outline-variant bg-dashboard-surface-lowest shadow-subtle">
        <div className="relative aspect-[16/9] bg-dashboard-surface-low">
          <Image src={project.image} alt="" fill sizes="(min-width: 768px) 900px, 100vw" className="object-cover" />
        </div>
        <div className="p-6">
          <div className="flex flex-wrap items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-dashboard-outline">
            <span>{project.year}</span>
            <span>{project.type}</span>
            <span>{project.status}</span>
          </div>
          <h2 className="mt-3 text-4xl font-black tracking-[-0.06em]">{project.title}</h2>
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

function getProjectSearchText(project: Project) {
  return `${project.title} ${project.type} ${project.summary} ${project.result} ${project.role} ${project.stack.join(" ")}`.toLowerCase();
}