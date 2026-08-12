"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface GradientTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: "teal" | "ocean" | "sunset" | "neon" | "purple" | "gold";
  animate?: boolean;
  glow?: boolean;
  className?: string;
}

const gradientPresets = {
  teal: "from-teal-600 via-emerald-500 to-indigo-600 dark:from-teal-400 dark:via-emerald-300 dark:to-indigo-400",
  ocean: "from-blue-600 via-teal-500 to-cyan-500 dark:from-blue-400 dark:via-teal-300 dark:to-cyan-300",
  sunset: "from-rose-500 via-amber-500 to-violet-600 dark:from-rose-400 dark:via-amber-300 dark:to-violet-400",
  neon: "from-emerald-400 via-teal-300 to-cyan-400",
  purple: "from-indigo-500 via-purple-500 to-pink-500 dark:from-indigo-400 dark:via-purple-300 dark:to-pink-400",
  gold: "from-amber-500 via-yellow-400 to-orange-500 dark:from-amber-300 dark:via-yellow-200 dark:to-orange-400",
};

export const GradientText = React.forwardRef<HTMLSpanElement, GradientTextProps>(
  (
    {
      children,
      variant = "teal",
      animate = true,
      glow = false,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-block bg-clip-text text-transparent bg-gradient-to-r select-none font-bold",
          gradientPresets[variant],
          animate && "bg-[length:200%_auto] animate-gradient-shift",
          glow && "drop-shadow-[0_0_12px_rgba(20,184,166,0.5)]",
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

GradientText.displayName = "GradientText";

export default GradientText;
