import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/docs/theme-provider";
import { ToastProvider } from "@/index";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Simple Components UI - Modern React Component Library",
    template: "%s - Simple Components UI",
  },
  description:
    "Reusable, highly customizable, typed, dark/light mode compatible React components powered by Tailwind CSS and Framer Motion.",
  keywords: [
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Framer Motion",
    "UI Library",
    "Components",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground`}
      >
        <ThemeProvider>
          <ToastProvider position="top-right">{children}</ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
