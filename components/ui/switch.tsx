"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useFormField } from "./form";

export interface SwitchProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "size" | "onChange"> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: React.ReactNode;
  description?: React.ReactNode;
  variant?: "default" | "ios-glass";
  size?: "sm" | "md" | "lg";
  color?: "primary" | "success" | "danger" | "warning" | "purple";
  checkedIcon?: React.ReactNode;
  uncheckedIcon?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  errorText?: string;
  helperText?: string;
}

const sizeConfig = {
  sm: {
    track: "w-8 h-4.5 p-0.5",
    thumb: "w-3.5 h-3.5",
    translate: 14,
    text: "text-xs",
  },
  md: {
    track: "w-11 h-6 p-0.5",
    thumb: "w-5 h-5",
    translate: 20,
    text: "text-sm",
  },
  lg: {
    track: "w-14 h-7 p-1",
    thumb: "w-5 h-5",
    translate: 26,
    text: "text-base",
  },
};

const colorConfig = {
  primary: "bg-teal-600 dark:bg-teal-500",
  success: "bg-emerald-600 dark:bg-emerald-500",
  danger: "bg-red-600 dark:bg-red-500",
  warning: "bg-amber-600 dark:bg-amber-500",
  purple: "bg-purple-600 dark:bg-purple-500",
};

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      checked: propChecked,
      defaultChecked = false,
      onCheckedChange,
      label,
      description,
      variant = "default",
      size: propSize = "md",
      color = "primary",
      checkedIcon,
      uncheckedIcon,
      loading = false,
      disabled: propDisabled,
      errorText: propErrorText,
      helperText,
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

    const handleToggle = () => {
      if (disabled || loading) return;
      const nextChecked = !isChecked;
      if (!isControlled) {
        setUncontrolledChecked(nextChecked);
      }
      onCheckedChange?.(nextChecked);
    };

    const config = sizeConfig[size];

    return (
      <div className="flex flex-col gap-1">
        <div className="inline-flex items-center gap-3">
          <button
            ref={ref}
            id={id}
            type="button"
            role="switch"
            aria-checked={isChecked}
            disabled={disabled || loading}
            onClick={handleToggle}
            className={cn(
              "relative inline-flex shrink-0 items-center rounded-full transition-colors duration-200 ease-in-out cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/40",
              config.track,
              isChecked ? colorConfig[color] : "bg-zinc-200 dark:bg-zinc-700",
              variant === "ios-glass" && "backdrop-blur-md bg-white/40 dark:bg-zinc-900/40 border border-white/60 dark:border-zinc-800/80 shadow-sm",
              (disabled || loading) && "opacity-50 cursor-not-allowed",
              className
            )}
            {...props}
          >
            <motion.div
              className={cn(
                "pointer-events-none flex items-center justify-center rounded-full bg-white dark:bg-zinc-900 shadow-md ring-0 transition-transform",
                config.thumb
              )}
              animate={{ x: isChecked ? config.translate : 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              {loading ? (
                <Loader2 className="animate-spin text-zinc-500" size={10} />
              ) : isChecked ? (
                checkedIcon ? (
                  <span className="text-[10px]">{checkedIcon}</span>
                ) : null
              ) : uncheckedIcon ? (
                <span className="text-[10px]">{uncheckedIcon}</span>
              ) : null}
            </motion.div>
          </button>

          {(label || description) && (
            <div
              onClick={handleToggle}
              className={cn(
                "flex flex-col cursor-pointer select-none",
                disabled && "cursor-not-allowed"
              )}
            >
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
                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                  {description}
                </span>
              )}
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

Switch.displayName = "Switch";

export default Switch;
