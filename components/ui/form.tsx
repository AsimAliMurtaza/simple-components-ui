"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Info } from "lucide-react";

// --- Form Context ---
export interface FormContextValue {
  disabled?: boolean;
  readOnly?: boolean;
  size?: "sm" | "default" | "lg";
  layout?: "vertical" | "horizontal";
  errors?: Record<string, string>;
}

const FormContext = React.createContext<FormContextValue>({});

export const useForm = () => React.useContext(FormContext);

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  disabled?: boolean;
  readOnly?: boolean;
  size?: "sm" | "default" | "lg";
  layout?: "vertical" | "horizontal";
  errors?: Record<string, string>;
  children: React.ReactNode;
}

export const Form = React.forwardRef<HTMLFormElement, FormProps>(
  (
    {
      disabled = false,
      readOnly = false,
      size = "default",
      layout = "vertical",
      errors,
      className,
      children,
      onSubmit,
      ...props
    },
    ref
  ) => {
    const contextValue = React.useMemo(
      () => ({ disabled, readOnly, size, layout, errors }),
      [disabled, readOnly, size, layout, errors]
    );

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      if (disabled) {
        e.preventDefault();
        return;
      }
      if (onSubmit) {
        (onSubmit as React.FormEventHandler<HTMLFormElement>)(e);
      }
    };

    return (
      <FormContext.Provider value={contextValue}>
        <form
          ref={ref}
          onSubmit={handleSubmit}
          className={cn("w-full space-y-4", className)}
          {...props}
        >
          {children}
        </form>
      </FormContext.Provider>
    );
  }
);

Form.displayName = "Form";

// --- FormField Context ---
export interface FormFieldContextValue {
  id?: string;
  name?: string;
  errorText?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  size?: "sm" | "default" | "lg";
  layout?: "vertical" | "horizontal";
}

const FormFieldContext = React.createContext<FormFieldContextValue>({});

export const useFormField = () => React.useContext(FormFieldContext);

// --- FormField Component ---
export interface FormFieldProps {
  id?: string;
  name?: string;
  label?: React.ReactNode;
  helperText?: string;
  errorText?: string;
  tooltip?: string;
  required?: boolean;
  optionalText?: string;
  disabled?: boolean;
  size?: "sm" | "default" | "lg";
  layout?: "vertical" | "horizontal";
  className?: string;
  labelClassName?: string;
  contentClassName?: string;
  children: React.ReactNode;
}

export const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  (
    {
      id: customId,
      name,
      label,
      helperText,
      errorText: propErrorText,
      tooltip,
      required = false,
      optionalText,
      disabled: propDisabled,
      size: propSize,
      layout: propLayout,
      className,
      labelClassName,
      contentClassName,
      children,
    },
    ref
  ) => {
    const generatedId = React.useId();
    const fieldId = customId || (name ? `field-${name}` : `field-${generatedId}`);

    const parentForm = useForm();
    const disabled = propDisabled ?? parentForm.disabled ?? false;
    const size = propSize ?? parentForm.size ?? "default";
    const layout = propLayout ?? parentForm.layout ?? "vertical";
    const errorText = propErrorText || (name && parentForm.errors ? parentForm.errors[name] : undefined);

    const contextValue = React.useMemo(
      () => ({
        id: fieldId,
        name,
        errorText,
        helperText,
        required,
        disabled,
        size,
        layout,
      }),
      [fieldId, name, errorText, helperText, required, disabled, size, layout]
    );

    const isHorizontal = layout === "horizontal";

    return (
      <FormFieldContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn(
            "w-full transition-colors duration-150",
            isHorizontal
              ? "flex flex-col sm:flex-row sm:items-start sm:gap-4"
              : "flex flex-col gap-1.5",
            disabled && "opacity-60 cursor-not-allowed",
            className
          )}
        >
          {label && (
            <div
              className={cn(
                "flex items-center gap-1.5 text-sm font-medium text-zinc-900 dark:text-zinc-100",
                isHorizontal && "sm:w-1/3 sm:pt-2 sm:justify-end sm:text-right",
                labelClassName
              )}
            >
              <label htmlFor={fieldId} className="cursor-pointer select-none">
                {label}
              </label>

              {required && (
                <span className="text-red-500 font-semibold" title="Required">
                  *
                </span>
              )}

              {!required && optionalText && (
                <span className="text-xs text-zinc-400 dark:text-zinc-500 font-normal">
                  ({optionalText})
                </span>
              )}

              {tooltip && (
                <div className="group relative inline-flex items-center text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-help">
                  <Info className="h-3.5 w-3.5" />
                  <div className="pointer-events-none absolute bottom-full mb-1 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap z-50">
                    {tooltip}
                  </div>
                </div>
              )}
            </div>
          )}

          <div
            className={cn(
              "flex-1 flex flex-col gap-1.5 min-w-0",
              contentClassName
            )}
          >
            {children}

            <AnimatePresence mode="wait">
              {errorText ? (
                <motion.p
                  key="error"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="text-xs font-medium text-red-500 dark:text-red-400 flex items-center gap-1"
                >
                  <span>{errorText}</span>
                </motion.p>
              ) : helperText ? (
                <motion.p
                  key="helper"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="text-xs text-zinc-500 dark:text-zinc-400"
                >
                  {helperText}
                </motion.p>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </FormFieldContext.Provider>
    );
  }
);

FormField.displayName = "FormField";

export default Form;
