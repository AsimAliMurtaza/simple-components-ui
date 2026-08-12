"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface SpinnerProps {
  variant?: "default" | "spin" | "dots" | "pulse" | "ios" | "ring" | "gradient";
  size?: "sm" | "md" | "lg" | "xl";
  color?: "primary" | "success" | "warning" | "danger" | "purple" | "white" | "current";
  label?: React.ReactNode;
  className?: string;
}

const colorMap = {
  primary: "text-teal-600 dark:text-teal-500",
  success: "text-emerald-600 dark:text-emerald-500",
  warning: "text-amber-600 dark:text-amber-500",
  danger: "text-red-600 dark:text-red-500",
  purple: "text-purple-600 dark:text-purple-500",
  white: "text-white",
  current: "text-current",
};

const sizeMap = {
  sm: { icon: 16, box: "w-4 h-4", text: "text-xs" },
  md: { icon: 24, box: "w-6 h-6", text: "text-sm" },
  lg: { icon: 36, box: "w-9 h-9", text: "text-base" },
  xl: { icon: 48, box: "w-12 h-12", text: "text-lg" },
};

export const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  (
    {
      variant = "ios",
      size = "md",
      color = "primary",
      label,
      className,
    },
    ref
  ) => {
    const { icon: iconSize, box, text } = sizeMap[size];
    const textColor = colorMap[color];

    const actualVariant = variant === "default" ? "spin" : variant;

    return (
      <div
        ref={ref}
        role="status"
        aria-label="Loading"
        className={cn("inline-flex items-center gap-2 select-none", className)}
      >
        {actualVariant === "spin" && (
          <Loader2 className={cn("animate-spin", textColor)} size={iconSize} />
        )}

        {actualVariant === "ring" && (
          <div
            className={cn(
              "rounded-full border-2 border-t-transparent animate-spin",
              box,
              color === "primary" ? "border-teal-600 border-t-transparent dark:border-teal-500 dark:border-t-transparent" : "border-current border-t-transparent"
            )}
          />
        )}

        {actualVariant === "gradient" && (
          <div
            className={cn(
              "rounded-full border-2 border-transparent bg-origin-border animate-spin bg-gradient-to-r from-teal-500 via-indigo-500 to-teal-500 mask-radial",
              box
            )}
            style={{
              WebkitMaskImage: "radial-gradient(transparent 55%, black 56%)",
              maskImage: "radial-gradient(transparent 55%, black 56%)",
            }}
          />
        )}

        {actualVariant === "dots" && (
          <div className="flex items-center gap-1">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className={cn(
                  "rounded-full bg-current",
                  size === "sm" && "w-1.5 h-1.5",
                  size === "md" && "w-2.5 h-2.5",
                  size === "lg" && "w-3.5 h-3.5",
                  size === "xl" && "w-4 h-4",
                  textColor
                )}
                animate={{ scale: [0.6, 1.2, 0.6], opacity: [0.4, 1, 0.4] }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        )}

        {actualVariant === "pulse" && (
          <motion.div
            className={cn("rounded-full bg-current", box, textColor)}
            animate={{ scale: [0.8, 1.3, 0.8], opacity: [0.5, 1, 0.5] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}

        {actualVariant === "ios" && (
          <div className={cn("relative flex items-center justify-center", box)}>
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <motion.span
                key={i}
                className={cn(
                  "absolute rounded-full bg-current origin-[50%_150%]",
                  size === "sm" && "w-0.5 h-1.5",
                  size === "md" && "w-0.5 h-2.5",
                  size === "lg" && "w-1 h-3.5",
                  size === "xl" && "w-1.5 h-4.5",
                  textColor
                )}
                style={{
                  transform: `rotate(${i * 45}deg) translateY(-80%)`,
                }}
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "linear",
                }}
              />
            ))}
          </div>
        )}

        {label && (
          <span className={cn("font-medium text-zinc-600 dark:text-zinc-400", text)}>
            {label}
          </span>
        )}
      </div>
    );
  }
);

Spinner.displayName = "Spinner";

export default Spinner;
