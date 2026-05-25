"use client";

import { useState } from "react";
import { focusRing } from "@/lib/ui";

type JourneyItem = {
  year: string;
  title: string;
  text: string;
};

type JourneyRouteMapProps = {
  journeyItems: readonly JourneyItem[];
};

const nodes = [
  { x: 130, y: 230, label: "Started", card: "left-[7%] top-[50%]" },
  { x: 390, y: 430, label: "IoT", card: "left-[22%] top-[58%]" },
  { x: 660, y: 255, label: "Frontend", card: "left-[45%] top-[52%]" },
  { x: 1030, y: 320, label: "Portfolio OS", card: "right-[6%] top-[56%]" },
] as const;

const roadPath = "M 90 230 H 240 C 330 230 320 430 420 430 C 520 430 460 250 620 250 C 780 250 670 500 840 500 C 980 500 860 320 1010 320 H 1160";

export function JourneyRouteMap({ journeyItems }: JourneyRouteMapProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const activeIndex = hoveredIndex ?? selectedIndex;
  const activeItem = journeyItems[activeIndex];
  const activeNode = nodes[activeIndex] ?? nodes[0];

  return (
    <main className="mx-auto w-full max-w-[1320px] px-5 py-5 sm:px-6 lg:px-10 lg:py-8">
      <section className="hidden overflow-hidden rounded-[2.75rem] border border-dashboard-outline-variant bg-dashboard-surface-lowest shadow-subtle lg:block">
        <div className="relative min-h-[760px] bg-[#f7edd4] p-10 text-pitch-black ring-1 ring-inset ring-white/80">
          <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:radial-gradient(circle_at_1px_1px,rgba(82,58,24,0.22)_1px,transparent_0)] [background-size:32px_32px]" />
          <div className="relative z-10 flex items-start justify-between gap-8">
            <div>
              <h1 className="text-6xl font-black tracking-[-0.07em]">Journey Route</h1>
              <p className="mt-3 max-w-2xl text-base font-semibold leading-7 text-dashboard-on-surface-variant">Ship kecil → eksperimen IoT → frontend dashboard → Portfolio OS.</p>
            </div>
            <div className="rounded-full border border-[#7b6439]/15 bg-white/70 px-4 py-2 text-sm font-black text-[#7b6439] shadow-subtle backdrop-blur-sm">Hover or click a stop</div>
          </div>

          <div className="absolute inset-x-10 top-36 h-[520px]">
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1240 560" role="img" aria-label="Journey route path">
              <path d={roadPath} fill="none" stroke="#4b3f2a" strokeWidth="62" strokeLinecap="round" strokeLinejoin="round" opacity="0.12" />
              <path d={roadPath} fill="none" stroke="#e8d8b8" strokeWidth="54" strokeLinecap="round" strokeLinejoin="round" />
              <path d={roadPath} fill="none" stroke="#fff8e8" strokeWidth="38" strokeLinecap="round" strokeLinejoin="round" />
              <path d={roadPath} fill="none" stroke="#3859f9" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="14 18" opacity="0.95" />
            </svg>

            {journeyItems.map((item, index) => {
              const node = nodes[index] ?? nodes[0];
              const isActive = activeIndex === index;
              const isSelected = selectedIndex === index;

              return (
                <button
                  key={item.title}
                  type="button"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => setSelectedIndex(index)}
                  className={`absolute z-20 -translate-x-1/2 -translate-y-1/2 rounded-full border bg-white/80 px-3 py-2 shadow-subtle backdrop-blur-sm transition-colors ${focusRing} ${isActive ? "border-pitch-black ring-2 ring-lime-pop/70" : "border-[#7b6439]/20 hover:border-pitch-black/60"}`}
                  style={{ left: `${(node.x / 1240) * 100}%`, top: `${(node.y / 560) * 100}%` }}
                  aria-pressed={isSelected}
                >
                  <span className="flex items-center gap-2">
                    <span className={`grid size-9 place-items-center rounded-full text-xs font-black ${isActive ? "bg-pitch-black text-ghost-white dark:bg-ghost-white dark:text-pitch-black" : "bg-[#7b6439]/10 text-[#7b6439]"}`}>{String(index + 1).padStart(2, "0")}</span>
                    <span className="max-w-32 truncate text-sm font-black">{node.label}</span>
                  </span>
                </button>
              );
            })}

            <article key={activeIndex} className={`absolute z-30 w-[320px] overflow-hidden rounded-[1.5rem] border border-[#7b6439]/15 bg-white/95 p-5 shadow-subtle backdrop-blur-sm transition-all duration-200 ${activeNode.card}`}>
              <div className="absolute inset-x-0 top-0 h-1.5 bg-[#3859f9]" /><p className="text-xs font-black text-[#7b6439]">Stop {String(activeIndex + 1).padStart(2, "0")}</p>
              <h2 className="mt-2 text-2xl font-black tracking-[-0.04em]">{activeItem.title}</h2>
              <p className="mt-1 text-sm font-bold text-dashboard-on-surface-variant">{activeItem.year}</p>
              <p className="mt-4 text-sm font-semibold leading-6 text-dashboard-on-surface-variant">{activeItem.text}</p>
              {selectedIndex === activeIndex ? <p className="mt-4 inline-flex rounded-full bg-lime-pop px-3 py-1 text-xs font-black text-pitch-black">Selected stop</p> : null}
            </article>
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-dashboard-outline-variant bg-dashboard-surface-lowest p-5 shadow-subtle lg:hidden">
        <h1 className="text-4xl font-black tracking-[-0.06em]">Journey Route</h1>
        <p className="mt-3 text-sm font-semibold leading-6 text-dashboard-on-surface-variant">Tap a stop to inspect the journey.</p>
        <div className="relative mt-7 space-y-5 border-l-2 border-dashed border-dashboard-outline-variant pl-5">
          {journeyItems.map((item, index) => {
            const isActive = selectedIndex === index;

            return (
              <button key={item.title} type="button" onClick={() => setSelectedIndex(index)} className={`block w-full rounded-2xl border p-4 text-left shadow-subtle transition-colors ${focusRing} ${isActive ? "border-pitch-black bg-pitch-black text-ghost-white dark:bg-ghost-white dark:text-pitch-black ring-2 ring-lime-pop/70" : "border-dashboard-outline-variant bg-dashboard-surface-lowest"}`}>
                <span className="text-xs font-black">{String(index + 1).padStart(2, "0")}</span>
                <span className="mt-1 block text-lg font-black">{item.title}</span>
                <span className={`mt-1 block text-sm font-semibold ${isActive ? "text-ghost-white/70 dark:text-pitch-black/70" : "text-dashboard-on-surface-variant"}`}>{item.year}</span>
              </button>
            );
          })}
        </div>
        <article className="mt-5 rounded-2xl bg-dashboard-surface-low p-4">
          <p className="text-xs font-black text-dashboard-outline">Selected stop</p>
          <h2 className="mt-2 text-2xl font-black tracking-[-0.04em]">{activeItem.title}</h2>
          <p className="mt-3 text-sm font-semibold leading-6 text-dashboard-on-surface-variant">{activeItem.text}</p>
        </article>
      </section>
    </main>
  );
}
