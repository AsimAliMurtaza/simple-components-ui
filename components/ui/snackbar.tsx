"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export interface SnackbarProps {
  open?: boolean;
  message: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
  icon?: React.ReactNode;
  autoHideDuration?: number; // ms (0 for infinite)
  onClose?: () => void;
  variant?: "default" | "filled" | "glass" | "ios-glass";
  dismissible?: boolean;
  className?: string;
}

const variantStyles = {
  default:
    "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 border border-zinc-800 dark:border-zinc-200 shadow-2xl",
  filled:
    "bg-blue-600 text-white dark:bg-blue-500 border-transparent shadow-2xl",
  glass:
    "bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-white/40 dark:border-zinc-800/80 text-zinc-900 dark:text-zinc-100 shadow-2xl",
  "ios-glass":
    "bg-white/40 dark:bg-zinc-900/40 backdrop-blur-2xl border border-white/60 dark:border-zinc-800/80 text-zinc-900 dark:text-zinc-100 shadow-2xl shadow-black/10",
};

export const Snackbar = React.forwardRef<HTMLDivElement, SnackbarProps>(
  (
    {
      open = false,
      message,
      actionLabel,
      onAction,
      secondaryActionLabel,
      onSecondaryAction,
      icon,
      autoHideDuration = 5000,
      onClose,
      variant = "ios-glass",
      dismissible = true,
      className,
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = React.useState(false);

    React.useEffect(() => {
      if (!open || autoHideDuration <= 0 || isHovered) return;
      const timer = setTimeout(() => {
        onClose?.();
      }, autoHideDuration);
      return () => clearTimeout(timer);
    }, [open, autoHideDuration, isHovered, onClose]);

    return (
      <AnimatePresence>
        {open && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-md w-[calc(100%-2rem)] pointer-events-none flex justify-center">
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className={cn(
                "pointer-events-auto flex items-center justify-between gap-4 p-3.5 px-4 rounded-2xl w-full select-none transition-all duration-200",
                variantStyles[variant],
                className
              )}
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                {icon && <div className="shrink-0 text-blue-500">{icon}</div>}
                <span className="text-sm font-medium leading-snug truncate">
                  {message}
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {secondaryActionLabel && (
                  <button
                    type="button"
                    onClick={onSecondaryAction}
                    className="text-xs font-semibold px-2.5 py-1 rounded-lg opacity-80 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                  >
                    {secondaryActionLabel}
                  </button>
                )}

                {actionLabel && (
                  <button
                    type="button"
                    onClick={onAction}
                    className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-lg bg-blue-600 text-white dark:bg-blue-500 hover:bg-blue-700 transition-colors shadow-sm"
                  >
                    {actionLabel}
                  </button>
                )}

                {dismissible && (
                  <button
                    type="button"
                    onClick={onClose}
                    className="p-1 rounded-lg opacity-60 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    );
  }
);

Snackbar.displayName = "Snackbar";

export default Snackbar;
