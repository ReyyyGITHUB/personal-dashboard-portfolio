"use client";

import { useState } from "react";
import type { Project } from "@/types/portfolio";
import { focusRing } from "@/lib/ui";

export function ProjectDescription({ project }: { project: Project }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const processPreview = project.process.join(" → ");

  return (
    <section className="rounded-[2rem] border border-dashboard-outline-variant bg-dashboard-surface-lowest p-5 shadow-subtle sm:p-6">
      <div className={`relative overflow-hidden ${isExpanded ? "max-h-none" : "max-h-[190px]"}`}>
        <div className="space-y-4 text-sm font-semibold leading-7 text-dashboard-on-surface-variant sm:text-[15px]">
          <p className="font-black leading-7 text-dashboard-on-surface">{project.result}</p>
          <p><span className="font-black text-dashboard-on-surface">Problem:</span> {project.problem}</p>

          {isExpanded ? (
            <>
              <div>
                <p className="font-black text-dashboard-on-surface">Process:</p>
                <ol className="mt-2 space-y-1.5">
                  {project.process.map((step, index) => (
                    <li key={step}>{index + 1}. {step}</li>
                  ))}
                </ol>
              </div>

              <div>
                <p className="font-black text-dashboard-on-surface">Proof:</p>
                <ul className="mt-2 space-y-1.5">
                  {project.proof.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>

              <p><span className="font-black text-dashboard-on-surface">Solution:</span> {project.solution}</p>
            </>
          ) : (
            <p><span className="font-black text-dashboard-on-surface">Process:</span> {processPreview}</p>
          )}
        </div>

        {!isExpanded ? <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-dashboard-surface-lowest to-transparent" /> : null}
      </div>

      <div className="mt-4 flex justify-center">
        <button
          type="button"
          onClick={() => setIsExpanded((value) => !value)}
          className={`rounded-full px-4 py-2 text-sm font-black text-dashboard-on-surface transition-colors hover:bg-dashboard-surface-low ${focusRing}`}
        >
          {isExpanded ? "Show less" : "...more"}
        </button>
      </div>
    </section>
  );
}
