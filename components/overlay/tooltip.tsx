"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export type TooltipPlacement = "top" | "bottom" | "left" | "right";

export interface TooltipProps {
  content: React.ReactNode;
  placement?: TooltipPlacement;
  delay?: number; // ms
  variant?: "default" | "glass" | "ios-glass";
  showArrow?: boolean;
  className?: string;
  children: React.ReactNode;
}

const variantStyles = {
  default:
    "bg-zinc-900 text-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 border-transparent shadow-lg",
  glass:
    "bg-zinc-900/90 dark:bg-zinc-100/90 backdrop-blur-md text-white dark:text-zinc-900 border border-white/20 shadow-xl",
  "ios-glass":
    "bg-zinc-900/80 dark:bg-zinc-100/80 backdrop-blur-xl text-white dark:text-zinc-900 border border-white/20 dark:border-zinc-800/80 shadow-xl shadow-black/10",
};

const placementStyles: Record<TooltipPlacement, string> = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
};

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  placement = "top",
  delay = 150,
  variant = "ios-glass",
  className,
  children,
}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    timerRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsVisible(false);
  };

  return (
    <div
      className="relative inline-flex select-none"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
    >
      {children}

      <AnimatePresence>
        {isVisible && content && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 0 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 0 }}
            transition={{ duration: 0.12 }}
            className={cn(
              "absolute z-50 px-2.5 py-1 text-[11px] font-medium rounded-lg pointer-events-none whitespace-nowrap shadow-md",
              placementStyles[placement],
              variantStyles[variant],
              className
            )}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

Tooltip.displayName = "Tooltip";

export default Tooltip;
