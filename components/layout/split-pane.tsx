"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { GripVertical, GripHorizontal } from "lucide-react";

export interface SplitPaneProps extends React.HTMLAttributes<HTMLDivElement> {
  left: React.ReactNode;
  right: React.ReactNode;
  orientation?: "horizontal" | "vertical";
  defaultSplit?: number; // percentage 10..90
  minSplit?: number;
  maxSplit?: number;
  variant?: "default" | "bordered" | "glass" | "ios-glass";
}

export const SplitPane = React.forwardRef<HTMLDivElement, SplitPaneProps>(
  (
    {
      left,
      right,
      orientation = "horizontal",
      defaultSplit = 50,
      minSplit = 15,
      maxSplit = 85,
      variant = "bordered",
      className,
      ...props
    },
    ref
  ) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [split, setSplit] = React.useState(defaultSplit);
    const [isDragging, setIsDragging] = React.useState(false);

    const isHorizontal = orientation === "horizontal";

    const handleMouseDown = (e: React.MouseEvent) => {
      e.preventDefault();
      setIsDragging(true);
    };

    React.useEffect(() => {
      if (!isDragging) return;

      const handleMouseMove = (e: MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();

        let newSplit = 50;
        if (isHorizontal) {
          const offsetX = e.clientX - rect.left;
          newSplit = (offsetX / rect.width) * 100;
        } else {
          const offsetY = e.clientY - rect.top;
          newSplit = (offsetY / rect.height) * 100;
        }

        newSplit = Math.max(minSplit, Math.min(maxSplit, newSplit));
        setSplit(newSplit);
      };

      const handleMouseUp = () => {
        setIsDragging(false);
      };

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }, [isDragging, isHorizontal, minSplit, maxSplit]);

    const variantStyles = {
      default: "bg-white dark:bg-zinc-950",
      bordered: "border border-zinc-200 dark:border-zinc-800 rounded-3xl bg-white dark:bg-zinc-900 shadow-sm overflow-hidden",
      glass: "border border-white/40 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl rounded-3xl shadow-lg overflow-hidden",
      "ios-glass": "border border-white/50 dark:border-zinc-800/80 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-2xl rounded-3xl shadow-xl overflow-hidden",
    };

    return (
      <div
        ref={ref || containerRef}
        className={cn(
          "relative flex select-none w-full min-h-[300px]",
          isHorizontal ? "flex-row" : "flex-col",
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {/* Left / Top Pane */}
        <div
          style={isHorizontal ? { width: `${split}%` } : { height: `${split}%` }}
          className="overflow-auto min-w-0 min-h-0"
        >
          {left}
        </div>

        {/* Drag Handle Divider */}
        <div
          onMouseDown={handleMouseDown}
          className={cn(
            "relative z-10 flex items-center justify-center bg-zinc-200/80 dark:bg-zinc-800/80 hover:bg-teal-500 dark:hover:bg-teal-600 transition-colors shrink-0 group cursor-col-resize",
            isHorizontal
              ? "w-2.5 cursor-col-resize h-full border-x border-zinc-300/40 dark:border-zinc-700/40"
              : "h-2.5 cursor-row-resize w-full border-y border-zinc-300/40 dark:border-zinc-700/40",
            isDragging && "bg-teal-600 dark:bg-teal-500 text-white"
          )}
        >
          <div className="text-zinc-400 group-hover:text-white transition-colors">
            {isHorizontal ? <GripVertical size={12} /> : <GripHorizontal size={12} />}
          </div>
        </div>

        {/* Right / Bottom Pane */}
        <div
          style={
            isHorizontal
              ? { width: `${100 - split}%` }
              : { height: `${100 - split}%` }
          }
          className="overflow-auto min-w-0 min-h-0 flex-1"
        >
          {right}
        </div>
      </div>
    );
  }
);

SplitPane.displayName = "SplitPane";
