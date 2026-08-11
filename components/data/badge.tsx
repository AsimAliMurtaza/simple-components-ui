"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  intent?: "primary" | "secondary" | "success" | "warning" | "danger" | "neutral" | "purple";
  variant?: "default" | "outline" | "soft" | "dot" | "glass" | "ios-glass";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  onRemove?: () => void;
  className?: string;
  children: React.ReactNode;
}

const intentStyles = {
  default: {
    primary: "bg-blue-600 text-white dark:bg-blue-500",
    secondary: "bg-zinc-800 text-white dark:bg-zinc-700",
    success: "bg-emerald-600 text-white dark:bg-emerald-500",
    warning: "bg-amber-600 text-white dark:bg-amber-500",
    danger: "bg-red-600 text-white dark:bg-red-500",
    neutral: "bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200",
    purple: "bg-purple-600 text-white dark:bg-purple-500",
  },
  soft: {
    primary: "bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800",
    secondary: "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700",
    success: "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800",
    warning: "bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800",
    danger: "bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800",
    neutral: "bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800",
    purple: "bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800",
  },
  outline: {
    primary: "border border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 bg-transparent",
    secondary: "border border-zinc-700 text-zinc-700 dark:border-zinc-300 dark:text-zinc-300 bg-transparent",
    success: "border border-emerald-600 text-emerald-600 dark:border-emerald-400 dark:text-emerald-400 bg-transparent",
    warning: "border border-amber-600 text-amber-600 dark:border-amber-400 dark:text-amber-400 bg-transparent",
    danger: "border border-red-600 text-red-600 dark:border-red-400 dark:text-red-400 bg-transparent",
    neutral: "border border-zinc-400 text-zinc-600 dark:border-zinc-600 dark:text-zinc-400 bg-transparent",
    purple: "border border-purple-600 text-purple-600 dark:border-purple-400 dark:text-purple-400 bg-transparent",
  },
  dot: {
    primary: "bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300",
    secondary: "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300",
    success: "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300",
    warning: "bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300",
    danger: "bg-red-50 dark:bg-red-950/50 text-red-700 dark:text-red-300",
    neutral: "bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400",
    purple: "bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300",
  },
  glass: {
    primary: "bg-blue-500/20 backdrop-blur-md text-blue-900 dark:text-blue-200 border border-blue-500/30",
    secondary: "bg-zinc-500/20 backdrop-blur-md text-zinc-900 dark:text-zinc-200 border border-zinc-500/30",
    success: "bg-emerald-500/20 backdrop-blur-md text-emerald-900 dark:text-emerald-200 border border-emerald-500/30",
    warning: "bg-amber-500/20 backdrop-blur-md text-amber-900 dark:text-amber-200 border border-amber-500/30",
    danger: "bg-red-500/20 backdrop-blur-md text-red-900 dark:text-red-200 border border-red-500/30",
    neutral: "bg-zinc-500/20 backdrop-blur-md text-zinc-900 dark:text-zinc-200 border border-zinc-500/30",
    purple: "bg-purple-500/20 backdrop-blur-md text-purple-900 dark:text-purple-200 border border-purple-500/30",
  },
  "ios-glass": {
    primary: "bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl text-blue-600 dark:text-blue-400 border border-white/60 dark:border-zinc-800 shadow-sm",
    secondary: "bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl text-zinc-800 dark:text-zinc-200 border border-white/60 dark:border-zinc-800 shadow-sm",
    success: "bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl text-emerald-600 dark:text-emerald-400 border border-white/60 dark:border-zinc-800 shadow-sm",
    warning: "bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl text-amber-600 dark:text-amber-400 border border-white/60 dark:border-zinc-800 shadow-sm",
    danger: "bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl text-red-600 dark:text-red-400 border border-white/60 dark:border-zinc-800 shadow-sm",
    neutral: "bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl text-zinc-600 dark:text-zinc-400 border border-white/60 dark:border-zinc-800 shadow-sm",
    purple: "bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl text-purple-600 dark:text-purple-400 border border-white/60 dark:border-zinc-800 shadow-sm",
  },
};

const dotColors = {
  primary: "bg-blue-500",
  secondary: "bg-zinc-500",
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  danger: "bg-red-500",
  neutral: "bg-zinc-400",
  purple: "bg-purple-500",
};

const sizeStyles = {
  sm: "text-[10px] px-2 py-0.5 font-medium rounded-md gap-1",
  md: "text-xs px-2.5 py-1 font-semibold rounded-lg gap-1.5",
  lg: "text-sm px-3 py-1.5 font-semibold rounded-xl gap-2",
};

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      intent = "primary",
      variant = "soft",
      size = "md",
      icon,
      onRemove,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center select-none shrink-0 transition-colors",
          sizeStyles[size],
          intentStyles[variant][intent],
          className
        )}
        {...props}
      >
        {variant === "dot" && (
          <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", dotColors[intent])} />
        )}

        {icon && <span className="shrink-0">{icon}</span>}

        <span>{children}</span>

        {onRemove && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="p-0.5 rounded hover:bg-black/10 dark:hover:bg-white/10 transition-colors shrink-0"
          >
            <X size={12} />
          </button>
        )}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export default Badge;
