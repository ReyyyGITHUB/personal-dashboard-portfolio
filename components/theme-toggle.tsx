"use client";

import { useState } from "react";

type ThemeToggleProps = {
  focusRing: string;
};

export function ThemeToggle({ focusRing }: ThemeToggleProps) {
  const [theme, setTheme] = useState<"light" | "dark">(() => (typeof document !== "undefined" && document.documentElement.classList.contains("dark") ? "dark" : "light"));

  function toggleTheme() {
    setTheme((current) => {
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.classList.toggle("dark", next === "dark");
      localStorage.setItem("theme", next);
      window.dispatchEvent(new CustomEvent("portfolio-theme-change", { detail: next }));
      return next;
    });
  }

  return (
    <button
      type="button"
      aria-label={theme === "dark" ? "Aktifkan tema terang" : "Aktifkan tema gelap"}
      aria-pressed={theme === "dark"}
      onClick={toggleTheme}
      className={`grid size-9 place-items-center rounded-xl border border-dashboard-outline-variant bg-dashboard-surface-low text-sm font-black transition hover:border-dashboard-outline motion-reduce:transition-none ${focusRing}`}
    >
      {theme === "dark" ? "☀" : "☾"}
    </button>
  );
}
