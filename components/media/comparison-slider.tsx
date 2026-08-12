"use client";
/* eslint-disable @next/next/no-img-element */

import * as React from "react";
import { cn } from "@/lib/utils";
import { GripVertical } from "lucide-react";

export interface ComparisonSliderProps extends React.HTMLAttributes<HTMLDivElement> {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  defaultPosition?: number;
  variant?: "default" | "bordered" | "glass" | "ios-glass";
  aspectRatio?: "video" | "square" | "wide" | "auto";
  className?: string;
}

const aspectMap = {
  video: "aspect-video",
  square: "aspect-square",
  wide: "aspect-[21/9]",
  auto: "h-64 sm:h-80 md:h-96",
};

export const ComparisonSlider = React.forwardRef<HTMLDivElement, ComparisonSliderProps>(
  (
    {
      beforeImage,
      afterImage,
      beforeLabel = "Before",
      afterLabel = "After",
      defaultPosition = 50,
      variant = "ios-glass",
      aspectRatio = "video",
      className,
      ...props
    },
    ref
  ) => {
    const [sliderPos, setSliderPos] = React.useState(defaultPosition);
    const [isDragging, setIsDragging] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement>(null);

    const handleMove = React.useCallback(
      (clientX: number) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        let percentage = (x / rect.width) * 100;
        if (percentage < 0) percentage = 0;
        if (percentage > 100) percentage = 100;
        setSliderPos(percentage);
      },
      []
    );

    const handleMouseDown = () => setIsDragging(true);
    const handleMouseUp = () => setIsDragging(false);

    const handleMouseMove = React.useCallback(
      (e: MouseEvent) => {
        if (!isDragging) return;
        handleMove(e.clientX);
      },
      [isDragging, handleMove]
    );

    const handleTouchMove = React.useCallback(
      (e: TouchEvent) => {
        if (!isDragging) return;
        if (e.touches[0]) {
          handleMove(e.touches[0].clientX);
        }
      },
      [isDragging, handleMove]
    );

    React.useEffect(() => {
      if (isDragging) {
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
        window.addEventListener("touchmove", handleTouchMove);
        window.addEventListener("touchend", handleMouseUp);
      }
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
        window.removeEventListener("touchmove", handleTouchMove);
        window.removeEventListener("touchend", handleMouseUp);
      };
    }, [isDragging, handleMouseMove, handleTouchMove]);

    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden rounded-3xl w-full select-none cursor-ew-resize",
          aspectMap[aspectRatio],
          variant === "bordered" && "border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm",
          variant === "glass" && "border border-white/40 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl shadow-md",
          variant === "ios-glass" && "border border-white/60 dark:border-zinc-800/80 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-2xl shadow-lg",
          className
        )}
        {...props}
      >
        <div ref={containerRef} className="relative w-full h-full">
          {/* After Image (Background) */}
          <img
            src={afterImage}
            alt={afterLabel}
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* After Label Badge */}
          {afterLabel && (
            <span className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full bg-black/40 text-white text-[11px] font-semibold backdrop-blur-md border border-white/20">
              {afterLabel}
            </span>
          )}

          {/* Before Image (Clipped Foreground) */}
          <div
            className="absolute top-0 bottom-0 left-0 overflow-hidden"
            style={{ width: `${sliderPos}%` }}
          >
            <img
              src={beforeImage}
              alt={beforeLabel}
              className="absolute top-0 bottom-0 left-0 h-full max-w-none object-cover"
              style={{ width: containerRef.current?.clientWidth || "100%" }}
            />
          </div>

          {/* Before Label Badge */}
          {beforeLabel && (
            <span className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full bg-black/40 text-white text-[11px] font-semibold backdrop-blur-md border border-white/20">
              {beforeLabel}
            </span>
          )}

          {/* Draggable Divider Handle */}
          <div
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
            className="absolute top-0 bottom-0 z-20 flex items-center justify-center -ml-3 w-6 cursor-ew-resize group"
            style={{ left: `${sliderPos}%` }}
          >
            {/* Vertical Line */}
            <div className="absolute inset-y-0 w-0.5 bg-white shadow-lg" />

            {/* Handle Button */}
            <div className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-white/80 dark:border-zinc-700 text-zinc-900 dark:text-white shadow-xl group-hover:scale-110 transition-transform">
              <GripVertical size={16} />
            </div>
          </div>
        </div>
      </div>
    );
  }
);

ComparisonSlider.displayName = "ComparisonSlider";

export default ComparisonSlider;
