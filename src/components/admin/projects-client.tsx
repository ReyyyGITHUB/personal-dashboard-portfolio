"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Project = {
  slug: string;
  title: string;
  type: string;
  status: string;
  year: string;
  role: string;
};

export function ProjectsClient({ initialProjects }: { initialProjects: Project[] }) {
  const router = useRouter();
  const [projects, setProjects] = useState(initialProjects);
  const [confirmSlug, setConfirmSlug] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function handleDelete(slug: string) {
    setDeleting(true);
    const res = await fetch(`/api/admin/projects/${slug}`, { method: "DELETE" });
    const data = await res.json();
    setDeleting(false);
    setConfirmSlug(null);

    if (data.ok) {
      setProjects((prev) => prev.filter((p) => p.slug !== slug));
    } else {
      alert(data.error ?? "Gagal menghapus.");
    }
  }

  const statusColors: Record<string, string> = {
    Live: "bg-green-50 text-green-700 border-green-200",
    Prototype: "bg-blue-50 text-blue-700 border-blue-200",
    Draft: "bg-[#f5f5f0] text-[#666] border-[#e5e5e0]",
  };

  return (
    <div>
      {/* Confirm Delete Modal */}
      {confirmSlug && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl border border-[#e5e5e0] p-6 shadow-xl max-w-sm w-full mx-4">
            <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path d="M3 6h18M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6M10 11v6M14 11v6M9 6V4h6v2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="text-base font-semibold text-[#1a1a1a] mb-1">Hapus project ini?</h3>
            <p className="text-sm text-[#666] mb-5">
              Project <strong>{projects.find((p) => p.slug === confirmSlug)?.title}</strong> akan dihapus permanen. Aksi ini tidak bisa dibatalkan.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmSlug(null)}
                className="flex-1 py-2.5 rounded-xl border border-[#e5e5e0] text-sm text-[#666] hover:bg-[#f5f5f0] transition-colors"
              >
                Batal
              </button>
              <button
                onClick={() => handleDelete(confirmSlug)}
                disabled={deleting}
                className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors disabled:opacity-50"
              >
                {deleting ? "Menghapus..." : "Ya, hapus"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      {projects.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#e5e5e0] p-12 text-center">
          <p className="text-[#999] text-sm mb-4">Belum ada project tersimpan.</p>
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1a1a1a] text-white text-sm font-medium hover:bg-[#333] transition-colors"
          >
            + Tambah Project Pertama
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-[#e5e5e0] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#f0f0eb]">
                <th className="text-left px-5 py-3.5 text-xs font-medium text-[#999] uppercase tracking-wide">Nama Project</th>
                <th className="text-left px-5 py-3.5 text-xs font-medium text-[#999] uppercase tracking-wide hidden sm:table-cell">Tipe</th>
                <th className="text-left px-5 py-3.5 text-xs font-medium text-[#999] uppercase tracking-wide hidden sm:table-cell">Status</th>
                <th className="text-left px-5 py-3.5 text-xs font-medium text-[#999] uppercase tracking-wide hidden md:table-cell">Tahun</th>
                <th className="text-right px-5 py-3.5 text-xs font-medium text-[#999] uppercase tracking-wide">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f0eb]">
              {projects.map((project) => (
                <tr key={project.slug} className="hover:bg-[#fafafa] transition-colors">
                  <td className="px-5 py-4">
                    <div>
                      <p className="text-sm font-medium text-[#1a1a1a]">{project.title}</p>
                      <p className="text-xs text-[#999] mt-0.5 font-mono">/{project.slug}</p>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-[#666] hidden sm:table-cell">{project.type}</td>
                  <td className="px-5 py-4 hidden sm:table-cell">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs border font-medium ${statusColors[project.status] ?? statusColors.Draft}`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-[#666] hidden md:table-cell">{project.year}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/projects/${project.slug}`}
                        target="_blank"
                        className="px-2.5 py-1.5 rounded-lg text-xs text-[#999] hover:text-[#1a1a1a] hover:bg-[#f0f0eb] transition-colors"
                        title="Lihat di portfolio"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" strokeLinecap="round" />
                          <polyline points="15 3 21 3 21 9" strokeLinecap="round" />
                          <line x1="10" y1="14" x2="21" y2="3" strokeLinecap="round" />
                        </svg>
                      </Link>
                      <button
                        onClick={() => router.push(`/admin/projects/${project.slug}/edit`)}
                        className="px-2.5 py-1.5 rounded-lg text-xs text-[#666] hover:text-[#1a1a1a] hover:bg-[#f0f0eb] transition-colors"
                        title="Edit project"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                          <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" strokeLinecap="round" />
                          <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" strokeLinecap="round" />
                        </svg>
                      </button>
                      <button
                        onClick={() => setConfirmSlug(project.slug)}
                        className="px-2.5 py-1.5 rounded-lg text-xs text-[#ccc] hover:text-red-500 hover:bg-red-50 transition-colors"
                        title="Hapus project"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                          <path d="M3 6h18M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6M10 11v6M14 11v6M9 6V4h6v2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
