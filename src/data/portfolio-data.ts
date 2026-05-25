import type { BrandIconName } from "@/components/ui/icons/brand-icons";
import rawData from "./portfolio-data.json";

export type NavItem = {
  label: string;
  href: string;
  icon: BrandIconName;
};

export const navItems = [
  { label: "Beranda", href: "/", icon: "home" },
  { label: "Proyek", href: "/projects", icon: "projects" },
  { label: "Cerita", href: "/journey", icon: "journey" },
  { label: "Stack", href: "/stack", icon: "stack" },
  { label: "Kontak", href: "/contact", icon: "contact" },
] satisfies readonly NavItem[];

export const quickLinks = [
  { label: "Instagram", href: "https://instagram.com/", icon: "instagram" },
  { label: "Threads", href: "https://threads.net/", icon: "threads" },
] as const;

export type Project = {
  slug: string;
  title: string;
  type: string;
  summary: string;
  result: string;
  stack: string[];
  image: string;
  accent: string;
  role: string;
  status: "Live" | "Prototype" | "Draft";
  year: string;
  problem: string;
  process: string[];
  solution: string;
  proof: string[];
  links: { label: string; href: string; disabled?: boolean }[];
};

export type TechItem = {
  name: string;
  group: string;
  level: string;
  note: string;
  type?: "core" | "category" | "tech";
};

export const projects: Project[] = rawData.projects as Project[];

export const techItems: TechItem[] = rawData.techItems as TechItem[];

export const featuredProjects = projects;

export const featuredProject = projects[0];

export const sideProjects = projects.slice(1, 3);

export const projectStrengths = [
  { title: "Dashboard UI", text: "Layout proof-first, cards jelas, route gampang discan.", tone: "bg-lime-pop/35", image: "/projects/dashboard-ui-strength.svg" },
  { title: "IoT Logic", text: "Sensor state, threshold, dan prototype flow buat keputusan cepat.", tone: "bg-azure-glow/25", image: "/projects/iot-logic-strength.svg" },
  { title: "UX Writing", text: "Copy manusia: konteks, peran, proses, hasil. Tanpa jargon kosong.", tone: "bg-ube-haze/30", image: "/projects/ux-writing-strength.svg" },
  { title: "Interaction", text: "Preview, shortcut, hover/tap state yang ada fungsinya.", tone: "bg-tangerine/15", image: "/projects/interaction-strength.svg" },
] as const;

export const projectCategories = [
  {
    title: "Web Development",
    keywords: ["next.js", "react", "tailwind", "frontend", "web", "dashboard"],
  },
  {
    title: "IoT / Arduino",
    keywords: ["arduino", "c++", "iot", "sensor", "automation"],
  },
  {
    title: "UX / Interaction",
    keywords: ["ux", "ux writing", "command ui", "a11y", "interaction", "konten"],
  },
] as const;

export const projectStacks = ["All", ...Array.from(new Set(projects.flatMap((project) => project.stack)))] as const;

const stackStyles: Record<string, string> = {
  "Next.js": "border-pitch-black/15 bg-pitch-black text-ghost-white dark:border-ghost-white/20",
  "Tailwind": "border-azure-glow/30 bg-azure-glow/15 text-[#09687d]",
  "React": "border-vivid-sky/30 bg-vivid-sky/15 text-[#145f9f]",
  "TypeScript": "border-clay-violet/25 bg-clay-violet/10 text-clay-violet",
  "Arduino": "border-lime-pop/40 bg-lime-pop/25 text-[#5f6f24]",
  "UX Writing": "border-tangerine/25 bg-tangerine/10 text-[#a74900]",
  "Figma": "border-ube-haze/40 bg-ube-haze/25 text-[#5b43b3]",
  "Vercel": "border-dashboard-outline-variant bg-dashboard-surface-low text-dashboard-on-surface",
};

export const stack = techItems
  .filter((item) => item.type === "tech")
  .map((item) => ({
    label: item.name,
    className: stackStyles[item.name] || "border-dashboard-outline-variant bg-dashboard-surface-low text-dashboard-on-surface",
  }));

export const journeyItems = [
  { year: "Sekarang", title: "Bangun Portfolio OS", text: "Ngerapihin proof, route, dan case study supaya kerjaan lebih gampang discan." },
  { year: "2026", title: "Frontend dashboard", text: "Fokus ke Next.js, Tailwind v4, responsive layout, dan UI yang punya alasan." },
  { year: "2025", title: "IoT prototype", text: "Eksperimen Arduino, sensor, dan cara data teknis jadi keputusan visual." },
  { year: "Awal", title: "Belajar by shipping", text: "Mulai dari UI kecil, logic sederhana, lalu naik ke sistem yang bisa dipakai ulang." },
] as const;

export const proofTickerItems = [
  { icon: "/icons/tech/nextjs.svg", label: "Next.js" },
  { icon: "/icons/tech/arduino.svg", label: "Arduino" },
  { icon: "/icons/tech/figma.svg", label: "Sistem UI" },
  { icon: "/icons/tech/vercel.svg", label: "Studi Kasus" },
] as const;

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getProjectSearchText(project: Project) {
  return `${project.title} ${project.type} ${project.summary} ${project.result} ${project.role} ${project.stack.join(" ")}`.toLowerCase();
}

export function getRelatedProjects(slug: string) {
  return projects.filter((project) => project.slug !== slug).slice(0, 2);
}
