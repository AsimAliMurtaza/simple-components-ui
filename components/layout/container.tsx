import * as React from "react";
import { cn } from "@/lib/utils";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "7xl" | "full";
  padding?: "none" | "sm" | "md" | "lg";
  centered?: boolean;
  variant?: "default" | "bordered" | "glass" | "ios-glass";
}

const sizeClasses = {
  sm: "max-w-screen-sm",
  md: "max-w-screen-md",
  lg: "max-w-screen-lg",
  xl: "max-w-screen-xl",
  "2xl": "max-w-screen-2xl",
  "7xl": "max-w-7xl",
  full: "max-w-full",
};

const paddingClasses = {
  none: "p-0",
  sm: "px-3 py-2 sm:px-4 sm:py-3",
  md: "px-4 py-4 sm:px-6 sm:py-6",
  lg: "px-6 py-8 sm:px-8 sm:py-10",
};

const variantClasses = {
  default: "",
  bordered: "border border-zinc-200 dark:border-zinc-800 rounded-3xl bg-white dark:bg-zinc-900 shadow-sm",
  glass: "border border-white/40 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl rounded-3xl shadow-lg",
  "ios-glass": "border border-white/50 dark:border-zinc-800/80 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-2xl rounded-3xl shadow-xl",
};

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      size = "7xl",
      padding = "md",
      centered = true,
      variant = "default",
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "w-full transition-colors",
          sizeClasses[size],
          paddingClasses[padding],
          centered && "mx-auto",
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = "Container";
