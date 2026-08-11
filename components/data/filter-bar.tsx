"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Filter, X, RotateCcw } from "lucide-react";

export interface ActiveFilter {
  id: string;
  label: string;
  value: string;
}

export interface FilterBarProps {
  activeFilters?: ActiveFilter[];
  onRemoveFilter?: (id: string) => void;
  onClearAll?: () => void;
  variant?: "default" | "bordered" | "glass" | "ios-glass";
  className?: string;
  children?: React.ReactNode;
}

const variantStyles = {
  default: "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm",
  bordered: "bg-white dark:bg-zinc-950 border-2 border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm",
  glass: "bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-white/40 dark:border-zinc-800/80 text-zinc-900 dark:text-zinc-100 shadow-lg",
  "ios-glass": "bg-white/40 dark:bg-zinc-900/40 backdrop-blur-2xl border border-white/60 dark:border-zinc-800/80 text-zinc-900 dark:text-zinc-100 shadow-lg shadow-black/5",
};

export const FilterBar: React.FC<FilterBarProps> = ({
  activeFilters = [],
  onRemoveFilter,
  onClearAll,
  variant = "ios-glass",
  className,
  children,
}) => {
  const filterCount = activeFilters.length;

  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 px-4 rounded-2xl select-none transition-colors",
        variantStyles[variant],
        className
      )}
    >
      <div className="flex flex-wrap items-center gap-2 flex-1 min-w-0">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300 mr-1">
          <Filter size={14} className="text-blue-500 shrink-0" />
          <span>Filters</span>
          {filterCount > 0 && (
            <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-blue-600 text-white dark:bg-blue-500">
              {filterCount}
            </span>
          )}
        </div>

        {children}

        {/* Active Filter Chips */}
        <AnimatePresence>
          {activeFilters.map((filter) => (
            <motion.span
              key={filter.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.15 }}
              className="inline-flex items-center gap-1.5 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-200 text-xs px-2.5 py-1 rounded-xl font-medium"
            >
              <span className="text-zinc-400 font-normal">{filter.label}:</span>
              <span>{filter.value}</span>
              <button
                type="button"
                onClick={() => onRemoveFilter?.(filter.id)}
                className="hover:text-red-500 transition-colors shrink-0"
              >
                <X size={12} />
              </button>
            </motion.span>
          ))}
        </AnimatePresence>
      </div>

      {filterCount > 0 && onClearAll && (
        <button
          type="button"
          onClick={onClearAll}
          className="inline-flex items-center gap-1 text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors shrink-0"
        >
          <RotateCcw size={12} />
          Reset All
        </button>
      )}
    </div>
  );
};

FilterBar.displayName = "FilterBar";

export default FilterBar;
