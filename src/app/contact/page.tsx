"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { BrandIcon } from "@/components/ui/icons/brand-icons";
import { focusRing } from "@/lib/ui";
import { quickLinks } from "@/data/portfolio-data";

type LineType = "system" | "input" | "output" | "error" | "success";

type TerminalLine = {
  text: string;
  type: LineType;
};

type FormStep = "name" | "email" | "message" | "confirm" | "idle";

export default function ContactPage() {
  const [history, setHistory] = useState<TerminalLine[]>([
    { text: "RayhanOS v1.0.0 - Interactive CLI Terminal Client", type: "system" },
    { text: "Ketik 'help' untuk daftar perintah atau 'reset' untuk mulai ulang form.", type: "system" },
    { text: "--------------------------------------------------------", type: "system" },
    { text: "Masukkan Nama Anda: ", type: "output" }
  ]);

  const [inputVal, setInputVal] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [currentStep, setCurrentStep] = useState<FormStep>("name");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll ke bawah saat ada baris baru
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  // Auto-focus input terminal saat di-klik di mana saja pada terminal
  function focusTerminal() {
    inputRef.current?.focus();
  }

  // Validasi format email sederhana
  function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // Jalankan simulator pengiriman pesan
  async function simulateSending() {
    setIsSubmitting(true);
    setHistory((prev) => [
      ...prev,
      { text: "> send", type: "input" },
      { text: "[1/3] Melakukan validasi payload pesan...", type: "system" }
    ]);

    await new Promise((res) => setTimeout(res, 800));

    setHistory((prev) => [
      ...prev,
      { text: "[2/3] Menghubungkan ke gateway pengiriman...", type: "system" }
    ]);

    await new Promise((res) => setTimeout(res, 1000));

    setHistory((prev) => [
      ...prev,
      { text: "[3/3] Enkripsi pesan & pengiriman sukses!", type: "system" }
    ]);

    await new Promise((res) => setTimeout(res, 600));

    setHistory((prev) => [
      ...prev,
      { text: "✓ SUKSES: Pesan terkirim secara simulatif!", type: "success" },
      { text: `Terima kasih ${formData.name}, respons akan dikirim ke ${formData.email} dalam 1-2 hari kerja.`, type: "success" },
      { text: "Ketik 'reset' jika ingin mengirim pesan lain.", type: "system" }
    ]);

    setFormData({ name: "", email: "", message: "" });
    setCurrentStep("idle");
    setIsSubmitting(false);
  }

  // Tangani masukan baris CLI
  function handleCommand(e: React.FormEvent) {
    e.preventDefault();
    const cleanInput = inputVal.trim();
    setInputVal("");

    if (!cleanInput) return;

    // Tambahkan input user ke history
    setHistory((prev) => [...prev, { text: `> ${cleanInput}`, type: "input" }]);

    // Cek perintah global (help, clear, reset)
    const cmdLower = cleanInput.toLowerCase();
    if (cmdLower === "help") {
      setHistory((prev) => [
        ...prev,
        { text: "Daftar Perintah Tersedia:", type: "output" },
        { text: "  help   - Tampilkan menu bantuan ini.", type: "output" },
        { text: "  clear  - Bersihkan seluruh teks terminal.", type: "output" },
        { text: "  reset  - Batalkan pengisian & ulangi form dari awal.", type: "output" },
        { text: "  send   - Kirim pesan (jika form sudah lengkap terisi).", type: "output" }
      ]);
      promptNextStep(currentStep);
      return;
    }

    if (cmdLower === "clear") {
      setHistory([]);
      // Setelah bersihkan, prompt ulang step saat ini
      setTimeout(() => promptNextStep(currentStep), 10);
      return;
    }

    if (cmdLower === "reset") {
      setFormData({ name: "", email: "", message: "" });
      setCurrentStep("name");
      setHistory([
        { text: "Formulir direset! Memulai kembali...", type: "system" },
        { text: "Masukkan Nama Anda: ", type: "output" }
      ]);
      return;
    }

    // Alur pengisian prompt form
    if (currentStep === "name") {
      setFormData((prev) => ({ ...prev, name: cleanInput }));
      setCurrentStep("email");
      setHistory((prev) => [
        ...prev,
        { text: `Nama disimpan: ${cleanInput}`, type: "system" },
        { text: "Masukkan Email Anda: ", type: "output" }
      ]);
    } else if (currentStep === "email") {
      if (!isValidEmail(cleanInput)) {
        setHistory((prev) => [
          ...prev,
          { text: "✗ ERROR: Format email tidak valid. Masukkan email yang benar!", type: "error" },
          { text: "Masukkan Email Anda: ", type: "output" }
        ]);
      } else {
        setFormData((prev) => ({ ...prev, email: cleanInput }));
        setCurrentStep("message");
        setHistory((prev) => [
          ...prev,
          { text: `Email disimpan: ${cleanInput}`, type: "system" },
          { text: "Ceritain Konteks Project Anda: ", type: "output" }
        ]);
      }
    } else if (currentStep === "message") {
      setFormData((prev) => ({ ...prev, message: cleanInput }));
      setCurrentStep("confirm");
      setHistory((prev) => [
        ...prev,
        { text: "Pesan disimpan.", type: "system" },
        { text: "--------------------------------------------------------", type: "system" },
        { text: "Ringkasan Pesan:", type: "output" },
        { text: `  Nama: ${formData.name}`, type: "output" },
        { text: `  Email: ${formData.email}`, type: "output" },
        { text: `  Pesan: ${cleanInput}`, type: "output" },
        { text: "--------------------------------------------------------", type: "system" },
        { text: "Ketik 'send' untuk mengirim atau 'reset' untuk mengulangi.", type: "output" }
      ]);
    } else if (currentStep === "confirm") {
      if (cmdLower === "send") {
        simulateSending();
      } else {
        setHistory((prev) => [
          ...prev,
          { text: "Perintah salah. Ketik 'send' untuk mengirim atau 'reset' untuk mengulangi.", type: "error" }
        ]);
      }
    } else if (currentStep === "idle") {
      setHistory((prev) => [
        ...prev,
        { text: "Form sudah dikirim. Ketik 'reset' untuk mengirim pesan baru.", type: "system" }
      ]);
    }
  }

  // Tampilkan ulang prompt untuk step terkait
  function promptNextStep(step: FormStep) {
    if (step === "name") {
      setHistory((prev) => [...prev, { text: "Masukkan Nama Anda: ", type: "output" }]);
    } else if (step === "email") {
      setHistory((prev) => [...prev, { text: "Masukkan Email Anda: ", type: "output" }]);
    } else if (step === "message") {
      setHistory((prev) => [...prev, { text: "Ceritain Konteks Project Anda: ", type: "output" }]);
    } else if (step === "confirm") {
      setHistory((prev) => [...prev, { text: "Ketik 'send' untuk mengirim atau 'reset' untuk mengulangi.", type: "output" }]);
    }
  }

  return (
    <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-4 px-5 py-5 sm:px-6 lg:grid-cols-12 lg:gap-5 lg:px-10 lg:py-8">
      {/* Header Halaman */}
      <section className="rounded-[2.25rem] border border-dashboard-outline-variant bg-dashboard-surface-lowest p-6 shadow-subtle lg:col-span-8 lg:p-8">
        <span className="mb-4 inline-flex rounded-full border border-dashboard-outline-variant bg-dashboard-surface-low px-3 py-1 text-xs font-bold text-dashboard-on-surface-variant">
          Unix CLI Terminal Form
        </span>
        <h1 className="max-w-3xl text-4xl font-black tracking-[-0.06em] sm:text-5xl">
          Kirim brief project lewat prompt shell interaktif.
        </h1>
        <p className="mt-4 max-w-2xl text-base font-semibold leading-7 text-dashboard-on-surface-variant">
          Penyuka interaksi unix? Isi detail pesan kontak Anda secara langsung di simulator command-line di bawah ini. Sederhana, tanpa lag, dan playfully fun!
        </p>
      </section>

      {/* Samping Kanan: Status Ketersediaan */}
      <aside className="rounded-[2.25rem] border border-dashboard-outline-variant bg-pitch-black p-6 text-ghost-white shadow-subtle lg:col-span-4 dark:bg-ghost-white dark:text-pitch-black flex flex-col justify-between">
        <div>
          <span className="text-xs font-black uppercase tracking-[0.18em] text-lime-pop">
            Availability
          </span>
          <h2 className="mt-4 text-3xl font-black tracking-[-0.05em]">
            Open untuk collab terarah.
          </h2>
        </div>
        <div className="mt-6 space-y-1">
          <p className="text-sm font-semibold leading-6 text-ghost-white/75 dark:text-pitch-black/75">
            Timezone Asia/Jakarta.
          </p>
          <p className="text-xs font-bold text-dashboard-outline">
            Response target: 1-2 hari kerja.
          </p>
        </div>
      </aside>

      {/* Terminal Interaktif UNIX CLI */}
      <section className="rounded-[2rem] border border-dashboard-outline-variant bg-[#111115] p-5 shadow-subtle lg:col-span-7 flex flex-col min-h-[420px] text-green-400 font-mono text-sm leading-relaxed relative">
        {/* Kontrol Bar Terminal Premium */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
          <div className="flex items-center gap-1.5">
            <span className="size-3 rounded-full bg-red-500/80" />
            <span className="size-3 rounded-full bg-yellow-500/80" />
            <span className="size-3 rounded-full bg-green-500/80" />
          </div>
          <span className="text-xs font-bold text-white/40 select-none">RayhanOS - terminal_client.sh</span>
        </div>

        {/* Tampilan Riwayat Konsol */}
        <div 
          ref={containerRef}
          onClick={focusTerminal}
          className="flex-1 overflow-y-auto max-h-[300px] space-y-1.5 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10 cursor-text"
        >
          {history.map((line, index) => {
            let color = "text-green-400";
            if (line.type === "system") color = "text-yellow-400/85";
            if (line.type === "input") color = "text-white font-bold";
            if (line.type === "error") color = "text-red-400 font-black";
            if (line.type === "success") color = "text-lime-400 font-black";

            return (
              <div key={index} className={`${color} whitespace-pre-wrap`}>
                {line.text}
              </div>
            );
          })}
        </div>

        {/* Bar Input Shell */}
        <form onSubmit={handleCommand} className="flex items-center gap-1 border-t border-white/10 pt-3 mt-3">
          <span className="text-white font-black select-none">$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            disabled={isSubmitting}
            className="flex-1 bg-transparent text-white font-bold border-none outline-none focus:ring-0 p-0 text-sm placeholder:text-white/20"
            placeholder={isSubmitting ? "Sedang mengirim..." : "Ketik di sini & tekan Enter..."}
            autoFocus
          />
        </form>

        {/* Tombol Panduan Keyboard */}
        <div className="mt-4 flex items-center justify-between text-[10px] text-white/30 border-t border-white/5 pt-2 select-none">
          <span>Panduan: Ketik &apos;help&apos; untuk bantuan</span>
          <span className="flex items-center gap-2">
            <kbd className="bg-white/10 px-1.5 py-0.5 rounded border border-white/10">Enter</kbd> Kirim baris
            <kbd className="bg-white/10 px-1.5 py-0.5 rounded border border-white/10">Tab</kbd> Fokus terminal
          </span>
        </div>
      </section>

      {/* Samping Kanan Bawah: Tautan Sosial media Konvensional */}
      <aside className="grid gap-4 lg:col-span-5">
        <article className="rounded-[2rem] border border-dashboard-outline-variant bg-dashboard-surface-lowest p-6 shadow-subtle">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-dashboard-outline">Direct links</p>
          <div className="mt-4 grid gap-2">
            <Link 
              href="mailto:hello@example.com" 
              className={`flex items-center justify-between rounded-2xl bg-dashboard-surface-low p-4 text-sm font-bold border border-dashboard-outline-variant/35 hover:border-dashboard-outline hover:bg-dashboard-surface-low/85 transition-colors ${focusRing}`}
            >
              <span>Email placeholder</span>
              <span>→</span>
            </Link>
            {quickLinks.map((link) => (
              <Link 
                key={link.label} 
                href={link.href} 
                className={`flex items-center justify-between rounded-2xl bg-dashboard-surface-low p-4 text-sm font-bold border border-dashboard-outline-variant/35 hover:border-dashboard-outline hover:bg-dashboard-surface-low/85 transition-colors ${focusRing}`}
              >
                <span>{link.label}</span>
                <span>→</span>
              </Link>
            ))}
          </div>
        </article>
        <article className="rounded-[2rem] border border-dashboard-outline-variant bg-dashboard-surface-lowest p-6 shadow-subtle">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-dashboard-outline">Good brief</p>
          <ul className="mt-4 space-y-3 text-sm font-semibold leading-6 text-dashboard-on-surface-variant">
            <li className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-[#cbd810]" />
              Tujuan & target project.
            </li>
            <li className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-[#cbd810]" />
              Timeline & batasan pengerjaan.
            </li>
            <li className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-[#cbd810]" />
              Referensi desain atau fungsionalitas wajib.
            </li>
          </ul>
        </article>
      </aside>
    </div>
  );
}
