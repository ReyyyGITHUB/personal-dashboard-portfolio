"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { TechItem } from "@/lib/admin-data";

type Props = {
  initialData?: Partial<TechItem>;
  mode: "new" | "edit";
  originalName?: string;
  onSuccess?: () => void;
};

const GROUP_OPTIONS = ["Frontend", "Styling", "Backend", "Code Quality", "IoT", "Design", "DevOps", "Mobile"];
const LEVEL_OPTIONS = [
  { value: "Daily", label: "Daily — Dipakai setiap hari" },
  { value: "Comfortable", label: "Comfortable — Sudah terbiasa" },
  { value: "Prototype", label: "Prototype — Eksperimen/project kecil" },
  { value: "Learning", label: "Learning — Sedang dipelajari" },
];

function FieldLabel({ children, hint }: { children: React.ReactNode; hint?: string }) {
  return (
    <div className="mb-1.5">
      <label className="block text-sm font-medium text-[#1a1a1a]">{children}</label>
      {hint && <p className="text-xs text-[#999] mt-0.5">{hint}</p>}
    </div>
  );
}

export function TechForm({ initialData, mode, originalName, onSuccess }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<TechItem>({
    name: initialData?.name ?? "",
    group: initialData?.group ?? "Frontend",
    level: initialData?.level ?? "Comfortable",
    note: initialData?.note ?? "",
  });
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [saving, setSaving] = useState(false);

  function showToast(type: "success" | "error", message: string) {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) return;

    setSaving(true);

    const url =
      mode === "new"
        ? "/api/admin/stack"
        : `/api/admin/stack/${encodeURIComponent(originalName ?? form.name)}`;
    const method = mode === "new" ? "POST" : "PUT";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setSaving(false);

    if (data.ok) {
      showToast("success", mode === "new" ? "Tech berhasil ditambahkan!" : "Perubahan disimpan!");
      if (onSuccess) {
        setTimeout(() => onSuccess(), 800);
      } else {
        setTimeout(() => router.push("/admin/stack"), 800);
      }
    } else {
      showToast("error", data.error ?? "Gagal menyimpan.");
    }
  }

  return (
    <div className="relative">
      {toast && (
        <div
          className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg text-sm font-medium ${
            toast.type === "success"
              ? "bg-green-50 border border-green-200 text-green-700"
              : "bg-red-50 border border-red-200 text-red-700"
          }`}
        >
          {toast.type === "success" ? "✓" : "✗"} {toast.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-[#e5e5e0] p-6 space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <FieldLabel hint="Nama teknologi persis seperti tampil di portfolio. Contoh: Next.js">
              Nama Teknologi
            </FieldLabel>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="contoh: Next.js"
              required
              readOnly={mode === "edit"}
              className={`w-full px-3 py-2.5 rounded-xl border border-[#e5e5e0] text-sm text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#1a1a1a]/20 focus:border-[#1a1a1a] transition-colors placeholder:text-[#bbb] ${mode === "edit" ? "bg-[#f5f5f0] cursor-not-allowed text-[#999]" : "bg-white"}`}
            />
          </div>

          <div>
            <FieldLabel hint="Kategori tech ini masuk ke mana">
              Kategori / Grup
            </FieldLabel>
            <select
              value={form.group}
              onChange={(e) => setForm((f) => ({ ...f, group: e.target.value }))}
              className="w-full px-3 py-2.5 rounded-xl border border-[#e5e5e0] bg-white text-sm text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#1a1a1a]/20 focus:border-[#1a1a1a] transition-colors"
            >
              {GROUP_OPTIONS.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <FieldLabel hint="Seberapa sering atau dalam kamu pakai tech ini">
            Level Penggunaan
          </FieldLabel>
          <div className="grid grid-cols-2 gap-2">
            {LEVEL_OPTIONS.map((opt) => (
              <label
                key={opt.value}
                className={`flex items-start gap-2.5 px-3 py-2.5 rounded-xl border cursor-pointer transition-all ${
                  form.level === opt.value
                    ? "border-[#1a1a1a] bg-[#f5f5f0]"
                    : "border-[#e5e5e0] bg-white hover:border-[#ccc]"
                }`}
              >
                <input
                  type="radio"
                  name="level"
                  value={opt.value}
                  checked={form.level === opt.value}
                  onChange={() => setForm((f) => ({ ...f, level: opt.value }))}
                  className="mt-0.5 sr-only"
                />
                <div className={`w-3.5 h-3.5 rounded-full border mt-0.5 shrink-0 flex items-center justify-center ${form.level === opt.value ? "border-[#1a1a1a] bg-[#1a1a1a]" : "border-[#ccc]"}`}>
                  {form.level === opt.value && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
                <div>
                  <p className="text-sm font-medium text-[#1a1a1a] leading-none">{opt.value}</p>
                  <p className="text-xs text-[#999] mt-0.5">{opt.label.split("—")[1]?.trim()}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div>
          <FieldLabel hint="Deskripsi singkat cara kamu pakai tech ini. Maks 1–2 kalimat">
            Catatan Penggunaan
          </FieldLabel>
          <textarea
            value={form.note}
            onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
            placeholder="contoh: App Router, RSC-first, static pages."
            rows={2}
            className="w-full px-3 py-2.5 rounded-xl border border-[#e5e5e0] bg-white text-sm text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#1a1a1a]/20 focus:border-[#1a1a1a] transition-colors placeholder:text-[#bbb] resize-y"
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => router.push("/admin/stack")}
            className="px-4 py-2.5 rounded-xl border border-[#e5e5e0] text-sm text-[#666] hover:bg-[#f0f0eb] transition-colors"
          >
            Batalkan
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-5 py-2.5 rounded-xl bg-[#1a1a1a] text-white text-sm font-medium hover:bg-[#333] transition-all disabled:opacity-50"
          >
            {saving ? "Menyimpan..." : mode === "new" ? "Tambah Tech" : "Simpan Perubahan"}
          </button>
        </div>
      </form>
    </div>
  );
}
