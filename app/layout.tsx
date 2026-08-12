import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/docs/theme-provider";
import { ToastProvider } from "@/index";
import { Analytics } from "@vercel/analytics/next";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Simple Components - Modern React Component Library",
    template: "%s - Simple Components",
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
    "Google Sans",
    "Noto Serif",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans:ital,opsz,wght@0,17..18,400..700;1,17..18,400..700&family=Noto+Serif:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geistMono.variable} font-sans antialiased min-h-screen bg-background text-foreground`}
      >
        <ThemeProvider>
          <Analytics />
          <ToastProvider position="top-right">{children}</ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
