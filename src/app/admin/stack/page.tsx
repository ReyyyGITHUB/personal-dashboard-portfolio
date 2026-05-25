import { readData } from "@/lib/admin-data";
import { AdminShell } from "@/components/admin/admin-shell";
import { StackClient } from "@/components/admin/stack-client";

export default function AdminStackPage() {
  const data = readData();

  return (
    <AdminShell>
      <div className="p-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-[#1a1a1a]">Tech Stack</h1>
            <p className="text-sm text-[#666] mt-1">{data.techItems.length} teknologi tersimpan, dikelompokkan per kategori.</p>
          </div>
          {/* Tombol add ada di StackClient agar bisa toggle inline form */}
        </div>

        <StackClient initialItems={data.techItems} />
      </div>
    </AdminShell>
  );
}
