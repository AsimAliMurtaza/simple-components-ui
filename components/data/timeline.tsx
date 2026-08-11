"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  lineStyle?: "solid" | "dashed" | "dotted";
  className?: string;
  children: React.ReactNode;
}

const TimelineContext = React.createContext<{
  lineStyle?: "solid" | "dashed" | "dotted";
}>({});

export const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
  ({ lineStyle = "solid", className, children, ...props }, ref) => {
    return (
      <TimelineContext.Provider value={{ lineStyle }}>
        <div ref={ref} className={cn("relative flex flex-col gap-6 pl-2 select-none", className)} {...props}>
          {children}
        </div>
      </TimelineContext.Provider>
    );
  }
);
Timeline.displayName = "Timeline";

export interface TimelineItemProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const TimelineItem = React.forwardRef<HTMLDivElement, TimelineItemProps>(
  ({ active = false, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative flex items-start gap-4 transition-opacity duration-200",
          !active && "opacity-90",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
TimelineItem.displayName = "TimelineItem";

export interface TimelineIconProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: "primary" | "success" | "warning" | "danger" | "purple" | "neutral";
  variant?: "default" | "outline" | "glass" | "ios-glass";
  icon?: React.ReactNode;
  className?: string;
}

const iconColorMap = {
  primary: "bg-blue-600 text-white dark:bg-blue-500",
  success: "bg-emerald-600 text-white dark:bg-emerald-500",
  warning: "bg-amber-600 text-white dark:bg-amber-500",
  danger: "bg-red-600 text-white dark:bg-red-500",
  purple: "bg-purple-600 text-white dark:bg-purple-500",
  neutral: "bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200",
};

export const TimelineIcon = React.forwardRef<HTMLDivElement, TimelineIconProps>(
  ({ color = "primary", icon, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative z-10 flex items-center justify-center w-8 h-8 rounded-full shadow-md shrink-0 border-2 border-white dark:border-zinc-900",
          iconColorMap[color],
          className
        )}
        {...props}
      >
        {icon || <div className="w-2.5 h-2.5 rounded-full bg-current" />}
      </div>
    );
  }
);
TimelineIcon.displayName = "TimelineIcon";

export interface TimelineConnectorProps {
  className?: string;
}

export const TimelineConnector: React.FC<TimelineConnectorProps> = ({ className }) => {
  const { lineStyle = "solid" } = React.useContext(TimelineContext);

  const borderStyles = {
    solid: "border-l-2 border-zinc-200 dark:border-zinc-800",
    dashed: "border-l-2 border-dashed border-zinc-300 dark:border-zinc-700",
    dotted: "border-l-2 border-dotted border-zinc-300 dark:border-zinc-700",
  };

  return (
    <div
      className={cn(
        "absolute top-8 bottom-[-24px] left-[15px] w-0 pointer-events-none",
        borderStyles[lineStyle],
        className
      )}
    />
  );
};

export const TimelineBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col gap-1 pt-0.5 flex-1 min-w-0", className)} {...props} />
));
TimelineBody.displayName = "TimelineBody";

export const TimelineHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center justify-between gap-2", className)} {...props} />
));
TimelineHeader.displayName = "TimelineHeader";

export const TimelineTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h4 ref={ref} className={cn("text-sm font-semibold text-zinc-900 dark:text-zinc-100", className)} {...props} />
));
TimelineTitle.displayName = "TimelineTitle";

export const TimelineTime = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span ref={ref} className={cn("text-xs text-zinc-400 dark:text-zinc-500 font-mono shrink-0", className)} {...props} />
));
TimelineTime.displayName = "TimelineTime";

export default Timeline;
