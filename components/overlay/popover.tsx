"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export type PopoverPlacement = "top" | "bottom" | "left" | "right";

export interface PopoverProps {
  content: React.ReactNode;
  placement?: PopoverPlacement;
  trigger?: "click" | "hover";
  variant?: "default" | "bordered" | "glass" | "ios-glass";
  showArrow?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  children: React.ReactNode;
}

const variantStyles = {
  default:
    "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-xl",
  bordered:
    "bg-white dark:bg-zinc-950 border-2 border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-xl",
  glass:
    "bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-white/40 dark:border-zinc-800/80 text-zinc-900 dark:text-zinc-100 shadow-2xl",
  "ios-glass":
    "bg-white/45 dark:bg-zinc-900/45 backdrop-blur-2xl border border-white/60 dark:border-zinc-800/80 text-zinc-900 dark:text-zinc-100 shadow-2xl shadow-black/10",
};

const placementStyles: Record<PopoverPlacement, string> = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2.5",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2.5",
  left: "right-full top-1/2 -translate-y-1/2 mr-2.5",
  right: "left-full top-1/2 -translate-y-1/2 ml-2.5",
};

const arrowStyles: Record<PopoverPlacement, string> = {
  top: "bottom-[-5px] left-1/2 -translate-x-1/2 border-t-white dark:border-t-zinc-900 border-x-transparent border-b-transparent border-t-[5px] border-x-[5px]",
  bottom: "top-[-5px] left-1/2 -translate-x-1/2 border-b-white dark:border-b-zinc-900 border-x-transparent border-t-transparent border-b-[5px] border-x-[5px]",
  left: "right-[-5px] top-1/2 -translate-y-1/2 border-l-white dark:border-l-zinc-900 border-y-transparent border-r-transparent border-l-[5px] border-y-[5px]",
  right: "left-[-5px] top-1/2 -translate-y-1/2 border-r-white dark:border-r-zinc-900 border-y-transparent border-l-transparent border-r-[5px] border-y-[5px]",
};

export const Popover = React.forwardRef<HTMLDivElement, PopoverProps>(
  (
    {
      content,
      placement = "bottom",
      trigger = "click",
      variant = "ios-glass",
      showArrow = true,
      open: propOpen,
      onOpenChange,
      className,
      children,
    },
    ref
  ) => {
    const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);
    const isControlled = propOpen !== undefined;
    const isOpen = isControlled ? propOpen : uncontrolledOpen;

    const containerRef = React.useRef<HTMLDivElement>(null);
    React.useImperativeHandle(ref, () => containerRef.current!);

    const toggleOpen = () => {
      const next = !isOpen;
      if (!isControlled) setUncontrolledOpen(next);
      onOpenChange?.(next);
    };

    // Outside click dismiss
    React.useEffect(() => {
      if (!isOpen || trigger === "hover") return;
      const handleOutsideClick = (e: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(e.target as Node)
        ) {
          if (!isControlled) setUncontrolledOpen(false);
          onOpenChange?.(false);
        }
      };
      document.addEventListener("mousedown", handleOutsideClick);
      return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, [isOpen, trigger, isControlled, onOpenChange]);

    const triggerProps =
      trigger === "hover"
        ? {
            onMouseEnter: () => {
              if (!isControlled) setUncontrolledOpen(true);
              onOpenChange?.(true);
            },
            onMouseLeave: () => {
              if (!isControlled) setUncontrolledOpen(false);
              onOpenChange?.(false);
            },
          }
        : {
            onClick: toggleOpen,
          };

    return (
      <div
        ref={containerRef}
        className="relative inline-flex select-none"
        {...triggerProps}
      >
        {children}

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className={cn(
                "absolute z-50 p-4 rounded-2xl min-w-[200px] max-w-sm pointer-events-auto",
                placementStyles[placement],
                variantStyles[variant],
                className
              )}
            >
              {content}

              {showArrow && (
                <div
                  className={cn(
                    "absolute w-0 h-0 border-style-solid pointer-events-none",
                    arrowStyles[placement]
                  )}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

Popover.displayName = "Popover";

export default Popover;
