"use client";
/* eslint-disable @next/next/no-img-element */

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ImageStackItem {
  id: string;
  src: string;
  title?: string;
}

export interface ImageStackProps extends React.HTMLAttributes<HTMLDivElement> {
  images: ImageStackItem[];
  max?: number;
  size?: "sm" | "md" | "lg";
  variant?: "circle" | "rounded" | "card";
  className?: string;
}

const sizeConfig = {
  sm: "w-8 h-8",
  md: "w-12 h-12",
  lg: "w-16 h-16",
};

const cardSizeConfig = {
  sm: "w-14 h-18",
  md: "w-20 h-28",
  lg: "w-28 h-36",
};

export const ImageStack = React.forwardRef<HTMLDivElement, ImageStackProps>(
  (
    {
      images = [],
      max = 4,
      size = "md",
      variant = "rounded",
      className,
      ...props
    },
    ref
  ) => {
    const visibleImages = images.slice(0, max);
    const excessCount = Math.max(0, images.length - max);

    const dimensionClass = variant === "card" ? cardSizeConfig[size] : sizeConfig[size];

    return (
      <div
        ref={ref}
        className={cn("inline-flex items-center select-none py-2", className)}
        {...props}
      >
        {visibleImages.map((img, idx) => (
          <motion.div
            key={img.id || idx}
            className={cn("relative group cursor-pointer", dimensionClass)}
            style={{
              marginLeft: idx === 0 ? 0 : variant === "card" ? "-1.5rem" : "-0.75rem",
              zIndex: visibleImages.length - idx,
            }}
            whileHover={{
              y: -8,
              scale: 1.1,
              zIndex: 50,
              transition: { type: "spring", stiffness: 400, damping: 25 },
            }}
          >
            <img
              src={img.src}
              alt={img.title || `Stack item ${idx + 1}`}
              className={cn(
                "w-full h-full object-cover border-2 border-white dark:border-zinc-900 shadow-md transition-shadow",
                variant === "circle" && "rounded-full",
                variant === "rounded" && "rounded-2xl",
                variant === "card" && "rounded-xl"
              )}
            />

            {/* Hover Tooltip */}
            {img.title && (
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded-md bg-zinc-900 text-white text-[10px] font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg z-50">
                {img.title}
              </span>
            )}
          </motion.div>
        ))}

        {/* Excess Counter Badge */}
        {excessCount > 0 && (
          <motion.div
            className={cn(
              "relative flex items-center justify-center border-2 border-white dark:border-zinc-900 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-bold text-xs shadow-md select-none",
              dimensionClass,
              variant === "circle" && "rounded-full",
              variant === "rounded" && "rounded-2xl",
              variant === "card" && "rounded-xl"
            )}
            style={{
              marginLeft: variant === "card" ? "-1.5rem" : "-0.75rem",
              zIndex: 0,
            }}
          >
            +{excessCount}
          </motion.div>
        )}
      </div>
    );
  }
);

ImageStack.displayName = "ImageStack";

export default ImageStack;
