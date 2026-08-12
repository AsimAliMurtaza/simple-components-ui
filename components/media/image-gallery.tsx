"use client";
/* eslint-disable @next/next/no-img-element */

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

export interface GalleryItem {
  id: string;
  src: string;
  title?: string;
  category?: string;
}

export interface ImageGalleryProps extends React.HTMLAttributes<HTMLDivElement> {
  items: GalleryItem[];
  cols?: 2 | 3 | 4;
  gap?: 2 | 3 | 4 | 6;
  aspectRatio?: "square" | "video" | "portrait" | "auto";
  enableLightbox?: boolean;
  className?: string;
}

const colsMap = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
  4: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4",
};

const gapMap = {
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
  6: "gap-6",
};

const aspectMap = {
  square: "aspect-square",
  video: "aspect-video",
  portrait: "aspect-[3/4]",
  auto: "h-60 sm:h-72",
};

export const ImageGallery = React.forwardRef<HTMLDivElement, ImageGalleryProps>(
  (
    {
      items = [],
      cols = 3,
      gap = 4,
      aspectRatio = "portrait",
      enableLightbox = true,
      className,
      ...props
    },
    ref
  ) => {
    const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);

    const handleNext = React.useCallback(() => {
      if (selectedIndex === null) return;
      setSelectedIndex((prev) => (prev! + 1) % items.length);
    }, [selectedIndex, items.length]);

    const handlePrev = React.useCallback(() => {
      if (selectedIndex === null) return;
      setSelectedIndex((prev) => (prev! === 0 ? items.length - 1 : prev! - 1));
    }, [selectedIndex, items.length]);

    React.useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (selectedIndex === null) return;
        if (e.key === "Escape") setSelectedIndex(null);
        if (e.key === "ArrowRight") handleNext();
        if (e.key === "ArrowLeft") handlePrev();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selectedIndex, handleNext, handlePrev]);

    const activeItem = selectedIndex !== null ? items[selectedIndex] : null;

    return (
      <>
        <div
          ref={ref}
          className={cn("grid w-full select-none", colsMap[cols], gapMap[gap], className)}
          {...props}
        >
          {items.map((item, idx) => (
            <motion.div
              key={item.id || idx}
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={() => enableLightbox && setSelectedIndex(idx)}
              className={cn(
                "relative overflow-hidden rounded-3xl group cursor-pointer border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm",
                aspectMap[aspectRatio]
              )}
            >
              <img
                src={item.src}
                alt={item.title || `Gallery item ${idx + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                {item.title && (
                  <h4 className="text-sm font-bold tracking-tight">{item.title}</h4>
                )}
                {item.category && (
                  <span className="text-[10px] text-teal-300 font-mono">{item.category}</span>
                )}
              </div>

              {/* Lightbox Zoom Icon Badge */}
              {enableLightbox && (
                <div className="absolute top-3 right-3 p-1.5 rounded-full bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md">
                  <Maximize2 size={14} />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {activeItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl select-none"
              onClick={() => setSelectedIndex(null)}
            >
              <div
                className="relative max-w-4xl w-full max-h-[85vh] flex flex-col items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setSelectedIndex(null)}
                  className="absolute -top-12 right-0 p-2 text-white/80 hover:text-white transition-colors"
                  aria-label="Close lightbox"
                >
                  <X size={24} />
                </button>

                {/* Main Lightbox Image */}
                <motion.img
                  key={activeItem.id}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  src={activeItem.src}
                  alt={activeItem.title || "Expanded image"}
                  className="max-h-[75vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl border border-white/10"
                />

                {/* Image Title */}
                {activeItem.title && (
                  <p className="mt-3 text-sm text-white/90 font-medium">
                    {activeItem.title}
                  </p>
                )}

                {/* Prev / Next Controls */}
                {items.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="absolute left-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-colors"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-colors"
                      aria-label="Next image"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }
);

ImageGallery.displayName = "ImageGallery";

export default ImageGallery;
