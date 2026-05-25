"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BrandIcon, type BrandIconName } from "@/components/ui/icons/brand-icons";
import { ThemeToggle } from "@/components/ui/theme-toggle";

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
  const router = useRouter();

  useEffect(() => {
    document.documentElement.style.setProperty("--sidebar-width", isCollapsed ? "80px" : "240px");
    localStorage.setItem("sidebar-collapsed", String(isCollapsed));
  }, [isCollapsed]);

  useEffect(() => {
    const prefetchRoutes = () => navItems.forEach((item) => router.prefetch(item.href));
    const idleId = "requestIdleCallback" in window ? window.requestIdleCallback(prefetchRoutes) : globalThis.setTimeout(prefetchRoutes, 800);

    return () => {
      if ("cancelIdleCallback" in window && typeof idleId === "number") window.cancelIdleCallback(idleId);
      else globalThis.clearTimeout(idleId);
    };
  }, [navItems, router]);

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  // Prevent initial render mismatch or flash while mounting
  const sidebarWidthClass = isCollapsed ? "w-20 px-3" : "w-60 px-4";

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-30 hidden border-r border-dashboard-outline-variant bg-dashboard-surface-lowest py-5 transition-[width] duration-300 ease-out lg:flex lg:flex-col ${sidebarWidthClass}`}
    >
      <div className={`mb-7 flex gap-2 ${isCollapsed ? "flex-col items-center" : "items-center justify-between"}`}>
        <Link
          href="/"
          className={`flex min-w-0 items-center gap-3 rounded-2xl p-2 ${isCollapsed ? "justify-center" : ""} ${focusRing}`}
        >
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-pitch-black text-sm font-bold text-ghost-white dark:bg-ghost-white dark:text-pitch-black">
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
              className={`group relative flex items-center rounded-xl px-3 py-2.5 text-sm font-semibold transition-all hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${focusRing} ${
                isCollapsed ? "justify-center" : "justify-between"
              } ${
                active
                  ? "bg-pitch-black text-ghost-white shadow-subtle dark:bg-ghost-white dark:text-pitch-black"
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

              {/* Premium custom tooltip on hover when collapsed */}
              {isCollapsed && (
                <div className="absolute left-[calc(100%+14px)] top-1/2 -translate-y-1/2 z-50 pointer-events-none opacity-0 scale-95 origin-left group-hover:opacity-100 group-hover:scale-100 transition-all duration-150 ease-out">
                  <div className="relative rounded-xl border border-dashboard-outline-variant bg-dashboard-surface-lowest px-3 py-2 text-xs font-black text-dashboard-on-surface shadow-subtle whitespace-nowrap">
                    {item.label}
                    {/* Small arrow */}
                    <div className="absolute top-1/2 -left-1 -translate-y-1/2 size-2 rotate-45 border-l border-b border-dashboard-outline-variant bg-dashboard-surface-lowest" />
                  </div>
                </div>
              )}
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
