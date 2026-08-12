"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Copy, Check } from "lucide-react";
import Button, { ButtonProps } from "./button";

export interface CopyButtonProps extends ButtonProps {
  value: string;
  onCopy?: () => void;
  copiedDuration?: number;
}

export const CopyButton: React.FC<CopyButtonProps> = ({
  value,
  onCopy,
  copiedDuration = 2000,
  children,
  variant = "outline",
  size = "sm",
  className,
  ...props
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      onCopy?.();
      setTimeout(() => setCopied(false), copiedDuration);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleCopy}
      className={cn("select-none cursor-pointer", className)}
      {...props}
    >
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.span
            key="check"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold"
          >
            <Check size={14} />
            {children || "Copied!"}
          </motion.span>
        ) : (
          <motion.span
            key="copy"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="inline-flex items-center gap-1.5"
          >
            <Copy size={14} />
            {children || "Copy"}
          </motion.span>
        )}
      </AnimatePresence>
    </Button>
  );
};

export interface CopyableFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  label?: string;
  readOnly?: boolean;
  variant?: "default" | "bordered" | "glass" | "ios-glass";
  className?: string;
}

export const CopyableField: React.FC<CopyableFieldProps> = ({
  value,
  label,
  variant = "ios-glass",
  className,
  ...props
}) => {
  return (
    <div className={cn("w-full space-y-1.5", className)} {...props}>
      {label && (
        <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
          {label}
        </label>
      )}
      <div
        className={cn(
          "flex items-center justify-between gap-2 p-2 px-3 rounded-2xl select-none",
          variant === "default" &&
            "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm",
          variant === "bordered" &&
            "bg-white dark:bg-zinc-950 border-2 border-zinc-300 dark:border-zinc-800",
          variant === "glass" &&
            "bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-white/40 dark:border-zinc-800 shadow-md",
          variant === "ios-glass" &&
            "bg-white/40 dark:bg-zinc-900/40 backdrop-blur-2xl border border-white/60 dark:border-zinc-800/80 shadow-lg text-zinc-900 dark:text-white"
        )}
      >
        <span className="text-xs font-mono truncate text-zinc-700 dark:text-zinc-300">
          {value}
        </span>
        <CopyButton value={value} size="sm" variant="ghost" />
      </div>
    </div>
  );
};

CopyButton.displayName = "CopyButton";
CopyableField.displayName = "CopyableField";

export default CopyButton;
