import { AdminShell } from "@/components/admin/admin-shell";
import { ProjectForm } from "@/components/admin/project-form";
import Link from "next/link";

export default function AdminNewProjectPage() {
  return (
    <AdminShell>
      <div className="p-8 max-w-6xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-[#999] mb-6">
          <Link href="/admin/projects" className="hover:text-[#1a1a1a] transition-colors">
            Proyek
          </Link>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <polyline points="9 18 15 12 9 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-[#1a1a1a]">Tambah Project Baru</span>
        </div>

        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-[#1a1a1a]">Tambah Project Baru</h1>
          <p className="text-sm text-[#666] mt-1">Isi semua field di bawah. Kamu bisa ubah lagi nanti lewat halaman edit.</p>
        </div>

        <ProjectForm mode="new" />
      </div>
    </AdminShell>
  );
}
