"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface HighlightTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: string;
  query?: string;
  variant?: "marker" | "underline" | "glass";
  color?: "teal" | "yellow" | "emerald" | "purple" | "rose";
  className?: string;
}

const colorPresets = {
  marker: {
    teal: "bg-teal-100 dark:bg-teal-950/80 text-teal-900 dark:text-teal-200",
    yellow: "bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-200",
    emerald: "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-200",
    purple: "bg-purple-100 dark:bg-purple-950/80 text-purple-900 dark:text-purple-200",
    rose: "bg-rose-100 dark:bg-rose-950/80 text-rose-900 dark:text-rose-200",
  },
  underline: {
    teal: "decoration-teal-500 underline underline-offset-4 decoration-2",
    yellow: "decoration-amber-500 underline underline-offset-4 decoration-2",
    emerald: "decoration-emerald-500 underline underline-offset-4 decoration-2",
    purple: "decoration-purple-500 underline underline-offset-4 decoration-2",
    rose: "decoration-rose-500 underline underline-offset-4 decoration-2",
  },
  glass: {
    teal: "bg-teal-500/15 backdrop-blur-sm border border-teal-500/30 text-teal-900 dark:text-teal-200 rounded-md px-1.5 py-0.5",
    yellow: "bg-amber-500/15 backdrop-blur-sm border border-amber-500/30 text-amber-900 dark:text-amber-200 rounded-md px-1.5 py-0.5",
    emerald: "bg-emerald-500/15 backdrop-blur-sm border border-emerald-500/30 text-emerald-900 dark:text-emerald-200 rounded-md px-1.5 py-0.5",
    purple: "bg-purple-500/15 backdrop-blur-sm border border-purple-500/30 text-purple-900 dark:text-purple-200 rounded-md px-1.5 py-0.5",
    rose: "bg-rose-500/15 backdrop-blur-sm border border-rose-500/30 text-rose-900 dark:text-rose-200 rounded-md px-1.5 py-0.5",
  },
};

export const HighlightText = React.forwardRef<HTMLSpanElement, HighlightTextProps>(
  (
    {
      children,
      query,
      variant = "marker",
      color = "teal",
      className,
      ...props
    },
    ref
  ) => {
    const styleClass = colorPresets[variant]?.[color] || colorPresets.marker.teal;

    if (!query) {
      return (
        <span
          ref={ref}
          className={cn(
            "relative inline",
            variant === "marker" && "px-1.5 py-0.5 rounded-md font-semibold",
            styleClass,
            className
          )}
          {...props}
        >
          {children}
        </span>
      );
    }

    // Search query matching
    const parts = children.split(new RegExp(`(${query})`, "gi"));

    return (
      <span ref={ref} className={className} {...props}>
        {parts.map((part, i) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <span
              key={i}
              className={cn(
                "relative inline",
                variant === "marker" && "px-1.5 py-0.5 rounded-md font-semibold",
                styleClass
              )}
            >
              {part}
            </span>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </span>
    );
  }
);

HighlightText.displayName = "HighlightText";

export default HighlightText;
