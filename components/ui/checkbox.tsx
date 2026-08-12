"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Check, Minus } from "lucide-react";
import { useFormField } from "./form";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "onChange"> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  variant?: "default" | "card" | "filled" | "ios-glass";
  size?: "sm" | "md" | "lg";
  color?: "primary" | "success" | "danger" | "warning" | "purple";
  errorText?: string;
  helperText?: string;
}

const sizeStyles = {
  sm: {
    box: "w-4 h-4 rounded",
    icon: 10,
    text: "text-xs",
  },
  md: {
    box: "w-5 h-5 rounded-md",
    icon: 12,
    text: "text-sm",
  },
  lg: {
    box: "w-6 h-6 rounded-lg",
    icon: 16,
    text: "text-base",
  },
};

const colorStyles = {
  primary: "bg-teal-600 border-teal-600 text-white dark:bg-teal-500 dark:border-teal-500",
  success: "bg-emerald-600 border-emerald-600 text-white dark:bg-emerald-500 dark:border-emerald-500",
  danger: "bg-red-600 border-red-600 text-white dark:bg-red-500 dark:border-red-500",
  warning: "bg-amber-600 border-amber-600 text-white dark:bg-amber-500 dark:border-amber-500",
  purple: "bg-purple-600 border-purple-600 text-white dark:bg-purple-500 dark:border-purple-500",
};

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      description,
      checked: propChecked,
      defaultChecked = false,
      indeterminate = false,
      onCheckedChange,
      onChange,
      variant = "default",
      size: propSize = "md",
      color = "primary",
      errorText: propErrorText,
      helperText,
      disabled: propDisabled,
      id: propId,
      className,
      ...props
    },
    ref
  ) => {
    const formField = useFormField();
    const id = propId || formField.id;
    const disabled = propDisabled ?? formField.disabled ?? false;
    const errorText = propErrorText || formField.errorText;
    const size = (propSize === "sm" || propSize === "lg" ? propSize : "md") as "sm" | "md" | "lg";

    const [uncontrolledChecked, setUncontrolledChecked] = React.useState(defaultChecked);
    const isControlled = propChecked !== undefined;
    const isChecked = isControlled ? propChecked : uncontrolledChecked;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;
      const nextChecked = e.target.checked;
      if (!isControlled) {
        setUncontrolledChecked(nextChecked);
      }
      onCheckedChange?.(nextChecked);
      onChange?.(e);
    };

    const config = sizeStyles[size];

    return (
      <div className="flex flex-col gap-1 w-full">
        <label
          htmlFor={id}
          className={cn(
            "inline-flex items-start gap-3 cursor-pointer select-none transition-all duration-200 group",
            variant === "card" &&
              cn(
                "p-3.5 border rounded-xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm hover:border-zinc-300 dark:hover:border-zinc-700",
                isChecked && "border-teal-500 dark:border-teal-500 bg-teal-50/20 dark:bg-teal-950/20"
              ),
            variant === "ios-glass" &&
              cn(
                "p-3.5 border rounded-2xl bg-white/40 dark:bg-zinc-900/40 backdrop-blur-2xl border-white/60 dark:border-zinc-800/80 shadow-md text-zinc-900 dark:text-white",
                isChecked && "border-teal-500 dark:border-teal-500 bg-teal-50/30 dark:bg-teal-950/30"
              ),
            disabled && "opacity-50 cursor-not-allowed",
            className
          )}
        >
          <div className="relative flex items-center justify-center shrink-0 mt-0.5">
            <input
              type="checkbox"
              ref={ref}
              id={id}
              checked={isChecked}
              disabled={disabled}
              onChange={handleChange}
              className="sr-only peer"
              {...props}
            />

            <motion.div
              className={cn(
                "flex items-center justify-center border-2 transition-colors duration-150",
                config.box,
                isChecked || indeterminate
                  ? colorStyles[color]
                  : "border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500/40",
                errorText && "!border-red-500"
              )}
              animate={{ scale: isChecked || indeterminate ? [0.85, 1] : 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              <AnimatePresence mode="wait">
                {indeterminate ? (
                  <motion.div
                    key="indeterminate"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.1 }}
                  >
                    <Minus size={config.icon} strokeWidth={3} />
                  </motion.div>
                ) : isChecked ? (
                  <motion.div
                    key="checked"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.1 }}
                  >
                    <Check size={config.icon} strokeWidth={3} />
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </motion.div>
          </div>

          {(label || description) && (
            <div className="flex flex-col">
              {label && (
                <span
                  className={cn(
                    "font-medium text-zinc-900 dark:text-zinc-100",
                    config.text
                  )}
                >
                  {label}
                </span>
              )}
              {description && (
                <span className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                  {description}
                </span>
              )}
            </div>
          )}
        </label>

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

Checkbox.displayName = "Checkbox";

export default Checkbox;
