"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  direction?: "left" | "right";
  speed?: number; // Duration in seconds for full loop
  pauseOnHover?: boolean;
  className?: string;
}

export const Marquee: React.FC<MarqueeProps> = ({
  children,
  direction = "left",
  speed = 25,
  pauseOnHover = true,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "group flex overflow-hidden select-none w-full [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "flex shrink-0 items-center justify-around gap-6 min-w-full animate-marquee",
          direction === "right" && "animate-marquee-reverse",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
        style={{ animationDuration: `${speed}s` }}
      >
        {children}
      </div>

      <div
        aria-hidden="true"
        className={cn(
          "flex shrink-0 items-center justify-around gap-6 min-w-full animate-marquee",
          direction === "right" && "animate-marquee-reverse",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
        style={{ animationDuration: `${speed}s` }}
      >
        {children}
      </div>
    </div>
  );
};

Marquee.displayName = "Marquee";

export default Marquee;
