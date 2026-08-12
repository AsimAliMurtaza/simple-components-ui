"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export interface TagInputProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  tags?: string[];
  defaultTags?: string[];
  onChange?: (tags: string[]) => void;
  placeholder?: string;
  maxTags?: number;
  variant?: "default" | "bordered" | "glass" | "ios-glass";
  disabled?: boolean;
  className?: string;
}

export const TagInput = React.forwardRef<HTMLDivElement, TagInputProps>(
  (
    {
      tags: propTags,
      defaultTags = [],
      onChange,
      placeholder = "Add a tag...",
      maxTags = 10,
      variant = "ios-glass",
      disabled = false,
      className,
      ...props
    },
    ref
  ) => {
    const [internalTags, setInternalTags] = React.useState<string[]>(defaultTags);
    const [inputValue, setInputValue] = React.useState("");

    const isControlled = propTags !== undefined;
    const currentTags = isControlled ? propTags : internalTags;

    const inputRef = React.useRef<HTMLInputElement>(null);

    const updateTags = (newTags: string[]) => {
      if (!isControlled) {
        setInternalTags(newTags);
      }
      onChange?.(newTags);
    };

    const addTag = (tagText: string) => {
      const trimmed = tagText.trim();
      if (!trimmed || currentTags.includes(trimmed) || currentTags.length >= maxTags) return;
      updateTags([...currentTags, trimmed]);
      setInputValue("");
    };

    const removeTag = (tagToRemove: string) => {
      if (disabled) return;
      updateTags(currentTags.filter((t) => t !== tagToRemove));
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" || e.key === ",") {
        e.preventDefault();
        addTag(inputValue);
      } else if (e.key === "Backspace" && !inputValue && currentTags.length > 0) {
        removeTag(currentTags[currentTags.length - 1]);
      }
    };

    return (
      <div
        ref={ref}
        onClick={() => inputRef.current?.focus()}
        className={cn(
          "flex flex-wrap items-center gap-1.5 p-2 rounded-2xl cursor-text transition-all duration-200 min-h-[44px]",
          variant === "default" &&
            "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-500/20",
          variant === "bordered" &&
            "bg-white dark:bg-zinc-950 border-2 border-zinc-300 dark:border-zinc-800 rounded-2xl focus-within:border-teal-600 focus-within:ring-2 focus-within:ring-teal-500/20",
          variant === "glass" &&
            "bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-white/40 dark:border-zinc-800 rounded-2xl focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-500/20 shadow-md",
          variant === "ios-glass" &&
            "bg-white/40 dark:bg-zinc-900/40 backdrop-blur-2xl border border-white/60 dark:border-zinc-800/80 rounded-2xl focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-500/20 shadow-lg text-zinc-900 dark:text-white",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        {...props}
      >
        {currentTags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-teal-100 dark:bg-teal-950/80 text-teal-900 dark:text-teal-200 text-xs font-semibold select-none shadow-sm"
          >
            <span>{tag}</span>
            {!disabled && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeTag(tag);
                }}
                className="p-0.5 rounded-full hover:bg-teal-200 dark:hover:bg-teal-900 transition-colors text-teal-700 dark:text-teal-300"
              >
                <X size={12} />
              </button>
            )}
          </span>
        ))}

        {currentTags.length < maxTags && (
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            disabled={disabled}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={() => addTag(inputValue)}
            placeholder={currentTags.length === 0 ? placeholder : ""}
            className="flex-1 min-w-[120px] bg-transparent text-xs font-medium text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none py-1 px-1"
          />
        )}
      </div>
    );
  }
);

TagInput.displayName = "TagInput";

export default TagInput;
