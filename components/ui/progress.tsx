"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ProgressProps {
  value?: number; // 0 to 100
  type?: "linear" | "circle";
  indeterminate?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  color?: "primary" | "success" | "warning" | "danger" | "purple";
  variant?: "default" | "bordered" | "glass" | "ios-glass";
  showValue?: boolean;
  formatValue?: (val: number) => string;
  label?: React.ReactNode;
  steps?: number; // Optional step mode (e.g. 4 steps)
  currentStep?: number;
  animatedStripes?: boolean;
  className?: string;
}

const colorConfig = {
  primary: "bg-blue-600 dark:bg-blue-500 text-blue-600 dark:text-blue-500",
  success: "bg-emerald-600 dark:bg-emerald-500 text-emerald-600 dark:text-emerald-500",
  warning: "bg-amber-600 dark:bg-amber-500 text-amber-600 dark:text-amber-500",
  danger: "bg-red-600 dark:bg-red-500 text-red-600 dark:text-red-500",
  purple: "bg-purple-600 dark:bg-purple-500 text-purple-600 dark:text-purple-500",
};

const linearSizeConfig = {
  sm: "h-1.5",
  md: "h-2.5",
  lg: "h-4",
  xl: "h-6",
};

const circleSizeConfig = {
  sm: { size: 36, stroke: 3, text: "text-[10px]" },
  md: { size: 54, stroke: 4, text: "text-xs" },
  lg: { size: 72, stroke: 6, text: "text-sm" },
  xl: { size: 96, stroke: 8, text: "text-base" },
};

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      value = 0,
      type = "linear",
      indeterminate = false,
      size = "md",
      color = "primary",
      variant = "default",
      showValue = false,
      formatValue = (v) => `${Math.round(v)}%`,
      label,
      steps,
      currentStep = 1,
      animatedStripes = false,
      className,
    },
    ref
  ) => {
    const clampedValue = Math.min(Math.max(value, 0), 100);

    // If steps is provided, calculate percent from currentStep
    const displayValue = steps
      ? Math.min(Math.max(((currentStep - 1) / (steps - 1)) * 100, 0), 100)
      : clampedValue;

    if (type === "circle") {
      const { size: circlePx, stroke, text } = circleSizeConfig[size];
      const radius = (circlePx - stroke) / 2;
      const circumference = 2 * Math.PI * radius;
      const strokeDashoffset = circumference - (displayValue / 100) * circumference;

      return (
        <div
          ref={ref}
          className={cn(
            "inline-flex flex-col items-center justify-center gap-1 select-none",
            className
          )}
        >
          <div className="relative inline-flex items-center justify-center">
            <svg
              width={circlePx}
              height={circlePx}
              className={cn(
                "transform -rotate-90",
                indeterminate && "animate-spin duration-1000"
              )}
            >
              {/* Background ring */}
              <circle
                cx={circlePx / 2}
                cy={circlePx / 2}
                r={radius}
                stroke="currentColor"
                strokeWidth={stroke}
                fill="transparent"
                className="text-zinc-200 dark:text-zinc-800"
              />
              {/* Animated Progress ring */}
              <motion.circle
                cx={circlePx / 2}
                cy={circlePx / 2}
                r={radius}
                stroke="currentColor"
                strokeWidth={stroke}
                strokeLinecap="round"
                fill="transparent"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: indeterminate ? circumference * 0.25 : strokeDashoffset }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={colorConfig[color].split(" ").slice(2).join(" ")}
              />
            </svg>

            {showValue && !indeterminate && (
              <span
                className={cn(
                  "absolute font-mono font-semibold text-zinc-900 dark:text-zinc-100",
                  text
                )}
              >
                {formatValue(displayValue)}
              </span>
            )}
          </div>

          {label && (
            <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
              {label}
            </span>
          )}
        </div>
      );
    }

    // Step mode rendering for linear progress
    if (steps && steps > 1) {
      return (
        <div ref={ref} className={cn("w-full flex flex-col gap-2", className)}>
          {(label || showValue) && (
            <div className="flex items-center justify-between text-xs font-medium text-zinc-700 dark:text-zinc-300">
              {label && <span>{label}</span>}
              {showValue && (
                <span>
                  Step {currentStep} of {steps}
                </span>
              )}
            </div>
          )}

          <div className="flex items-center gap-1.5 w-full">
            {Array.from({ length: steps }).map((_, idx) => {
              const isCompleted = idx + 1 <= currentStep;
              return (
                <div
                  key={idx}
                  className={cn(
                    "flex-1 rounded-full transition-all duration-300",
                    linearSizeConfig[size],
                    isCompleted
                      ? colorConfig[color].split(" ").slice(0, 2).join(" ")
                      : "bg-zinc-200 dark:bg-zinc-800"
                  )}
                />
              );
            })}
          </div>
        </div>
      );
    }

    // Standard Linear progress bar
    return (
      <div ref={ref} className={cn("w-full flex flex-col gap-1.5", className)}>
        {(label || showValue) && (
          <div className="flex items-center justify-between text-xs font-medium text-zinc-700 dark:text-zinc-300">
            {label && <span>{label}</span>}
            {showValue && <span>{formatValue(displayValue)}</span>}
          </div>
        )}

        <div
          className={cn(
            "w-full rounded-full overflow-hidden relative",
            linearSizeConfig[size],
            variant === "default" && "bg-zinc-200 dark:bg-zinc-800",
            variant === "bordered" && "bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700",
            variant === "glass" && "bg-white/20 dark:bg-zinc-900/30 backdrop-blur-md border border-white/20 dark:border-zinc-800/60",
            variant === "ios-glass" && "bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl border border-white/50 dark:border-zinc-800/80 shadow-inner"
          )}
        >
          {indeterminate ? (
            <motion.div
              className={cn(
                "h-full rounded-full w-1/3",
                colorConfig[color].split(" ").slice(0, 2).join(" ")
              )}
              animate={{ x: ["-100%", "300%"] }}
              transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
            />
          ) : (
            <motion.div
              className={cn(
                "h-full rounded-full transition-all relative overflow-hidden",
                colorConfig[color].split(" ").slice(0, 2).join(" "),
                animatedStripes && "bg-striped"
              )}
              initial={{ width: 0 }}
              animate={{ width: `${displayValue}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          )}
        </div>
      </div>
    );
  }
);

Progress.displayName = "Progress";

export default Progress;
