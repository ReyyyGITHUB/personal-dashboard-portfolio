import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { AppShell } from "@/components/layout/app-shell";
import { ThemeScript } from "@/components/ui/theme-script";
import { headers } from "next/headers";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rayhan — Portfolio OS",
  description: "Dashboard portfolio berisi proyek, cerita belajar, stack, dan kontak kerja.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") ?? headersList.get("x-invoke-path") ?? "";
  const isAdmin = pathname.startsWith("/admin");

  return (
    <html lang="id" suppressHydrationWarning className={`${plusJakarta.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <ThemeScript />
        {isAdmin ? children : <AppShell>{children}</AppShell>}
      </body>
    </html>
  );
}
