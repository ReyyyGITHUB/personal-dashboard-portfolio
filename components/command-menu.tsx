"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { navItems, projects } from "@/lib/portfolio-data";

type CommandMenuProps = {
  focusRing: string;
};

export function CommandMenu({ focusRing }: CommandMenuProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [query, setQuery] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const items = useMemo(
    () => [
      ...navItems.map((item) => ({ label: item.label, href: item.href, meta: "Route" })),
      ...projects.map((project) => ({ label: project.title, href: `/projects/${project.slug}`, meta: project.type })),
    ],
    []
  );

  const filtered = items.filter((item) => `${item.label} ${item.meta}`.toLowerCase().includes(query.toLowerCase())).slice(0, 8);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setIsOpen(true);
      }
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => inputRef.current?.focus());

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] grid place-items-start bg-pitch-black/30 px-4 py-20 backdrop-blur-[2px]" role="dialog" aria-modal="true" aria-label="Command menu">
      <button type="button" aria-label="Tutup command menu" className="absolute inset-0" onClick={() => setIsOpen(false)} />
      <div ref={dialogRef} className="relative mx-auto w-full max-w-xl overflow-hidden rounded-3xl border border-dashboard-outline-variant bg-dashboard-surface-lowest shadow-subtle">
        <div className="border-b border-dashboard-outline-variant p-3">
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Cari halaman atau proyek..."
            className={`w-full rounded-2xl bg-dashboard-surface-low px-4 py-3 text-sm font-semibold text-dashboard-on-surface outline-none placeholder:text-dashboard-outline ${focusRing}`}
          />
        </div>
        <div className="max-h-[56vh] overflow-y-auto p-2">
          {filtered.length ? (
            filtered.map((item) => (
              <Link
                key={`${item.meta}-${item.href}`}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-bold text-dashboard-on-surface hover:bg-dashboard-surface-low ${focusRing}`}
              >
                <span>{item.label}</span>
                <span className="text-xs font-semibold text-dashboard-outline">{item.meta}</span>
              </Link>
            ))
          ) : (
            <p className="px-4 py-8 text-center text-sm font-semibold text-dashboard-on-surface-variant">Tidak ada hasil.</p>
          )}
        </div>
      </div>
    </div>
  );
}
