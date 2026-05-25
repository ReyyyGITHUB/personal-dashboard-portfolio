import { readData } from "@/lib/admin-data";
import { AdminShell } from "@/components/admin/admin-shell";
import { ProjectsClient } from "@/components/admin/projects-client";
import Link from "next/link";

export default function AdminProjectsPage() {
  const data = readData();

  return (
    <AdminShell>
      <div className="p-8 max-w-5xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-[#1a1a1a]">Proyek</h1>
            <p className="text-sm text-[#666] mt-1">{data.projects.length} project tersimpan</p>
          </div>
          <Link
            href="/admin/projects/new"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1a1a1a] text-white text-sm font-medium hover:bg-[#333] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <line x1="12" y1="5" x2="12" y2="19" strokeLinecap="round" />
              <line x1="5" y1="12" x2="19" y2="12" strokeLinecap="round" />
            </svg>
            Tambah Project
          </Link>
        </div>

        <ProjectsClient initialProjects={data.projects} />
      </div>
    </AdminShell>
  );
}
