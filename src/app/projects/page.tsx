import Image from "next/image";
import Link from "next/link";
import { ProjectBrowser } from "@/features/projects/project-browser";
import { featuredProject, projectStrengths, projects, sideProjects } from "@/data/portfolio-data";
import { focusRing } from "@/lib/ui";

export default function ProjectsPage() {
  return (
    <div className="mx-auto w-full max-w-[1440px] space-y-8 px-4 py-4 sm:px-6 lg:px-8 lg:py-7 xl:px-10">
      <section className="grid min-h-[min(760px,calc(100vh-56px))] gap-4 rounded-[2.75rem] bg-pitch-black p-3 text-ghost-white shadow-subtle lg:grid-cols-12 lg:p-5">
        <article className="relative overflow-hidden rounded-[2.25rem] bg-clay-violet p-6 lg:col-span-8 lg:p-9">
          <div className="relative z-10 flex h-full min-h-[420px] flex-col justify-between gap-8">
            <div>
              <p className="inline-flex rounded-full bg-ghost-white/15 px-3 py-1 text-xs font-black tracking-[0.04em] text-ghost-white/80">Project Route</p>
              <h1 className="mt-5 max-w-3xl text-5xl font-black tracking-[-0.08em] sm:text-6xl lg:text-7xl">Proof wall, bukan galeri pajangan.</h1>
              <p className="mt-5 max-w-xl text-base font-semibold leading-7 text-ghost-white/80">Semua project ditata kayak dashboard: ada konteks, role, stack, proses, dan hasil yang bisa dibaca cepat.</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link href={`/projects/${featuredProject.slug}`} className={`rounded-full bg-ghost-white px-5 py-3 text-sm font-black text-pitch-black ${focusRing}`}>Buka featured</Link>
              <span className="rounded-full border border-ghost-white/25 px-4 py-3 text-sm font-bold text-ghost-white/80">{projects.length} proof cards</span>
            </div>
          </div>
          <div className="absolute -right-10 bottom-0 h-[55%] w-[62%] opacity-95 sm:h-[70%] lg:w-[54%]">
            <Image src={featuredProject.image} alt="" fill priority sizes="(min-width: 1024px) 620px, 80vw" className="object-contain object-bottom" />
          </div>
        </article>

        <div className="grid gap-4 lg:col-span-4">
          {sideProjects.map((project, index) => (
            <Link key={project.slug} href={`/projects/${project.slug}`} className={`group relative min-h-[210px] overflow-hidden rounded-[2rem] p-5 text-pitch-black shadow-subtle ${index === 0 ? "bg-lime-pop" : "bg-azure-glow"} ${focusRing}`}>
              <p className="text-xs font-black tracking-[0.04em] opacity-70">{project.status}</p>
              <h2 className="mt-3 max-w-[13rem] text-2xl font-black tracking-[-0.05em]">{project.title}</h2>
              <p className="mt-2 max-w-[12rem] text-xs font-bold leading-5 opacity-70">{project.role} · {project.year}</p>
              <span className="absolute bottom-5 left-5 rounded-full bg-pitch-black px-3 py-1.5 text-xs font-black text-ghost-white">Case study →</span>
              <div className="absolute -bottom-8 -right-8 size-40 transition-transform group-hover:scale-[1.03] motion-reduce:transition-none">
                <Image src={project.image} alt="" fill sizes="180px" className="object-contain" />
              </div>
            </Link>
          ))}
          <article className="rounded-[2rem] bg-dashboard-surface-lowest p-5 text-dashboard-on-surface shadow-subtle">
            <p className="text-xs font-black tracking-[0.04em] text-dashboard-outline">Read system</p>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              {[
                ["Role", "siapa"],
                ["Result", "apa jadi"],
                ["Proof", "kenapa valid"],
              ].map(([title, text]) => (
                <div key={title} className="rounded-2xl bg-dashboard-surface-low p-3">
                  <p className="text-sm font-black">{title}</p>
                  <p className="mt-1 text-[10px] font-bold text-dashboard-outline">{text}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <ProjectBrowser projects={projects} />

      <section className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-3 px-1">
          <div>
            <p className="text-xs font-black tracking-[0.04em] text-dashboard-outline">More signal</p>
            <h2 className="mt-2 text-3xl font-black tracking-[-0.06em]">Yang dicek dari project gue</h2>
          </div>
          <div className="rounded-full bg-dashboard-surface-low px-3 py-2 text-xs font-black text-dashboard-on-surface-variant">Frontend first · Static MVP</div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {projectStrengths.map((item) => (
            <article key={item.title} className={`group relative overflow-hidden min-h-52 rounded-[2rem] border border-dashboard-outline-variant p-5 shadow-subtle ${item.tone}`}>
              <div className="relative z-10">
                <h3 className="text-2xl font-black tracking-[-0.05em]">{item.title}</h3>
                <p className="mt-3 max-w-[11rem] text-sm font-semibold leading-6 text-dashboard-on-surface-variant">{item.text}</p>
              </div>
              <div className="absolute -bottom-6 -right-5 size-36 opacity-90 transition-transform group-hover:scale-[1.04] motion-reduce:transition-none">
                <Image src={item.image} alt="" fill sizes="140px" className="object-contain" />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-12">
        <article className="relative overflow-hidden rounded-[2.5rem] bg-[#ffc8c4] p-6 text-pitch-black shadow-subtle lg:col-span-7 lg:p-8">
          <p className="text-xs font-black tracking-[0.04em] opacity-60">Process</p>
          <h2 className="mt-4 max-w-xl text-4xl font-black tracking-[-0.07em]">Case study pendek, tapi cukup buat ngerti cara mikir.</h2>
          <p className="mt-4 max-w-lg text-sm font-bold leading-6 opacity-70">Aku nggak numpuk dekorasi. Tiap detail project harus jawab: problem apa, aku ngapain, hasilnya apa, stack-nya relevan nggak.</p>
          <Link href={`/projects/${featuredProject.slug}`} className={`mt-6 inline-flex rounded-full bg-pitch-black px-5 py-3 text-sm font-black text-ghost-white dark:bg-ghost-white dark:text-pitch-black ${focusRing}`}>Lihat sample</Link>
          <div className="absolute -bottom-10 -right-8 size-56 opacity-80">
            <Image src="/projects/case-study-system.svg" alt="" fill sizes="260px" className="object-contain" />
          </div>
        </article>

        <div className="grid gap-4 lg:col-span-5">
          {["Dashboard page", "Prototype logic", "Frontend polish"].map((title, index) => (
            <article key={title} className={`rounded-[2rem] border border-dashboard-outline-variant p-5 shadow-subtle ${index === 2 ? "bg-pitch-black text-ghost-white dark:bg-ghost-white dark:text-pitch-black" : "bg-dashboard-surface-lowest"}`}>
              <p className={`text-xs font-black tracking-[0.04em] ${index === 2 ? "text-lime-pop" : "text-dashboard-outline"}`}>Service card</p>
              <h3 className="mt-2 text-2xl font-black tracking-[-0.05em]">{title}</h3>
              <p className={`mt-2 text-sm font-semibold leading-6 ${index === 2 ? "text-ghost-white/70 dark:text-pitch-black/70" : "text-dashboard-on-surface-variant"}`}>Bagian skill yang paling sering muncul dari kumpulan project ini.</p>
            </article>
          ))}
        </div>
      </section>

      <section className="overflow-hidden rounded-[2.75rem] bg-pitch-black p-6 text-ghost-white shadow-subtle lg:p-8 dark:bg-ghost-white dark:text-pitch-black">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div>
            <p className="text-xs font-black tracking-[0.04em] text-lime-pop">Next step</p>
            <h2 className="mt-4 max-w-2xl text-4xl font-black tracking-[-0.07em] sm:text-5xl">Mau lihat detail cara kerjanya?</h2>
            <p className="mt-4 max-w-xl text-sm font-semibold leading-6 text-ghost-white/75 dark:text-pitch-black/75">Masuk ke case study, cek prosesnya, lalu kontak kalau butuh dashboard/prototype yang mirip.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={`/projects/${featuredProject.slug}`} className={`rounded-full bg-ghost-white px-5 py-3 text-sm font-black text-pitch-black dark:bg-pitch-black dark:text-ghost-white ${focusRing}`}>Featured case</Link>
              <Link href="/contact" className={`rounded-full border border-ghost-white/25 px-5 py-3 text-sm font-black text-ghost-white dark:border-pitch-black/25 dark:text-pitch-black ${focusRing}`}>Contact</Link>
            </div>
          </div>
          <div className="relative min-h-64 rounded-[2rem] bg-gradient-to-br from-clay-violet via-ube-haze to-pitch-black">
            <div className="absolute inset-6 rounded-[1.5rem] border border-ghost-white/15 dark:border-pitch-black/15" />
            <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-ghost-white/10 p-4 backdrop-blur-sm dark:bg-pitch-black/10 dark:text-pitch-black">
              <p className="text-sm font-black">Portfolio OS</p>
              <p className="mt-1 text-xs font-semibold text-ghost-white/70 dark:text-pitch-black/70">Proof · Personality · Interaction</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
