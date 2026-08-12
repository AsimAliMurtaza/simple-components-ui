"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "px-1.5 py-0.5 text-[10px]",
  md: "px-2 py-0.5 text-xs",
  lg: "px-2.5 py-1 text-sm",
};

export const Kbd = React.forwardRef<HTMLElement, KbdProps>(
  ({ children, size = "md", className, ...props }, ref) => {
    return (
      <kbd
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-mono font-semibold rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 shadow-xs select-none",
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {children}
      </kbd>
    );
  }
);

Kbd.displayName = "Kbd";

export default Kbd;
