import { readData } from "@/lib/admin-data";
import { AdminShell } from "@/components/admin/admin-shell";
import { ProjectForm } from "@/components/admin/project-form";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function AdminEditProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = readData();
  const project = data.projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <AdminShell>
      <div className="p-8 max-w-6xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-[#999] mb-6 flex-wrap">
          <Link href="/admin/projects" className="hover:text-[#1a1a1a] transition-colors">
            Proyek
          </Link>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <polyline points="9 18 15 12 9 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-[#1a1a1a] font-medium">{project.title}</span>
        </div>

        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-[#1a1a1a]">Edit: {project.title}</h1>
          <p className="text-sm text-[#666] mt-1">
            Ubah informasi project. Klik &quot;Simpan Perubahan&quot; setelah selesai.
          </p>
        </div>

        <ProjectForm mode="edit" initialData={project} />
      </div>
    </AdminShell>
  );
}
