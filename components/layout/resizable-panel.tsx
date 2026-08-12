"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, GripVertical } from "lucide-react";

export interface ResizablePanelProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultWidth?: number; // width in px
  minWidth?: number;
  maxWidth?: number;
  side?: "left" | "right";
  collapsible?: boolean;
  variant?: "default" | "bordered" | "glass" | "ios-glass";
}

export const ResizablePanel = React.forwardRef<HTMLDivElement, ResizablePanelProps>(
  (
    {
      defaultWidth = 260,
      minWidth = 160,
      maxWidth = 480,
      side = "left",
      collapsible = true,
      variant = "bordered",
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [width, setWidth] = React.useState(defaultWidth);
    const [collapsed, setCollapsed] = React.useState(false);
    const [isDragging, setIsDragging] = React.useState(false);
    const panelRef = React.useRef<HTMLDivElement>(null);

    const handleMouseDown = (e: React.MouseEvent) => {
      e.preventDefault();
      if (collapsed) return;
      setIsDragging(true);
    };

    React.useEffect(() => {
      if (!isDragging) return;

      const handleMouseMove = (e: MouseEvent) => {
        if (!panelRef.current) return;
        const rect = panelRef.current.getBoundingClientRect();

        let newWidth = defaultWidth;
        if (side === "left") {
          newWidth = e.clientX - rect.left;
        } else {
          newWidth = rect.right - e.clientX;
        }

        newWidth = Math.max(minWidth, Math.min(maxWidth, newWidth));
        setWidth(newWidth);
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
    }, [isDragging, side, minWidth, maxWidth, defaultWidth]);

    const variantStyles = {
      default: "bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800",
      bordered: "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 border shadow-sm rounded-3xl",
      glass: "bg-white/70 dark:bg-zinc-900/70 border-white/40 dark:border-zinc-800 border backdrop-blur-xl rounded-3xl shadow-lg",
      "ios-glass": "bg-white/40 dark:bg-zinc-900/40 border-white/50 dark:border-zinc-800/80 border backdrop-blur-2xl rounded-3xl shadow-xl",
    };

    return (
      <div
        ref={ref || panelRef}
        style={{ width: collapsed ? "48px" : `${width}px` }}
        className={cn(
          "relative flex flex-col transition-[width] duration-200 ease-out select-none shrink-0",
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {/* Panel Content */}
        <div className="flex-1 overflow-auto p-4 min-w-0">
          {!collapsed && children}
        </div>

        {/* Resizer Handle Bar */}
        {!collapsed && (
          <div
            onMouseDown={handleMouseDown}
            className={cn(
              "absolute top-0 bottom-0 w-2 flex items-center justify-center cursor-col-resize hover:bg-teal-500/30 transition-colors z-20 group",
              side === "left" ? "-right-1" : "-left-1",
              isDragging && "bg-teal-500/50"
            )}
          >
            <div className="p-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity">
              <GripVertical size={10} />
            </div>
          </div>
        )}

        {/* Collapse Button */}
        {collapsible && (
          <button
            type="button"
            onClick={() => setCollapsed((prev) => !prev)}
            className={cn(
              "absolute top-4 z-30 p-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors shadow-sm cursor-pointer",
              side === "left" ? "-right-3.5" : "-left-3.5"
            )}
            title={collapsed ? "Expand panel" : "Collapse panel"}
          >
            {side === "left" ? (
              collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />
            ) : (
              collapsed ? <ChevronLeft size={14} /> : <ChevronRight size={14} />
            )}
          </button>
        )}
      </div>
    );
  }
);

ResizablePanel.displayName = "ResizablePanel";
