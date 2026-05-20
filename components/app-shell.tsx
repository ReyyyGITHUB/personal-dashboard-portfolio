"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import { DesktopSidebar } from "@/components/desktop-sidebar";
import { BrandIcon } from "@/components/icons/brand-icons";
import { MobileSidebar } from "@/components/mobile-sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { navItems } from "@/lib/home-data";
import { focusRing } from "@/lib/ui";

const CommandMenu = dynamic(() => import("@/components/command-menu").then((mod) => mod.CommandMenu), { ssr: false });

type AppShellProps = {
  children: React.ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const [isCommandLoaded, setIsCommandLoaded] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setIsCommandLoaded(true);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <main className="min-h-screen bg-dashboard-background text-dashboard-on-background">
      <div className="home-shell min-h-screen w-full">
        <DesktopSidebar navItems={navItems} focusRing={focusRing} />
        <section className="flex min-w-0 flex-1 flex-col transition-[padding] duration-300 ease-out motion-reduce:transition-none lg:pl-[var(--sidebar-width,240px)]">
          <header className="sticky top-0 z-20 flex items-center justify-between border-b border-dashboard-outline-variant/70 bg-dashboard-background/80 px-4 py-2.5 backdrop-blur-sm lg:hidden">
            <Link href="/" className={`flex items-center gap-2.5 rounded-xl ${focusRing}`}>
              <span className="grid size-8 place-items-center rounded-lg bg-pitch-black text-xs font-bold text-ghost-white">R</span>
              <span>
                <span className="block text-sm font-bold leading-none">Rayhan OS</span>
                <span className="mt-1 block text-[10px] font-medium leading-none text-dashboard-on-surface-variant">Dashboard</span>
              </span>
            </Link>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Buka command menu"
                onClick={() => setIsCommandLoaded(true)}
                className={`grid size-9 place-items-center rounded-lg border border-dashboard-outline-variant/80 bg-dashboard-surface-low/80 text-xs font-black text-dashboard-on-surface shadow-subtle ${focusRing}`}
              >
                K
              </button>
              <ThemeToggle focusRing={focusRing} />
              <MobileSidebar navItems={navItems} focusRing={focusRing} />
            </div>
          </header>
          {children}
        </section>
      </div>
      <button
        type="button"
        aria-label="Buka command menu"
        onClick={() => setIsCommandLoaded(true)}
        className={`fixed bottom-4 right-4 z-30 hidden items-center gap-2 rounded-2xl border border-dashboard-outline-variant bg-dashboard-surface-lowest px-3 py-2 text-xs font-black text-dashboard-on-surface shadow-subtle lg:inline-flex ${focusRing}`}
      >
        <BrandIcon name="menu" className="size-4" /> Ctrl K
      </button>
      {isCommandLoaded ? <CommandMenu focusRing={focusRing} /> : null}
    </main>
  );
}
