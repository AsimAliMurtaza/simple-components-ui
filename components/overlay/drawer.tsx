"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export interface DrawerProps {
  open?: boolean;
  onClose?: () => void;
  anchor?: "right" | "left" | "top" | "bottom";
  title?: React.ReactNode;
  description?: React.ReactNode;
  variant?: "default" | "bordered" | "glass" | "ios-glass";
  size?: "sm" | "md" | "lg" | "full";
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  hideCloseButton?: boolean;
  footer?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

const anchorStyles = {
  right: "top-0 right-0 h-full max-w-md w-full",
  left: "top-0 left-0 h-full max-w-md w-full",
  top: "top-0 left-0 right-0 max-h-[80vh] w-full rounded-b-3xl",
  bottom: "bottom-0 left-0 right-0 max-h-[85vh] w-full rounded-t-3xl",
};

const sizeStylesRightLeft = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-xl",
  full: "max-w-full",
};

const variantStyles = {
  default:
    "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-2xl",
  bordered:
    "bg-white dark:bg-zinc-950 border-2 border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-2xl",
  glass:
    "bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-white/40 dark:border-zinc-800/80 text-zinc-900 dark:text-zinc-100 shadow-2xl",
  "ios-glass":
    "bg-white/45 dark:bg-zinc-900/45 backdrop-blur-2xl border border-white/60 dark:border-zinc-800/80 text-zinc-900 dark:text-zinc-100 shadow-2xl shadow-black/10",
};

const drawerAnimations = {
  right: {
    initial: { x: "100%", y: 0 },
    animate: { x: 0, y: 0 },
    exit: { x: "100%", y: 0 },
  },
  left: {
    initial: { x: "-100%", y: 0 },
    animate: { x: 0, y: 0 },
    exit: { x: "-100%", y: 0 },
  },
  top: {
    initial: { x: 0, y: "-100%" },
    animate: { x: 0, y: 0 },
    exit: { x: 0, y: "-100%" },
  },
  bottom: {
    initial: { x: 0, y: "100%" },
    animate: { x: 0, y: 0 },
    exit: { x: 0, y: "100%" },
  },
};

export const Drawer = React.forwardRef<HTMLDivElement, DrawerProps>(
  (
    {
      open = false,
      onClose,
      anchor = "right",
      title,
      description,
      variant = "ios-glass",
      size = "md",
      closeOnOverlayClick = true,
      closeOnEsc = true,
      hideCloseButton = false,
      footer,
      className,
      children,
    },
    ref
  ) => {
    // ESC key dismiss
    React.useEffect(() => {
      if (!open || !closeOnEsc) return;
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose?.();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [open, closeOnEsc, onClose]);

    // Body scroll lock
    React.useEffect(() => {
      if (open) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
      return () => {
        document.body.style.overflow = "";
      };
    }, [open]);

    const isHorizontal = anchor === "right" || anchor === "left";

    return (
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => closeOnOverlayClick && onClose?.()}
              className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm"
            />

            {/* Drawer Panel */}
            <motion.div
              ref={ref}
              role="dialog"
              aria-modal="true"
              variants={drawerAnimations[anchor]}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ type: "spring", stiffness: 400, damping: 35 }}
              drag={anchor === "bottom" ? "y" : false}
              dragConstraints={{ top: 0, bottom: 0 }}
              onDragEnd={(_, info) => {
                if (anchor === "bottom" && info.offset.y > 100) {
                  onClose?.();
                }
              }}
              className={cn(
                "fixed z-10 flex flex-col overflow-hidden select-none transition-colors border",
                anchorStyles[anchor],
                isHorizontal && sizeStylesRightLeft[size],
                variantStyles[variant],
                className
              )}
            >
              {/* Bottom Drag Handle Bar */}
              {anchor === "bottom" && (
                <div className="w-full flex items-center justify-center pt-2 pb-1 shrink-0 cursor-grab active:cursor-grabbing">
                  <div className="w-12 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                </div>
              )}

              {/* Header */}
              {(title || description || !hideCloseButton) && (
                <div className="flex items-start justify-between gap-4 p-5 border-b border-zinc-100 dark:border-zinc-800/80 shrink-0">
                  <div className="flex flex-col gap-0.5 min-w-0">
                    {title && (
                      <h3 className="text-lg font-bold tracking-tight leading-snug">
                        {title}
                      </h3>
                    )}
                    {description && (
                      <p className="text-xs opacity-75 leading-relaxed">
                        {description}
                      </p>
                    )}
                  </div>

                  {!hideCloseButton && (
                    <button
                      type="button"
                      onClick={onClose}
                      className="p-1.5 rounded-full opacity-70 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/10 transition-colors shrink-0"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              )}

              {/* Body */}
              <div className="p-5 overflow-y-auto flex-1 min-h-0">
                {children}
              </div>

              {/* Footer */}
              {footer && (
                <div className="flex items-center justify-end gap-3 p-4 border-t border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/50 shrink-0">
                  {footer}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    );
  }
);

Drawer.displayName = "Drawer";

export default Drawer;
