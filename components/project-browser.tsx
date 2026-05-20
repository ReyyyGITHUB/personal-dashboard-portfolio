"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
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
    <section className="space-y-9">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-dashboard-outline">Project catalog</p>
          <h2 className="mt-2 text-3xl font-black tracking-[-0.06em] sm:text-4xl">Pilih project terbaik</h2>
          <p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-dashboard-on-surface-variant">Browse proof cards. Klik card buat buka case study.</p>
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

      <div className="flex gap-2 overflow-x-auto pb-1" aria-label="Filter stack">
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
        <div className="space-y-12">
          {categorizedProjects.map((category) =>
            category.projects.length ? (
              <ProjectCategoryRow key={category.title} title={category.title} description={category.description} projects={category.projects} />
            ) : null
          )}
        </div>
      ) : (
        <div className="rounded-[2rem] border border-dashed border-dashboard-outline-variant bg-dashboard-surface-lowest p-10 text-center shadow-subtle">
          <p className="text-2xl font-black tracking-[-0.04em]">Tidak ada project cocok.</p>
          <p className="mt-2 text-sm font-semibold text-dashboard-on-surface-variant">Reset search atau pilih stack lain.</p>
        </div>
      )}
    </section>
  );
}

function ProjectCategoryRow({ title, description, projects }: { title: string; description: string; projects: Project[] }) {
  return (
    <section>
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3 px-1">
        <div>
          <h3 className="text-2xl font-black tracking-[-0.05em] sm:text-3xl">{title}</h3>
          <p className="mt-1 max-w-xl text-sm font-semibold leading-6 text-dashboard-on-surface-variant">{description}</p>
          <p className="mt-1 text-xs font-black uppercase tracking-[0.16em] text-dashboard-outline">Klik card untuk buka case study</p>
        </div>
        <p className="rounded-full border border-dashboard-outline-variant bg-dashboard-surface-lowest px-3 py-1.5 text-xs font-black text-dashboard-outline shadow-subtle">{projects.length} card</p>
      </div>
      <div className="flex snap-x gap-3 overflow-x-auto pb-4 sm:gap-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {projects.map((project) => (
          <ProjectPosterCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}

function ProjectPosterCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`group w-[220px] shrink-0 snap-start overflow-hidden rounded-[1.5rem] border border-dashboard-outline-variant bg-dashboard-surface-lowest shadow-subtle transition-all hover:-translate-y-1 hover:border-dashboard-outline motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:w-[260px] ${focusRing}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-dashboard-surface-low">
        <Image src={project.image} alt="" fill sizes="260px" className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100" />
      </div>
      <div className="flex min-h-14 items-center justify-between gap-3 px-4 py-3">
        <h4 className="truncate text-sm font-black tracking-[-0.02em] text-dashboard-on-surface sm:text-base">{project.title}</h4>
        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-pitch-black text-sm font-black text-ghost-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0" aria-hidden="true">
          ↗
        </span>
      </div>
    </Link>
  );
}

function getProjectSearchText(project: Project) {
  return `${project.title} ${project.type} ${project.summary} ${project.result} ${project.role} ${project.stack.join(" ")}`.toLowerCase();
}