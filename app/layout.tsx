import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { AppShell } from "@/components/app-shell";
import { ThemeScript } from "@/components/theme-script";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning className={`${plusJakarta.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <ThemeScript />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
