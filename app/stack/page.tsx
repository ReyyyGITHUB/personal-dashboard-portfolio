import Link from "next/link";
import { focusRing } from "@/lib/ui";
import { projects, techItems } from "@/lib/portfolio-data";

export default function StackPage() {
  return (
    <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-4 px-5 py-5 sm:px-6 lg:grid-cols-12 lg:gap-5 lg:px-10 lg:py-8">
        <section className="rounded-[2.25rem] border border-dashboard-outline-variant bg-dashboard-surface-lowest p-6 shadow-subtle lg:col-span-7 lg:p-8">
          <p className="mb-4 inline-flex rounded-full border border-dashboard-outline-variant bg-dashboard-surface-low px-3 py-1 text-xs font-bold text-dashboard-on-surface-variant">Tech radar</p>
          <h1 className="max-w-3xl text-4xl font-black tracking-[-0.06em] sm:text-5xl">Stack yang dipakai buat ship, bukan cuma logo parade.</h1>
          <p className="mt-4 max-w-2xl text-base font-semibold leading-7 text-dashboard-on-surface-variant">Radar ini nunjukin alat yang benar-benar kepakai di project: frontend, styling, prototyping, dan IoT logic.</p>
        </section>

        <aside className="relative min-h-[320px] overflow-hidden rounded-[2.25rem] border border-dashboard-outline-variant bg-pitch-black p-6 text-ghost-white shadow-subtle lg:col-span-5">
          <div className="absolute inset-8 rounded-full border border-ghost-white/10" />
          <div className="absolute inset-16 rounded-full border border-ghost-white/10" />
          <div className="absolute left-1/2 top-1/2 grid size-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-lime-pop text-sm font-black text-pitch-black">Core</div>
          {techItems.slice(0, 6).map((item, index) => (
            <span key={item.name} className="absolute rounded-full bg-ghost-white px-3 py-1.5 text-xs font-black text-pitch-black" style={{ left: `${18 + (index % 3) * 28}%`, top: `${18 + Math.floor(index / 3) * 48}%` }}>{item.name}</span>
          ))}
        </aside>

        <section className="grid gap-4 md:grid-cols-2 lg:col-span-8">
          {techItems.map((item) => (
            <article key={item.name} className="rounded-[2rem] border border-dashboard-outline-variant bg-dashboard-surface-lowest p-5 shadow-subtle">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-xl font-black tracking-[-0.03em]">{item.name}</h2>
                <span className="rounded-full bg-dashboard-surface-low px-2.5 py-1 text-xs font-bold text-dashboard-on-surface-variant">{item.level}</span>
              </div>
              <p className="mt-2 text-xs font-black uppercase tracking-[0.14em] text-dashboard-outline">{item.group}</p>
              <p className="mt-3 text-sm font-semibold leading-6 text-dashboard-on-surface-variant">{item.note}</p>
            </article>
          ))}
        </section>

        <aside className="rounded-[2rem] border border-dashboard-outline-variant bg-dashboard-surface-lowest p-6 shadow-subtle lg:col-span-4">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-dashboard-outline">Stack → proof</p>
          <div className="mt-4 grid gap-2">
            {projects.map((project) => (
              <Link key={project.slug} href={`/projects/${project.slug}`} className={`rounded-2xl bg-dashboard-surface-low p-4 ${focusRing}`}>
                <p className="text-sm font-black">{project.title}</p>
                <p className="mt-1 text-xs font-semibold text-dashboard-on-surface-variant">{project.stack.join(" · ")}</p>
              </Link>
            ))}
          </div>
        </aside>`r`n    </div>
  );
}