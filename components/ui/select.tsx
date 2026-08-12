"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronDown, Check, X, Search } from "lucide-react";
import { useFormField } from "./form";

export interface SelectOption {
  value: string;
  label: React.ReactNode;
  description?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface SelectProps {
  options?: SelectOption[];
  value?: string | string[];
  defaultValue?: string | string[];
  onChange?: (value: string | string[]) => void;
  placeholder?: string;
  searchable?: boolean;
  clearable?: boolean;
  multiple?: boolean;
  disabled?: boolean;
  errorText?: string;
  helperText?: string;
  label?: string;
  variant?: "default" | "bordered" | "glass" | "ghost" | "ios-glass";
  size?: "sm" | "default" | "lg";
  className?: string;
}

const variantStyles = {
  default:
    "bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-lg shadow-sm focus:border-teal-500 dark:focus:border-teal-400 focus:ring-2 focus:ring-teal-500/20",
  bordered:
    "bg-white dark:bg-zinc-950 border-2 border-zinc-300 dark:border-zinc-800 rounded-xl focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20",
  glass:
    "bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-white/40 dark:border-zinc-800 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 shadow-md",
  ghost:
    "bg-transparent border-none hover:bg-zinc-100 dark:hover:bg-zinc-800/50 rounded-lg",
  "ios-glass":
    "bg-white/40 dark:bg-zinc-900/40 backdrop-blur-2xl border border-white/60 dark:border-zinc-800/80 rounded-xl text-zinc-900 dark:text-white shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20",
};

const sizeStyles = {
  sm: "h-8 text-xs px-2.5",
  default: "h-10 text-sm px-3.5",
  lg: "h-12 text-base px-4",
};

export const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      options = [],
      value: propValue,
      defaultValue,
      onChange,
      placeholder = "Select an option...",
      searchable = false,
      clearable = false,
      multiple = false,
      disabled: propDisabled,
      errorText: propErrorText,
      helperText,
      label,
      variant = "default",
      size: propSize,
      className,
    },
    ref
  ) => {
    const formField = useFormField();
    const disabled = propDisabled ?? formField.disabled ?? false;
    const errorText = propErrorText || formField.errorText;
    const size = propSize || formField.size || "default";

    const [isOpen, setIsOpen] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState("");
    const [uncontrolledValue, setUncontrolledValue] = React.useState<string | string[]>(
      defaultValue ?? (multiple ? [] : "")
    );

    const isControlled = propValue !== undefined;
    const currentValue = isControlled ? propValue : uncontrolledValue;

    const containerRef = React.useRef<HTMLDivElement>(null);
    React.useImperativeHandle(ref, () => containerRef.current!);

    // Handle outside click
    React.useEffect(() => {
      const handleOutsideClick = (e: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(e.target as Node)
        ) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleOutsideClick);
      return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, []);

    // Filter options
    const filteredOptions = React.useMemo(() => {
      if (!searchQuery) return options;
      return options.filter((opt) => {
        const labelText = typeof opt.label === "string" ? opt.label : opt.value;
        return labelText.toLowerCase().includes(searchQuery.toLowerCase());
      });
    }, [options, searchQuery]);

    const handleSelectOption = (optionValue: string) => {
      if (disabled) return;

      if (multiple) {
        const currentArr = Array.isArray(currentValue) ? currentValue : [];
        const nextArr = currentArr.includes(optionValue)
          ? currentArr.filter((v) => v !== optionValue)
          : [...currentArr, optionValue];
        if (!isControlled) setUncontrolledValue(nextArr);
        onChange?.(nextArr);
      } else {
        if (!isControlled) setUncontrolledValue(optionValue);
        onChange?.(optionValue);
        setIsOpen(false);
      }
    };

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      const emptyVal = multiple ? [] : "";
      if (!isControlled) setUncontrolledValue(emptyVal);
      onChange?.(emptyVal);
    };

    const isSelected = (optValue: string) => {
      if (multiple && Array.isArray(currentValue)) {
        return currentValue.includes(optValue);
      }
      return currentValue === optValue;
    };

    const renderDisplayValue = () => {
      if (multiple && Array.isArray(currentValue) && currentValue.length > 0) {
        return (
          <div className="flex flex-wrap gap-1 items-center max-w-full overflow-hidden">
            {currentValue.map((val) => {
              const opt = options.find((o) => o.value === val);
              return (
                <span
                  key={val}
                  className="inline-flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs px-2 py-0.5 rounded"
                >
                  {opt ? opt.label : val}
                  <X
                    size={12}
                    className="cursor-pointer hover:text-red-500"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectOption(val);
                    }}
                  />
                </span>
              );
            })}
          </div>
        );
      }

      if (!multiple && currentValue) {
        const opt = options.find((o) => o.value === currentValue);
        if (opt) {
          return (
            <span className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
              {opt.icon && <span>{opt.icon}</span>}
              <span>{opt.label}</span>
            </span>
          );
        }
      }

      return (
        <span className="text-zinc-400 dark:text-zinc-500">{placeholder}</span>
      );
    };

    const hasValue = multiple
      ? Array.isArray(currentValue) && currentValue.length > 0
      : Boolean(currentValue);

    return (
      <div className="w-full flex flex-col gap-1 relative" ref={containerRef}>
        {label && !formField.id && (
          <label className="text-sm font-medium text-zinc-900 dark:text-zinc-100 select-none">
            {label}
          </label>
        )}

        <div
          tabIndex={disabled ? -1 : 0}
          onClick={() => !disabled && setIsOpen((prev) => !prev)}
          onKeyDown={(e) => {
            if (disabled) return;
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setIsOpen((prev) => !prev);
            } else if (e.key === "Escape") {
              setIsOpen(false);
            }
          }}
          className={cn(
            "flex items-center justify-between cursor-pointer select-none transition-all duration-200 relative",
            variantStyles[variant],
            sizeStyles[size],
            errorText && "!border-red-500 dark:!border-red-500",
            disabled && "opacity-50 cursor-not-allowed bg-zinc-100 dark:bg-zinc-900/50",
            className
          )}
        >
          <div className="flex-1 min-w-0 pr-2">{renderDisplayValue()}</div>

          <div className="flex items-center gap-1.5 shrink-0 text-zinc-400 dark:text-zinc-500">
            {clearable && hasValue && !disabled && (
              <button
                type="button"
                tabIndex={-1}
                onClick={handleClear}
                className="hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
              >
                <X size={14} />
              </button>
            )}
            <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
              <ChevronDown size={16} />
            </motion.div>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 4, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.15 }}
              className="absolute left-0 right-0 top-full z-50 mt-1 max-h-60 overflow-auto rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xl p-1 text-sm"
            >
              {searchable && (
                <div className="p-1.5 border-b border-zinc-100 dark:border-zinc-800 mb-1 sticky top-0 bg-white dark:bg-zinc-900">
                  <div className="flex items-center gap-2 px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-md">
                    <Search size={14} className="text-zinc-400" />
                    <input
                      type="text"
                      placeholder="Search options..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                      className="w-full bg-transparent text-xs text-zinc-900 dark:text-zinc-100 outline-none placeholder:text-zinc-400"
                    />
                  </div>
                </div>
              )}

              {filteredOptions.length === 0 ? (
                <div className="p-3 text-center text-xs text-zinc-400">
                  No options found
                </div>
              ) : (
                filteredOptions.map((opt) => {
                  const selected = isSelected(opt.value);
                  return (
                    <div
                      key={opt.value}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!opt.disabled) handleSelectOption(opt.value);
                      }}
                      className={cn(
                        "flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-colors text-zinc-900 dark:text-zinc-100",
                        selected
                          ? "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-medium"
                          : "hover:bg-zinc-100 dark:hover:bg-zinc-800/60",
                        opt.disabled && "opacity-40 cursor-not-allowed"
                      )}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        {opt.icon && <span className="shrink-0">{opt.icon}</span>}
                        <div className="flex flex-col">
                          <span>{opt.label}</span>
                          {opt.description && (
                            <span className="text-xs text-zinc-400 dark:text-zinc-500">
                              {opt.description}
                            </span>
                          )}
                        </div>
                      </div>

                      {selected && <Check size={16} className="shrink-0 text-blue-600 dark:text-blue-400" />}
                    </div>
                  );
                })
              )}
            </motion.div>
          )}
        </AnimatePresence>

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

Select.displayName = "Select";

// Helper sub-components for compound pattern
export const SelectTrigger = Select;
export const SelectValue = ({ children }: { children?: React.ReactNode }) => <>{children}</>;
export const SelectContent = ({ children }: { children?: React.ReactNode }) => <>{children}</>;
export const SelectItem = ({ children }: { children?: React.ReactNode }) => <>{children}</>;

export default Select;
