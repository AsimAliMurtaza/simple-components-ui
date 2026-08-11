"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Inbox } from "lucide-react";

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  secondaryAction?: React.ReactNode;
  variant?: "default" | "bordered" | "dashed" | "glass" | "ios-glass";
  className?: string;
  children?: React.ReactNode;
}

const variantStyles = {
  default: "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm",
  bordered: "bg-white dark:bg-zinc-950 border-2 border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm",
  dashed: "bg-white/50 dark:bg-zinc-900/50 border-2 border-dashed border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100",
  glass: "bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-white/40 dark:border-zinc-800/80 text-zinc-900 dark:text-zinc-100 shadow-lg",
  "ios-glass": "bg-white/40 dark:bg-zinc-900/40 backdrop-blur-2xl border border-white/60 dark:border-zinc-800/80 text-zinc-900 dark:text-zinc-100 shadow-lg shadow-black/5",
};

export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    {
      icon = <Inbox size={32} className="text-zinc-400 dark:text-zinc-500" />,
      title = "No data found",
      description = "There are no records matching your criteria.",
      action,
      secondaryAction,
      variant = "ios-glass",
      className,
      children,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-3xl select-none transition-colors max-w-lg mx-auto w-full",
          variantStyles[variant],
          className
        )}
      >
        {icon && (
          <div className="p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-800/60 mb-4 shrink-0 shadow-inner">
            {icon}
          </div>
        )}

        {title && (
          <h3 className="text-base sm:text-lg font-bold tracking-tight mb-1 text-zinc-900 dark:text-zinc-100">
            {title}
          </h3>
        )}

        {description && (
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-sm mb-6 leading-relaxed">
            {description}
          </p>
        )}

        {children && <div className="mb-6 w-full">{children}</div>}

        {(action || secondaryAction) && (
          <div className="flex flex-wrap items-center justify-center gap-3">
            {action}
            {secondaryAction}
          </div>
        )}
      </div>
    );
  }
);

EmptyState.displayName = "EmptyState";

export default EmptyState;
