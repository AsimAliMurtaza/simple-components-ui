"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

export interface StatCardProps extends HTMLMotionProps<"div"> {
  title: string;
  value: React.ReactNode;
  icon?: React.ReactNode;
  trend?: {
    value: string;
    direction: "up" | "down" | "neutral";
    label?: string;
  };
  progress?: number; // 0..100
  variant?: "default" | "bordered" | "glass" | "ios-glass";
  className?: string;
}

export const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  (
    {
      title,
      value,
      icon,
      trend,
      progress,
      variant = "ios-glass",
      className,
      ...props
    },
    ref
  ) => {
    return (
      <motion.div
        ref={ref}
        whileHover={{ y: -3, scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className={cn(
          "p-5 rounded-3xl select-none w-full flex flex-col justify-between space-y-4",
          variant === "default" &&
            "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm",
          variant === "bordered" &&
            "bg-white dark:bg-zinc-950 border-2 border-zinc-200 dark:border-zinc-800 shadow-sm",
          variant === "glass" &&
            "bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-white/40 dark:border-zinc-800 shadow-md",
          variant === "ios-glass" &&
            "bg-white/40 dark:bg-zinc-900/40 backdrop-blur-2xl border border-white/60 dark:border-zinc-800/80 shadow-lg text-zinc-900 dark:text-white",
          className
        )}
        {...props}
      >
        {/* Header Title & Icon */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
            {title}
          </span>
          {icon && (
            <div className="p-2 rounded-2xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400">
              {icon}
            </div>
          )}
        </div>

        {/* Metric Value & Trend */}
        <div className="flex items-baseline justify-between gap-2 flex-wrap">
          <div className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {value}
          </div>

          {trend && (
            <div
              className={cn(
                "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold shadow-sm",
                trend.direction === "up" &&
                  "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300",
                trend.direction === "down" &&
                  "bg-red-100 dark:bg-red-950/80 text-red-700 dark:text-red-300",
                trend.direction === "neutral" &&
                  "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
              )}
            >
              {trend.direction === "up" && <TrendingUp size={12} />}
              {trend.direction === "down" && <TrendingDown size={12} />}
              <span>{trend.value}</span>
            </div>
          )}
        </div>

        {/* Optional Progress Bar */}
        {typeof progress === "number" && (
          <div className="space-y-1 pt-1">
            <div className="h-1.5 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-teal-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
          </div>
        )}
      </motion.div>
    );
  }
);

StatCard.displayName = "StatCard";

export default StatCard;
