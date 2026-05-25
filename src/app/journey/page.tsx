import Link from "next/link";
import { focusRing } from "@/lib/ui";

export default function JourneyPage() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-80px)] w-full max-w-[540px] flex-col items-center justify-center px-5 py-10 text-center">
      <div className="flex flex-col items-center">
        {/* Custom SVG Under Construction / Map Route Icon */}
        <div className="relative grid size-32 place-items-center rounded-[2rem] bg-oatmeal/20 text-[#7b6439] ring-1 ring-inset ring-[#7b6439]/10">
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            {/* Dotted path */}
            <path d="M 12 44 Q 28 20 44 44 T 52 24" fill="none" stroke="#7b6439" stroke-width="3" stroke-dasharray="6 6" stroke-linecap="round"/>
            {/* Completed Node */}
            <circle cx="12" cy="44" r="6" fill="#3859f9" stroke="#ffffff" stroke-width="2"/>
            {/* In-development Warning Node */}
            <circle cx="34" cy="33" r="8" fill="#ff7614" stroke="#ffffff" stroke-width="2"/>
            <path d="M 34 29 L 34 33 M 34 37 H 34.01" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
            {/* Future Node */}
            <circle cx="52" cy="24" r="6" fill="#dad4c8" stroke="#ffffff" stroke-width="2"/>
          </svg>
          <span className="absolute -bottom-1 -right-1 rounded-full bg-tangerine px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-white shadow-subtle">
            404
          </span>
        </div>

        <p className="mt-8 text-xs font-black uppercase tracking-[0.2em] text-dashboard-outline">Rute Cerita</p>
        <h1 className="mt-3 text-3xl font-black tracking-[-0.05em] sm:text-4xl text-dashboard-on-surface">
          Sedang dalam pengembangan...
        </h1>
        <p className="mt-4 text-sm font-semibold leading-6 text-dashboard-on-surface-variant">
          Bagian cerita perjalanan (Journey Route Map) lagi dirapihin agar menyajikan peta bukti petualangan yang solid. Tunggu update berikutnya ya!
        </p>

        <Link
          href="/"
          className={`mt-8 inline-flex items-center justify-center gap-2 rounded-2xl bg-pitch-black px-6 py-3.5 text-sm font-black text-ghost-white transition-transform hover:-translate-y-0.5 ${focusRing}`}
        >
          ← Kembali ke Dashboard
        </Link>
      </div>
    </main>
  );
}
