import Link from "next/link";
import { focusRing } from "@/lib/ui";
import { journeyItems, projects } from "@/lib/portfolio-data";

export default function JourneyPage() {
  return (
    <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-4 px-5 py-5 sm:px-6 lg:grid-cols-12 lg:gap-5 lg:px-10 lg:py-8">
        <section className="rounded-[2.25rem] border border-dashboard-outline-variant bg-dashboard-surface-lowest p-6 shadow-subtle lg:col-span-8 lg:p-8">
          <p className="mb-4 inline-flex rounded-full border border-dashboard-outline-variant bg-dashboard-surface-low px-3 py-1 text-xs font-bold text-dashboard-on-surface-variant">Journey log</p>
          <h1 className="max-w-3xl text-4xl font-black tracking-[-0.06em] sm:text-5xl">Belajar lewat ship kecil, lalu dirapikan jadi sistem.</h1>
          <p className="mt-4 max-w-2xl text-base font-semibold leading-7 text-dashboard-on-surface-variant">Halaman ini bukan blog panjang. Cuma timeline singkat tentang arah belajar, eksperimen, dan cara kerja.</p>
        </section>

        <aside className="rounded-[2.25rem] border border-dashboard-outline-variant bg-pitch-black p-6 text-ghost-white shadow-subtle lg:col-span-4">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-lime-pop">Now</p>
          <h2 className="mt-4 text-3xl font-black tracking-[-0.05em]">Fokus: portfolio proof system.</h2>
          <p className="mt-4 text-sm font-semibold leading-6 text-ghost-white/75">Ngerapihin project data, case study, interaction, dan polish responsive sebelum backend masuk.</p>
        </aside>

        <section className="lg:col-span-8">
          <div className="space-y-4">
            {journeyItems.map((item) => (
              <article key={item.title} className="rounded-[2rem] border border-dashboard-outline-variant bg-dashboard-surface-lowest p-5 shadow-subtle">
                <div className="flex gap-4">
                  <span className="grid h-12 min-w-20 place-items-center rounded-2xl bg-dashboard-surface-low px-3 text-xs font-black text-dashboard-outline">{item.year}</span>
                  <div>
                    <h2 className="text-xl font-black tracking-[-0.03em]">{item.title}</h2>
                    <p className="mt-2 text-sm font-semibold leading-6 text-dashboard-on-surface-variant">{item.text}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <aside className="grid gap-4 lg:col-span-4">
          <article className="rounded-[2rem] border border-dashboard-outline-variant bg-dashboard-surface-lowest p-6 shadow-subtle">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-dashboard-outline">Prinsip kerja</p>
            <ul className="mt-4 space-y-3 text-sm font-semibold leading-6 text-dashboard-on-surface-variant">
              <li>Proof dulu, dekorasi belakangan.</li>
              <li>Komponen kecil, alasan jelas.</li>
              <li>Mobile dan low-end tetap prioritas.</li>
            </ul>
          </article>
          <article className="rounded-[2rem] border border-dashboard-outline-variant bg-dashboard-surface-lowest p-6 shadow-subtle">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-dashboard-outline">Project terbaru</p>
            <div className="mt-4 grid gap-2">
              {projects.slice(0, 2).map((project) => (
                <Link key={project.slug} href={`/projects/${project.slug}`} className={`rounded-2xl bg-dashboard-surface-low p-4 text-sm font-bold ${focusRing}`}>{project.title} →</Link>
              ))}
            </div>
          </article>
        </aside>`r`n    </div>
  );
}