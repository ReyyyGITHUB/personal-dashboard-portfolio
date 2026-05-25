"use client";

import { useState } from "react";
import { TechForm } from "@/components/admin/tech-form";
import type { TechItem } from "@/lib/admin-data";

const LEVEL_COLOR: Record<string, string> = {
  Daily: "bg-green-50 text-green-700 border-green-200",
  Comfortable: "bg-blue-50 text-blue-700 border-blue-200",
  Prototype: "bg-yellow-50 text-yellow-700 border-yellow-200",
  Learning: "bg-purple-50 text-purple-700 border-purple-200",
};

export function StackClient({ initialItems }: { initialItems: TechItem[] }) {
  const [items, setItems] = useState(initialItems);
  const [confirmName, setConfirmName] = useState<string | null>(null);
  const [editItem, setEditItem] = useState<TechItem | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const groups = Array.from(new Set(items.map((i) => i.group))).sort();

  async function handleDelete(name: string) {
    setDeleting(true);
    const res = await fetch(`/api/admin/stack/${encodeURIComponent(name)}`, { method: "DELETE" });
    const data = await res.json();
    setDeleting(false);
    setConfirmName(null);

    if (data.ok) {
      setItems((prev) => prev.filter((i) => i.name !== name));
    } else {
      alert(data.error ?? "Gagal menghapus.");
    }
  }

  function handleEditSuccess() {
    // Reload items dari server state (simplest: just reload page)
    window.location.reload();
  }

  function handleAddSuccess() {
    window.location.reload();
  }

  return (
    <div>
      {/* Header actions — selalu visible */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-[#999]">
          {items.length} item · {groups.length} kategori
        </span>
        <button
          onClick={() => setShowAddForm((v) => !v)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1a1a1a] text-white text-sm font-medium hover:bg-[#333] transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <line x1="12" y1="5" x2="12" y2="19" strokeLinecap="round" />
            <line x1="5" y1="12" x2="19" y2="12" strokeLinecap="round" />
          </svg>
          {showAddForm ? "Tutup form" : "Tambah Tech"}
        </button>
      </div>
      {/* Confirm Delete Modal */}
      {confirmName && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl border border-[#e5e5e0] p-6 shadow-xl max-w-sm w-full mx-4">
            <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path d="M3 6h18M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6M10 11v6M14 11v6M9 6V4h6v2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="text-base font-semibold text-[#1a1a1a] mb-1">Hapus tech ini?</h3>
            <p className="text-sm text-[#666] mb-5">
              <strong>{confirmName}</strong> akan dihapus dari stack. Aksi ini tidak bisa dibatalkan.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmName(null)} className="flex-1 py-2.5 rounded-xl border border-[#e5e5e0] text-sm text-[#666] hover:bg-[#f5f5f0] transition-colors">
                Batal
              </button>
              <button onClick={() => handleDelete(confirmName)} disabled={deleting} className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors disabled:opacity-50">
                {deleting ? "Menghapus..." : "Ya, hapus"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-[#f5f5f0] rounded-2xl border border-[#e5e5e0] p-6 shadow-xl max-w-lg w-full">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-semibold text-[#1a1a1a]">Edit: {editItem.name}</h3>
              <button onClick={() => setEditItem(null)} className="w-8 h-8 rounded-lg flex items-center justify-center text-[#999] hover:bg-[#e5e5e0] transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round" />
                  <line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <TechForm
              mode="edit"
              initialData={editItem}
              originalName={editItem.name}
              onSuccess={handleEditSuccess}
            />
          </div>
        </div>
      )}

      {/* Add Form */}
      {showAddForm && (
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-[#1a1a1a] mb-3">Tambah Tech Baru</h2>
          <TechForm mode="new" onSuccess={handleAddSuccess} />
        </div>
      )}

      {/* List by Group */}
      {groups.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#e5e5e0] p-12 text-center">
          <p className="text-[#999] text-sm mb-4">Belum ada tech item.</p>
          <button
            onClick={() => setShowAddForm(true)}
            className="px-4 py-2.5 rounded-xl bg-[#1a1a1a] text-white text-sm font-medium hover:bg-[#333] transition-colors"
          >
            + Tambah Tech Pertama
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {groups.map((group) => (
            <div key={group} className="bg-white rounded-2xl border border-[#e5e5e0] overflow-hidden">
              <div className="px-5 py-3 border-b border-[#f0f0eb] bg-[#fafafa]">
                <h2 className="text-xs font-semibold text-[#999] uppercase tracking-wide">{group}</h2>
              </div>
              <div className="divide-y divide-[#f0f0eb]">
                {items.filter((i) => i.group === group).map((item) => (
                  <div key={item.name} className="flex items-center justify-between px-5 py-4 hover:bg-[#fafafa] transition-colors">
                    <div className="flex items-center gap-3">
                      <p className="text-sm font-medium text-[#1a1a1a]">{item.name}</p>
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs border font-medium ${LEVEL_COLOR[item.level] ?? LEVEL_COLOR.Comfortable}`}>
                        {item.level}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-[#999] hidden md:block max-w-48 truncate">{item.note}</p>
                      <button
                        onClick={() => setEditItem(item)}
                        className="px-2.5 py-1.5 rounded-lg text-xs text-[#666] hover:text-[#1a1a1a] hover:bg-[#f0f0eb] transition-colors"
                        title="Edit"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                          <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" strokeLinecap="round" />
                          <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" strokeLinecap="round" />
                        </svg>
                      </button>
                      <button
                        onClick={() => setConfirmName(item.name)}
                        className="px-2.5 py-1.5 rounded-lg text-xs text-[#ccc] hover:text-red-500 hover:bg-red-50 transition-colors"
                        title="Hapus"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                          <path d="M3 6h18M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6M10 11v6M14 11v6M9 6V4h6v2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
