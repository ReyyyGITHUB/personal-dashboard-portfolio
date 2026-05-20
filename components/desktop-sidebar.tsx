"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BrandIcon, type BrandIconName } from "@/components/icons/brand-icons";
import { ThemeToggle } from "@/components/theme-toggle";

type NavItem = {
  label: string;
  href: string;
  icon: BrandIconName;
};

type DesktopSidebarProps = {
  navItems: readonly NavItem[];
  focusRing: string;
};

export function DesktopSidebar({ navItems, focusRing }: DesktopSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(() => typeof window !== "undefined" && localStorage.getItem("sidebar-collapsed") === "true");
  const pathname = usePathname();


  useEffect(() => {
    document.documentElement.style.setProperty("--sidebar-width", isCollapsed ? "80px" : "240px");
    localStorage.setItem("sidebar-collapsed", String(isCollapsed));
  }, [isCollapsed]);

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-30 hidden border-r border-dashboard-outline-variant bg-dashboard-surface-lowest py-5 transition-[width] duration-300 ease-out lg:flex lg:flex-col ${
        isCollapsed ? "w-20 px-3" : "w-60 px-4"
      }`}
    >
      <div className={`mb-7 flex gap-2 ${isCollapsed ? "flex-col items-center" : "items-center justify-between"}`}>
        <Link
          href="/"
          className={`flex min-w-0 items-center gap-3 rounded-2xl p-2 ${isCollapsed ? "justify-center" : ""} ${focusRing}`}
        >
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-pitch-black text-sm font-bold text-ghost-white">
            R
          </span>
          {!isCollapsed ? (
            <span className="min-w-0">
              <span className="block text-sm font-bold tracking-[-0.01em]">Rayhan OS</span>
              <span className="block truncate text-xs font-medium text-dashboard-on-surface-variant">
                Dashboard playful · Sistem UI · Prototipe IoT
              </span>
            </span>
          ) : null}
        </Link>
        <div className="flex shrink-0 items-center gap-2">
          {!isCollapsed ? <ThemeToggle focusRing={focusRing} /> : null}
          <button
            type="button"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-pressed={isCollapsed}
            onClick={() => setIsCollapsed((value) => !value)}
            className={`grid size-9 shrink-0 place-items-center rounded-xl border border-dashboard-outline-variant bg-dashboard-surface-low text-sm font-black transition-all hover:-translate-y-0.5 hover:border-dashboard-outline motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${focusRing}`}
          >
            {isCollapsed ? ">" : "<"}
          </button>
        </div>
      </div>

      <nav className="space-y-1" aria-label="Primary navigation">
        {navItems.map((item) => {
          const active = isActive(item.href);

          return (
            <Link
              key={item.label}
              href={item.href}
              aria-current={active ? "page" : undefined}
              title={isCollapsed ? item.label : undefined}
              className={`group flex items-center rounded-xl px-3 py-2.5 text-sm font-semibold transition-all hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${focusRing} ${
              isCollapsed ? "justify-center" : "justify-between"
            } ${
              active
                ? "bg-pitch-black text-ghost-white shadow-subtle"
                : "text-dashboard-on-surface-variant hover:bg-dashboard-surface-low hover:text-dashboard-on-surface"
            }`}
            >
              <span className="flex items-center gap-2.5">
                <span
                  className={`grid size-9 place-items-center rounded-xl ${
                    active ? "bg-lime-pop text-pitch-black" : "bg-dashboard-surface-low text-dashboard-outline"
                  }`}
                >
                  <BrandIcon name={item.icon} className="size-5" />
                </span>
                {!isCollapsed ? item.label : null}
              </span>
              {!isCollapsed && active ? <span className="h-5 w-1 rounded-full bg-lime-pop" /> : null}
            </Link>
          );
        })}
      </nav>

      {isCollapsed ? (
        <div className="mt-3 grid place-items-center">
          <ThemeToggle focusRing={focusRing} />
        </div>
      ) : null}

      {!isCollapsed ? (
        <div className="mt-8 rounded-3xl border border-dashboard-outline-variant bg-dashboard-surface-lowest p-4 shadow-subtle">
          <p className="text-xs font-semibold tracking-[0.03em] text-dashboard-outline">Fokus sekarang</p>
          <p className="mt-2 text-sm font-bold leading-5">Bukti proyek dan preview cepat.</p>
          <p className="mt-1 text-xs leading-relaxed text-dashboard-on-surface-variant">
            Tiap kartu harus jelas: konteks, peran, hasil.
          </p>
        </div>
      ) : null}

      <div
        className={`mt-auto rounded-3xl border border-dashboard-outline-variant bg-dashboard-surface-low ${
          isCollapsed ? "grid place-items-center p-3" : "p-4"
        }`}
      >
        {isCollapsed ? (
          <span className="text-xs font-black text-dashboard-outline">Ctrl K</span>
        ) : (
          <>
            <p className="text-xs font-semibold tracking-[0.03em] text-dashboard-outline">Pintasan</p>
            <div className="mt-3 flex items-center gap-1.5">
              <kbd className="rounded-lg border border-dashboard-outline-variant bg-dashboard-surface-lowest px-2 py-1 text-xs font-bold">
                Ctrl
              </kbd>
              <span className="text-xs font-bold text-dashboard-outline">+</span>
              <kbd className="rounded-lg border border-dashboard-outline-variant bg-dashboard-surface-lowest px-2 py-1 text-xs font-bold">
                K
              </kbd>
            </div>
            <p className="mt-3 text-sm font-semibold">Buka command menu</p>
          </>
        )}
      </div>
    </aside>
  );
}
