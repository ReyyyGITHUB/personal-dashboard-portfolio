import Link from "next/link";
import Image from "next/image";
import { DesktopSidebar } from "@/components/desktop-sidebar";
import { BrandIcon } from "@/components/icons/brand-icons";
import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { SpotlightCard } from "@/components/spotlight-card";

const navItems = [
  { label: "Beranda", href: "/", icon: "home", active: true },
  { label: "Proyek", href: "/projects", icon: "projects", active: false },
  { label: "Cerita", href: "/journey", icon: "journey", active: false },
  { label: "Stack", href: "/stack", icon: "stack", active: false },
  { label: "Kontak", href: "/contact", icon: "contact", active: false },
] as const;

const quickLinks = [
  { label: "Instagram", href: "https://instagram.com/", icon: "instagram" },
  { label: "Threads", href: "https://threads.net/", icon: "threads" },
] as const;

const featuredProjects = [
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
];

const stack = [
  { label: "Next.js", className: "border-pitch-black/15 bg-pitch-black text-ghost-white dark:border-ghost-white/20" },
  { label: "Tailwind", className: "border-azure-glow/30 bg-azure-glow/15 text-[#09687d]" },
  { label: "React", className: "border-vivid-sky/30 bg-vivid-sky/15 text-[#145f9f]" },
  { label: "TypeScript", className: "border-clay-violet/25 bg-clay-violet/10 text-clay-violet" },
  { label: "Arduino", className: "border-lime-pop/40 bg-lime-pop/25 text-[#5f6f24]" },
  { label: "UX Writing", className: "border-tangerine/25 bg-tangerine/10 text-[#a74900]" },
  { label: "Figma", className: "border-ube-haze/40 bg-ube-haze/25 text-[#5b43b3]" },
  { label: "Vercel", className: "border-dashboard-outline-variant bg-dashboard-surface-low text-dashboard-on-surface" },
] as const;
const proofTickerItems = [
  { icon: "/icons/tech/nextjs.svg", label: "Next.js" },
  { icon: "/icons/tech/arduino.svg", label: "Arduino" },
  { icon: "/icons/tech/figma.svg", label: "Sistem UI" },
  { icon: "/icons/tech/vercel.svg", label: "Studi Kasus" },
] as const;
const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay-violet focus-visible:ring-offset-2 focus-visible:ring-offset-dashboard-background";

type ContributionDay = {
  date: string;
  contributionCount: number;
  color: string;
};

type GitHubActivity = {
  totalContributions: number;
  weeks: {
    contributionDays: ContributionDay[];
  }[];
};

type GitHubCommit = {
  message: string;
  repo: string;
  url: string;
  pushedAt: string;
};

type GitHubPublicEvent = {
  type: string;
  created_at: string;
  repo: {
    name: string;
  };
  payload: {
    commits?: {
      message: string;
      sha: string;
      url: string;
    }[];
  };
};

const githubActivityQuery = `
  query GitHubActivity($username: String!) {
    user(login: $username) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              color
            }
          }
        }
      }
    }
  }
`;

async function getGitHubActivity(): Promise<GitHubActivity | null> {
  const token = process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME;

  if (!token || !username) {
    return null;
  }

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: githubActivityQuery,
        variables: { username },
      }),
      next: { revalidate: 21600 },
    });

    if (!response.ok) {
      return null;
    }

    const payload = await response.json();

    return payload.data?.user?.contributionsCollection?.contributionCalendar ?? null;
  } catch {
    return null;
  }
}

async function getGitHubCommits(): Promise<GitHubCommit[]> {
  const username = process.env.GITHUB_USERNAME ?? "ReyyyGITHUB";

  try {
    const response = await fetch(`https://api.github.com/users/${username}/events/public?per_page=30`, {
      headers: {
        Accept: "application/vnd.github+json",
      },
      next: { revalidate: 21600 },
    });

    if (!response.ok) {
      return [];
    }

    const events = (await response.json()) as GitHubPublicEvent[];

    return events
      .filter((event) => event.type === "PushEvent")
      .flatMap((event) =>
        (event.payload.commits ?? []).map((commit) => ({
          message: commit.message.split("\n")[0],
          repo: event.repo.name.replace(`${username}/`, ""),
          url: commit.url.replace("api.github.com/repos", "github.com").replace("/commits/", "/commit/"),
          pushedAt: event.created_at,
        }))
      )
      .slice(0, 3);
  } catch {
    return [];
  }
}

export default async function Home() {
  const [githubActivity, githubCommits] = await Promise.all([getGitHubActivity(), getGitHubCommits()]);

  return (
    <main className="min-h-screen bg-dashboard-background text-dashboard-on-background">
      <Preloader />

      <div className="home-shell min-h-screen w-full">
        <DesktopSidebar navItems={navItems} focusRing={focusRing} />

        <section className="flex min-w-0 flex-1 flex-col transition-[padding] duration-300 ease-out lg:pl-[var(--sidebar-width,240px)]">
          <header className="sticky top-0 z-20 flex items-center justify-between border-b border-dashboard-outline-variant bg-dashboard-background/90 px-5 py-4 backdrop-blur lg:hidden">
            <Link href="/" className={`flex items-center gap-3 rounded-xl ${focusRing}`}>
              <span className="grid size-9 place-items-center rounded-xl bg-pitch-black text-xs font-bold text-ghost-white">
                R
              </span>
              <span>
                <span className="block text-sm font-bold">Rayhan OS</span>
                <span className="block text-[11px] font-medium text-dashboard-on-surface-variant">
                  Dashboard playful · Sistem UI · Prototipe IoT
                </span>
              </span>
            </Link>
            <button className={`rounded-xl border border-dashboard-outline-variant px-3 py-2 text-sm font-bold ${focusRing}`}>
              Menu
            </button>
          </header>

          <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-4 px-5 py-5 sm:px-6 lg:grid-cols-12 lg:gap-5 lg:px-10 lg:py-8">
            <SpotlightCard
              className="group rounded-[2.25rem] border border-dashboard-outline-variant bg-dashboard-surface-lowest p-6 shadow-subtle lg:col-span-8 lg:p-8"
              spotlightColor="rgba(203, 216, 16, 0.22)"
            >
              <p className="mb-4 inline-flex rounded-full border border-dashboard-outline-variant bg-dashboard-surface-low px-3 py-1 text-xs font-semibold tracking-[0.03em] text-dashboard-on-surface-variant">
                Dashboard playful · Sistem UI · Prototipe IoT
              </p>
              <h1 className="max-w-2xl text-4xl font-bold leading-[1.04] tracking-[-0.04em] text-dashboard-on-surface sm:text-5xl lg:text-5xl">
                Rayhan bikin dashboard, interface, dan cerita proyek yang bisa dicek.
              </h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-dashboard-on-surface-variant">
                Gua bikin dashboard web yang cepat, sistem UI yang rapi, dan bukti proyek yang nggak cuma pajangan.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/projects"
                  className={`inline-flex items-center justify-center gap-2 rounded-xl bg-pitch-black px-5 py-3 text-sm font-bold text-ghost-white transition-transform hover:-translate-y-0.5 ${focusRing}`}
                >
                  Lihat proyek
                  <BrandIcon name="arrow-up-right" />
                </Link>
                <Link
                  href="/contact"
                  className={`inline-flex items-center justify-center gap-2 rounded-xl border border-dashboard-outline-variant bg-dashboard-surface-lowest px-5 py-3 text-sm font-bold text-dashboard-on-surface transition-all hover:-translate-y-0.5 hover:bg-dashboard-surface-low ${focusRing}`}
                >
                  <BrandIcon name="mail" />
                  Kontak
                </Link>
              </div>
            </SpotlightCard>

            <aside className="overflow-hidden rounded-[2.25rem] border border-dashboard-outline-variant bg-dashboard-surface-lowest shadow-subtle lg:col-span-4">
              <div className="p-4">
                <div className="flex items-center gap-3">
                  <div className="grid size-14 shrink-0 place-items-center rounded-2xl bg-pitch-black text-xl font-black text-ghost-white">
                    R
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-black tracking-[-0.04em] text-dashboard-on-surface">Rayhan</h2>
                      <span className="rounded-full bg-lime-pop px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.12em] text-pitch-black">
                        Pelajar
                      </span>
                    </div>
                    <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-dashboard-outline">Student Builder</p>
                  </div>
                </div>

                <p className="mt-3 text-sm font-semibold leading-6 text-dashboard-on-surface-variant">
                  Belajar lewat project nyata. Lagi ngerjain Portfolio OS.
                </p>

                <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-2xl bg-dashboard-surface-low px-2 py-2">
                    <p className="text-xl font-black tracking-[-0.04em]">5+</p>
                    <p className="text-[10px] font-bold text-dashboard-on-surface-variant">Project</p>
                  </div>
                  <div className="rounded-2xl bg-dashboard-surface-low px-2 py-2">
                    <p className="text-xl font-black tracking-[-0.04em]">8</p>
                    <p className="text-[11px] font-bold text-dashboard-on-surface-variant">Stack</p>
                  </div>
                  <div className="rounded-2xl bg-dashboard-surface-low px-2 py-2">
                    <p className="text-xl font-black tracking-[-0.04em]">2</p>
                    <p className="text-[10px] font-bold text-dashboard-on-surface-variant">IoT</p>
                  </div>
                </div>

                <div className="mt-3 rounded-2xl border border-dashboard-outline-variant px-3 py-2">
                  <p className="text-[10px] font-black uppercase tracking-[0.12em] text-dashboard-outline">Project dikerjakan</p>
                  <p className="mt-1 text-sm font-black tracking-[-0.02em]">Portfolio OS</p>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2">
                  {quickLinks.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={`inline-flex items-center justify-center gap-2 rounded-xl border border-dashboard-outline-variant bg-dashboard-surface-low px-3 py-2 text-center text-xs font-bold transition-colors hover:border-dashboard-outline hover:bg-ghost-white dark:hover:bg-dashboard-surface-lowest ${focusRing}`}
                    >
                      <BrandIcon name={item.icon} className="size-5" />
                      <span className="text-[10px] font-black uppercase tracking-[0.08em]">{item.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>

            <section className="proof-ticker overflow-hidden rounded-3xl border border-dashboard-outline-variant bg-dashboard-surface-lowest py-3 shadow-subtle lg:col-span-12">
              <div className="proof-ticker-track flex gap-2 px-3">
                {[...proofTickerItems, ...proofTickerItems, ...proofTickerItems, ...proofTickerItems].map((item, index) => (
                  <span
                    key={`${item.label}-${index}`}
                    className="inline-flex items-center gap-2.5 rounded-full border border-dashboard-outline-variant bg-dashboard-surface-low px-3.5 py-2 text-xs font-bold text-dashboard-on-surface-variant"
                  >
                    <span className="grid size-8 place-items-center rounded-full bg-ghost-white p-1.5 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08)]">
                      <Image src={item.icon} alt="" width={20} height={20} className="size-5 object-contain" />
                    </span>
                    {item.label}
                  </span>
                ))}
              </div>
            </section>

            <section className="lg:col-span-8">
              <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold tracking-[0.03em] text-dashboard-outline">Bukti</p>
                  <h2 className="mt-1 text-2xl font-bold tracking-[-0.03em]">Proyek unggulan</h2>
                </div>
                <Link
                  href="/projects"
                  className={`inline-flex items-center gap-2 rounded-xl border border-dashboard-outline-variant px-3 py-2 text-sm font-bold text-clay-violet transition-all hover:-translate-y-0.5 hover:border-dashboard-outline hover:bg-dashboard-surface-low ${focusRing}`}
                >
                  Lihat semua
                  <BrandIcon name="arrow-up-right" className="size-5" />
                </Link>
              </div>

              <div className="relative">
                <div className="grid gap-4 pb-20 md:grid-cols-2">
                  {featuredProjects.map((project, index) => (
                    <RevealOnScroll key={project.title} className="h-full" delayMs={index * 80}>
                      <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-dashboard-outline-variant bg-dashboard-surface-lowest p-4 shadow-subtle transition-colors hover:border-dashboard-outline md:min-h-[520px]">
                    <ProjectThumbnail alt={`${project.title} preview`} src={project.image} />
                    <div className="mt-4 flex items-center gap-2">
                      <span className={`size-2 rounded-full ${project.accent}`} />
                      <p className="text-xs font-semibold tracking-[0.03em] text-dashboard-outline">{project.type}</p>
                    </div>
                    <h3 className="mt-3 text-xl font-bold tracking-[-0.02em]">{project.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-dashboard-on-surface-variant">{project.result}</p>
                    <div className="mt-4 flex flex-wrap gap-2 opacity-100 transition-opacity md:opacity-75 md:group-hover:opacity-100">
                      {project.stack.map((item) => (
                        <span key={item} className="rounded-full bg-dashboard-surface-low px-2.5 py-1 text-xs font-bold">
                          {item}
                        </span>
                      ))}
                    </div>
                    <div className="mt-5 flex gap-2">
                      <Link
                        href="/projects"
                        aria-label={`${project.title} detail`}
                        className={`grid size-10 place-items-center rounded-xl border border-dashboard-outline-variant bg-dashboard-surface-low transition-colors hover:border-dashboard-outline hover:bg-dashboard-primary-fixed ${focusRing}`}
                      >
                        <BrandIcon name="arrow-up-right" className="size-5" />
                      </Link>
                      <Link
                        href="https://github.com/ReyyyGITHUB"
                        aria-label={`${project.title} GitHub`}
                        className={`grid size-10 place-items-center rounded-xl border border-dashboard-outline-variant bg-dashboard-surface-low transition-colors hover:border-dashboard-outline hover:bg-dashboard-primary-fixed ${focusRing}`}
                      >
                        <BrandIcon name="github" className="size-5" />
                      </Link>
                      <Link
                        href={project.image}
                        aria-label={`${project.title} preview`}
                        className={`grid size-10 place-items-center rounded-xl border border-dashboard-outline-variant bg-dashboard-surface-low transition-colors hover:border-dashboard-outline hover:bg-dashboard-primary-fixed ${focusRing}`}
                      >
                        <BrandIcon name="preview" className="size-5" />
                      </Link>
                    </div>
                    <div className="pointer-events-none mt-auto -mx-4 -mb-4 flex min-h-24 items-end bg-gradient-to-t from-ghost-white via-ghost-white/90 to-transparent p-4 dark:from-dashboard-surface-lowest dark:via-dashboard-surface-lowest/90">
                      <Link
                        href="/projects"
                        className={`pointer-events-auto inline-flex items-center gap-2 rounded-xl bg-pitch-black px-4 py-2.5 text-sm font-bold text-ghost-white underline-offset-4 transition-colors hover:underline ${focusRing}`}
                      >
                        Lihat selengkapnya
                        <BrandIcon name="arrow-up-right" className="size-5" />
                      </Link>
                    </div>
                      </article>
                    </RevealOnScroll>
                  ))}
                </div>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 flex h-72 items-end justify-center rounded-b-[2rem] bg-gradient-to-t from-ghost-white via-ghost-white/92 via-60% to-ghost-white/0 pb-24 dark:from-dashboard-background dark:via-dashboard-background/90 dark:to-dashboard-background/0">
                  <div className="flex w-full items-center gap-4 px-6">
                    <span className="h-px flex-1 bg-gradient-to-r from-transparent via-lime-pop to-lime-pop/60" />
                    <Link
                      href="/projects"
                      className={`pointer-events-auto inline-flex items-center gap-2 rounded-2xl border border-lime-pop bg-lime-pop px-6 py-3.5 text-sm font-black text-pitch-black shadow-[0_18px_40px_rgba(203,216,16,0.28)] transition-all hover:-translate-y-0.5 hover:bg-lime-pop/90 ${focusRing}`}
                    >
                      Lihat proyek lain
                      <BrandIcon name="arrow-up-right" className="size-5" />
                    </Link>
                    <span className="h-px flex-1 bg-gradient-to-l from-transparent via-lime-pop to-lime-pop/60" />
                  </div>
                </div>
              </div>
            </section>

            <section className="grid gap-4 lg:col-span-4">
              <RevealOnScroll>
                <GitHubActivityCard activity={githubActivity} />
              </RevealOnScroll>

              <RevealOnScroll delayMs={80}>
                <GitHubCommitFeed commits={githubCommits} />
              </RevealOnScroll>

              <RevealOnScroll delayMs={120}>
              <article className="rounded-3xl border border-dashboard-outline-variant bg-dashboard-surface-lowest p-5 shadow-subtle transition-transform hover:-translate-y-0.5">
                <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.03em] text-dashboard-outline">
                  <span className="grid size-9 place-items-center rounded-xl bg-lime-pop text-pitch-black">
                    <BrandIcon name="journey" className="size-5" />
                  </span>
                  Cerita
                </p>
                <div className="mt-4 space-y-4">
                  {[
                    ["2026 · Bangun ulang portfolio", "UX dashboard, bukan template satu halaman.", "bg-clay-violet"],
                    ["Sekarang · Bukti lebih kuat", "Studi kasus dengan konteks, peran, dan hasil.", "bg-oatmeal"],
                    ["Berikutnya · Sistem preview", "Modal pakai poster dulu, tanpa iframe berat.", "bg-lime-pop"],
                  ].map(([title, body, dot]) => (
                    <div key={title} className="flex gap-3 text-sm leading-6">
                      <span className={`mt-2 size-2.5 shrink-0 rounded-full ${dot}`} />
                      <p>
                        <strong className="block">{title}</strong>
                        {body}
                      </p>
                    </div>
                  ))}
                </div>
              </article>
              </RevealOnScroll>

              <RevealOnScroll delayMs={160}>
              <section className="rounded-3xl border border-dashboard-outline-variant bg-dashboard-surface-lowest p-5 shadow-subtle transition-transform hover:-translate-y-0.5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.03em] text-dashboard-outline">
                      <span className="grid size-9 place-items-center rounded-xl bg-lime-pop text-pitch-black">
                        <BrandIcon name="stack" className="size-5" />
                      </span>
                      Cuplikan stack
                    </p>
                    <h2 className="mt-1 text-xl font-bold tracking-[-0.03em]">Tools yang benar-benar dipakai.</h2>
                  </div>
                  <span className="rounded-full bg-dashboard-surface-low px-2.5 py-1 text-xs font-bold">
                    {stack.length}
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {stack.map((item) => (
                    <span key={item.label} className={`rounded-full border px-2.5 py-1 text-xs font-bold ${item.className}`}>
                      {item.label}
                    </span>
                  ))}
                </div>
              </section>
              </RevealOnScroll>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}

function ProjectThumbnail({ alt, src }: { alt: string; src: string }) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-dashboard-outline-variant bg-dashboard-surface-low">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        sizes="(min-width: 1024px) 360px, 100vw"
      />
    </div>
  );
}

function GitHubCommitFeed({ commits }: { commits: GitHubCommit[] }) {
  return (
    <article className="rounded-3xl border border-dashboard-outline-variant bg-dashboard-surface-low p-5 shadow-subtle">
      <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.03em] text-dashboard-outline">
        <span className="grid size-9 place-items-center rounded-xl bg-[#2ea043] text-white">
          <BrandIcon name="github" className="size-5" />
        </span>
        Log ngoding
      </p>
      <h2 className="mt-3 text-xl font-bold tracking-[-0.02em]">Commit terbaru dari GitHub.</h2>

      {commits.length > 0 ? (
        <div className="mt-4 space-y-3">
          {commits.map((commit) => (
            <Link
              key={`${commit.repo}-${commit.url}`}
              href={commit.url}
              className={`block rounded-2xl border border-dashboard-outline-variant bg-dashboard-surface-lowest p-3 transition-colors hover:border-dashboard-outline hover:bg-ghost-white dark:hover:bg-dashboard-surface-low ${focusRing}`}
            >
              <span className="block truncate text-sm font-bold tracking-[-0.02em]">{commit.message}</span>
              <span className="mt-1 block text-xs font-semibold text-dashboard-on-surface-variant">
                {commit.repo} · {formatCommitDate(commit.pushedAt)}
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="mt-4 rounded-2xl border border-dashboard-outline-variant bg-dashboard-surface-lowest p-4">
          <p className="text-sm font-bold tracking-[-0.02em]">Activity belum publik.</p>
          <p className="mt-2 text-sm leading-6 text-dashboard-on-surface-variant">
            Kalau feed kosong, kemungkinan event GitHub belum kebaca atau repo masih privat.
          </p>
          <Link
            href="https://github.com/ReyyyGITHUB"
            className={`mt-3 inline-flex items-center gap-2 rounded-xl bg-pitch-black px-3 py-2 text-xs font-bold text-ghost-white ${focusRing}`}
          >
            Cek GitHub
            <BrandIcon name="arrow-up-right" className="size-4" />
          </Link>
        </div>
      )}
    </article>
  );
}

function GitHubActivityCard({ activity }: { activity: GitHubActivity | null }) {
  const days = activity?.weeks.flatMap((week) => week.contributionDays) ?? [];
  const recentDays = days.slice(-91);
  const username = process.env.GITHUB_USERNAME;
  const profileUrl = username ? `https://github.com/${username}` : "https://github.com";

  return (
    <article className="rounded-3xl border border-dashboard-outline-variant bg-dashboard-surface-low p-5 shadow-subtle transition-transform hover:-translate-y-0.5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.03em] text-dashboard-outline">
            <span className="grid size-9 place-items-center rounded-xl bg-lime-pop text-pitch-black">
              <BrandIcon name="github" className="size-5" />
            </span>
            GitHub activity
          </p>
          <h2 className="mt-1 text-xl font-bold tracking-[-0.03em]">Konsistensi build publik.</h2>
        </div>
        <span className="rounded-md bg-[#1f2a23] px-2.5 py-1 font-mono text-sm font-bold leading-none tracking-[-0.03em] text-[#57d68d] shadow-[inset_0_0_0_1px_rgba(87,214,141,0.12)]">
          {activity ? `+${activity.totalContributions.toLocaleString("en-US")}` : "-"}
        </span>
      </div>

      {activity ? (
        <>
          <div
            className="mt-5 grid grid-flow-col grid-rows-7 gap-1 overflow-hidden"
            aria-label={`${activity.totalContributions} kontribusi GitHub tahun ini`}
          >
            {recentDays.map((day) => (
              <span
                key={day.date}
                className={`size-2.5 rounded-[3px] ${getContributionClass(day.contributionCount)}`}
                title={`${day.date}: ${day.contributionCount} contributions`}
              />
            ))}
          </div>
          <p className="mt-4 text-sm leading-6 text-dashboard-on-surface-variant">
            {activity.totalContributions} kontribusi tahun ini. Cache, bukan realtime.
          </p>
          <div className="mt-3 flex items-center gap-2 text-[11px] font-bold text-dashboard-outline">
            <span>Sepi</span>
            {[0, 1, 4, 8, 12].map((count) => (
              <span key={count} className={`size-2.5 rounded-[3px] ${getContributionClass(count)}`} />
            ))}
            <span>Rame</span>
          </div>
        </>
      ) : (
        <p className="mt-4 text-sm leading-6 text-dashboard-on-surface-variant">
          Tambahkan <span className="font-bold text-dashboard-on-surface">GITHUB_TOKEN</span> dan{" "}
          <span className="font-bold text-dashboard-on-surface">GITHUB_USERNAME</span> buat nampilin heatmap.
        </p>
      )}

      <Link
        href={profileUrl}
        className={`mt-4 inline-flex items-center gap-2 rounded-lg text-sm font-bold text-[#5f6f24] underline-offset-4 hover:underline dark:text-[#b6c65a] ${focusRing}`}
      >
        <BrandIcon name="github" />
        Buka GitHub →
      </Link>
    </article>
  );
}

function formatCommitDate(date: string) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
  }).format(new Date(date));
}

function getContributionClass(count: number) {
  if (count === 0) return "bg-dashboard-outline-variant";
  if (count <= 2) return "bg-[#dfe7b1]";
  if (count <= 5) return "bg-[#bdca6a]";
  if (count <= 10) return "bg-[#8f9f3f]";
  return "bg-[#5f6f24]";
}

function Preloader() {
  return (
    <div className="preloader fixed inset-0 z-50 grid place-items-center bg-dashboard-background p-5">
      <section
        aria-label="Loading dashboard"
        className="flex min-h-[360px] w-full max-w-md flex-col overflow-hidden rounded-[2.5rem] border border-dashboard-outline-variant bg-dashboard-surface-lowest p-6 text-center shadow-subtle sm:p-8"
      >
        <div className="mb-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="grid size-12 place-items-center rounded-2xl bg-pitch-black text-sm font-bold text-ghost-white">
              R
            </span>
            <span className="text-left">
              <span className="block text-sm font-bold">Rayhan OS</span>
              <span className="block text-xs font-medium text-dashboard-on-surface-variant">Shell portfolio</span>
            </span>
          </div>
          <span className="rounded-full bg-lime-pop px-3 py-1 text-xs font-bold text-pitch-black">Siap</span>
        </div>

        <div className="grid flex-1 place-items-center">
          <div>
            <div className="mx-auto mb-8 grid size-20 grid-cols-2 gap-2 rounded-[2rem] bg-dashboard-surface-low p-4">
              <span className="rounded-xl bg-clay-violet" />
              <span className="rounded-xl bg-ube-haze" />
              <span className="rounded-xl bg-lime-pop" />
              <span className="rounded-xl bg-dashboard-outline-variant" />
            </div>

            <h2 className="mb-2 text-2xl font-bold leading-tight tracking-[-0.01em]">
              Membuka workspace Rayhan
            </h2>
            <p className="loading-step text-base leading-relaxed text-dashboard-on-surface-variant">
              Menyiapkan proyek
            </p>
          </div>
        </div>

        <div className="mt-8">
          <div className="h-2 overflow-hidden rounded-full bg-dashboard-surface-low">
            <div className="loading-progress h-full rounded-full bg-dashboard-primary" />
          </div>
          <p className="mt-3 text-xs font-bold leading-tight text-dashboard-outline">
            Proyek, catatan, dan kontak siap
          </p>
        </div>
      </section>
    </div>
  );
}





