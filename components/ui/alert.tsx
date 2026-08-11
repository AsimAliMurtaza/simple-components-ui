"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Info,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Bell,
  X,
} from "lucide-react";

export interface AlertProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  intent?: "info" | "success" | "warning" | "danger" | "neutral";
  variant?: "default" | "bordered" | "filled" | "glass" | "ios-glass";
  icon?: React.ReactNode;
  hideIcon?: boolean;
  action?: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
  children?: React.ReactNode;
}

const defaultIcons = {
  info: <Info size={18} className="text-blue-500 shrink-0" />,
  success: <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />,
  warning: <AlertTriangle size={18} className="text-amber-500 shrink-0" />,
  danger: <AlertCircle size={18} className="text-red-500 shrink-0" />,
  neutral: <Bell size={18} className="text-zinc-500 shrink-0" />,
};

const intentStyles = {
  default: {
    info: "bg-blue-50/60 dark:bg-blue-950/40 border-blue-200 dark:border-blue-900/60 text-blue-900 dark:text-blue-200",
    success: "bg-emerald-50/60 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900/60 text-emerald-900 dark:text-emerald-200",
    warning: "bg-amber-50/60 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900/60 text-amber-900 dark:text-amber-200",
    danger: "bg-red-50/60 dark:bg-red-950/40 border-red-200 dark:border-red-900/60 text-red-900 dark:text-red-200",
    neutral: "bg-zinc-100/80 dark:bg-zinc-900/60 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-200",
  },
  bordered: {
    info: "bg-white dark:bg-zinc-900 border-l-4 border-l-blue-500 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100",
    success: "bg-white dark:bg-zinc-900 border-l-4 border-l-emerald-500 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100",
    warning: "bg-white dark:bg-zinc-900 border-l-4 border-l-amber-500 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100",
    danger: "bg-white dark:bg-zinc-900 border-l-4 border-l-red-500 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100",
    neutral: "bg-white dark:bg-zinc-900 border-l-4 border-l-zinc-500 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100",
  },
  filled: {
    info: "bg-blue-600 text-white dark:bg-blue-500 border-transparent",
    success: "bg-emerald-600 text-white dark:bg-emerald-500 border-transparent",
    warning: "bg-amber-600 text-white dark:bg-amber-500 border-transparent",
    danger: "bg-red-600 text-white dark:bg-red-500 border-transparent",
    neutral: "bg-zinc-800 text-white dark:bg-zinc-700 border-transparent",
  },
  glass: {
    info: "bg-blue-500/10 dark:bg-blue-500/15 backdrop-blur-md border-blue-500/20 text-blue-900 dark:text-blue-200",
    success: "bg-emerald-500/10 dark:bg-emerald-500/15 backdrop-blur-md border-emerald-500/20 text-emerald-900 dark:text-emerald-200",
    warning: "bg-amber-500/10 dark:bg-amber-500/15 backdrop-blur-md border-amber-500/20 text-amber-900 dark:text-amber-200",
    danger: "bg-red-500/10 dark:bg-red-500/15 backdrop-blur-md border-red-500/20 text-red-900 dark:text-red-200",
    neutral: "bg-zinc-500/10 dark:bg-zinc-500/15 backdrop-blur-md border-zinc-500/20 text-zinc-900 dark:text-zinc-200",
  },
  "ios-glass": {
    info: "bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl border border-white/60 dark:border-zinc-800/80 shadow-lg shadow-black/5 text-zinc-900 dark:text-zinc-100",
    success: "bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl border border-white/60 dark:border-zinc-800/80 shadow-lg shadow-black/5 text-zinc-900 dark:text-zinc-100",
    warning: "bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl border border-white/60 dark:border-zinc-800/80 shadow-lg shadow-black/5 text-zinc-900 dark:text-zinc-100",
    danger: "bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl border border-white/60 dark:border-zinc-800/80 shadow-lg shadow-black/5 text-zinc-900 dark:text-zinc-100",
    neutral: "bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl border border-white/60 dark:border-zinc-800/80 shadow-lg shadow-black/5 text-zinc-900 dark:text-zinc-100",
  },
};

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      title,
      description,
      intent = "info",
      variant = "default",
      icon,
      hideIcon = false,
      action,
      dismissible = false,
      onDismiss,
      className,
      children,
    },
    ref
  ) => {
    const [visible, setVisible] = React.useState(true);

    const handleDismiss = () => {
      setVisible(false);
      onDismiss?.();
    };

    const alertIcon = icon || (hideIcon ? null : defaultIcons[intent]);

    return (
      <AnimatePresence>
        {visible && (
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "relative flex items-start justify-between gap-3 p-4 rounded-2xl border transition-all duration-200",
              intentStyles[variant][intent],
              className
            )}
          >
            <div className="flex items-start gap-3 min-w-0 flex-1">
              {alertIcon && <div className="mt-0.5 shrink-0">{alertIcon}</div>}

              <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                {title && (
                  <h5 className="text-sm font-semibold tracking-tight leading-none">
                    {title}
                  </h5>
                )}

                {description && (
                  <div className="text-xs opacity-90 leading-relaxed">
                    {description}
                  </div>
                )}

                {children && <div className="mt-1 text-xs">{children}</div>}
              </div>
            </div>

            {(action || dismissible) && (
              <div className="flex items-center gap-2 shrink-0 ml-2">
                {action}

                {dismissible && (
                  <button
                    type="button"
                    onClick={handleDismiss}
                    className="p-1 rounded-lg opacity-70 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);

Alert.displayName = "Alert";

export default Alert;
