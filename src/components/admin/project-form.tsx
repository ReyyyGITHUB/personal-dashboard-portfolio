"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import type { Project } from "@/lib/admin-data";

// ─── Types & Constants ────────────────────────────────────────────────────────

type Props = {
  initialData?: Partial<Project>;
  mode: "new" | "edit";
};

const ACCENT_OPTIONS = [
  { value: "bg-clay-violet",  label: "Clay Violet",  color: "#b09ee8" },
  { value: "bg-lime-pop",     label: "Lime Pop",     color: "#a3c93a" },
  { value: "bg-azure-glow",   label: "Azure Glow",   color: "#38bcd4" },
  { value: "bg-tangerine",    label: "Tangerine",    color: "#f97316" },
  { value: "bg-ube-haze",     label: "Ube Haze",     color: "#8b5cf6" },
  { value: "bg-vivid-sky",    label: "Vivid Sky",    color: "#0ea5e9" },
];

const STATUS_OPTIONS = ["Live", "Prototype", "Draft"] as const;

const ROLE_OPTIONS = [
  "Frontend",
  "Backend",
  "Fullstack",
  "IoT Logic",
  "UX Writing",
  "Design",
  "Interaction",
  "DevOps",
  "Mobile",
];

const TYPE_SUGGESTIONS = [
  "Dashboard personal",
  "Prototipe IoT",
  "Prototipe interaksi",
  "Format bukti proyek",
  "Web App",
  "Mobile App",
  "Landing page",
  "API / Backend",
  "Design system",
];

const CURRENT_YEAR = new Date().getFullYear();
const YEAR_OPTIONS = Array.from({ length: 8 }, (_, i) => String(CURRENT_YEAR - i + 1));

// ─── Small UI primitives ──────────────────────────────────────────────────────

function FieldLabel({ children, hint, required }: { children: React.ReactNode; hint?: string; required?: boolean }) {
  return (
    <div className="mb-1.5">
      <div className="flex items-center gap-1.5">
        <label className="block text-sm font-medium text-[#1a1a1a]">{children}</label>
        {required === true && (
          <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-[#1a1a1a] text-white">Wajib</span>
        )}
        {required === false && (
          <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-[#f0f0eb] text-[#999]">Opsional</span>
        )}
      </div>
      {hint && <p className="text-xs text-[#999] mt-0.5">{hint}</p>}
    </div>
  );
}

function Field({ label, hint, required, children }: { label: string; hint?: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <FieldLabel hint={hint} required={required}>{label}</FieldLabel>
      {children}
    </div>
  );
}

function TextInput({ value, onChange, placeholder, readOnly }: {
  value: string; onChange?: (v: string) => void; placeholder?: string; readOnly?: boolean;
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange ? (e) => onChange(e.target.value) : undefined}
      readOnly={readOnly}
      placeholder={placeholder}
      className={`w-full px-3 py-2.5 rounded-xl border border-[#e5e5e0] text-sm text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#1a1a1a]/20 focus:border-[#1a1a1a] transition-colors placeholder:text-[#bbb] ${readOnly ? "bg-[#f5f5f0] cursor-not-allowed text-[#999]" : "bg-white"}`}
    />
  );
}

function SelectInput({ value, onChange, options }: {
  value: string; onChange: (v: string) => void; options: readonly string[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2.5 rounded-xl border border-[#e5e5e0] bg-white text-sm text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#1a1a1a]/20 focus:border-[#1a1a1a] transition-colors"
    >
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}

function Textarea({ value, onChange, placeholder, rows = 3 }: {
  value: string; onChange: (v: string) => void; placeholder?: string; rows?: number;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full px-3 py-2.5 rounded-xl border border-[#e5e5e0] bg-white text-sm text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#1a1a1a]/20 focus:border-[#1a1a1a] transition-colors placeholder:text-[#bbb] resize-y"
    />
  );
}

function DynamicList({ items, onChange, placeholder }: {
  items: string[]; onChange: (items: string[]) => void; placeholder?: string;
}) {
  return (
    <div className="space-y-2">
      {items.map((item, idx) => (
        <div key={idx} className="flex gap-2 items-center">
          <span className="w-5 h-5 rounded-md bg-[#f0f0eb] text-[#999] flex items-center justify-center text-xs shrink-0">{idx + 1}</span>
          <input
            type="text"
            value={item}
            onChange={(e) => {
              const next = [...items]; next[idx] = e.target.value; onChange(next);
            }}
            placeholder={placeholder}
            className="flex-1 px-3 py-2 rounded-xl border border-[#e5e5e0] bg-white text-sm text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#1a1a1a]/20 focus:border-[#1a1a1a] transition-colors placeholder:text-[#bbb]"
          />
          <button type="button" onClick={() => onChange(items.filter((_, i) => i !== idx))}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#ccc] hover:text-red-500 hover:bg-red-50 transition-colors shrink-0">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round" /><line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      ))}
      <button type="button" onClick={() => onChange([...items, ""])}
        className="flex items-center gap-1.5 text-sm text-[#999] hover:text-[#1a1a1a] transition-colors py-1">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <line x1="12" y1="5" x2="12" y2="19" strokeLinecap="round" /><line x1="5" y1="12" x2="19" y2="12" strokeLinecap="round" />
        </svg>
        Tambah baris
      </button>
    </div>
  );
}

function TagInput({ tags, onChange }: { tags: string[]; onChange: (tags: string[]) => void }) {
  const [input, setInput] = useState("");
  function add() {
    const t = input.trim();
    if (t && !tags.includes(t)) onChange([...tags, t]);
    setInput("");
  }
  return (
    <div>
      <div className="flex flex-wrap gap-1.5 mb-2">
        {tags.map((tag, idx) => (
          <span key={idx} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#1a1a1a] text-white text-xs">
            {tag}
            <button type="button" onClick={() => onChange(tags.filter((_, i) => i !== idx))} className="hover:text-red-300 transition-colors">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round" /><line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round" />
              </svg>
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input type="text" value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === ",") { e.preventDefault(); add(); } }}
          placeholder="Ketik nama tech lalu Enter..."
          className="flex-1 px-3 py-2 rounded-xl border border-[#e5e5e0] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1a1a1a]/20 focus:border-[#1a1a1a] transition-colors placeholder:text-[#bbb]" />
        <button type="button" onClick={add}
          className="px-3 py-2 rounded-xl bg-[#f0f0eb] text-[#666] text-sm hover:bg-[#1a1a1a] hover:text-white transition-colors">
          Tambah
        </button>
      </div>
    </div>
  );
}

function LinkEditor({ links, onChange }: {
  links: { label: string; href: string; disabled?: boolean }[];
  onChange: (links: { label: string; href: string; disabled?: boolean }[]) => void;
}) {
  function update(idx: number, field: string, value: string | boolean) {
    onChange(links.map((l, i) => (i === idx ? { ...l, [field]: value } : l)));
  }
  return (
    <div className="space-y-3">
      {links.map((link, idx) => (
        <div key={idx} className="bg-[#fafafa] border border-[#e5e5e0] rounded-xl p-3 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#999] font-medium w-4">#{idx + 1}</span>
            <input type="text" value={link.label} onChange={(e) => update(idx, "label", e.target.value)}
              placeholder="Label tombol (contoh: Lihat halaman)"
              className="flex-1 px-3 py-2 rounded-xl border border-[#e5e5e0] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1a1a1a]/20 focus:border-[#1a1a1a] transition-colors placeholder:text-[#bbb]" />
            <button type="button" onClick={() => onChange(links.filter((_, i) => i !== idx))}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-[#ccc] hover:text-red-500 hover:bg-red-50 transition-colors shrink-0">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round" /><line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <input type="text" value={link.href} onChange={(e) => update(idx, "href", e.target.value)}
            placeholder="URL (contoh: https://... atau /route)"
            className="w-full px-3 py-2 rounded-xl border border-[#e5e5e0] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1a1a1a]/20 focus:border-[#1a1a1a] transition-colors placeholder:text-[#bbb]" />
          <label className="flex items-center gap-2 cursor-pointer w-fit">
            <input type="checkbox" checked={link.disabled ?? false} onChange={(e) => update(idx, "disabled", e.target.checked)} className="rounded" />
            <span className="text-xs text-[#666]">Nonaktifkan link (tampil tapi tidak bisa diklik)</span>
          </label>
        </div>
      ))}
      <button type="button" onClick={() => onChange([...links, { label: "", href: "#", disabled: false }])}
        className="flex items-center gap-1.5 text-sm text-[#999] hover:text-[#1a1a1a] transition-colors py-1">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <line x1="12" y1="5" x2="12" y2="19" strokeLinecap="round" /><line x1="5" y1="12" x2="19" y2="12" strokeLinecap="round" />
        </svg>
        Tambah link
      </button>
    </div>
  );
}

function Section({
  title, children, collapsible = false, defaultOpen = true, badge,
}: {
  title: string;
  children: React.ReactNode;
  collapsible?: boolean;
  defaultOpen?: boolean;
  badge?: string;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="bg-white rounded-2xl border border-[#e5e5e0] overflow-hidden">
      {/* Header */}
      <div
        className={`flex items-center justify-between px-6 py-4 border-b border-[#f0f0eb] ${collapsible ? "cursor-pointer select-none hover:bg-[#fafafa] transition-colors" : ""}`}
        onClick={collapsible ? () => setOpen((v) => !v) : undefined}
      >
        <div className="flex items-center gap-2.5">
          <h2 className="text-sm font-semibold text-[#1a1a1a]">{title}</h2>
          {badge && (
            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-[#f0f0eb] text-[#999]">{badge}</span>
          )}
        </div>
        {collapsible && (
          <svg
            className={`w-4 h-4 text-[#999] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}
          >
            <polyline points="6 9 12 15 18 9" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      {/* Body */}
      {open && (
        <div className="p-6 space-y-5">
          {children}
        </div>
      )}
    </div>
  );
}

// ─── Live Preview ─────────────────────────────────────────────────────────────

function getTechIcon(label: string) {
  const k = label.toLowerCase();
  if (k.includes("next")) return "▲";
  if (k.includes("react")) return "⚛";
  if (k.includes("tailwind")) return "#";
  if (k.includes("arduino")) return "⌁";
  if (k.includes("figma")) return "◆";
  if (k.includes("ux") || k.includes("konten")) return "✎";
  if (k.includes("c++")) return "C+";
  return "⌘";
}

function LivePreview({ form }: { form: Partial<Project> }) {
  const accentColor = ACCENT_OPTIONS.find((a) => a.value === form.accent)?.color ?? "#b09ee8";

  const statusColor: Record<string, string> = {
    Live: "bg-green-100 text-green-700",
    Prototype: "bg-blue-100 text-blue-700",
    Draft: "bg-[#f0f0eb] text-[#666]",
  };

  return (
    <div className="space-y-4">
      {/* Tabs label */}
      <div className="flex items-center gap-2 text-xs font-medium text-[#999]">
        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        Preview langsung · diperbarui saat kamu mengisi form
      </div>

      {/* ── Card Preview (seperti di /projects sidebar card) ── */}
      <div>
        <p className="text-[11px] font-semibold text-[#bbb] uppercase tracking-wide mb-2">Tampilan Card</p>
        <div
          className="relative overflow-hidden rounded-[1.5rem] p-5 min-h-[180px] flex flex-col justify-between shadow-sm"
          style={{ backgroundColor: accentColor + "55", border: `1px solid ${accentColor}33` }}
        >
          {/* Accent blob */}
          <div
            className="absolute -bottom-6 -right-6 w-28 h-28 rounded-full opacity-40 blur-xl"
            style={{ backgroundColor: accentColor }}
          />
          <div className="relative z-10">
            <p className="text-[10px] font-black tracking-[0.06em] opacity-60 uppercase">
              {form.status ?? "Draft"}
            </p>
            <h3 className="mt-2 text-xl font-black tracking-tight leading-tight text-[#1a1a1a] max-w-[14rem]">
              {form.title || <span className="text-[#bbb]">Nama Project</span>}
            </h3>
            <p className="mt-1 text-xs font-bold opacity-60 text-[#1a1a1a]">
              {form.role || "Role"} · {form.year || "Tahun"}
            </p>
          </div>
          <div className="relative z-10 mt-4">
            <span
              className="inline-block rounded-full px-3 py-1.5 text-xs font-black text-white"
              style={{ backgroundColor: "#1a1a1a" }}
            >
              Case study →
            </span>
          </div>

          {/* Image preview placeholder */}
          {form.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={form.image}
              alt=""
              className="absolute -bottom-4 -right-2 w-24 h-24 object-contain opacity-80"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
          ) : (
            <div className="absolute bottom-3 right-3 w-20 h-20 rounded-2xl border border-dashed border-[#1a1a1a]/20 flex items-center justify-center">
              <span className="text-[10px] text-[#999]">gambar</span>
            </div>
          )}
        </div>
      </div>

      {/* ── Detail Header Preview (seperti di /projects/[slug]) ── */}
      <div>
        <p className="text-[11px] font-semibold text-[#bbb] uppercase tracking-wide mb-2">Tampilan Detail Page</p>
        <div className="bg-white rounded-2xl border border-[#e5e5e0] p-4 space-y-3">
          {/* Title + meta */}
          <div>
            <h3 className="text-xl font-black tracking-tight leading-tight text-[#1a1a1a]">
              {form.title || <span className="text-[#bbb]">Nama Project</span>}
            </h3>
            <p className="mt-1.5 text-xs font-bold text-[#666]">
              {[form.type, form.role, form.year].filter(Boolean).join(" · ") || (
                <span className="text-[#bbb]">Tipe · Role · Tahun</span>
              )}
            </p>
            {form.summary && (
              <p className="mt-2 text-xs font-medium leading-5 text-[#666] line-clamp-2">{form.summary}</p>
            )}
          </div>

          {/* Stack tags */}
          {(form.stack?.length ?? 0) > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {form.stack?.map((tag, i) => (
                <span key={tag} className="inline-flex items-center gap-1.5 rounded-2xl border border-[#e5e5e0] bg-[#fafafa] px-2.5 py-1 text-xs font-black text-[#1a1a1a]">
                  <span
                    className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black text-[#1a1a1a]"
                    style={{ backgroundColor: i === 0 ? accentColor + "88" : "#f0f0eb" }}
                  >
                    {getTechIcon(tag)}
                  </span>
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Status badge */}
          <div className="flex items-center gap-2">
            <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${statusColor[form.status ?? "Draft"] ?? statusColor.Draft}`}>
              {form.status ?? "Draft"}
            </span>
            {form.result && (
              <p className="text-xs text-[#999] truncate">{form.result}</p>
            )}
          </div>
        </div>
      </div>

      {/* ── Accent preview ── */}
      <div>
        <p className="text-[11px] font-semibold text-[#bbb] uppercase tracking-wide mb-2">Aksen Aktif</p>
        <div className="flex items-center gap-2 bg-white rounded-xl border border-[#e5e5e0] px-3 py-2.5">
          <div className="w-5 h-5 rounded-full shrink-0" style={{ backgroundColor: accentColor }} />
          <span className="text-sm font-medium text-[#1a1a1a]">
            {ACCENT_OPTIONS.find((a) => a.value === form.accent)?.label ?? "Clay Violet"}
          </span>
          {/* Accent glow strip */}
          <div className="ml-auto h-2 w-24 rounded-full opacity-60" style={{ background: `linear-gradient(90deg, ${accentColor}00, ${accentColor})` }} />
        </div>
      </div>

      {/* ── Case study preview (problem/process/proof) ── */}
      {(form.problem || (form.process ?? []).some(Boolean) || form.solution) && (
        <div>
          <p className="text-[11px] font-semibold text-[#bbb] uppercase tracking-wide mb-2">Case Study Preview</p>
          <div className="bg-white rounded-2xl border border-[#e5e5e0] p-4 space-y-3 text-xs">
            {form.problem && (
              <div>
                <p className="font-black text-[#1a1a1a] mb-1">Masalah</p>
                <p className="text-[#666] leading-5 line-clamp-2">{form.problem}</p>
              </div>
            )}
            {(form.process ?? []).some(Boolean) && (
              <div>
                <p className="font-black text-[#1a1a1a] mb-1">Proses</p>
                <ul className="space-y-1">
                  {(form.process ?? []).filter(Boolean).slice(0, 3).map((p, i) => (
                    <li key={i} className="flex items-start gap-2 text-[#666]">
                      <span className="w-4 h-4 rounded-full bg-[#f0f0eb] flex items-center justify-center text-[9px] shrink-0 mt-0.5">{i + 1}</span>
                      <span className="line-clamp-1">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {form.solution && (
              <div>
                <p className="font-black text-[#1a1a1a] mb-1">Solusi</p>
                <p className="text-[#666] leading-5 line-clamp-2">{form.solution}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Toast ────────────────────────────────────────────────────────────────────

function Toast({ toast }: { toast: { type: "success" | "error"; message: string } | null }) {
  if (!toast) return null;
  return (
    <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg text-sm font-medium transition-all ${
      toast.type === "success"
        ? "bg-green-50 border border-green-200 text-green-700"
        : "bg-red-50 border border-red-200 text-red-700"
    }`}>
      {toast.type === "success"
        ? <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" /></svg>
        : <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" strokeLinecap="round" /><line x1="12" y1="16" x2="12.01" y2="16" strokeLinecap="round" /></svg>
      }
      {toast.message}
    </div>
  );
}

// ─── Main Form ────────────────────────────────────────────────────────────────

export function ProjectForm({ initialData, mode }: Props) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<Partial<Project>>({
    slug: "",
    title: "",
    type: "",
    summary: "",
    result: "",
    stack: [],
    image: "",
    accent: "bg-clay-violet",
    role: "Frontend",
    status: "Draft",
    year: String(CURRENT_YEAR),
    problem: "",
    process: [""],
    solution: "",
    proof: [""],
    links: [],
    video: "",
    ...initialData,
  });

  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [saving, setSaving] = useState(false);

  function set<K extends keyof Project>(key: K, value: Project[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  // Auto-slug dari title (hanya mode new)
  function handleTitleChange(title: string) {
    set("title", title);
    if (mode === "new") {
      const slug = title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .slice(0, 60);
      set("slug", slug);
    }
  }

  function showToast(type: "success" | "error", message: string) {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3500);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const url = mode === "new" ? "/api/admin/projects" : `/api/admin/projects/${initialData?.slug}`;
    const method = mode === "new" ? "POST" : "PUT";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setSaving(false);

    if (data.ok) {
      showToast("success", mode === "new" ? "Project berhasil ditambahkan!" : "Perubahan berhasil disimpan!");
      if (mode === "new") setTimeout(() => router.push("/admin/projects"), 1000);
    } else {
      showToast("error", data.error ?? "Gagal menyimpan.");
    }
  }

  function handleFileSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const path = `/projects/${file.name}`;
    set("image", path);
    showToast("success", `Path diset ke ${path}. Pastikan file sudah ada di public/projects/`);
  }

  return (
    <>
      <Toast toast={toast} />
      <input ref={fileInputRef} type="file" accept="image/*,.svg" className="hidden" onChange={handleFileSelected} />

      {/* ── Split layout: form kiri, preview kanan ── */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6 items-start">

        {/* ── LEFT: Form ── */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Section 1: Identitas */}
          <Section title="Identitas Project">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Nama Project" hint="Nama yang tampil di card dan halaman detail" required={true}>
                <TextInput
                  value={form.title ?? ""}
                  onChange={handleTitleChange}
                  placeholder="Smart Farm Monitor"
                />
              </Field>
              <Field
                label="Slug (URL ID)"
                hint={mode === "new" ? "Auto-diisi dari nama, bisa diedit" : "Tidak bisa diubah setelah dibuat"}
                required={true}
              >
                <TextInput
                  value={form.slug ?? ""}
                  onChange={mode === "new" ? (v) => set("slug", v) : undefined}
                  placeholder="smart-farm-monitor"
                  readOnly={mode === "edit"}
                />
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Type — datalist dengan suggestions */}
              <Field label="Tipe Project" hint="Jenis project. Pilih atau ketik sendiri" required={true}>
                <div className="relative">
                  <input
                    list="type-suggestions"
                    type="text"
                    value={form.type ?? ""}
                    onChange={(e) => set("type", e.target.value)}
                    placeholder="Pilih atau ketik..."
                    className="w-full px-3 py-2.5 rounded-xl border border-[#e5e5e0] bg-white text-sm text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#1a1a1a]/20 focus:border-[#1a1a1a] transition-colors placeholder:text-[#bbb]"
                  />
                  <datalist id="type-suggestions">
                    {TYPE_SUGGESTIONS.map((t) => <option key={t} value={t} />)}
                  </datalist>
                </div>
              </Field>

              {/* Role — select */}
              <Field label="Peran Kamu" hint="Peranmu di project ini" required={true}>
                <SelectInput
                  value={form.role ?? "Frontend"}
                  onChange={(v) => set("role", v)}
                  options={ROLE_OPTIONS}
                />
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Status — select */}
              <Field label="Status" required={true}>
                <SelectInput
                  value={form.status ?? "Draft"}
                  onChange={(v) => set("status", v as Project["status"])}
                  options={STATUS_OPTIONS}
                />
              </Field>

              {/* Year — select */}
              <Field label="Tahun" hint="Tahun project dibuat atau dirilis" required={true}>
                <SelectInput
                  value={form.year ?? String(CURRENT_YEAR)}
                  onChange={(v) => set("year", v)}
                  options={YEAR_OPTIONS}
                />
              </Field>
            </div>
          </Section>

          {/* Section 2: Visual */}
          <Section title="Visual & Tampilan">
            <Field label="Gambar Project" hint="Path ke file di public/, atau klik 'Buka folder'" required={true}>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={form.image ?? ""}
                  onChange={(e) => set("image", e.target.value)}
                  placeholder="/projects/nama-project.svg"
                  className="flex-1 px-3 py-2.5 rounded-xl border border-[#e5e5e0] bg-white text-sm text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#1a1a1a]/20 focus:border-[#1a1a1a] transition-colors placeholder:text-[#bbb]"
                />
                <button type="button" onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-2.5 rounded-xl bg-[#f0f0eb] border border-[#e5e5e0] text-sm text-[#666] hover:bg-[#1a1a1a] hover:text-white transition-colors flex items-center gap-1.5 shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
                    <path d="M14.5 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" />
                  </svg>
                  Buka folder
                </button>
              </div>
              {form.image && (
                <p className="text-xs text-[#666] mt-1.5 flex items-center gap-1">
                  <svg className="w-3.5 h-3.5 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  <code className="bg-[#f0f0eb] px-1.5 py-0.5 rounded text-[11px]">{form.image}</code>
                </p>
              )}
              <p className="text-xs text-[#aaa] mt-1">Preview gambar muncul langsung di panel sebelah kanan →</p>
            </Field>

            <Field label="Preview Video" hint="Path ke file video preview di public/ (misal: /projects/videos/preview.mp4) - Opsional" required={false}>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={form.video ?? ""}
                  onChange={(e) => set("video", e.target.value)}
                  placeholder="/projects/videos/preview-iot.mp4"
                  className="flex-1 px-3 py-2.5 rounded-xl border border-[#e5e5e0] bg-white text-sm text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#1a1a1a]/20 focus:border-[#1a1a1a] transition-colors placeholder:text-[#bbb]"
                />
              </div>
              {form.video && (
                <p className="text-xs text-[#666] mt-1.5 flex items-center gap-1">
                  <svg className="w-3.5 h-3.5 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  <code className="bg-[#f0f0eb] px-1.5 py-0.5 rounded text-[11px]">{form.video}</code>
                </p>
              )}
            </Field>

            <Field label="Warna Aksen" hint="Warna yang mewarnai card dan detail project" required={true}>
              <div className="grid grid-cols-3 gap-2">
                {ACCENT_OPTIONS.map((opt) => (
                  <label key={opt.value}
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border cursor-pointer transition-all ${form.accent === opt.value ? "border-[#1a1a1a] bg-[#f5f5f0]" : "border-[#e5e5e0] bg-white hover:border-[#ccc]"}`}>
                    <input type="radio" name="accent" value={opt.value} checked={form.accent === opt.value}
                      onChange={() => set("accent", opt.value)} className="sr-only" />
                    <span className="w-4 h-4 rounded-full shrink-0" style={{ backgroundColor: opt.color }} />
                    <span className="text-sm text-[#1a1a1a]">{opt.label}</span>
                  </label>
                ))}
              </div>
            </Field>

            <Field label="Tech Stack" hint="Ketik nama tech lalu tekan Enter" required={false}>
              <TagInput tags={form.stack ?? []} onChange={(tags) => set("stack", tags)} />
            </Field>
          </Section>

          {/* Section 3: Ringkasan */}
          <Section title="Ringkasan Konten">
            <Field label="Ringkasan Singkat" hint="1–2 kalimat untuk card di halaman /projects" required={true}>
              <Textarea value={form.summary ?? ""} onChange={(v) => set("summary", v)}
                placeholder="Monitoring farm kecil dengan logika sensor, threshold, dan UI status cepat." rows={2} />
            </Field>
            <Field label="Hasil Project" hint="Output konkret yang sudah jadi. Bukan proses." required={false}>
              <Textarea value={form.result ?? ""} onChange={(v) => set("result", v)}
                placeholder="Logika sensor, tampilan dashboard, dan alur otomasi Arduino." rows={2} />
            </Field>
          </Section>

          {/* Section 4: Case Study — collapsed by default */}
          <Section
            title="Detail Case Study"
            collapsible
            defaultOpen={false}
            badge="Opsional · isi nanti"
          >
            <p className="text-xs text-[#999] -mt-2 mb-1">Bagian ini muncul di halaman detail project. Bisa diisi kapan saja.</p>
            <Field label="Masalah yang Diselesaikan" hint="Apa yang jadi problem sebelum project ini ada" required={false}>
              <Textarea value={form.problem ?? ""} onChange={(v) => set("problem", v)}
                placeholder="Data sensor mentah sulit dibaca cepat saat perlu keputusan watering atau warning." rows={2} />
            </Field>
            <Field label="Proses" hint="Tiap baris = satu langkah proses" required={false}>
              <DynamicList items={form.process ?? [""]} onChange={(items) => set("process", items)}
                placeholder="Contoh: Definisikan threshold kelembapan dan suhu." />
            </Field>
            <Field label="Solusi yang Dibangun" hint="Satu paragraf — apa yang kamu bangun" required={false}>
              <Textarea value={form.solution ?? ""} onChange={(v) => set("solution", v)}
                placeholder="Prototype monitoring yang mengubah bacaan sensor jadi status visual dan aksi yang jelas." rows={2} />
            </Field>
            <Field label="Bukti Konkret" hint="Tiap baris = satu fakta atau pencapaian" required={false}>
              <DynamicList items={form.proof ?? [""]} onChange={(items) => set("proof", items)}
                placeholder="Contoh: Rule threshold sederhana, mudah debug." />
            </Field>
          </Section>

          {/* Section 5: Links — collapsed by default */}
          <Section title="Tautan Project" collapsible defaultOpen={false} badge="Opsional">
            <p className="text-xs text-[#999] -mt-2 mb-1">Tombol yang muncul di halaman detail project.</p>
            <LinkEditor links={form.links ?? []} onChange={(links) => set("links", links)} />
          </Section>

          {/* Actions */}
          <div className="flex items-center justify-between pb-8">
            <button type="button" onClick={() => router.push("/admin/projects")}
              className="px-4 py-2.5 rounded-xl border border-[#e5e5e0] text-sm text-[#666] hover:bg-[#f0f0eb] transition-colors">
              Batalkan
            </button>
            <div className="flex items-center gap-3">
              {mode === "edit" && (
                <a href={`/projects/${form.slug}`} target="_blank" rel="noopener noreferrer"
                  className="text-sm text-[#666] hover:text-[#1a1a1a] transition-colors flex items-center gap-1">
                  Lihat di portfolio
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" strokeLinecap="round" />
                    <polyline points="15 3 21 3 21 9" strokeLinecap="round" />
                    <line x1="10" y1="14" x2="21" y2="3" strokeLinecap="round" />
                  </svg>
                </a>
              )}
              <button type="submit" disabled={saving}
                className="px-5 py-2.5 rounded-xl bg-[#1a1a1a] text-white text-sm font-medium hover:bg-[#333] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                {saving ? "Menyimpan..." : mode === "new" ? "Tambah Project" : "Simpan Perubahan"}
              </button>
            </div>
          </div>
        </form>

        {/* ── RIGHT: Live Preview (sticky) ── */}
        <div className="xl:sticky xl:top-6">
          <div className="bg-[#f0f0eb] rounded-2xl p-4 border border-[#e5e5e0] max-h-[calc(100vh-3rem)] overflow-y-auto">
            <LivePreview form={form} />
          </div>
        </div>
      </div>
    </>
  );
}
