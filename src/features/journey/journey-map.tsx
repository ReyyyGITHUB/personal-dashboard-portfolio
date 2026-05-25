"use client";

import { useState } from "react";
import { focusRing } from "@/lib/ui";

type JourneyItem = {
  year: string;
  title: string;
  text: string;
};

type JourneyMapProps = {
  journeyItems: readonly JourneyItem[];
};

const nodePositions = [
  "left-[18%] top-[14%]",
  "left-[58%] top-[31%]",
  "left-[33%] top-[55%]",
  "left-[70%] top-[72%]",
] as const;

const dotPositions = [
  "left-[28%] top-[20%]",
  "left-[36%] top-[24%]",
  "left-[44%] top-[28%]",
  "left-[52%] top-[32%]",
  "left-[56%] top-[40%]",
  "left-[51%] top-[47%]",
  "left-[44%] top-[52%]",
  "left-[38%] top-[58%]",
  "left-[44%] top-[64%]",
  "left-[53%] top-[68%]",
  "left-[62%] top-[72%]",
] as const;

export function JourneyMap({ journeyItems }: JourneyMapProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedItem = journeyItems[selectedIndex];

  return (
    <section className="mx-auto w-full max-w-[1320px] px-5 py-5 sm:px-6 lg:px-10 lg:py-8">
      <div className="overflow-hidden rounded-[2.75rem] border border-dashboard-outline-variant bg-dashboard-surface-lowest shadow-subtle">
        <div className="grid min-h-[720px] gap-0 lg:grid-cols-[minmax(0,1fr)_380px]">
          <div className="relative min-h-[520px] overflow-hidden bg-[#fff3cf] p-5 text-pitch-black sm:p-8 lg:min-h-full">
            <div className="pointer-events-none absolute inset-0 opacity-[0.32] [background-image:radial-gradient(circle_at_1px_1px,rgba(82,58,24,0.22)_1px,transparent_0)] [background-size:24px_24px]" />
            <div className="pointer-events-none absolute -left-20 top-20 size-64 rounded-full bg-tangerine/20 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 right-0 size-80 rounded-full bg-lime-pop/20 blur-3xl" />

            <div className="relative z-10 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-black text-[#7b6439]">Harta yang Hilang</p>
                <h1 className="mt-2 text-4xl font-black tracking-[-0.06em] sm:text-6xl">Journey Map</h1>
              </div>
              <div className="hidden rounded-full border border-[#7b6439]/20 bg-white/55 px-4 py-2 text-sm font-black text-[#7b6439] shadow-subtle sm:block">Map 01</div>
            </div>

            <div className="absolute inset-x-5 bottom-5 top-28 sm:inset-x-8 sm:bottom-8 sm:top-36">
              {dotPositions.map((position, index) => (
                <span key={position} className={`absolute ${position} size-2.5 rounded-full bg-[#7b6439]/55 shadow-subtle`} style={{ transform: `scale(${index % 3 === 0 ? 1.25 : 1})` }} />
              ))}

              {journeyItems.map((item, index) => {
                const isActive = selectedIndex === index;
                const isCurrent = index === 0;
                const number = String(journeyItems.length - index).padStart(2, "0");

                return (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => setSelectedIndex(index)}
                    className={`absolute ${nodePositions[index] ?? "left-1/2 top-1/2"} z-20 w-[9.5rem] -translate-x-1/2 -translate-y-1/2 rounded-[1.25rem] border p-3 text-left shadow-subtle transition-colors ${focusRing} ${
                      isActive
                        ? "border-pitch-black bg-pitch-black text-ghost-white dark:bg-ghost-white dark:text-pitch-black"
                        : "border-[#7b6439]/25 bg-white/80 text-pitch-black hover:border-pitch-black"
                    }`}
                  >
                    <span className={`grid size-9 place-items-center rounded-full text-xs font-black ${isActive ? "bg-lime-pop text-pitch-black" : "bg-[#7b6439]/10 text-[#7b6439]"}`}>
                      {number}
                    </span>
                    <span className="mt-3 block text-sm font-black leading-5">{item.title}</span>
                    <span className={`mt-1 block text-xs font-bold ${isActive ? "text-ghost-white/65 dark:text-pitch-black/65" : "text-[#7b6439]"}`}>{item.year}</span>
                    {isCurrent ? <span className={`mt-2 inline-flex rounded-full px-2 py-0.5 text-[10px] font-black ${isActive ? "bg-lime-pop text-pitch-black" : "bg-lime-pop/70 text-pitch-black"}`}>You are here</span> : null}
                  </button>
                );
              })}
            </div>

            <p className="absolute bottom-5 left-5 z-10 rounded-full bg-white/70 px-4 py-2 text-xs font-black text-[#7b6439] shadow-subtle sm:left-8 sm:bottom-8">Click node to inspect clue</p>
          </div>

          <aside className="border-t border-dashboard-outline-variant bg-dashboard-surface-lowest p-6 lg:border-l lg:border-t-0 lg:p-8">
            <p className="text-sm font-black text-dashboard-outline">Catatan Perjalanan</p>
            <div className="mt-8 rounded-[2rem] border border-dashboard-outline-variant bg-dashboard-surface-low p-5">
              <p className="text-sm font-black text-dashboard-outline">Clue #{String(journeyItems.length - selectedIndex).padStart(2, "0")}</p>
              <h2 className="mt-3 text-3xl font-black tracking-[-0.05em]">{selectedItem.title}</h2>
              <p className="mt-2 text-sm font-bold text-dashboard-on-surface-variant">{selectedItem.year}</p>
              <p className="mt-5 text-base font-semibold leading-7 text-dashboard-on-surface-variant">{selectedItem.text}</p>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-dashboard-outline-variant bg-dashboard-surface-low p-4">
                <p className="text-xs font-bold text-dashboard-outline">Status</p>
                <p className="mt-1 text-lg font-black">Found</p>
              </div>
              <div className="rounded-2xl border border-dashboard-outline-variant bg-dashboard-surface-low p-4">
                <p className="text-xs font-bold text-dashboard-outline">Route</p>
                <p className="mt-1 text-lg font-black">{selectedIndex + 1}/{journeyItems.length}</p>
              </div>
            </div>

            <div className="mt-5 rounded-[2rem] bg-pitch-black p-5 text-ghost-white dark:bg-ghost-white dark:text-pitch-black">
              <p className="text-sm font-black text-lime-pop">Hint</p>
              <p className="mt-3 text-sm font-semibold leading-6 text-ghost-white/75 dark:text-pitch-black/75">Setiap titik harus ninggalin bukti. Kalau belum bisa dijelaskan, berarti belum jadi artifact.</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
