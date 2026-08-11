"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "rect" | "circle" | "avatar" | "text" | "button" | "card";
  animation?: "shimmer" | "pulse" | "wave" | "none";
  width?: string | number;
  height?: string | number;
  className?: string;
}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      variant = "rect",
      animation = "shimmer",
      width,
      height,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const variantStyles = {
      rect: "rounded-lg",
      circle: "rounded-full",
      avatar: "w-10 h-10 rounded-full shrink-0",
      text: "h-4 w-full rounded-md",
      button: "h-10 w-28 rounded-xl",
      card: "w-full h-48 rounded-2xl",
    };

    const animationStyles = {
      shimmer:
        "relative overflow-hidden bg-zinc-200 dark:bg-zinc-800 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.8s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/40 dark:before:via-zinc-700/50 before:to-transparent",
      pulse: "animate-pulse bg-zinc-200 dark:bg-zinc-800",
      wave: "animate-bounce bg-zinc-200 dark:bg-zinc-800",
      none: "bg-zinc-200 dark:bg-zinc-800",
    };

    const inlineStyles: React.CSSProperties = {
      width: width !== undefined ? (typeof width === "number" ? `${width}px` : width) : undefined,
      height: height !== undefined ? (typeof height === "number" ? `${height}px` : height) : undefined,
      ...style,
    };

    return (
      <div
        ref={ref}
        className={cn(
          "shrink-0 select-none",
          variantStyles[variant],
          animationStyles[animation],
          className
        )}
        style={inlineStyles}
        {...props}
      />
    );
  }
);

Skeleton.displayName = "Skeleton";

export default Skeleton;
