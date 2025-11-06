"use client";

import * as React from "react";
import { Responsive, WidthProvider, Layout } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { cn } from "@/lib/utils";

const ResponsiveGridLayout = WidthProvider(Responsive);

export interface GridProps {
  /** Unique key for localStorage persistence */
  storageKey: string;

  /** Default grid layout if none is saved */
  initialLayout: Layout[];

  /** Function that renders each grid item */
  renderItem: (id: string) => React.ReactNode;

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

  /** Animation variant for item appearance */
  variant?: "default" | "fadeIn" | "scaleIn";
}

/**
 * DraggableResizableGrid — A responsive, persistent, and animated layout component
 * built with react-grid-layout, Tailwind, and Shadcn-style API.
 */
const DraggableResizableGrid: React.FC<GridProps> = ({
  storageKey,
  initialLayout,
  renderItem,
  breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480 },
  cols = { lg: 12, md: 10, sm: 6, xs: 4 },
  className,
  rowHeight = 100,
  margin = [20, 20],
  isDraggable = true,
  isResizable = true,
  variant = "default",
}) => {
  const [layout, setLayout] = React.useState<Layout[]>(initialLayout);

  React.useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setLayout(parsed);
      } catch {
        console.warn("Invalid saved layout, using defaults");
      }
    }
  }, [storageKey]);

  const handleLayoutChange = (newLayout: Layout[]) => {
    setLayout(newLayout);
    localStorage.setItem(storageKey, JSON.stringify(newLayout));
  };

  const variantClasses = {
    default: "",
    fadeIn: "animate-fade-in",
    scaleIn: "animate-scale-in",
  };

  return (
    <div
      className={cn(
        "p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl transition-colors",
        className
      )}
    >
      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: layout }}
        breakpoints={breakpoints}
        cols={cols}
        rowHeight={rowHeight}
        margin={margin}
        isDraggable={isDraggable}
        isResizable={isResizable}
        onLayoutChange={handleLayoutChange}
      >
        {layout.map((item) => (
          <div
            key={item.i}
            className={cn(
              "bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-transform",
              variantClasses[variant]
            )}
          >
            {renderItem(item.i)}
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  );
};

DraggableResizableGrid.displayName = "DraggableResizableGrid";

export { DraggableResizableGrid };
export default DraggableResizableGrid;
