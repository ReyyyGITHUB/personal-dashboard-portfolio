import { ProjectBrowser } from "@/components/project-browser";
import { projects } from "@/lib/portfolio-data";

export default function ProjectsPage() {
  return (
    <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-4 px-5 py-5 sm:px-6 lg:grid-cols-12 lg:gap-5 lg:px-10 lg:py-8">
        <section className="rounded-[2.25rem] border border-dashboard-outline-variant bg-dashboard-surface-lowest p-6 shadow-subtle lg:col-span-8 lg:p-8">
          <p className="mb-4 inline-flex rounded-full border border-dashboard-outline-variant bg-dashboard-surface-low px-3 py-1 text-xs font-bold text-dashboard-on-surface-variant">
            Project proof
          </p>
          <h1 className="max-w-3xl text-4xl font-black tracking-[-0.06em] sm:text-5xl">Bukan galeri cantik. Ini bukti kerja yang bisa dibaca cepat.</h1>
          <p className="mt-4 max-w-2xl text-base font-semibold leading-7 text-dashboard-on-surface-variant">
            Tiap project punya konteks, role, proses, dan hasil. MVP masih static, tapi struktur siap naik ke CMS phase 2.
          </p>
        </section>

        <aside className="rounded-[2.25rem] border border-dashboard-outline-variant bg-pitch-black p-6 text-ghost-white shadow-subtle lg:col-span-4">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-lime-pop">Snapshot</p>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <div><p className="text-3xl font-black">{projects.length}</p><p className="text-xs font-bold text-ghost-white/65">Project</p></div>
            <div><p className="text-3xl font-black">3</p><p className="text-xs font-bold text-ghost-white/65">Mode bukti</p></div>
          </div>
          <p className="mt-6 text-sm font-semibold leading-6 text-ghost-white/75">Frontend, IoT logic, interaction, dan writing system. Fokus: jelas dulu, fancy belakangan.</p>
        </aside>

        <ProjectBrowser projects={projects} />
    </div>
  );
}
