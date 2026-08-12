"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { docsConfig } from "@/config/docs";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export interface DocSidebarProps {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
  className?: string;
}

export function DocSidebar({
  mobileOpen = false,
  onMobileClose,
  className,
}: DocSidebarProps) {
  const pathname = usePathname();

  const sidebarContent = (
    <div className="space-y-6 select-none pb-10">
      {docsConfig.nav.map((category) => (
        <div key={category.title} className="space-y-2">
          <h4 className="px-3 text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-sans">
            {category.title}
          </h4>

          <ul className="space-y-0.5 text-xs font-medium">
            {category.items.map((item) => {
              const isActive = pathname === item.href;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onMobileClose}
                    className={cn(
                      "flex items-center justify-between px-3 py-2 rounded-xl transition-all duration-150",
                      isActive
                        ? "bg-sky-50 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300 font-bold shadow-sm"
                        : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
                    )}
                  >
                    <span className="truncate">{item.title}</span>
                    {item.badge && (
                      <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold rounded-md bg-sky-100 text-sky-800 dark:bg-sky-900/80 dark:text-sky-300">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden lg:block w-64 shrink-0 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto custom-scrollbar pt-6 pr-4 border-r border-zinc-200/80 dark:border-zinc-800/80",
          className
        )}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="lg:hidden fixed inset-0 z-50">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onMobileClose}
              className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm"
            />

            {/* Mobile Panel */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 400, damping: 35 }}
              className="fixed top-0 bottom-0 left-0 w-4/5 max-w-xs bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 p-6 overflow-y-auto custom-scrollbar z-10 flex flex-col"
            >
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-zinc-100 dark:border-zinc-800">
                <span className="text-sm font-bold tracking-tight">Navigation Menu</span>
                <button
                  type="button"
                  onClick={onMobileClose}
                  className="p-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500"
                >
                  <X size={16} />
                </button>
              </div>

              {sidebarContent}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
