"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useFormField } from "./form";

export interface SliderMark {
  value: number;
  label?: React.ReactNode;
}

export interface SliderProps {
  value?: number | [number, number];
  defaultValue?: number | [number, number];
  min?: number;
  max?: number;
  step?: number;
  onValueChange?: (value: number | [number, number]) => void;
  showValueTooltip?: boolean;
  showValue?: boolean;
  formatTooltip?: (val: number) => string;
  marks?: SliderMark[];
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  color?: "primary" | "success" | "danger" | "warning" | "purple";
  label?: string;
  helperText?: string;
  errorText?: string;
  className?: string;
}

const colorConfig = {
  primary: "bg-teal-600 dark:bg-teal-500",
  success: "bg-emerald-600 dark:bg-emerald-500",
  danger: "bg-red-600 dark:bg-red-500",
  warning: "bg-amber-600 dark:bg-amber-500",
  purple: "bg-purple-600 dark:bg-purple-500",
};

const sizeConfig = {
  sm: { track: "h-1.5", thumb: "w-4 h-4", text: "text-xs" },
  md: { track: "h-2.5", thumb: "w-5 h-5", text: "text-sm" },
  lg: { track: "h-3.5", thumb: "w-6 h-6", text: "text-base" },
};

export const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      value: propValue,
      defaultValue = 0,
      min = 0,
      max = 100,
      step = 1,
      onValueChange,
      showValueTooltip: propShowValueTooltip,
      showValue = true,
      formatTooltip = (v) => `${v}`,
      marks = [],
      disabled: propDisabled,
      size = "md",
      color = "primary",
      label,
      helperText,
      errorText: propErrorText,
      className,
    },
    ref
  ) => {
    const showValueTooltip = propShowValueTooltip ?? showValue;
    const formField = useFormField();
    const disabled = propDisabled ?? formField.disabled ?? false;
    const errorText = propErrorText || formField.errorText;

    const [uncontrolledValue, setUncontrolledValue] = React.useState<
      number | [number, number]
    >(defaultValue);
    const isControlled = propValue !== undefined;
    const currentValue = isControlled ? propValue : uncontrolledValue;

    const isRange = Array.isArray(currentValue);

    const [activeThumb, setActiveThumb] = React.useState<number | null>(null);
    const [isHovered, setIsHovered] = React.useState(false);
    const trackRef = React.useRef<HTMLDivElement>(null);

    const clamp = React.useCallback(
      (val: number) => Math.min(Math.max(val, min), max),
      [min, max]
    );

    const getValueFromPointer = React.useCallback(
      (clientX: number) => {
        if (!trackRef.current) return min;
        const rect = trackRef.current.getBoundingClientRect();
        const percent = (clientX - rect.left) / rect.width;
        const rawVal = min + percent * (max - min);
        const steppedVal = Math.round((rawVal - min) / step) * step + min;
        return clamp(Number(steppedVal.toFixed(4)));
      },
      [min, max, step, clamp]
    );

    const updateValue = (newVal: number, thumbIndex: number = 0) => {
      if (disabled) return;

      if (isRange) {
        const currentArr = currentValue as [number, number];
        const nextArr: [number, number] = [...currentArr];
        if (thumbIndex === 0) {
          nextArr[0] = Math.min(newVal, nextArr[1]);
        } else {
          nextArr[1] = Math.max(newVal, nextArr[0]);
        }
        if (!isControlled) setUncontrolledValue(nextArr);
        onValueChange?.(nextArr);
      } else {
        if (!isControlled) setUncontrolledValue(newVal);
        onValueChange?.(newVal);
      }
    };

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
      if (disabled) return;
      const clickedVal = getValueFromPointer(e.clientX);

      let targetThumbIndex = 0;
      if (isRange) {
        const rangeArr = currentValue as [number, number];
        const dist0 = Math.abs(clickedVal - rangeArr[0]);
        const dist1 = Math.abs(clickedVal - rangeArr[1]);
        targetThumbIndex = dist0 <= dist1 ? 0 : 1;
      }

      setActiveThumb(targetThumbIndex);
      updateValue(clickedVal, targetThumbIndex);

      const handlePointerMove = (moveEv: PointerEvent) => {
        const val = getValueFromPointer(moveEv.clientX);
        updateValue(val, targetThumbIndex);
      };

      const handlePointerUp = () => {
        setActiveThumb(null);
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("pointerup", handlePointerUp);
      };

      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", handlePointerUp);
    };

    // Calculate percents
    const getPercent = (val: number) => ((val - min) / (max - min)) * 100;

    const val0 = isRange ? (currentValue as [number, number])[0] : (currentValue as number);
    const val1 = isRange ? (currentValue as [number, number])[1] : 0;

    const percent0 = getPercent(clamp(val0));
    const percent1 = isRange ? getPercent(clamp(val1)) : 0;

    const trackStart = isRange ? Math.min(percent0, percent1) : 0;
    const trackWidth = isRange ? Math.abs(percent1 - percent0) : percent0;

    const config = sizeConfig[size];

    return (
      <div className="w-full flex flex-col gap-1.5" ref={ref}>
        {label && !formField.id && (
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-zinc-900 dark:text-zinc-100 select-none">
              {label}
            </label>
            <span className="text-xs font-mono font-medium text-zinc-500 dark:text-zinc-400">
              {isRange
                ? `${formatTooltip(val0)} - ${formatTooltip(val1)}`
                : formatTooltip(val0)}
            </span>
          </div>
        )}

        <div
          className={cn(
            "relative w-full flex items-center select-none py-3 cursor-pointer",
            disabled && "opacity-50 cursor-not-allowed",
            className
          )}
          onPointerDown={handlePointerDown}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Background Track */}
          <div
            ref={trackRef}
            className={cn(
              "w-full rounded-full bg-zinc-200 dark:bg-zinc-800 relative overflow-hidden",
              config.track
            )}
          >
            {/* Active Range Highlight */}
            <div
              className={cn("absolute h-full rounded-full transition-all", colorConfig[color])}
              style={{
                left: `${trackStart}%`,
                width: `${trackWidth}%`,
              }}
            />
          </div>

          {/* Marks */}
          {marks.length > 0 && (
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 pointer-events-none">
              {marks.map((m) => {
                const markPercent = getPercent(m.value);
                return (
                  <div
                    key={m.value}
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center"
                    style={{ left: `${markPercent}%` }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500" />
                    {m.label && (
                      <span className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-3 whitespace-nowrap font-mono">
                        {m.label}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Thumb 1 */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 focus:outline-none"
            style={{ left: `${percent0}%` }}
          >
            <motion.div
              className={cn(
                "rounded-full bg-white dark:bg-zinc-900 border-2 border-blue-600 dark:border-blue-500 shadow-md cursor-grab active:cursor-grabbing flex items-center justify-center",
                config.thumb
              )}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 1.25 }}
              animate={{
                scale: activeThumb === 0 ? 1.25 : 1,
              }}
            >
              <AnimatePresence>
                {showValueTooltip && (isHovered || activeThumb === 0) && (
                  <motion.div
                    initial={{ opacity: 0, y: 4, scale: 0.8 }}
                    animate={{ opacity: 1, y: -24, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.8 }}
                    className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 text-[10px] font-mono px-2 py-0.5 rounded shadow-lg whitespace-nowrap"
                  >
                    {formatTooltip(val0)}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Thumb 2 (if range) */}
          {isRange && (
            <div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 focus:outline-none"
              style={{ left: `${percent1}%` }}
            >
              <motion.div
                className={cn(
                  "rounded-full bg-white dark:bg-zinc-900 border-2 border-blue-600 dark:border-blue-500 shadow-md cursor-grab active:cursor-grabbing flex items-center justify-center",
                  config.thumb
                )}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 1.25 }}
                animate={{
                  scale: activeThumb === 1 ? 1.25 : 1,
                }}
              >
                <AnimatePresence>
                  {showValueTooltip && (isHovered || activeThumb === 1) && (
                    <motion.div
                      initial={{ opacity: 0, y: 4, scale: 0.8 }}
                      animate={{ opacity: 1, y: -24, scale: 1 }}
                      exit={{ opacity: 0, y: -24, scale: 1 }}
                      className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 text-[10px] font-mono px-2 py-0.5 rounded shadow-lg whitespace-nowrap"
                    >
                      {formatTooltip(val1)}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
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

Slider.displayName = "Slider";

export default Slider;
