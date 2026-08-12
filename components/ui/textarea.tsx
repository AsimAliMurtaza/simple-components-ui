"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useFormField } from "./form";

export interface TextareaProps
  extends Omit<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    "size" | "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"
  > {
  label?: string;
  helperText?: string;
  errorText?: string;
  variant?: "default" | "underline" | "bordered" | "glass" | "ghost" | "ios-glass";
  size?: "sm" | "default" | "lg";
  status?: "default" | "error" | "success" | "warning";
  autoResize?: boolean;
  showCount?: boolean;
  leftAdornment?: React.ReactNode;
  rightAdornment?: React.ReactNode;
}

const variantStyles = {
  default:
    "bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-lg shadow-sm focus-within:border-teal-500 dark:focus-within:border-teal-400 focus-within:ring-2 focus-within:ring-teal-500/20",
  underline:
    "bg-transparent border-b-2 border-zinc-300 dark:border-zinc-700 rounded-none focus-within:border-teal-500 dark:focus-within:border-teal-400 px-0",
  bordered:
    "bg-white dark:bg-zinc-950 border-2 border-zinc-300 dark:border-zinc-800 rounded-xl focus-within:border-teal-600 dark:focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-500/20",
  glass:
    "bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-white/40 dark:border-zinc-800 rounded-xl focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-500/20 shadow-md",
  ghost:
    "bg-transparent border-none hover:bg-zinc-100 dark:hover:bg-zinc-800/50 rounded-lg focus-within:bg-zinc-100 dark:focus-within:bg-zinc-800/50",
  "ios-glass":
    "bg-white/40 dark:bg-zinc-900/40 backdrop-blur-2xl border border-white/60 dark:border-zinc-800/80 rounded-xl text-zinc-900 dark:text-white shadow-sm focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-500/20",
};

const sizeStyles = {
  sm: "text-xs p-2 min-h-[60px]",
  default: "text-sm p-3 min-h-[90px]",
  lg: "text-base p-4 min-h-[120px]",
};

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      helperText,
      errorText: propErrorText,
      className,
      variant = "default",
      size: propSize,
      status,
      autoResize = false,
      showCount = false,
      leftAdornment,
      rightAdornment,
      maxLength,
      id: propId,
      disabled: propDisabled,
      value: propValue,
      defaultValue,
      onChange,
      rows = 3,
      ...props
    },
    ref
  ) => {
    const formField = useFormField();
    const id = propId || formField.id;
    const disabled = propDisabled ?? formField.disabled ?? false;
    const errorText = propErrorText || formField.errorText;
    const size = propSize || formField.size || "default";

    const internalRef = React.useRef<HTMLTextAreaElement | null>(null);
    React.useImperativeHandle(ref, () => internalRef.current!);

    const [uncontrolledValue, setUncontrolledValue] = React.useState(
      defaultValue ?? ""
    );
    const isControlled = propValue !== undefined;
    const currentValue = isControlled ? propValue : uncontrolledValue;

    const charCount = String(currentValue ?? "").length;

    // Handle auto-resize
    React.useEffect(() => {
      if (autoResize && internalRef.current) {
        internalRef.current.style.height = "auto";
        internalRef.current.style.height = `${internalRef.current.scrollHeight}px`;
      }
    }, [autoResize, currentValue]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (!isControlled) {
        setUncontrolledValue(e.target.value);
      }
      onChange?.(e);
    };

    const currentStatus = errorText ? "error" : status || "default";
    const statusStyles = {
      default: "",
      error: "!border-red-500 dark:!border-red-500 focus-within:!ring-red-500/20",
      success: "!border-emerald-500 dark:!border-emerald-500 focus-within:!ring-emerald-500/20",
      warning: "!border-amber-500 dark:!border-amber-500 focus-within:!ring-amber-500/20",
    };

    return (
      <div className="w-full flex flex-col gap-1 relative">
        {label && !formField.id && (
          <label
            htmlFor={id}
            className="text-sm font-medium text-zinc-900 dark:text-zinc-100 select-none"
          >
            {label}
          </label>
        )}

        <div
          className={cn(
            "flex flex-col w-full transition-all duration-200 relative overflow-hidden",
            variantStyles[variant],
            sizeStyles[size],
            statusStyles[currentStatus],
            disabled && "opacity-50 cursor-not-allowed bg-zinc-100 dark:bg-zinc-900/50",
            className
          )}
        >
          <div className="flex w-full h-full gap-2 items-start">
            {leftAdornment && (
              <div className="pt-1 text-zinc-400 dark:text-zinc-500 shrink-0">
                {leftAdornment}
              </div>
            )}

            <motion.textarea
              ref={internalRef}
              id={id}
              rows={rows}
              disabled={disabled}
              maxLength={maxLength}
              value={currentValue}
              onChange={handleChange}
              className={cn(
                "w-full h-full bg-transparent outline-none border-none resize-none text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500",
                autoResize && "overflow-hidden"
              )}
              whileFocus={{ scale: 1.001 }}
              {...props}
            />

            {rightAdornment && (
              <div className="pt-1 text-zinc-400 dark:text-zinc-500 shrink-0">
                {rightAdornment}
              </div>
            )}
          </div>

          {showCount && (
            <div className="flex justify-end pt-1">
              <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono">
                {charCount}
                {maxLength ? ` / ${maxLength}` : ""}
              </span>
            </div>
          )}
        </div>

        {!formField.id && (
          <AnimatePresence mode="wait">
            {errorText ? (
              <motion.p
                key="error"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="text-xs text-red-500 dark:text-red-400 font-medium"
              >
                {errorText}
              </motion.p>
            ) : helperText ? (
              <motion.p
                key="helper"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="text-xs text-zinc-500 dark:text-zinc-400"
              >
                {helperText}
              </motion.p>
            ) : null}
          </AnimatePresence>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
