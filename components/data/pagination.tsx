"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems?: number;
  pageSize?: number;
  pageSizeOptions?: number[];
  onPageChange: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  siblingCount?: number;
  showFirstLast?: boolean;
  showPageSizeSelector?: boolean;
  variant?: "default" | "bordered" | "glass" | "ios-glass";
  className?: string;
}

const variantStyles = {
  default: "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm",
  bordered: "bg-white dark:bg-zinc-950 border-2 border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm",
  glass: "bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-white/40 dark:border-zinc-800/80 text-zinc-900 dark:text-zinc-100 shadow-lg",
  "ios-glass": "bg-white/40 dark:bg-zinc-900/40 backdrop-blur-2xl border border-white/60 dark:border-zinc-800/80 text-zinc-900 dark:text-zinc-100 shadow-lg shadow-black/5",
};

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  pageSize = 10,
  pageSizeOptions = [5, 10, 20, 50],
  onPageChange,
  onPageSizeChange,
  siblingCount = 1,
  showFirstLast = true,
  showPageSizeSelector = true,
  variant = "ios-glass",
  className,
}) => {
  // Generate page numbers range
  const paginationRange = React.useMemo(() => {
    const totalPageNumbers = siblingCount + 5;

    if (totalPageNumbers >= totalPages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
      return [...leftRange, "...", totalPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = Array.from(
        { length: rightItemCount },
        (_, i) => totalPages - rightItemCount + i + 1
      );
      return [firstPageIndex, "...", ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = Array.from(
        { length: rightSiblingIndex - leftSiblingIndex + 1 },
        (_, i) => leftSiblingIndex + i
      );
      return [firstPageIndex, "...", ...middleRange, "...", lastPageIndex];
    }

    return [];
  }, [totalPages, currentPage, siblingCount]);

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = totalItems ? Math.min(currentPage * pageSize, totalItems) : currentPage * pageSize;

  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row items-center justify-between gap-4 p-3 px-4 rounded-2xl select-none transition-colors",
        variantStyles[variant],
        className
      )}
    >
      {/* Total & Range Label */}
      <div className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
        {totalItems ? (
          <span>
            Showing <strong className="text-zinc-900 dark:text-zinc-100">{startItem}</strong>-
            <strong className="text-zinc-900 dark:text-zinc-100">{endItem}</strong> of{" "}
            <strong className="text-zinc-900 dark:text-zinc-100">{totalItems}</strong> results
          </span>
        ) : (
          <span>
            Page <strong className="text-zinc-900 dark:text-zinc-100">{currentPage}</strong> of{" "}
            <strong className="text-zinc-900 dark:text-zinc-100">{totalPages}</strong>
          </span>
        )}
      </div>

      <div className="flex items-center gap-3">
        {/* Page Size Selector */}
        {showPageSizeSelector && onPageSizeChange && (
          <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
            <span>Rows:</span>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-xs rounded-lg px-2 py-1 outline-none border border-zinc-200 dark:border-zinc-700 font-medium cursor-pointer"
            >
              {pageSizeOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center gap-1">
          {showFirstLast && (
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => onPageChange(1)}
              className="p-1.5 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              title="First Page"
            >
              <ChevronsLeft size={16} />
            </button>
          )}

          <button
            type="button"
            disabled={currentPage <= 1}
            onClick={() => onPageChange(currentPage - 1)}
            className="p-1.5 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            title="Previous Page"
          >
            <ChevronLeft size={16} />
          </button>

          {paginationRange.map((page, index) => {
            if (page === "...") {
              return (
                <span
                  key={`dots-${index}`}
                  className="px-2 py-1 text-xs text-zinc-400 font-mono"
                >
                  ...
                </span>
              );
            }

            const pageNum = Number(page);
            const isSelected = pageNum === currentPage;

            return (
              <button
                key={pageNum}
                type="button"
                onClick={() => onPageChange(pageNum)}
                className={cn(
                  "min-w-[28px] h-7 px-2 rounded-lg text-xs font-semibold transition-all duration-150 flex items-center justify-center",
                  isSelected
                    ? "bg-blue-600 dark:bg-blue-500 text-white shadow-sm scale-105"
                    : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                )}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            type="button"
            disabled={currentPage >= totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            className="p-1.5 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            title="Next Page"
          >
            <ChevronRight size={16} />
          </button>

          {showFirstLast && (
            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => onPageChange(totalPages)}
              className="p-1.5 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              title="Last Page"
            >
              <ChevronsRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

Pagination.displayName = "Pagination";

export default Pagination;
