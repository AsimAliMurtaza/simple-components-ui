"use client";

import * as React from "react";
import { Responsive, WidthProvider, Layout } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { cn } from "@/lib/utils";
import { GripVertical, RotateCcw } from "lucide-react";

const ResponsiveGridLayout = WidthProvider(Responsive);

export interface GridItemConfig extends Layout {
  title?: string;
  icon?: React.ReactNode;
}

export interface GridProps {
  /** Unique key for localStorage persistence */
  storageKey: string;

  /** Default grid layout if none is saved */
  initialLayout: Layout[];

  /** Function that renders each grid item */
  renderItem: (id: string) => React.ReactNode;

  /** Optional item titles map or renderer */
  getItemTitle?: (id: string) => { title?: string; icon?: React.ReactNode };

  /** Optional: Responsive breakpoints */
  breakpoints?: Record<string, number>;

  /** Optional: Columns per breakpoint */
  cols?: Record<string, number>;

  /** Optional: Custom className */
  className?: string;

  /** Optional: Grid row height */
  rowHeight?: number;

  /** Optional: Spacing between items [x, y] */
  margin?: [number, number];

  /** Disable dragging/resizing if needed */
  isDraggable?: boolean;
  isResizable?: boolean;

  /** Custom drag handle CSS class */
  draggableHandle?: string;

  /** Show layout reset button header */
  showReset?: boolean;

  /** Card visual variant */
  variant?: "default" | "bordered" | "glass" | "ios-glass";
}

const variantStyles = {
  default:
    "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-lg",
  bordered:
    "bg-white dark:bg-zinc-950 border-2 border-zinc-300 dark:border-zinc-800 shadow-md",
  glass:
    "bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-white/40 dark:border-zinc-800/80 shadow-xl",
  "ios-glass":
    "bg-white/40 dark:bg-zinc-900/40 backdrop-blur-2xl border border-white/60 dark:border-zinc-800/80 shadow-xl shadow-black/5",
};

/**
 * DraggableResizableGrid — A responsive, persistent, and animated layout component
 * built with react-grid-layout, Tailwind, and drag handle controls.
 */
export const DraggableResizableGrid: React.FC<GridProps> = ({
  storageKey,
  initialLayout,
  renderItem,
  getItemTitle,
  breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480 },
  cols = { lg: 12, md: 10, sm: 6, xs: 4 },
  className,
  rowHeight = 80,
  margin = [16, 16],
  isDraggable = true,
  isResizable = true,
  draggableHandle = ".grid-drag-handle",
  showReset = true,
  variant = "ios-glass",
}) => {
  const [layout, setLayout] = React.useState<Layout[]>(initialLayout);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setLayout(parsed);
        }
      } catch {
        console.warn("Invalid saved layout, using defaults");
      }
    }
  }, [storageKey]);

  const handleLayoutChange = (newLayout: Layout[]) => {
    setLayout(newLayout);
    if (mounted) {
      localStorage.setItem(storageKey, JSON.stringify(newLayout));
    }
  };

  const handleReset = () => {
    setLayout(initialLayout);
    localStorage.removeItem(storageKey);
  };

  if (!mounted) {
    return (
      <div className={cn("w-full min-h-[300px] flex items-center justify-center p-8 rounded-3xl bg-zinc-100/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800", className)}>
        <div className="flex items-center gap-2 text-sm text-zinc-500 font-medium">
          Loading layout...
        </div>
      </div>
    );
  }

  return (
    <div className={cn("w-full space-y-4", className)}>
      {showReset && (
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Draggable Dashboard Workspace
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-mono">
              Drag & Resize Enabled
            </span>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 px-2.5 py-1 rounded-lg hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 transition-colors"
          >
            <RotateCcw size={13} />
            Reset Layout
          </button>
        </div>
      )}

      <div className="w-full rounded-3xl p-2 sm:p-4 bg-zinc-100/60 dark:bg-zinc-950/60 border border-zinc-200/80 dark:border-zinc-800/80 transition-colors">
        <ResponsiveGridLayout
          className="layout"
          layouts={{ lg: layout }}
          breakpoints={breakpoints}
          cols={cols}
          rowHeight={rowHeight}
          margin={margin}
          isDraggable={isDraggable}
          isResizable={isResizable}
          draggableHandle={draggableHandle}
          onLayoutChange={handleLayoutChange}
        >
          {layout.map((item) => {
            const meta = getItemTitle?.(item.i);
            return (
              <div
                key={item.i}
                className={cn(
                  "flex flex-col rounded-2xl overflow-hidden transition-all duration-200 group relative",
                  variantStyles[variant]
                )}
              >
                {/* Header Drag Bar */}
                {isDraggable && (
                  <div className="grid-drag-handle flex items-center justify-between px-3 py-2 border-b border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/50 cursor-grab active:cursor-grabbing select-none shrink-0">
                    <div className="flex items-center gap-2 min-w-0">
                      {meta?.icon && <span className="text-blue-500 shrink-0">{meta.icon}</span>}
                      <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 truncate">
                        {meta?.title || `Widget ${item.i}`}
                      </span>
                    </div>

                    <div className="text-zinc-400 dark:text-zinc-600 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors">
                      <GripVertical size={15} />
                    </div>
                  </div>
                )}

                {/* Widget Card Body */}
                <div className="flex-1 p-4 overflow-auto min-h-0">
                  {renderItem(item.i)}
                </div>
              </div>
            );
          })}
        </ResponsiveGridLayout>
      </div>
    </div>
  );
};

DraggableResizableGrid.displayName = "DraggableResizableGrid";

export default DraggableResizableGrid;
