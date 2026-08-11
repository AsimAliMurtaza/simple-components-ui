"use client";

import * as React from "react";
import { DocHeader } from "./doc-header";
import { DocSidebar } from "./doc-sidebar";
import Link from "next/link";
import { Sparkles, Github, Package } from "lucide-react";

export interface DocLayoutProps {
  children: React.ReactNode;
}

export function DocLayout({ children }: DocLayoutProps) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col font-sans transition-colors duration-200">
      <DocHeader
        onToggleMobileSidebar={() => setMobileSidebarOpen((prev) => !prev)}
        isMobileSidebarOpen={mobileSidebarOpen}
      />

      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 flex">
        <DocSidebar
          mobileOpen={mobileSidebarOpen}
          onMobileClose={() => setMobileSidebarOpen(false)}
        />

        <main className="flex-1 min-w-0 py-8 lg:pl-10">
          <div className="max-w-4xl">{children}</div>
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-950/50 py-10 mt-20 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 dark:text-zinc-400">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-blue-600 text-white">
              <Sparkles size={14} />
            </div>
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">
              Simple Components UI
            </span>
            <span>— Open-source React component library.</span>
          </div>

          <div className="flex items-center gap-6 font-medium">
            <Link href="/docs" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
              Docs
            </Link>
            <Link href="/docs/installation" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
              Install
            </Link>
            <a
              href="https://github.com/AsimAliMurtaza/simple-components-ui"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors flex items-center gap-1"
            >
              <Github size={13} />
              GitHub
            </a>
            <a
              href="https://www.npmjs.com/package/@simple-components-ui/components"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors flex items-center gap-1"
            >
              <Package size={13} />
              npm
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
