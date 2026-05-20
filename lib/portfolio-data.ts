import type { BrandIconName } from "@/components/icons/brand-icons";

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

export const projects: Project[] = [
  {
    slug: "portfolio-os",
    title: "Portfolio OS",
    type: "Dashboard personal",
    summary: "Portfolio multi-page yang terasa seperti lightweight dashboard, bukan landing page panjang.",
    result: "Shell multi-halaman, kartu bukti, dan struktur rute yang rapi.",
    stack: ["Next.js", "Tailwind", "UX"],
    image: "/projects/portfolio-os.svg",
    accent: "bg-clay-violet",
    role: "Frontend",
    status: "Live",
    year: "2026",
    problem: "Portfolio lama gampang jadi template generik dan susah nunjukin bukti kerja dalam 30 detik.",
    process: ["Kunci arah dashboard OS.", "Pecah konten jadi route proof, journey, stack, contact.", "Bangun card yang selalu punya konteks, peran, hasil."],
    solution: "App shell ringan dengan sidebar, dashboard home, dan case study yang bisa diskalakan ke CMS phase 2.",
    proof: ["Home dashboard prerendered static.", "Konten proof-first, bukan filler stat palsu.", "Struktur siap untuk command menu dan preview modal."],
    links: [{ label: "Lihat halaman", href: "/" }, { label: "Repository", href: "#", disabled: true }],
  },
  {
    slug: "smart-farm-monitor",
    title: "Smart Farm Monitor",
    type: "Prototipe IoT",
    summary: "Monitoring farm kecil dengan logika sensor, threshold, dan UI status cepat.",
    result: "Logika sensor, tampilan dashboard, dan alur otomasi Arduino.",
    stack: ["Arduino", "C++", "UI"],
    image: "/projects/smart-farm-monitor.svg",
    accent: "bg-lime-pop",
    role: "IoT Logic",
    status: "Prototype",
    year: "2025",
    problem: "Data sensor mentah sulit dibaca cepat saat perlu keputusan watering atau warning.",
    process: ["Definisikan threshold kelembapan dan suhu.", "Buat state normal, warning, critical.", "Rancang dashboard ringkas untuk operator non-teknis."],
    solution: "Prototype monitoring yang mengubah bacaan sensor jadi status visual dan aksi yang jelas.",
    proof: ["Rule threshold sederhana, mudah debug.", "UI fokus ke status, bukan angka berlebihan.", "Siap disambung ke data logger."],
    links: [{ label: "Preview", href: "#", disabled: true }],
  },
  {
    slug: "case-study-system",
    title: "Sistem Studi Kasus",
    type: "Format bukti proyek",
    summary: "Template narasi proyek supaya tiap karya punya masalah, proses, peran, dan hasil yang jelas.",
    result: "Layout cerita reusable untuk masalah, peran, proses, dan hasil.",
    stack: ["UX Writing", "Konten", "Next.js"],
    image: "/projects/case-study-system.svg",
    accent: "bg-tangerine",
    role: "UX Writing",
    status: "Draft",
    year: "2026",
    problem: "Project card sering cuma cantik, tapi tidak menjawab owner ngapain dan impact-nya apa.",
    process: ["Audit pola case study portfolio.", "Buang section yang tidak perlu.", "Susun blok bukti yang konsisten."],
    solution: "Format singkat yang bisa dipakai semua project tanpa bikin halaman terasa seperti artikel panjang.",
    proof: ["Setiap project punya role dan result.", "Bisa dipakai untuk proyek frontend dan IoT.", "Cocok untuk static MVP dan CMS phase 2."],
    links: [{ label: "Baca format", href: "#", disabled: true }],
  },
  {
    slug: "command-workspace",
    title: "Command Workspace",
    type: "Prototipe interaksi",
    summary: "Model navigasi keyboard-first untuk lompat route, cari project, dan akses action cepat.",
    result: "Model navigasi keyboard-first buat eksplorasi portfolio yang cepat.",
    stack: ["React", "Command UI", "A11y"],
    image: "/projects/command-workspace.svg",
    accent: "bg-azure-glow",
    role: "Interaction",
    status: "Prototype",
    year: "2026",
    problem: "Visitor yang tahu tujuannya perlu akses cepat tanpa scroll panjang.",
    process: ["Petakan command utama.", "Prioritaskan route dan project search.", "Pastikan fitur bukan hover-only."],
    solution: "Command menu ringan yang nanti bisa lazy-loaded sebagai interactive island.",
    proof: ["Shortcut jelas di sidebar.", "Action tetap punya alternatif klik/tap.", "Tidak masuk initial JS sebelum dibutuhkan."],
    links: [{ label: "Prototype", href: "#", disabled: true }],
  },
];

export const featuredProjects = projects;

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

export const techItems = [
  { name: "Next.js", group: "Frontend", level: "Daily", note: "App Router, RSC-first, static pages." },
  { name: "Tailwind", group: "Styling", level: "Daily", note: "Token-driven UI, responsive dashboard." },
  { name: "React", group: "Frontend", level: "Daily", note: "Interactive islands, component structure." },
  { name: "TypeScript", group: "Code Quality", level: "Comfortable", note: "Types for data, props, route params." },
  { name: "Arduino", group: "IoT", level: "Prototype", note: "Sensor logic, threshold, automation flow." },
  { name: "Figma", group: "Design", level: "Comfortable", note: "Wireframe, component thinking, handoff." },
] as const;

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

export function getRelatedProjects(slug: string) {
  return projects.filter((project) => project.slug !== slug).slice(0, 2);
}
