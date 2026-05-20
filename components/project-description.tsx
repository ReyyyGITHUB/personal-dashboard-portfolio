"use client";

import { useState, type ReactNode } from "react";
import type { Project } from "@/lib/portfolio-data";
import { focusRing } from "@/lib/ui";

export function ProjectDescription({ project }: { project: Project }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="rounded-[2rem] border border-dashboard-outline-variant bg-dashboard-surface-lowest p-5 shadow-subtle sm:p-7">
      <div className="max-w-3xl">
        <p className="text-sm font-black text-dashboard-outline">About this project</p>
        <h2 className="mt-1 text-2xl font-black tracking-[-0.04em]">Case study singkat</h2>
      </div>

      <div className={`relative mt-6 overflow-hidden ${isExpanded ? "max-h-none" : "max-h-[240px]"}`}>
        <div className="space-y-7">
          <DescriptionBlock title="Problem">
            <p>{project.problem}</p>
          </DescriptionBlock>

          <DescriptionBlock title="Process">
            <ol className="space-y-2.5">
              {project.process.map((step, index) => (
                <li key={step} className="grid grid-cols-[2.25rem_1fr] gap-3 rounded-2xl bg-dashboard-surface-low p-3">
                  <span className="text-sm font-black text-dashboard-outline">{String(index + 1).padStart(2, "0")}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </DescriptionBlock>

          <DescriptionBlock title="Proof">
            <ul className="grid gap-2 sm:grid-cols-2">
              {project.proof.map((item) => (
                <li key={item} className="rounded-2xl border border-dashboard-outline-variant bg-dashboard-surface-low px-4 py-3">{item}</li>
              ))}
            </ul>
          </DescriptionBlock>

          <DescriptionBlock title="Solution">
            <p>{project.solution}</p>
          </DescriptionBlock>
        </div>

        {!isExpanded ? <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-dashboard-surface-lowest via-dashboard-surface-lowest/90 to-transparent" /> : null}
      </div>

      <div className="mt-5 flex justify-center">
        <button
          type="button"
          onClick={() => setIsExpanded((value) => !value)}
          className={`rounded-full bg-pitch-black px-6 py-2.5 text-sm font-black text-ghost-white shadow-subtle ${focusRing}`}
        >
          {isExpanded ? "Show less" : "See more"}
        </button>
      </div>
    </section>
  );
}

function DescriptionBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="grid gap-3 sm:grid-cols-[9rem_1fr]">
      <h3 className="text-sm font-black text-dashboard-on-surface">{title}</h3>
      <div className="text-sm font-semibold leading-7 text-dashboard-on-surface-variant">{children}</div>
    </section>
  );
}