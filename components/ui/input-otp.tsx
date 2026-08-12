"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputOTPProps {
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  variant?: "default" | "bordered" | "glass" | "ios-glass";
  mask?: boolean;
  disabled?: boolean;
  className?: string;
}

export const InputOTP = React.forwardRef<HTMLDivElement, InputOTPProps>(
  (
    {
      length = 6,
      value: propValue,
      onChange,
      onComplete,
      variant = "ios-glass",
      mask = false,
      disabled = false,
      className,
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState("");
    const isControlled = propValue !== undefined;
    const otpValue = isControlled ? propValue : internalValue;

    const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

    const updateValue = (newValue: string) => {
      const sanitized = newValue.slice(0, length);
      if (!isControlled) {
        setInternalValue(sanitized);
      }
      onChange?.(sanitized);
      if (sanitized.length === length) {
        onComplete?.(sanitized);
      }
    };

    const handleInputChange = (
      e: React.ChangeEvent<HTMLInputElement>,
      index: number
    ) => {
      const val = e.target.value;
      if (!val) return;

      const char = val.slice(-1);
      const digits = otpValue.split("");
      digits[index] = char;
      const nextOtp = digits.join("");
      updateValue(nextOtp);

      if (index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    };

    const handleKeyDown = (
      e: React.KeyboardEvent<HTMLInputElement>,
      index: number
    ) => {
      if (e.key === "Backspace") {
        e.preventDefault();
        const digits = otpValue.split("");
        if (digits[index]) {
          digits[index] = "";
          updateValue(digits.join(""));
        } else if (index > 0) {
          digits[index - 1] = "";
          updateValue(digits.join(""));
          inputRefs.current[index - 1]?.focus();
        }
      } else if (e.key === "ArrowLeft" && index > 0) {
        e.preventDefault();
        inputRefs.current[index - 1]?.focus();
      } else if (e.key === "ArrowRight" && index < length - 1) {
        e.preventDefault();
        inputRefs.current[index + 1]?.focus();
      }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pastedData = e.clipboardData.getData("text").trim();
      if (/^\d+$/.test(pastedData)) {
        updateValue(pastedData);
        const nextFocusIndex = Math.min(pastedData.length, length - 1);
        inputRefs.current[nextFocusIndex]?.focus();
      }
    };

    return (
      <div
        ref={ref}
        className={cn("inline-flex items-center gap-2 select-none", className)}
      >
        {Array.from({ length }).map((_, index) => {
          const char = otpValue[index] || "";

          return (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type={mask ? "password" : "text"}
              inputMode="numeric"
              maxLength={1}
              value={char}
              disabled={disabled}
              onChange={(e) => handleInputChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              className={cn(
                "w-10 h-12 sm:w-12 sm:h-14 text-center text-lg sm:text-xl font-bold font-mono transition-all duration-200 focus:outline-none cursor-pointer",
                variant === "default" &&
                  "bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 shadow-sm",
                variant === "bordered" &&
                  "bg-white dark:bg-zinc-950 border-2 border-zinc-300 dark:border-zinc-800 rounded-2xl focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20",
                variant === "glass" &&
                  "bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-white/40 dark:border-zinc-800 rounded-2xl focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 shadow-md text-zinc-900 dark:text-zinc-100",
                variant === "ios-glass" &&
                  "bg-white/40 dark:bg-zinc-900/40 backdrop-blur-2xl border border-white/60 dark:border-zinc-800/80 rounded-2xl focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 shadow-lg text-zinc-900 dark:text-white",
                char && "border-teal-500 dark:border-teal-500 bg-teal-50/20 dark:bg-teal-950/20",
                disabled && "opacity-50 cursor-not-allowed"
              )}
            />
          );
        })}
      </div>
    );
  }
);

InputOTP.displayName = "InputOTP";

export default InputOTP;
