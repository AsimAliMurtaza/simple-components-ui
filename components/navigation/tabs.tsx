"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export interface TabItemDef {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
  disabled?: boolean;
}

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  items: TabItemDef[];
  activeTab?: string;
  defaultTab?: string;
  onTabChange?: (id: string) => void;
  variant?: "pill" | "line" | "card" | "ios-glass";
  fullWidth?: boolean;
}

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      items = [],
      activeTab: customActiveTab,
      defaultTab,
      onTabChange,
      variant = "pill",
      fullWidth = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [internalActive, setInternalActive] = React.useState(
      defaultTab || items[0]?.id || ""
    );

    const activeId = customActiveTab !== undefined ? customActiveTab : internalActive;

    const handleSelect = (id: string, disabled?: boolean) => {
      if (disabled) return;
      setInternalActive(id);
      onTabChange?.(id);
    };

    const variantListStyles = {
      pill: "p-1 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80",
      line: "border-b border-zinc-200 dark:border-zinc-800 gap-4",
      card: "p-1 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm",
      "ios-glass": "p-1 rounded-2xl bg-white/40 dark:bg-zinc-900/40 border border-white/50 dark:border-zinc-800/80 backdrop-blur-xl shadow-lg",
    };

    return (
      <div ref={ref} className={cn("w-full space-y-4 select-none", className)} {...props}>
        {/* Tab List */}
        <div
          className={cn(
            "relative flex items-center overflow-x-auto no-scrollbar",
            variantListStyles[variant],
            fullWidth && "w-full"
          )}
        >
          {items.map((tab) => {
            const isActive = activeId === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                disabled={tab.disabled}
                onClick={() => handleSelect(tab.id, tab.disabled)}
                className={cn(
                  "relative flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer z-10 shrink-0",
                  fullWidth && "flex-1",
                  tab.disabled
                    ? "opacity-40 cursor-not-allowed text-zinc-400"
                    : isActive
                    ? "text-zinc-900 dark:text-white"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                )}
              >
                {tab.icon && <span className="shrink-0">{tab.icon}</span>}
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={cn(
                      "px-1.5 py-0.5 text-[9px] font-mono font-bold rounded-md",
                      isActive
                        ? "bg-teal-100 text-teal-800 dark:bg-zinc-800 dark:text-teal-400"
                        : "bg-zinc-200/60 dark:bg-zinc-800/60 text-zinc-600 dark:text-zinc-400"
                    )}
                  >
                    {tab.badge}
                  </span>
                )}

                {/* Animated active indicator slider */}
                {isActive && variant !== "line" && (
                  <motion.div
                    layoutId="activeTabPill"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className="absolute inset-0 rounded-xl bg-white dark:bg-zinc-800 shadow-sm border border-zinc-200/60 dark:border-zinc-700/60 -z-10"
                  />
                )}

                {/* Active line indicator */}
                {isActive && variant === "line" && (
                  <motion.div
                    layoutId="activeTabLine"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600 dark:bg-teal-400 rounded-full"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content Panel */}
        {children}
      </div>
    );
  }
);

Tabs.displayName = "Tabs";
