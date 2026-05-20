import Link from "next/link";
import { focusRing } from "@/lib/ui";
import { quickLinks } from "@/lib/portfolio-data";

export default function ContactPage() {
  return (
    <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-4 px-5 py-5 sm:px-6 lg:grid-cols-12 lg:gap-5 lg:px-10 lg:py-8">
        <section className="rounded-[2.25rem] border border-dashboard-outline-variant bg-dashboard-surface-lowest p-6 shadow-subtle lg:col-span-8 lg:p-8">
          <p className="mb-4 inline-flex rounded-full border border-dashboard-outline-variant bg-dashboard-surface-low px-3 py-1 text-xs font-bold text-dashboard-on-surface-variant">Contact CTA</p>
          <h1 className="max-w-3xl text-4xl font-black tracking-[-0.06em] sm:text-5xl">Punya project kecil, dashboard, atau prototype? Kirim konteksnya.</h1>
          <p className="mt-4 max-w-2xl text-base font-semibold leading-7 text-dashboard-on-surface-variant">Frontend-only dulu. Form ini masih prototype UI; pakai link sosial/email placeholder sampai backend phase 2 masuk.</p>
        </section>

        <aside className="rounded-[2.25rem] border border-dashboard-outline-variant bg-pitch-black p-6 text-ghost-white shadow-subtle lg:col-span-4">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-lime-pop">Availability</p>
          <h2 className="mt-4 text-3xl font-black tracking-[-0.05em]">Open untuk collab terarah.</h2>
          <p className="mt-4 text-sm font-semibold leading-6 text-ghost-white/75">Timezone Asia/Jakarta. Response target: 1-2 hari kerja.</p>
        </aside>

        <section className="rounded-[2rem] border border-dashboard-outline-variant bg-dashboard-surface-lowest p-6 shadow-subtle lg:col-span-7">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-dashboard-outline">Form prototype</p>
          <form className="mt-5 grid gap-3" aria-label="Contact form prototype">
            <input disabled placeholder="Nama" className="rounded-2xl border border-dashboard-outline-variant bg-dashboard-surface-low px-4 py-3 text-sm font-semibold placeholder:text-dashboard-on-surface-variant" />
            <input disabled placeholder="Email" className="rounded-2xl border border-dashboard-outline-variant bg-dashboard-surface-low px-4 py-3 text-sm font-semibold placeholder:text-dashboard-on-surface-variant" />
            <textarea disabled placeholder="Ceritain konteks project..." rows={6} className="resize-none rounded-2xl border border-dashboard-outline-variant bg-dashboard-surface-low px-4 py-3 text-sm font-semibold placeholder:text-dashboard-on-surface-variant" />
            <button disabled type="button" className="rounded-full bg-dashboard-outline-variant px-4 py-3 text-sm font-black text-dashboard-outline">Backend belum aktif</button>
          </form>
        </section>

        <aside className="grid gap-4 lg:col-span-5">
          <article className="rounded-[2rem] border border-dashboard-outline-variant bg-dashboard-surface-lowest p-6 shadow-subtle">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-dashboard-outline">Direct links</p>
            <div className="mt-4 grid gap-2">
              <Link href="mailto:hello@example.com" className={`rounded-2xl bg-dashboard-surface-low p-4 text-sm font-bold ${focusRing}`}>Email placeholder →</Link>
              {quickLinks.map((link) => (
                <Link key={link.label} href={link.href} className={`rounded-2xl bg-dashboard-surface-low p-4 text-sm font-bold ${focusRing}`}>{link.label} →</Link>
              ))}
            </div>
          </article>
          <article className="rounded-[2rem] border border-dashboard-outline-variant bg-dashboard-surface-lowest p-6 shadow-subtle">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-dashboard-outline">Good brief</p>
            <ul className="mt-4 space-y-3 text-sm font-semibold leading-6 text-dashboard-on-surface-variant">
              <li>Tujuan project.</li>
              <li>Timeline dan constraint.</li>
              <li>Reference atau fitur wajib.</li>
            </ul>
          </article>
        </aside>`r`n    </div>
  );
}