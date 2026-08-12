"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ImageCardProps
  extends Omit<HTMLMotionProps<"div">, "title"> {
  src: string;
  alt?: string;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  badge?: React.ReactNode;
  aspectRatio?: "video" | "square" | "portrait" | "wide";
  variant?: "default" | "bordered" | "glass" | "ios-glass";
  hoverEffect?: "zoom" | "lift" | "glow" | "none";
  className?: string;
}

const aspectMap = {
  video: "aspect-video",
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  wide: "aspect-[21/9]",
};

export const ImageCard = React.forwardRef<HTMLDivElement, ImageCardProps>(
  (
    {
      src,
      alt = "Image card",
      title,
      subtitle,
      badge,
      aspectRatio = "portrait",
      variant = "ios-glass",
      hoverEffect = "zoom",
      className,
      ...props
    },
    ref
  ) => {
    return (
      <motion.div
        ref={ref}
        whileHover={
          hoverEffect === "lift"
            ? { y: -6 }
            : hoverEffect === "zoom"
            ? { scale: 1.02 }
            : undefined
        }
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className={cn(
          "relative overflow-hidden rounded-3xl group select-none cursor-pointer",
          aspectMap[aspectRatio],
          variant === "bordered" && "border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm",
          variant === "glass" && "border border-white/40 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl shadow-md",
          variant === "ios-glass" && "border border-white/60 dark:border-zinc-800/80 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-2xl shadow-lg",
          hoverEffect === "glow" && "hover:shadow-2xl hover:shadow-teal-500/20 transition-shadow duration-300",
          className
        )}
        {...props}
      >
        {/* Base Image */}
        <motion.img
          src={src}
          alt={typeof title === "string" ? title : alt}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Gradient Scrim Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

        {/* Top Badge Slot */}
        {badge && (
          <div className="absolute top-3 right-3 z-10">
            {badge}
          </div>
        )}

        {/* Glassmorphism Bottom Title Overlay */}
        {(title || subtitle) && (
          <div className="absolute bottom-3 left-3 right-3 p-4 rounded-2xl bg-white/20 dark:bg-zinc-900/40 backdrop-blur-xl border border-white/30 dark:border-zinc-800/60 text-white z-10 transform transition-transform duration-300 group-hover:translate-y-[-2px]">
            {title && (
              <h4 className="text-sm font-bold tracking-tight line-clamp-1">
                {title}
              </h4>
            )}
            {subtitle && (
              <p className="text-xs text-zinc-200 dark:text-zinc-300 mt-0.5 line-clamp-1">
                {subtitle}
              </p>
            )}
          </div>
        )}
      </motion.div>
    );
  }
);

ImageCard.displayName = "ImageCard";

export default ImageCard;
