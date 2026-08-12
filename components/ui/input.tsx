"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Eye, EyeOff, X, CheckCircle2, AlertCircle, AlertTriangle } from "lucide-react";
import { useFormField } from "./form";

export interface InputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "size" | "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"
  > {
  label?: string;
  helperText?: string;
  errorText?: string;
  variant?: "default" | "underline" | "bordered" | "glass" | "ghost" | "ios-glass";
  size?: "sm" | "default" | "lg";
  status?: "default" | "error" | "success" | "warning";
  labelAnimate?: boolean;
  leftAdornment?: React.ReactNode;
  rightAdornment?: React.ReactNode;
  adornmentClickable?: boolean;
  clearable?: boolean;
  onClear?: () => void;
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
  sm: "h-8 text-xs px-2.5",
  default: "h-10 text-sm px-3.5",
  lg: "h-12 text-base px-4",
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      errorText: propErrorText,
      className,
      variant = "default",
      size: propSize,
      status,
      labelAnimate = false,
      leftAdornment,
      rightAdornment,
      adornmentClickable = false,
      clearable = false,
      onClear,
      type = "text",
      id: propId,
      disabled: propDisabled,
      value: propValue,
      defaultValue,
      onChange,
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    const formField = useFormField();
    const id = propId || formField.id;
    const disabled = propDisabled ?? formField.disabled ?? false;
    const errorText = propErrorText || formField.errorText;
    const size = propSize || formField.size || "default";

    const [focused, setFocused] = React.useState(false);
    const [uncontrolledValue, setUncontrolledValue] = React.useState(
      defaultValue ?? ""
    );
    const [showPassword, setShowPassword] = React.useState(false);

    const isControlled = propValue !== undefined;
    const currentValue = isControlled ? propValue : uncontrolledValue;

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setFocused(false);
      onBlur?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setUncontrolledValue(e.target.value);
      }
      onChange?.(e);
    };

    const handleClear = () => {
      if (!isControlled) {
        setUncontrolledValue("");
      }
      onClear?.();
    };

    const isFloating = labelAnimate && (focused || Boolean(currentValue));
    const inputType = type === "password" ? (showPassword ? "text" : "password") : type;

    // Status logic
    const currentStatus = errorText ? "error" : status || "default";
    const statusStyles = {
      default: "",
      error: "!border-red-500 dark:!border-red-500 focus-within:!ring-red-500/20",
      success: "!border-emerald-500 dark:!border-emerald-500 focus-within:!ring-emerald-500/20",
      warning: "!border-amber-500 dark:!border-amber-500 focus-within:!ring-amber-500/20",
    };

    const renderRightAdornment = () => {
      if (type === "password") {
        return (
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setShowPassword((prev) => !prev)}
            onMouseDown={(e) => e.preventDefault()}
            className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        );
      }

      if (clearable && Boolean(currentValue) && !disabled) {
        return (
          <button
            type="button"
            tabIndex={-1}
            onClick={handleClear}
            className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
          >
            <X size={16} />
          </button>
        );
      }

      if (currentStatus === "success") {
        return <CheckCircle2 size={16} className="text-emerald-500" />;
      }
      if (currentStatus === "warning") {
        return <AlertTriangle size={16} className="text-amber-500" />;
      }
      if (currentStatus === "error") {
        return <AlertCircle size={16} className="text-red-500" />;
      }

      return rightAdornment;
    };

    const finalRightAdornment = renderRightAdornment();

    return (
      <div className="w-full flex flex-col gap-1 relative">
        {label && !formField.id && (
          <motion.label
            htmlFor={id}
            className={cn(
              "text-sm font-medium text-zinc-900 dark:text-zinc-100 select-none",
              labelAnimate && "absolute left-3 transition-all duration-200 pointer-events-none z-10",
              labelAnimate && !isFloating && "top-1/2 -translate-y-1/2 text-zinc-500",
              labelAnimate && isFloating && "-top-5 left-1 text-xs text-blue-600 dark:text-blue-400"
            )}
          >
            {label}
          </motion.label>
        )}

        <div
          className={cn(
            "flex items-center w-full transition-all duration-200 relative overflow-hidden",
            variantStyles[variant],
            sizeStyles[size],
            statusStyles[currentStatus],
            disabled && "opacity-50 cursor-not-allowed bg-zinc-100 dark:bg-zinc-900/50",
            className
          )}
        >
          {leftAdornment && (
            <div
              className={cn(
                "flex items-center justify-center mr-2 text-zinc-400 dark:text-zinc-500 shrink-0",
                adornmentClickable && "cursor-pointer"
              )}
            >
              {leftAdornment}
            </div>
          )}

          <motion.input
            ref={ref}
            id={id}
            type={inputType}
            disabled={disabled}
            value={currentValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={cn(
              "w-full h-full bg-transparent outline-none border-none text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500",
              variant === "underline" && "px-0"
            )}
            whileFocus={{ scale: 1.002 }}
            {...props}
          />

          {finalRightAdornment && (
            <div
              className={cn(
                "flex items-center justify-center ml-2 text-zinc-400 dark:text-zinc-500 shrink-0",
                adornmentClickable && "cursor-pointer"
              )}
            >
              {finalRightAdornment}
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

Input.displayName = "Input";

export default Input;
