"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  CheckCircle2,
  AlertCircle,
  Info,
  AlertTriangle,
  X,
  Loader2,
} from "lucide-react";

export type ToastType = "info" | "success" | "warning" | "danger" | "loading" | "custom";
export type ToastPosition =
  | "top-right"
  | "top-left"
  | "top-center"
  | "bottom-right"
  | "bottom-left"
  | "bottom-center";

export interface ToastData {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  type?: ToastType;
  variant?: "default" | "filled" | "glass" | "ios-glass";
  duration?: number; // ms, 0 for infinite
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  onDismiss?: () => void;
  component?: React.ReactNode;
}

interface ToastContextValue {
  toasts: ToastData[];
  position: ToastPosition;
  setPosition: (pos: ToastPosition) => void;
  addToast: (toast: Omit<ToastData, "id">) => string;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

export interface ToastProviderProps {
  position?: ToastPosition;
  children: React.ReactNode;
}

// Global imperative dispatcher target
let globalAddToast: ((toast: Omit<ToastData, "id">) => string) | null = null;
let globalRemoveToast: ((id: string) => void) | null = null;

export const ToastProvider: React.FC<ToastProviderProps> = ({
  position: initialPosition = "top-right",
  children,
}) => {
  const [toasts, setToasts] = React.useState<ToastData[]>([]);
  const [position, setPosition] = React.useState<ToastPosition>(initialPosition);

  const addToast = React.useCallback((toast: Omit<ToastData, "id">) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const newToast: ToastData = { id, ...toast };
    setToasts((prev) => [...prev, newToast]);
    return id;
  }, []);

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => {
      const target = prev.find((t) => t.id === id);
      target?.onDismiss?.();
      return prev.filter((t) => t.id !== id);
    });
  }, []);

  const clearToasts = React.useCallback(() => {
    setToasts([]);
  }, []);

  React.useEffect(() => {
    globalAddToast = addToast;
    globalRemoveToast = removeToast;
    return () => {
      globalAddToast = null;
      globalRemoveToast = null;
    };
  }, [addToast, removeToast]);

  const positionClasses: Record<ToastPosition, string> = {
    "top-right": "top-4 right-4 items-end",
    "top-left": "top-4 left-4 items-start",
    "top-center": "top-4 left-1/2 -translate-x-1/2 items-center",
    "bottom-right": "bottom-4 right-4 items-end",
    "bottom-left": "bottom-4 left-4 items-start",
    "bottom-center": "bottom-4 left-1/2 -translate-x-1/2 items-center",
  };

  return (
    <ToastContext.Provider
      value={{
        toasts,
        position,
        setPosition,
        addToast,
        removeToast,
        clearToasts,
      }}
    >
      {children}

      {/* Floating Toast Container */}
      <div
        className={cn(
          "fixed z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none p-4",
          positionClasses[position]
        )}
      >
        <AnimatePresence mode="sync">
          {toasts.map((toast) => (
            <ToastItem key={toast.id} toast={toast} onDismiss={removeToast} />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

// Imperative toast API
export const toast = {
  info: (title: React.ReactNode, options?: Partial<Omit<ToastData, "id" | "title" | "type">>) =>
    globalAddToast?.({ title, type: "info", ...options }) ?? "",
  success: (title: React.ReactNode, options?: Partial<Omit<ToastData, "id" | "title" | "type">>) =>
    globalAddToast?.({ title, type: "success", ...options }) ?? "",
  warning: (title: React.ReactNode, options?: Partial<Omit<ToastData, "id" | "title" | "type">>) =>
    globalAddToast?.({ title, type: "warning", ...options }) ?? "",
  danger: (title: React.ReactNode, options?: Partial<Omit<ToastData, "id" | "title" | "type">>) =>
    globalAddToast?.({ title, type: "danger", ...options }) ?? "",
  loading: (title: React.ReactNode, options?: Partial<Omit<ToastData, "id" | "title" | "type">>) =>
    globalAddToast?.({ title, type: "loading", duration: 0, ...options }) ?? "",
  custom: (component: React.ReactNode, options?: Partial<Omit<ToastData, "id" | "type">>) =>
    globalAddToast?.({ type: "custom", component, ...options }) ?? "",
  dismiss: (id: string) => globalRemoveToast?.(id),
  promise: async <T,>(
    promise: Promise<T>,
    msgs: { loading: string; success: string; error: string },
    options?: Partial<ToastData>
  ) => {
    const id = toast.loading(msgs.loading, options);
    try {
      const res = await promise;
      toast.dismiss(id);
      toast.success(msgs.success, options);
      return res;
    } catch (err) {
      toast.dismiss(id);
      toast.danger(msgs.error, options);
      throw err;
    }
  },
};

// Toast Item renderer
const defaultToastIcons: Record<ToastType, React.ReactNode> = {
  info: <Info size={18} className="text-blue-500 shrink-0" />,
  success: <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />,
  warning: <AlertTriangle size={18} className="text-amber-500 shrink-0" />,
  danger: <AlertCircle size={18} className="text-red-500 shrink-0" />,
  loading: <Loader2 size={18} className="text-blue-500 animate-spin shrink-0" />,
  custom: null,
};

const toastVariantStyles = {
  default: "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-xl",
  filled: "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 border-transparent shadow-2xl",
  glass: "bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-white/40 dark:border-zinc-800/80 text-zinc-900 dark:text-zinc-100 shadow-2xl",
  "ios-glass": "bg-white/40 dark:bg-zinc-900/40 backdrop-blur-2xl border border-white/60 dark:border-zinc-800/80 text-zinc-900 dark:text-zinc-100 shadow-2xl shadow-black/10",
};

const ToastItem: React.FC<{
  toast: ToastData;
  onDismiss: (id: string) => void;
}> = ({ toast, onDismiss }) => {
  const {
    id,
    title,
    description,
    type = "info",
    variant = "ios-glass",
    duration = 4000,
    icon,
    action,
    component,
  } = toast;

  const [progress, setProgress] = React.useState(100);

  React.useEffect(() => {
    if (duration <= 0) return;
    const interval = 20;
    const step = (interval / duration) * 100;
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          onDismiss(id);
          return 0;
        }
        return prev - step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [duration, id, onDismiss]);

  const toastIcon = icon || defaultToastIcons[type];

  if (component) {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 15, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 15, scale: 0.95 }}
        className="pointer-events-auto w-full"
      >
        {component}
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 15, scale: 0.95 }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={(_, info) => {
        if (Math.abs(info.offset.x) > 80) {
          onDismiss(id);
        }
      }}
      className={cn(
        "pointer-events-auto relative flex flex-col w-full rounded-2xl p-4 overflow-hidden select-none transition-all duration-200",
        toastVariantStyles[variant]
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0 flex-1">
          {toastIcon && <div className="mt-0.5 shrink-0">{toastIcon}</div>}

          <div className="flex flex-col gap-0.5 min-w-0 flex-1">
            {title && (
              <h5 className="text-sm font-semibold tracking-tight leading-snug">
                {title}
              </h5>
            )}
            {description && (
              <p className="text-xs opacity-80 leading-relaxed">{description}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {action && (
            <button
              type="button"
              onClick={action.onClick}
              className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-blue-600 text-white dark:bg-blue-500 hover:bg-blue-700 transition-colors"
            >
              {action.label}
            </button>
          )}

          <button
            type="button"
            onClick={() => onDismiss(id)}
            className="p-1 rounded-lg opacity-60 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {duration > 0 && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/5 dark:bg-white/5 overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </motion.div>
  );
};
