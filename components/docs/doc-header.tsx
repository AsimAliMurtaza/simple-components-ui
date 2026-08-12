"use client";

import * as React from "react";
import Link from "next/link";
import {
  Sparkles,
  Search,
  Sun,
  Moon,
  Github,
  Package,
  Menu,
  X,
} from "lucide-react";
import { useTheme } from "./theme-provider";
import { SearchModal } from "./search-modal";

export interface DocHeaderProps {
  onToggleMobileSidebar?: () => void;
  isMobileSidebarOpen?: boolean;
}

export function DocHeader({
  onToggleMobileSidebar,
  isMobileSidebarOpen,
}: DocHeaderProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [searchOpen, setSearchOpen] = React.useState(false);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/80 dark:bg-zinc-950/80 border-b border-zinc-200/80 dark:border-zinc-800/80 transition-colors select-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-4 sm:px-6">
          {/* Left: Mobile hamburger & Logo */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onToggleMobileSidebar}
              className="lg:hidden p-2 rounded-xl text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Toggle navigation drawer"
            >
              {isMobileSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="p-2 rounded-xl bg-teal-600 dark:bg-teal-700 text-white shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform">
                <Sparkles size={18} />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold tracking-tight text-zinc-900 dark:text-white">
                  Simple Components UI
                </span>
                <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500">
                  v0.4.0
                </span>
              </div>
            </Link>
          </div>

          {/* Center: Search trigger */}
          <div className="hidden sm:flex flex-1 max-w-sm mx-6">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="w-full flex items-center justify-between px-3.5 py-2 text-xs rounded-2xl bg-zinc-100/80 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:border-teal-500/40 dark:hover:border-zinc-700 transition-all cursor-pointer shadow-sm"
            >
              <div className="flex items-center gap-2">
                <Search size={15} />
                <span>Search docs & components...</span>
              </div>
              <span className="px-1.5 py-0.5 rounded bg-zinc-200/60 dark:bg-zinc-800/80 text-[10px] font-mono font-semibold">
                ⌘K
              </span>
            </button>
          </div>

          {/* Right: Search mobile icon, Github, npm, theme toggle */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="sm:hidden p-2 rounded-xl text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              title="Search documentation"
            >
              <Search size={18} />
            </button>

            <a
              href="https://github.com/AsimAliMurtaza/simple-components-ui"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
              title="GitHub repository"
            >
              <Github size={18} />
            </a>

            <a
              href="https://www.npmjs.com/package/@simple-components-ui/components"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-red-500 transition-colors"
              title="npm package"
            >
              <Package size={18} />
            </a>

            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-xl text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              title="Toggle dark/light mode"
            >
              {resolvedTheme === "dark" ? (
                <Sun size={18} />
              ) : (
                <Moon size={18} />
              )}
            </button>
          </div>
        </div>
      </header>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
