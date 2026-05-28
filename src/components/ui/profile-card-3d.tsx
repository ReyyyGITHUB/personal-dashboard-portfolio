"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { BrandIcon } from "@/components/ui/icons/brand-icons";

type ProfileCard3DProps = {
  focusRing: string;
};

export function ProfileCard3D({ focusRing }: ProfileCard3DProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (isFlipped) return; // Nonaktifkan tilt saat dibalik
    const card = containerRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Hitung derajat kemiringan (maksimal 12 derajat)
    const tiltX = (y / (rect.height / 2)) * -12;
    const tiltY = (x / (rect.width / 2)) * 12;

    setTilt({ x: tiltX, y: tiltY });
  }

  function handleMouseLeave() {
    setTilt({ x: 0, y: 0 });
  }

  return (
    <aside 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative lg:col-span-4 h-[520px] w-full max-w-[360px] mx-auto lg:max-w-none min-w-0 [perspective:1000px] select-none"
    >
      {/* Lubang Gantungan ID Card Fisik */}
      <div className="absolute -top-3.5 left-1/2 z-40 size-7 -translate-x-1/2 rounded-full border-2 border-dashboard-outline-variant bg-dashboard-surface-lowest shadow-subtle flex items-center justify-center">
        <div className="size-3.5 rounded-full bg-dashboard-outline-variant/30 border border-dashboard-outline-variant/60" />
      </div>

      {/* Card Inner Container (Flip handling & 3D Tilt) */}
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        style={{
          transform: isFlipped
            ? "rotateY(180deg)"
            : `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        }}
        className="relative h-full w-full rounded-[2.25rem] border border-dashboard-outline-variant bg-dashboard-surface-lowest shadow-subtle transition-all duration-700 ease-out cursor-pointer [transform-style:preserve-3d]"
      >
        
        {/* ──────────────── SISI DEPAN (FRONT) ──────────────── */}
        <div 
          className="absolute inset-0 flex h-full w-full flex-col items-center px-5 py-6 text-center [backface-visibility:hidden]"
          style={{ transform: "rotateY(0deg)" }}
        >
          {/* Slot ID Card Header Ribbon */}
          <div className="absolute top-0 inset-x-0 h-4 bg-gradient-to-r from-clay-violet via-lime-pop to-azure-glow rounded-t-[2.25rem] opacity-80" />

          {/* Avatar Ring */}
          <div className="relative mt-3">
            <div className="grid size-20 place-items-center rounded-[1.75rem] bg-pitch-black text-3xl font-black tracking-[-0.06em] text-ghost-white shadow-subtle dark:bg-ghost-white dark:text-pitch-black">
              R
            </div>
            <span className="absolute -bottom-1 -right-1 size-5 rounded-full border-4 border-dashboard-surface-lowest bg-lime-pop animate-pulse" />
          </div>

          <h2 className="mt-4 text-2xl font-black tracking-[-0.05em] text-dashboard-on-surface">Rayhan</h2>
          <p className="mt-1 text-sm font-semibold text-dashboard-on-surface-variant">Student builder</p>

          {/* Availability Badge */}
          <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-dashboard-outline-variant bg-dashboard-surface-low px-3 py-1.5 text-xs font-semibold text-dashboard-on-surface">
            <span className="size-2 rounded-full bg-lime-pop shadow-[0_0_8px_#cbd810]" />
            Buka buat project kecil
          </div>

          <p className="mt-4 max-w-[240px] text-xs font-semibold leading-relaxed text-dashboard-on-surface-variant">
            Lagi ngerapihin Portfolio OS sambil belajar lewat project yang beneran dibuat.
          </p>

          {/* Stacks badges */}
          <div className="mt-4 flex w-full flex-wrap justify-center gap-1.5 px-2">
            <span className="rounded-full border border-clay-violet/20 bg-clay-violet/10 px-2 py-0.5 text-[10px] font-bold text-clay-violet">
              Next.js
            </span>
            <span className="rounded-full border border-azure-glow/30 bg-azure-glow/15 px-2 py-0.5 text-[10px] font-bold text-[#09687d]">
              Tailwind
            </span>
            <span className="rounded-full border border-lime-pop/40 bg-lime-pop/25 px-2 py-0.5 text-[10px] font-bold text-[#5f6f24]">
              Arduino
            </span>
          </div>

          {/* Stats grid */}
          <div className="mt-5 grid w-full grid-cols-3 divide-x divide-dashboard-outline-variant rounded-2xl bg-dashboard-surface-low px-2 py-2.5">
            <div>
              <p className="text-lg font-black tracking-[-0.05em]">5+</p>
              <p className="mt-0.5 text-[9px] font-bold text-dashboard-on-surface-variant">Project</p>
            </div>
            <div>
              <p className="text-lg font-black tracking-[-0.05em]">8</p>
              <p className="mt-0.5 text-[9px] font-bold text-dashboard-on-surface-variant">Stack</p>
            </div>
            <div>
              <p className="text-lg font-black tracking-[-0.05em]">Open</p>
              <p className="mt-0.5 text-[9px] font-bold text-dashboard-on-surface-variant">Collab</p>
            </div>
          </div>

          {/* Playful CSS Barcode */}
          <div className="mt-auto w-full px-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between gap-0.5 bg-white p-2 rounded-xl border border-dashboard-outline-variant/60 w-full h-11 shadow-inner dark:bg-ghost-white">
              <div className="flex gap-[1.5px] items-center">
                {[1, 3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 1, 2, 4, 1, 2, 1, 3, 1].map((width, i) => (
                  <div key={i} className="bg-black h-7 rounded-[1px]" style={{ width: `${width * 1.5}px` }} />
                ))}
              </div>
              <span className="text-[9px] font-black text-black tracking-widest pl-1">R-OS-2026</span>
            </div>
          </div>

          {/* Flip Prompt Badge */}
          <span className="absolute bottom-2 right-4 text-[9px] font-bold text-dashboard-outline flex items-center gap-1">
            Tap to Flip ↻
          </span>
        </div>

        {/* ──────────────── SISI BELAKANG (BACK) ──────────────── */}
        <div 
          className="absolute inset-0 flex h-full w-full flex-col px-5 py-6 [backface-visibility:hidden] [transform:rotateY(180deg)]"
        >
          {/* Slot ID Card Header Ribbon */}
          <div className="absolute top-0 inset-x-0 h-4 bg-gradient-to-r from-azure-glow via-ube-haze to-clay-violet rounded-t-[2.25rem] opacity-80" />

          <div className="mt-4 flex items-center justify-between border-b border-dashboard-outline-variant/60 pb-3">
            <span className="text-[10px] font-black tracking-widest text-[#7b6439] uppercase">Verified ID Card</span>
            <span className="text-xs font-black text-dashboard-outline">No. 001/DEV/26</span>
          </div>

          <div className="mt-6 space-y-4 flex-1">
            <div>
              <span className="text-[9px] font-bold uppercase tracking-wider text-dashboard-outline block">Instansi / Status</span>
              <p className="text-sm font-black text-dashboard-on-surface mt-0.5">Student Builder @ Rayhan OS</p>
            </div>

            <div>
              <span className="text-[9px] font-bold uppercase tracking-wider text-dashboard-outline block">Fokus & Hobi</span>
              <p className="text-sm font-black text-dashboard-on-surface mt-0.5">Prototyping, IoT, UI/UX Interaction</p>
            </div>

            <div>
              <span className="text-[9px] font-bold uppercase tracking-wider text-dashboard-outline block">Kutipan / Motto</span>
              <p className="text-xs font-semibold italic text-dashboard-on-surface-variant leading-relaxed mt-1 border-l-2 border-lime-pop pl-2.5">
                "Code is poetry, but dashboard is proof."
              </p>
            </div>
          </div>

          {/* Stamp/Seal Visual */}
          <div className="my-3 flex items-center justify-center gap-3">
            <div className="size-10 rounded-full border-2 border-dashed border-[#7b6439]/40 flex items-center justify-center text-[10px] font-black text-[#7b6439]/60 rotate-12">
              SEAL
            </div>
            <div className="text-[10px] font-bold leading-none text-dashboard-outline">
              Sistem verifikasi dinamis berbasis portofolio presisi.
            </div>
          </div>

          {/* Action Button: Verify ID */}
          <div className="mt-auto" onClick={(e) => e.stopPropagation()}>
            <Link
              href="https://github.com/ReyyyGITHUB"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-pitch-black px-5 py-3 text-sm font-black text-ghost-white transition-transform hover:-translate-y-0.5 dark:bg-ghost-white dark:text-pitch-black ${focusRing}`}
            >
              <BrandIcon name="github" className="size-4" />
              Verify ID on GitHub
            </Link>
          </div>

          {/* Flip Prompt Badge */}
          <span className="absolute bottom-2 right-4 text-[9px] font-bold text-dashboard-outline flex items-center gap-1">
            Tap to Flip ↻
          </span>
        </div>

      </div>
    </aside>
  );
}
