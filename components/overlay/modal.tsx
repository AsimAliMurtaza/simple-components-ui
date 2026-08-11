"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export interface ModalProps {
  open?: boolean;
  onClose?: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  variant?: "default" | "bordered" | "glass" | "ios-glass";
  animation?: "scaleUp" | "slideUp" | "fade";
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  hideCloseButton?: boolean;
  footer?: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  children?: React.ReactNode;
}

const sizeStyles = {
  sm: "max-w-sm w-full",
  md: "max-w-lg w-full",
  lg: "max-w-2xl w-full",
  xl: "max-w-4xl w-full",
  full: "max-w-[calc(100vw-2rem)] h-[calc(100vh-2rem)]",
};

const variantStyles = {
  default:
    "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-2xl",
  bordered:
    "bg-white dark:bg-zinc-950 border-2 border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-2xl",
  glass:
    "bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-white/40 dark:border-zinc-800/80 text-zinc-900 dark:text-zinc-100 shadow-2xl",
  "ios-glass":
    "bg-white/40 dark:bg-zinc-900/40 backdrop-blur-2xl border border-white/60 dark:border-zinc-800/80 text-zinc-900 dark:text-zinc-100 shadow-2xl shadow-black/10",
};

const animationVariants = {
  scaleUp: {
    initial: { opacity: 0, scale: 0.95, y: 0 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: 0 },
  },
  slideUp: {
    initial: { opacity: 0, scale: 1, y: 30 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 1, y: 30 },
  },
  fade: {
    initial: { opacity: 0, scale: 1, y: 0 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 1, y: 0 },
  },
};

export const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      open = false,
      onClose,
      title,
      description,
      size = "md",
      variant = "ios-glass",
      animation = "scaleUp",
      closeOnOverlayClick = true,
      closeOnEsc = true,
      hideCloseButton = false,
      footer,
      className,
      bodyClassName,
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

    return (
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => closeOnOverlayClick && onClose?.()}
              className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Dialog */}
            <motion.div
              ref={ref}
              role="dialog"
              aria-modal="true"
              variants={animationVariants[animation]}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className={cn(
                "relative z-10 flex flex-col rounded-3xl overflow-hidden max-h-[calc(100vh-3rem)] my-auto select-none transition-colors",
                sizeStyles[size],
                variantStyles[variant],
                className
              )}
            >
              {/* Header */}
              {(title || description || !hideCloseButton) && (
                <div className="flex items-start justify-between gap-4 p-5 sm:p-6 border-b border-zinc-100 dark:border-zinc-800/80 shrink-0">
                  <div className="flex flex-col gap-1 min-w-0">
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
              <div className={cn("p-5 sm:p-6 overflow-y-auto flex-1 min-h-0", bodyClassName)}>
                {children}
              </div>

              {/* Footer */}
              {footer && (
                <div className="flex items-center justify-end gap-3 p-4 sm:p-5 border-t border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/50 shrink-0">
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

Modal.displayName = "Modal";

export default Modal;
