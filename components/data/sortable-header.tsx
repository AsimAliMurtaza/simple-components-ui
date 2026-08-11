"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";
import { TableHead } from "./table";

export type SortDirection = "asc" | "desc" | false;

export interface SortableHeaderProps
  extends React.ThHTMLAttributes<HTMLTableCellElement> {
  sortDirection?: SortDirection;
  onSort?: (direction: SortDirection) => void;
  children: React.ReactNode;
  className?: string;
}

export const SortableHeader = React.forwardRef<
  HTMLTableCellElement,
  SortableHeaderProps
>(({ sortDirection, onSort, children, className, ...props }, ref) => {
  const handleSort = () => {
    if (!onSort) return;
    if (sortDirection === "asc") {
      onSort("desc");
    } else if (sortDirection === "desc") {
      onSort(false);
    } else {
      onSort("asc");
    }
  };

  return (
    <TableHead
      ref={ref}
      onClick={handleSort}
      className={cn(
        "cursor-pointer select-none transition-colors group hover:text-blue-600 dark:hover:text-blue-400",
        sortDirection && "text-blue-600 dark:text-blue-400 font-bold",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-1.5">
        <span>{children}</span>

        <motion.span
          className="shrink-0 opacity-60 group-hover:opacity-100 transition-opacity"
          animate={{ scale: sortDirection ? 1.1 : 1 }}
        >
          {sortDirection === "asc" ? (
            <ArrowUp size={14} className="text-blue-600 dark:text-blue-400" />
          ) : sortDirection === "desc" ? (
            <ArrowDown size={14} className="text-blue-600 dark:text-blue-400" />
          ) : (
            <ArrowUpDown size={14} className="opacity-40 group-hover:opacity-80" />
          )}
        </motion.span>
      </div>
    </TableHead>
  );
});

SortableHeader.displayName = "SortableHeader";

export default SortableHeader;
