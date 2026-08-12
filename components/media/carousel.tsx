"use client";
/* eslint-disable @next/next/no-img-element */

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface CarouselSlide {
  id: string;
  image?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  content?: React.ReactNode;
}

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  slides: CarouselSlide[];
  autoPlay?: boolean;
  interval?: number;
  showIndicators?: boolean;
  showControls?: boolean;
  loop?: boolean;
  variant?: "default" | "card" | "glass" | "ios-glass";
  aspectRatio?: "video" | "square" | "wide" | "auto";
  className?: string;
}

const aspectClasses = {
  video: "aspect-video",
  square: "aspect-square",
  wide: "aspect-[21/9]",
  auto: "h-64 sm:h-80 md:h-96",
};

export const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      slides = [],
      autoPlay = false,
      interval = 4000,
      showIndicators = true,
      showControls = true,
      loop = true,
      variant = "ios-glass",
      aspectRatio = "video",
      className,
      ...props
    },
    ref
  ) => {
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [direction, setDirection] = React.useState<number>(1);
    const [isHovered, setIsHovered] = React.useState(false);

    const totalSlides = slides.length;

    const paginate = React.useCallback(
      (newDirection: number) => {
        setDirection(newDirection);
        if (newDirection === 1) {
          setCurrentIndex((prev) =>
            prev === totalSlides - 1 ? (loop ? 0 : prev) : prev + 1
          );
        } else {
          setCurrentIndex((prev) =>
            prev === 0 ? (loop ? totalSlides - 1 : 0) : prev - 1
          );
        }
      },
      [totalSlides, loop]
    );

    React.useEffect(() => {
      if (!autoPlay || isHovered || totalSlides <= 1) return;

      const timer = setInterval(() => {
        paginate(1);
      }, interval);

      return () => clearInterval(timer);
    }, [autoPlay, isHovered, totalSlides, interval, paginate]);

    if (totalSlides === 0) return null;

    const slideVariants = {
      enter: (dir: number) => ({
        x: dir > 0 ? "100%" : "-100%",
        opacity: 0,
        scale: 0.96,
      }),
      center: {
        x: 0,
        opacity: 1,
        scale: 1,
        transition: {
          x: { type: "spring" as const, stiffness: 300, damping: 30 },
          opacity: { duration: 0.3 },
          scale: { duration: 0.3 },
        },
      },
      exit: (dir: number) => ({
        x: dir < 0 ? "100%" : "-100%",
        opacity: 0,
        scale: 0.96,
        transition: {
          x: { type: "spring" as const, stiffness: 300, damping: 30 },
          opacity: { duration: 0.2 },
        },
      }),
    };

    const currentSlide = slides[currentIndex];

    return (
      <div
        ref={ref}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          "relative overflow-hidden rounded-3xl w-full select-none group",
          aspectClasses[aspectRatio],
          variant === "card" && "border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm",
          variant === "glass" && "border border-white/40 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl shadow-md",
          variant === "ios-glass" && "border border-white/60 dark:border-zinc-800/80 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-2xl shadow-xl",
          className
        )}
        {...props}
      >
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentSlide.id || currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full flex items-center justify-center"
          >
            {currentSlide.image ? (
              <div className="relative w-full h-full">
                <img
                  src={currentSlide.image}
                  alt={typeof currentSlide.title === "string" ? currentSlide.title : "Carousel slide"}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>
            ) : null}

            {/* Content overlay */}
            {(currentSlide.title || currentSlide.description || currentSlide.content) && (
              <div className={cn(
                "absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end text-white z-10",
                !currentSlide.image && "relative text-zinc-900 dark:text-zinc-100"
              )}>
                {currentSlide.title && (
                  <h3 className="text-lg sm:text-xl font-bold tracking-tight mb-1">
                    {currentSlide.title}
                  </h3>
                )}
                {currentSlide.description && (
                  <p className="text-xs sm:text-sm text-zinc-300 dark:text-zinc-400 line-clamp-2">
                    {currentSlide.description}
                  </p>
                )}
                {currentSlide.content}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Previous / Next Navigation Controls */}
        {showControls && totalSlides > 1 && (
          <>
            <button
              type="button"
              onClick={() => paginate(-1)}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/30 dark:bg-zinc-900/40 backdrop-blur-md border border-white/40 dark:border-zinc-800 text-zinc-800 dark:text-white opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95 transition-all duration-200"
              aria-label="Previous slide"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => paginate(1)}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/30 dark:bg-zinc-900/40 backdrop-blur-md border border-white/40 dark:border-zinc-800 text-zinc-800 dark:text-white opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95 transition-all duration-200"
              aria-label="Next slide"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}

        {/* Bottom Dot Pagination Indicators */}
        {showIndicators && totalSlides > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/30 dark:bg-zinc-900/50 backdrop-blur-md border border-white/20 dark:border-zinc-800">
            {slides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                }}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  idx === currentIndex
                    ? "w-6 bg-teal-400 dark:bg-teal-400"
                    : "w-1.5 bg-white/50 hover:bg-white/80"
                )}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
);

Carousel.displayName = "Carousel";

export default Carousel;
