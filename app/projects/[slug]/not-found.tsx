import Link from "next/link";
import { focusRing } from "@/lib/ui";

export default function NotFound() {
  return (
    <div className="mx-auto grid min-h-[70vh] w-full max-w-[760px] place-items-center px-5 py-10 text-center">
        <section className="rounded-[2.25rem] border border-dashboard-outline-variant bg-dashboard-surface-lowest p-8 shadow-subtle">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-dashboard-outline">404 project</p>
          <h1 className="mt-3 text-4xl font-black tracking-[-0.06em]">Project belum ada.</h1>
          <p className="mt-3 text-sm font-semibold leading-6 text-dashboard-on-surface-variant">Slug ini tidak cocok dengan data static MVP.</p>
          <Link href="/projects" className={`mt-6 inline-flex rounded-full bg-pitch-black px-4 py-2 text-sm font-bold text-ghost-white ${focusRing}`}>Balik ke projects</Link>
        </section>`r`n    </div>
  );
}