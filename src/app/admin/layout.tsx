import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CMS Admin — Portfolio",
  robots: { index: false, follow: false },
};

// Admin layout — nested di bawah root layout (tidak perlu <html><body>)
// AppShell dari root layout akan di-bypass secara visual karena AdminShell
// menggunakan min-h-screen flex yang override tampilan
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
