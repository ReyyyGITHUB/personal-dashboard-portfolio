import type { BrandIconName } from "@/components/icons/brand-icons";

export type NavItem = {
  label: string;
  href: string;
  icon: BrandIconName;
  active: boolean;
};

export const navItems = [
  { label: "Beranda", href: "/", icon: "home", active: true },
  { label: "Proyek", href: "/projects", icon: "projects", active: false },
  { label: "Cerita", href: "/journey", icon: "journey", active: false },
  { label: "Stack", href: "/stack", icon: "stack", active: false },
  { label: "Kontak", href: "/contact", icon: "contact", active: false },
] satisfies readonly NavItem[];

export const quickLinks = [
  { label: "Instagram", href: "https://instagram.com/", icon: "instagram" },
  { label: "Threads", href: "https://threads.net/", icon: "threads" },
] as const;

export const featuredProjects = [
  {
    title: "Portfolio OS",
    type: "Dashboard personal",
    result: "Shell multi-halaman, kartu bukti, dan struktur rute yang rapi.",
    stack: ["Next.js", "Tailwind", "UX"],
    image: "/projects/portfolio-os.svg",
    accent: "bg-clay-violet",
    role: "Frontend",
    status: "Live",
  },
  {
    title: "Smart Farm Monitor",
    type: "Prototipe IoT",
    result: "Logika sensor, tampilan dashboard, dan alur otomasi Arduino.",
    stack: ["Arduino", "C++", "UI"],
    image: "/projects/smart-farm-monitor.svg",
    accent: "bg-lime-pop",
    role: "IoT Logic",
    status: "Prototype",
  },
  {
    title: "Sistem Studi Kasus",
    type: "Format bukti proyek",
    result: "Layout cerita reusable untuk masalah, peran, proses, dan hasil.",
    stack: ["UX Writing", "Konten", "Next.js"],
    image: "/projects/case-study-system.svg",
    accent: "bg-tangerine",
    role: "UX Writing",
    status: "Draft",
  },
  {
    title: "Command Workspace",
    type: "Prototipe interaksi",
    result: "Model navigasi keyboard-first buat eksplorasi portfolio yang cepat.",
    stack: ["React", "Command UI", "A11y"],
    image: "/projects/command-workspace.svg",
    accent: "bg-azure-glow",
    role: "Interaction",
    status: "Prototype",
  },
] as const;

export const stack = [
  { label: "Next.js", className: "border-pitch-black/15 bg-pitch-black text-ghost-white dark:border-ghost-white/20" },
  { label: "Tailwind", className: "border-azure-glow/30 bg-azure-glow/15 text-[#09687d]" },
  { label: "React", className: "border-vivid-sky/30 bg-vivid-sky/15 text-[#145f9f]" },
  { label: "TypeScript", className: "border-clay-violet/25 bg-clay-violet/10 text-clay-violet" },
  { label: "Arduino", className: "border-lime-pop/40 bg-lime-pop/25 text-[#5f6f24]" },
  { label: "UX Writing", className: "border-tangerine/25 bg-tangerine/10 text-[#a74900]" },
  { label: "Figma", className: "border-ube-haze/40 bg-ube-haze/25 text-[#5b43b3]" },
  { label: "Vercel", className: "border-dashboard-outline-variant bg-dashboard-surface-low text-dashboard-on-surface" },
] as const;

export const proofTickerItems = [
  { icon: "/icons/tech/nextjs.svg", label: "Next.js" },
  { icon: "/icons/tech/arduino.svg", label: "Arduino" },
  { icon: "/icons/tech/figma.svg", label: "Sistem UI" },
  { icon: "/icons/tech/vercel.svg", label: "Studi Kasus" },
] as const;
