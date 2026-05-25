import { readData } from "@/lib/admin-data";
import { AdminShell } from "@/components/admin/admin-shell";
import Link from "next/link";

export default function AdminDashboardPage() {
  const data = readData();
  const projectCount = data.projects.length;
  const techCount = data.techItems.length;
  const liveCount = data.projects.filter((p) => p.status === "Live").length;

  return (
    <AdminShell>
      <div className="p-8 max-w-3xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-[#1a1a1a]">Dashboard</h1>
          <p className="text-sm text-[#666] mt-1">Kelola konten portfolio dari sini.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl border border-[#e5e5e0] p-5">
            <p className="text-3xl font-bold text-[#1a1a1a]">{projectCount}</p>
            <p className="text-sm text-[#666] mt-1">Total Proyek</p>
          </div>
          <div className="bg-white rounded-2xl border border-[#e5e5e0] p-5">
            <p className="text-3xl font-bold text-[#1a1a1a]">{liveCount}</p>
            <p className="text-sm text-[#666] mt-1">Proyek Live</p>
          </div>
          <div className="bg-white rounded-2xl border border-[#e5e5e0] p-5">
            <p className="text-3xl font-bold text-[#1a1a1a]">{techCount}</p>
            <p className="text-sm text-[#666] mt-1">Item Tech Stack</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <h2 className="text-sm font-medium text-[#999] uppercase tracking-wide">Aksi Cepat</h2>

          <Link
            href="/admin/projects"
            className="flex items-center justify-between bg-white rounded-2xl border border-[#e5e5e0] p-5 hover:border-[#1a1a1a]/20 hover:shadow-sm transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#f0f0eb] flex items-center justify-center text-[#666] group-hover:bg-[#1a1a1a] group-hover:text-white transition-colors">
                <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
                  <path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-[#1a1a1a]">Kelola Proyek</p>
                <p className="text-xs text-[#999]">{projectCount} proyek tersimpan</p>
              </div>
            </div>
            <svg className="w-4 h-4 text-[#ccc] group-hover:text-[#1a1a1a] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <polyline points="9 18 15 12 9 6" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
            </svg>
          </Link>

          <Link
            href="/admin/stack"
            className="flex items-center justify-between bg-white rounded-2xl border border-[#e5e5e0] p-5 hover:border-[#1a1a1a]/20 hover:shadow-sm transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#f0f0eb] flex items-center justify-center text-[#666] group-hover:bg-[#1a1a1a] group-hover:text-white transition-colors">
                <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-[#1a1a1a]">Kelola Tech Stack</p>
                <p className="text-xs text-[#999]">{techCount} teknologi tersimpan</p>
              </div>
            </div>
            <svg className="w-4 h-4 text-[#ccc] group-hover:text-[#1a1a1a] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <polyline points="9 18 15 12 9 6" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
            </svg>
          </Link>

          <Link
            href="/admin/projects/new"
            className="flex items-center justify-between bg-[#1a1a1a] rounded-2xl border border-transparent p-5 hover:bg-[#333] transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white">
                <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
                  <line x1="12" y1="5" x2="12" y2="19" strokeLinecap="round" />
                  <line x1="5" y1="12" x2="19" y2="12" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-white">Tambah Proyek Baru</p>
                <p className="text-xs text-white/50">Buat entry proyek baru</p>
              </div>
            </div>
            <svg className="w-4 h-4 text-white/30 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <polyline points="9 18 15 12 9 6" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
            </svg>
          </Link>
        </div>
      </div>
    </AdminShell>
  );
}
