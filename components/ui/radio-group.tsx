"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useFormField } from "./form";

// Context
interface RadioGroupContextValue {
  value?: string;
  name?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  variant?: "default" | "card" | "pill";
  size?: "sm" | "md" | "lg";
}

const RadioGroupContext = React.createContext<RadioGroupContextValue>({});

export interface RadioGroupProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  name?: string;
  orientation?: "vertical" | "horizontal";
  disabled?: boolean;
  variant?: "default" | "card" | "pill";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
  errorText?: string;
  helperText?: string;
  label?: string;
}

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      value: propValue,
      defaultValue,
      onValueChange,
      name: propName,
      orientation = "vertical",
      disabled: propDisabled,
      variant = "default",
      size = "md",
      className,
      children,
      errorText: propErrorText,
      helperText,
      label,
    },
    ref
  ) => {
    const generatedId = React.useId();
    const formField = useFormField();
    const disabled = propDisabled ?? formField.disabled ?? false;
    const errorText = propErrorText || formField.errorText;
    const name = propName || formField.name || generatedId;

    const [uncontrolledValue, setUncontrolledValue] = React.useState(
      defaultValue ?? ""
    );
    const isControlled = propValue !== undefined;
    const currentValue = isControlled ? propValue : uncontrolledValue;

    const handleChange = React.useCallback(
      (val: string) => {
        if (!isControlled) {
          setUncontrolledValue(val);
        }
        onValueChange?.(val);
      },
      [isControlled, onValueChange]
    );

    const contextValue = React.useMemo(
      () => ({
        value: currentValue,
        name,
        onChange: handleChange,
        disabled,
        variant,
        size,
      }),
      [currentValue, name, handleChange, disabled, variant, size]
    );

    return (
      <RadioGroupContext.Provider value={contextValue}>
        <div className="w-full flex flex-col gap-1.5" ref={ref}>
          {label && !formField.id && (
            <label className="text-sm font-medium text-zinc-900 dark:text-zinc-100 select-none">
              {label}
            </label>
          )}

          <div
            role="radiogroup"
            className={cn(
              "flex gap-2",
              orientation === "vertical" ? "flex-col" : "flex-row flex-wrap items-center",
              className
            )}
          >
            {children}
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
      </RadioGroupContext.Provider>
    );
  }
);

RadioGroup.displayName = "RadioGroup";

// --- RadioGroupItem / Radio ---
export interface RadioGroupItemProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "onChange"> {
  value: string;
  label?: React.ReactNode;
  description?: React.ReactNode;
  badge?: React.ReactNode;
}

const sizeConfig = {
  sm: { outer: "w-4 h-4", inner: "w-1.5 h-1.5", text: "text-xs" },
  md: { outer: "w-5 h-5", inner: "w-2 h-2", text: "text-sm" },
  lg: { outer: "w-6 h-6", inner: "w-2.5 h-2.5", text: "text-base" },
};

export const RadioGroupItem = React.forwardRef<
  HTMLInputElement,
  RadioGroupItemProps
>(({ value, label, description, badge, disabled: itemDisabled, className, id: propId, ...props }, ref) => {
  const context = React.useContext(RadioGroupContext);
  const isSelected = context.value === value;
  const disabled = itemDisabled || context.disabled || false;
  const generatedId = React.useId();
  const id = propId || `radio-${generatedId}`;

  const sizeKey = context.size || "md";
  const config = sizeConfig[sizeKey];
  const variant = context.variant || "default";

  return (
    <label
      htmlFor={id}
      className={cn(
        "inline-flex items-start gap-3 cursor-pointer select-none transition-all duration-200 group",
        variant === "card" &&
          cn(
            "p-3.5 border rounded-xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm hover:border-zinc-300 dark:hover:border-zinc-700 flex-1",
            isSelected && "border-blue-500 dark:border-blue-500 bg-blue-50/20 dark:bg-blue-950/20"
          ),
        variant === "pill" &&
          cn(
            "px-4 py-2 border rounded-full text-xs font-medium bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800",
            isSelected && "bg-blue-600 dark:bg-blue-500 text-white border-blue-600 dark:border-blue-500"
          ),
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {variant !== "pill" && (
        <div className="relative flex items-center justify-center shrink-0 mt-0.5">
          <input
            type="radio"
            ref={ref}
            id={id}
            name={context.name}
            value={value}
            checked={isSelected}
            disabled={disabled}
            onChange={() => !disabled && context.onChange?.(value)}
            className="sr-only peer"
            {...props}
          />

          <div
            className={cn(
              "rounded-full border-2 transition-colors flex items-center justify-center",
              config.outer,
              isSelected
                ? "border-blue-600 dark:border-blue-500 bg-white dark:bg-zinc-900"
                : "border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500/40"
            )}
          >
            {isSelected && (
              <motion.div
                className={cn("rounded-full bg-blue-600 dark:bg-blue-500", config.inner)}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 25 }}
              />
            )}
          </div>
        </div>
      )}

      {(label || description || badge) && (
        <div className="flex-1 flex items-center justify-between">
          <div className="flex flex-col">
            {label && (
              <span
                className={cn(
                  "font-medium text-zinc-900 dark:text-zinc-100",
                  config.text,
                  variant === "pill" && isSelected && "text-white dark:text-white"
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

          {badge && <div className="ml-2 shrink-0">{badge}</div>}
        </div>
      )}
    </label>
  );
});

RadioGroupItem.displayName = "RadioGroupItem";

export default RadioGroup;
