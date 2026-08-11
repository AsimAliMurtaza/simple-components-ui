"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface SpinnerProps {
  variant?: "spin" | "dots" | "pulse" | "ios" | "ring" | "gradient";
  size?: "sm" | "md" | "lg" | "xl";
  color?: "primary" | "success" | "warning" | "danger" | "purple" | "white" | "current";
  label?: React.ReactNode;
  className?: string;
}

const colorMap = {
  primary: "text-blue-600 dark:text-blue-500",
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

    const renderSpinnerGraphic = () => {
      switch (variant) {
        case "ios":
          return (
            <div className={cn("relative inline-block", box, textColor)}>
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute left-1/2 top-0 -ml-[8%] h-[28%] w-[16%] rounded-full bg-current"
                  style={{
                    transformOrigin: "50% 175%",
                    transform: `rotate(${i * 30}deg)`,
                    animation: `ios-spinner-fade 1s linear infinite`,
                    animationDelay: `${(i * 1) / 12}s`,
                  }}
                />
              ))}

              <style jsx>{`
                @keyframes ios-spinner-fade {
                  0% { opacity: 1; }
                  100% { opacity: 0.15; }
                }
              `}</style>
            </div>
          );

        case "dots":
          return (
            <div className={cn("flex items-center gap-1", textColor)}>
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-current"
                  animate={{ scale: [0.6, 1.2, 0.6], opacity: [0.4, 1, 0.4] }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.8,
                    delay: i * 0.15,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          );

        case "pulse":
          return (
            <motion.div
              className={cn("rounded-full bg-current", box, textColor)}
              animate={{ scale: [0.8, 1.3, 0.8], opacity: [0.3, 0.9, 0.3] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
            />
          );

        case "ring":
          return (
            <div
              className={cn(
                "rounded-full border-2 border-zinc-200 dark:border-zinc-800 border-t-current animate-spin",
                box,
                textColor
              )}
            />
          );

        case "gradient":
          return (
            <div className="relative flex items-center justify-center">
              <div
                className={cn(
                  "rounded-full bg-gradient-to-tr from-blue-600 to-indigo-400 p-0.5 animate-spin",
                  box
                )}
              >
                <div className="w-full h-full rounded-full bg-white dark:bg-zinc-950" />
              </div>
            </div>
          );

        case "spin":
        default:
          return <Loader2 size={iconSize} className={cn("animate-spin", textColor)} />;
      }
    };

    return (
      <div
        ref={ref}
        role="status"
        aria-label="Loading"
        className={cn(
          "inline-flex items-center gap-2 select-none",
          className
        )}
      >
        {renderSpinnerGraphic()}

        {label && (
          <span className={cn("font-medium text-zinc-700 dark:text-zinc-300", text)}>
            {label}
          </span>
        )}
      </div>
    );
  }
);

Spinner.displayName = "Spinner";

export default Spinner;
