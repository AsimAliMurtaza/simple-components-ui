"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ChevronRight, FileText, Component as ComponentIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { docsConfig } from "@/config/docs";

export interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

export function SearchModal({ open, onClose }: SearchModalProps) {
  const [query, setQuery] = React.useState("");
  const router = useRouter();

  // Keyboard shortcut Ctrl+K / Cmd+K
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (open) onClose();
      }
      if (e.key === "Escape" && open) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  const searchResults = React.useMemo(() => {
    if (!query.trim()) return [];

    const q = query.toLowerCase();
    const results: { title: string; href: string; category: string; icon: "page" | "component" }[] = [];

    docsConfig.nav.forEach((cat) => {
      cat.items.forEach((item) => {
        if (
          item.title.toLowerCase().includes(q) ||
          cat.title.toLowerCase().includes(q)
        ) {
          results.push({
            title: item.title,
            href: item.href,
            category: cat.title,
            icon: item.href.startsWith("/docs/components/") ? "component" : "page",
          });
        }
      });
    });

    return results.slice(0, 8);
  }, [query]);

  const handleSelect = (href: string) => {
    router.push(href);
    onClose();
    setQuery("");
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 overflow-y-auto select-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15 }}
            className="relative z-10 w-full max-w-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Search Input Bar */}
            <div className="flex items-center px-4 py-3.5 border-b border-zinc-200 dark:border-zinc-800 gap-3">
              <Search className="h-5 w-5 text-zinc-400 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search documentation, components, or guides..."
                autoFocus
                className="w-full bg-transparent text-sm outline-none text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 font-sans"
              />
              <button
                type="button"
                onClick={onClose}
                className="p-1 rounded-full text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors shrink-0"
              >
                <X size={16} />
              </button>
            </div>

            {/* Results list */}
            <div className="p-2 max-h-80 overflow-y-auto">
              {!query.trim() ? (
                <div className="p-6 text-center text-xs text-zinc-400 dark:text-zinc-500 font-medium">
                  Type to search across 30+ components and documentation guides...
                </div>
              ) : searchResults.length === 0 ? (
                <div className="p-6 text-center text-xs text-zinc-400 dark:text-zinc-500 font-medium">
                  No matching documentation or component found for &quot;{query}&quot;
                </div>
              ) : (
                <div className="space-y-1">
                  {searchResults.map((res) => (
                    <div
                      key={res.href}
                      onClick={() => handleSelect(res.href)}
                      className="flex items-center justify-between p-3 rounded-2xl hover:bg-zinc-100 dark:hover:bg-zinc-800/70 transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 group-hover:bg-teal-600 dark:group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0">
                          {res.icon === "component" ? (
                            <ComponentIcon size={16} />
                          ) : (
                            <FileText size={16} />
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                            {res.title}
                          </div>
                          <div className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate">
                            {res.category}
                          </div>
                        </div>
                      </div>

                      <ChevronRight size={16} className="text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors shrink-0" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-[11px] text-zinc-400 font-mono">
              <span>Press ESC to exit</span>
              <span>⌘K to toggle search</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
