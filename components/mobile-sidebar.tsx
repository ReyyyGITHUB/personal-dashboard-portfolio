"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { BrandIcon, type BrandIconName } from "@/components/icons/brand-icons";

type NavItem = {
  label: string;
  href: string;
  icon: BrandIconName;
  active: boolean;
};

type MobileSidebarProps = {
  navItems: readonly NavItem[];
  focusRing: string;
};

export function MobileSidebar({ navItems, focusRing }: MobileSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarId = useId();

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        aria-label="Buka menu"
        aria-expanded={isOpen}
        aria-controls={sidebarId}
        onClick={() => setIsOpen(true)}
        className={`grid size-9 place-items-center rounded-lg border border-dashboard-outline-variant/80 bg-dashboard-surface-low/80 text-dashboard-on-surface shadow-subtle ${focusRing}`}
      >
        <BrandIcon name="menu" className="size-4" />
      </button>

      {isOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-labelledby={`${sidebarId}-title`}>
          <button
            type="button"
            aria-label="Tutup menu"
            className="absolute inset-0 bg-pitch-black/25 backdrop-blur-[1px]"
            onClick={() => setIsOpen(false)}
          />
          <aside
            id={sidebarId}
            className="absolute right-0 top-0 flex h-dvh w-[min(84vw,300px)] flex-col overflow-y-auto border-l border-dashboard-outline-variant bg-dashboard-surface-lowest p-4 shadow-subtle"
          >
            <div className="flex items-center justify-between gap-3">
              <Link href="/" onClick={() => setIsOpen(false)} className={`flex items-center gap-3 rounded-2xl ${focusRing}`}>
                <span className="grid size-9 place-items-center rounded-xl bg-pitch-black text-sm font-bold text-ghost-white">
                  R
                </span>
                <span>
                  <span id={`${sidebarId}-title`} className="block text-sm font-bold">Rayhan OS</span>
                  <span className="block text-xs font-medium text-dashboard-on-surface-variant">Portfolio dashboard</span>
                </span>
              </Link>
              <button
                type="button"
                aria-label="Tutup menu"
                onClick={() => setIsOpen(false)}
                className={`grid size-9 place-items-center rounded-lg border border-dashboard-outline-variant bg-dashboard-surface-low text-base font-bold ${focusRing}`}
              >
                x
              </button>
            </div>

            <nav className="mt-6 space-y-1" aria-label="Mobile navigation">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between rounded-xl px-3 py-2 text-sm font-semibold ${focusRing} ${
                    item.active
                      ? "bg-pitch-black text-ghost-white"
                      : "text-dashboard-on-surface-variant hover:bg-dashboard-surface-low hover:text-dashboard-on-surface"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span
                      className={`grid size-9 place-items-center rounded-xl ${
                        item.active ? "bg-lime-pop text-pitch-black" : "bg-dashboard-surface-low text-dashboard-outline"
                      }`}
                    >
                      <BrandIcon name={item.icon} className="size-4" />
                    </span>
                    {item.label}
                  </span>
                  {item.active ? <span className="h-5 w-1 rounded-full bg-lime-pop" /> : null}
                </Link>
              ))}
            </nav>

            <div className="mt-auto rounded-3xl border border-dashboard-outline-variant bg-dashboard-surface-low p-4">
              <p className="text-xs font-semibold tracking-[0.03em] text-dashboard-outline">Fokus sekarang</p>
              <p className="mt-2 text-sm font-bold leading-5">Bukti proyek dan preview cepat.</p>
            </div>
          </aside>
        </div>
      ) : null}
    </>
  );
}

