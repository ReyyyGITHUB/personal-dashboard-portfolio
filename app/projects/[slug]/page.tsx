import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { focusRing } from "@/lib/ui";
import { getProject, getRelatedProjects, projects } from "@/lib/portfolio-data";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const relatedProjects = getRelatedProjects(project.slug);

  return (
    <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-4 px-5 py-5 sm:px-6 lg:grid-cols-12 lg:gap-5 lg:px-10 lg:py-8">
        <section className="overflow-hidden rounded-[2.25rem] border border-dashboard-outline-variant bg-dashboard-surface-lowest shadow-subtle lg:col-span-12">
          <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="p-6 lg:p-8">
              <Link href="/projects" className={`inline-flex rounded-full border border-dashboard-outline-variant bg-dashboard-surface-low px-3 py-1.5 text-xs font-bold text-dashboard-on-surface-variant ${focusRing}`}>
                ← Kembali ke projects
              </Link>
              <p className="mt-6 text-xs font-black uppercase tracking-[0.18em] text-dashboard-outline">{project.type}</p>
              <h1 className="mt-3 text-4xl font-black tracking-[-0.06em] sm:text-6xl">{project.title}</h1>
              <p className="mt-4 max-w-2xl text-base font-semibold leading-7 text-dashboard-on-surface-variant">{project.summary}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {[project.role, project.status, project.year, ...project.stack].map((item) => (
                  <span key={item} className="rounded-full border border-dashboard-outline-variant bg-dashboard-surface-low px-3 py-1.5 text-xs font-bold text-dashboard-on-surface-variant">{item}</span>
                ))}
              </div>
            </div>
            <div className="relative min-h-[260px] border-t border-dashboard-outline-variant bg-dashboard-surface-low lg:border-l lg:border-t-0">
              <Image src={project.image} alt="" fill sizes="(min-width: 1024px) 520px, 100vw" className="object-cover" priority />
            </div>
          </div>
        </section>

        <section className="grid gap-4 lg:col-span-8">
          <article className="rounded-[2rem] border border-dashboard-outline-variant bg-dashboard-surface-lowest p-6 shadow-subtle">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-dashboard-outline">Problem</p>
            <p className="mt-3 text-xl font-black tracking-[-0.03em]">{project.problem}</p>
          </article>
          <article className="rounded-[2rem] border border-dashboard-outline-variant bg-dashboard-surface-lowest p-6 shadow-subtle">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-dashboard-outline">Process</p>
            <div className="mt-5 grid gap-3">
              {project.process.map((step, index) => (
                <div key={step} className="flex gap-3 rounded-2xl border border-dashboard-outline-variant bg-dashboard-surface-low p-4">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-pitch-black text-xs font-black text-ghost-white">{index + 1}</span>
                  <p className="text-sm font-semibold leading-6 text-dashboard-on-surface-variant">{step}</p>
                </div>
              ))}
            </div>
          </article>
          <article className="rounded-[2rem] border border-dashboard-outline-variant bg-dashboard-surface-lowest p-6 shadow-subtle">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-dashboard-outline">Solution</p>
            <p className="mt-3 text-lg font-semibold leading-8 text-dashboard-on-surface-variant">{project.solution}</p>
          </article>
        </section>

        <aside className="grid gap-4 lg:col-span-4">
          <article className="rounded-[2rem] border border-dashboard-outline-variant bg-pitch-black p-6 text-ghost-white shadow-subtle">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-lime-pop">Proof</p>
            <ul className="mt-5 space-y-3">
              {project.proof.map((item) => (
                <li key={item} className="rounded-2xl bg-ghost-white/10 p-3 text-sm font-semibold leading-6 text-ghost-white/80">{item}</li>
              ))}
            </ul>
          </article>
          <article className="rounded-[2rem] border border-dashboard-outline-variant bg-dashboard-surface-lowest p-6 shadow-subtle">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-dashboard-outline">Links</p>
            <div className="mt-4 grid gap-2">
              {project.links.map((link) => (
                <Link key={link.label} href={link.href} aria-disabled={link.disabled} className={`rounded-2xl border border-dashboard-outline-variant px-4 py-3 text-sm font-bold ${link.disabled ? "pointer-events-none bg-dashboard-surface-low text-dashboard-outline" : `bg-dashboard-surface-lowest text-dashboard-on-surface hover:bg-dashboard-surface-low ${focusRing}`}`}>
                  {link.label}{link.disabled ? " · soon" : " →"}
                </Link>
              ))}
            </div>
          </article>
        </aside>

        <section className="lg:col-span-12">
          <h2 className="text-2xl font-black tracking-[-0.04em]">Related proof</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {relatedProjects.map((item) => (
              <Link key={item.slug} href={`/projects/${item.slug}`} className={`rounded-[2rem] border border-dashboard-outline-variant bg-dashboard-surface-lowest p-5 shadow-subtle transition-transform hover:-translate-y-1 ${focusRing}`}>
                <p className="text-xs font-bold text-dashboard-outline">{item.type}</p>
                <h3 className="mt-2 text-xl font-black">{item.title}</h3>
                <p className="mt-2 text-sm font-semibold leading-6 text-dashboard-on-surface-variant">{item.result}</p>
              </Link>
            ))}
          </div>
        </section>
    </div>
  );
}
