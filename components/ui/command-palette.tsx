"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Search, Command, ArrowRight } from "lucide-react";

export interface CommandItemDef {
  id: string;
  title: string;
  description?: string;
  category?: string;
  icon?: React.ReactNode;
  shortcut?: string;
  onSelect?: () => void;
}

export interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  items: CommandItemDef[];
  placeholder?: string;
  variant?: "default" | "glass" | "ios-glass";
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  open,
  onClose,
  items = [],
  placeholder = "Type a command or search...",
  variant = "ios-glass",
}) => {
  const [query, setQuery] = React.useState("");
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const filteredItems = React.useMemo(() => {
    if (!query.trim()) return items;
    const q = query.toLowerCase();
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        (item.description && item.description.toLowerCase().includes(q)) ||
        (item.category && item.category.toLowerCase().includes(q))
    );
  }, [items, query]);

  React.useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (open) onClose();
        else setSelectedIndex(0);
      }

      if (!open) return;

      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev === 0 ? Math.max(0, filteredItems.length - 1) : prev - 1
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        const selected = filteredItems[selectedIndex];
        if (selected) {
          selected.onSelect?.();
          onClose();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose, filteredItems, selectedIndex]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 select-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className={cn(
              "relative w-full max-w-xl overflow-hidden rounded-3xl z-10 shadow-2xl flex flex-col max-h-[70vh]",
              variant === "glass" &&
                "bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-white/40 dark:border-zinc-800",
              variant === "ios-glass" &&
                "bg-white/50 dark:bg-zinc-900/50 backdrop-blur-2xl border border-white/60 dark:border-zinc-800/80 shadow-2xl",
              variant === "default" &&
                "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"
            )}
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-zinc-200/80 dark:border-zinc-800/80">
              <Search size={18} className="text-zinc-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder={placeholder}
                className="w-full bg-transparent text-sm font-medium text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none"
              />
              <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-400 text-[10px] font-mono border border-zinc-200 dark:border-zinc-700">
                <Command size={10} /> K
              </kbd>
            </div>

            {/* Command Results List */}
            <div className="overflow-y-auto p-2 space-y-1 max-h-80">
              {filteredItems.length === 0 ? (
                <div className="p-8 text-center text-xs text-zinc-400">
                  No commands found for &quot;{query}&quot;
                </div>
              ) : (
                filteredItems.map((item, index) => {
                  const isSelected = index === selectedIndex;
                  return (
                    <div
                      key={item.id}
                      onClick={() => {
                        item.onSelect?.();
                        onClose();
                      }}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={cn(
                        "flex items-center justify-between p-3 rounded-2xl cursor-pointer transition-all duration-150",
                        isSelected
                          ? "bg-teal-500/10 dark:bg-teal-500/20 text-teal-900 dark:text-teal-100 font-semibold"
                          : "hover:bg-zinc-100/70 dark:hover:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300"
                      )}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {item.icon && (
                          <div
                            className={cn(
                              "p-2 rounded-xl text-teal-600 dark:text-teal-400 shrink-0",
                              isSelected
                                ? "bg-teal-500/20"
                                : "bg-zinc-100 dark:bg-zinc-800"
                            )}
                          >
                            {item.icon}
                          </div>
                        )}
                        <div className="truncate">
                          <p className="text-xs sm:text-sm font-medium leading-tight">
                            {item.title}
                          </p>
                          {item.description && (
                            <p className="text-[11px] text-zinc-400 dark:text-zinc-500 truncate mt-0.5">
                              {item.description}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {item.shortcut && (
                          <kbd className="px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-400 text-[10px] font-mono border border-zinc-200 dark:border-zinc-700">
                            {item.shortcut}
                          </kbd>
                        )}
                        {isSelected && (
                          <ArrowRight
                            size={14}
                            className="text-teal-600 dark:text-teal-400"
                          />
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer Navigation Hints */}
            <div className="px-4 py-2 bg-zinc-50/50 dark:bg-zinc-900/50 border-t border-zinc-200/60 dark:border-zinc-800/60 flex items-center justify-between text-[11px] text-zinc-400 font-medium">
              <div className="flex items-center gap-2">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
              </div>
              <span>ESC to Close</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

CommandPalette.displayName = "CommandPalette";

export default CommandPalette;
