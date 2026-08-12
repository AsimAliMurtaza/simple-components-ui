"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface HoverCardProps {
  children: React.ReactNode;
  content: React.ReactNode;
  placement?: "top" | "bottom" | "left" | "right";
  openDelay?: number;
  closeDelay?: number;
  variant?: "default" | "glass" | "ios-glass";
  className?: string;
}

export const HoverCard: React.FC<HoverCardProps> = ({
  children,
  content,
  placement = "top",
  openDelay = 150,
  closeDelay = 150,
  variant = "ios-glass",
  className,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const openTimerRef = React.useRef<NodeJS.Timeout | null>(null);
  const closeTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    openTimerRef.current = setTimeout(() => setIsOpen(true), openDelay);
  };

  const handleMouseLeave = () => {
    if (openTimerRef.current) clearTimeout(openTimerRef.current);
    closeTimerRef.current = setTimeout(() => setIsOpen(false), closeDelay);
  };

  const placementClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: placement === "top" ? 4 : -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: placement === "top" ? 4 : -4 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className={cn(
              "absolute z-40 p-4 rounded-2xl w-64 shadow-xl select-none",
              placementClasses[placement],
              variant === "glass" &&
                "bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-white/40 dark:border-zinc-800",
              variant === "ios-glass" &&
                "bg-white/50 dark:bg-zinc-900/50 backdrop-blur-2xl border border-white/60 dark:border-zinc-800/80 shadow-2xl",
              variant === "default" &&
                "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-lg",
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

HoverCard.displayName = "HoverCard";

export default HoverCard;
