"use client";

import * as React from "react";
import { motion, HTMLMotionProps, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

export type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export type HeadingVariant =
  | "default"
  | "gradient"
  | "hero"
  | "subtle"
  | "accent"
  | "neon"
  | "glowing";

export type HeadingAnimation =
  | "none"
  | "fadeUp"
  | "scaleUp"
  | "slideRight"
  | "trackingExpand";

export interface HeadingProps
  extends Omit<HTMLMotionProps<"h1">, "level" | "children"> {
  level?: HeadingLevel;
  variant?: HeadingVariant;
  animation?: HeadingAnimation;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";
  align?: "left" | "center" | "right";
  weight?: "medium" | "semibold" | "bold" | "extrabold" | "black";
  children: React.ReactNode;
  className?: string;
}

const levelDefaultSizes: Record<HeadingLevel, NonNullable<HeadingProps["size"]>> = {
  h1: "4xl",
  h2: "3xl",
  h3: "2xl",
  h4: "xl",
  h5: "lg",
  h6: "md",
};

const sizeClasses: Record<NonNullable<HeadingProps["size"]>, string> = {
  sm: "text-sm sm:text-base",
  md: "text-base sm:text-lg",
  lg: "text-lg sm:text-xl",
  xl: "text-xl sm:text-2xl",
  "2xl": "text-2xl sm:text-3xl",
  "3xl": "text-3xl sm:text-4xl",
  "4xl": "text-4xl sm:text-5xl tracking-tight",
  "5xl": "text-5xl sm:text-6xl tracking-tight",
  "6xl": "text-6xl sm:text-7xl tracking-tighter",
};

const weightClasses: Record<NonNullable<HeadingProps["weight"]>, string> = {
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
  extrabold: "font-extrabold",
  black: "font-black",
};

const variantClasses: Record<HeadingVariant, string> = {
  default: "text-zinc-900 dark:text-zinc-100",
  subtle: "text-zinc-600 dark:text-zinc-400",
  accent: "text-teal-600 dark:text-teal-400",
  hero: "bg-clip-text text-transparent bg-gradient-to-r from-teal-600 via-emerald-600 to-indigo-600 dark:from-teal-400 dark:via-emerald-400 dark:to-indigo-400 font-extrabold",
  gradient: "bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-indigo-500 dark:from-teal-400 dark:to-indigo-400",
  neon: "text-emerald-400 drop-shadow-[0_0_12px_rgba(52,211,153,0.6)] dark:text-emerald-300",
  glowing: "text-teal-600 dark:text-teal-300 drop-shadow-[0_0_15px_rgba(20,184,166,0.5)]",
};

const alignClasses: Record<NonNullable<HeadingProps["align"]>, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

const animationVariants: Record<HeadingAnimation, Variants | undefined> = {
  none: undefined,
  fadeUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, type: "spring", stiffness: 200 } },
  },
  slideRight: {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
  },
  trackingExpand: {
    hidden: { opacity: 0, letterSpacing: "-0.05em" },
    visible: { opacity: 1, letterSpacing: "0.02em", transition: { duration: 0.6, ease: "easeOut" } },
  },
};

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  (
    {
      level = "h2",
      variant = "default",
      animation = "none",
      size,
      align = "left",
      weight = "bold",
      children,
      className,
      ...props
    },
    ref
  ) => {
    const finalSize = size || levelDefaultSizes[level];
    const MotionTag = motion(level as React.ElementType);
    const variants = animationVariants[animation];

    return (
      <MotionTag
        ref={ref}
        className={cn(
          "leading-tight select-none",
          sizeClasses[finalSize],
          weightClasses[weight],
          variantClasses[variant],
          alignClasses[align],
          className
        )}
        initial={animation !== "none" ? "hidden" : undefined}
        animate={animation !== "none" ? "visible" : undefined}
        variants={variants}
        {...props}
      >
        {children}
      </MotionTag>
    );
  }
);

Heading.displayName = "Heading";

export default Heading;
