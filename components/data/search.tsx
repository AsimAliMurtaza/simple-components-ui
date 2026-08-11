"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Search as SearchIcon, X, Loader2 } from "lucide-react";

export interface SearchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "onChange"> {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onDebouncedChange?: (value: string) => void;
  debounceTime?: number; // ms
  loading?: boolean;
  clearable?: boolean;
  shortcut?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "bordered" | "glass" | "ios-glass";
  className?: string;
}

const variantStyles = {
  default: "bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 focus-within:border-blue-500 shadow-sm",
  bordered: "bg-white dark:bg-zinc-950 border-2 border-zinc-300 dark:border-zinc-800 focus-within:border-blue-600 shadow-sm",
  glass: "bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-white/40 dark:border-zinc-800/80 focus-within:border-blue-400 shadow-lg",
  "ios-glass": "bg-white/40 dark:bg-zinc-900/40 backdrop-blur-2xl border border-white/60 dark:border-zinc-800/80 focus-within:border-blue-500 shadow-lg shadow-black/5",
};

const sizeStyles = {
  sm: "h-8 text-xs px-2.5 rounded-lg",
  md: "h-10 text-sm px-3.5 rounded-xl",
  lg: "h-12 text-base px-4 rounded-2xl",
};

export const Search = React.forwardRef<HTMLInputElement, SearchProps>(
  (
    {
      value: propValue,
      defaultValue = "",
      onChange,
      onDebouncedChange,
      debounceTime = 300,
      loading = false,
      clearable = true,
      shortcut = "⌘K",
      size = "md",
      variant = "ios-glass",
      placeholder = "Search...",
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
    const isControlled = propValue !== undefined;
    const currentValue = isControlled ? propValue : uncontrolledValue;

    const timerRef = React.useRef<NodeJS.Timeout | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      if (!isControlled) setUncontrolledValue(val);
      onChange?.(val);

      if (onDebouncedChange) {
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
          onDebouncedChange(val);
        }, debounceTime);
      }
    };

    const handleClear = () => {
      if (!isControlled) setUncontrolledValue("");
      onChange?.("");
      onDebouncedChange?.("");
    };

    return (
      <div
        className={cn(
          "relative flex items-center w-full transition-all duration-200 select-none",
          variantStyles[variant],
          sizeStyles[size],
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
      >
        <div className="mr-2 text-zinc-400 dark:text-zinc-500 shrink-0">
          {loading ? (
            <Loader2 size={16} className="animate-spin text-blue-500" />
          ) : (
            <SearchIcon size={16} />
          )}
        </div>

        <input
          ref={ref}
          type="text"
          value={currentValue}
          onChange={handleChange}
          disabled={disabled}
          placeholder={placeholder}
          className="w-full h-full bg-transparent outline-none border-none text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
          {...props}
        />

        <div className="flex items-center gap-1.5 ml-2 shrink-0">
          {clearable && Boolean(currentValue) && !disabled && (
            <button
              type="button"
              onClick={handleClear}
              className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
            >
              <X size={14} />
            </button>
          )}

          {shortcut && !currentValue && (
            <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-zinc-200/60 dark:bg-zinc-800/60 text-zinc-500 dark:text-zinc-400 pointer-events-none">
              {shortcut}
            </span>
          )}
        </div>
      </div>
    );
  }
);

Search.displayName = "Search";

export default Search;
