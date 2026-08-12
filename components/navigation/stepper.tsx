"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Check, AlertCircle } from "lucide-react";

export interface StepDef {
  id: string | number;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  status?: "completed" | "active" | "pending" | "error";
}

export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: StepDef[];
  activeStep?: number;
  orientation?: "horizontal" | "vertical";
  onStepClick?: (index: number) => void;
  clickable?: boolean;
}

export const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  (
    {
      steps = [],
      activeStep = 0,
      orientation = "horizontal",
      onStepClick,
      clickable = false,
      className,
      ...props
    },
    ref
  ) => {
    const isHorizontal = orientation === "horizontal";

    return (
      <div
        ref={ref}
        className={cn(
          "w-full select-none",
          isHorizontal ? "flex items-start justify-between gap-2" : "flex flex-col gap-4",
          className
        )}
        {...props}
      >
        {steps.map((step, index) => {
          let status = step.status;
          if (!status) {
            if (index < activeStep) status = "completed";
            else if (index === activeStep) status = "active";
            else status = "pending";
          }

          const isCompleted = status === "completed";
          const isActive = status === "active";
          const isError = status === "error";

          return (
            <div
              key={step.id}
              onClick={() => clickable && onStepClick?.(index)}
              className={cn(
                "relative flex gap-3",
                isHorizontal ? "flex-1 flex-col items-center text-center" : "flex-row items-start",
                clickable && "cursor-pointer group"
              )}
            >
              {/* Step Circle Badge */}
              <div className="flex items-center gap-2 z-10">
                <div
                  className={cn(
                    "w-9 h-9 rounded-2xl flex items-center justify-center text-xs font-bold font-mono transition-all shadow-sm shrink-0 border",
                    isCompleted && "bg-teal-600 border-teal-600 text-white shadow-teal-500/20",
                    isActive && "bg-white dark:bg-zinc-900 border-teal-600 dark:border-teal-500 text-teal-600 dark:text-teal-400 border-2 ring-4 ring-teal-500/10",
                    isError && "bg-red-500 border-red-500 text-white",
                    status === "pending" && "bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-400"
                  )}
                >
                  {isCompleted ? (
                    <Check size={16} className="stroke-[3]" />
                  ) : isError ? (
                    <AlertCircle size={16} />
                  ) : (
                    step.icon || <span>{index + 1}</span>
                  )}
                </div>
              </div>

              {/* Title & Description */}
              <div className={cn("space-y-0.5 min-w-0", isHorizontal ? "w-full" : "flex-1 pt-1")}>
                <div
                  className={cn(
                    "text-xs font-bold tracking-tight truncate",
                    isActive && "text-teal-700 dark:text-teal-400 font-extrabold",
                    isCompleted && "text-zinc-900 dark:text-zinc-100",
                    status === "pending" && "text-zinc-400 dark:text-zinc-500"
                  )}
                >
                  {step.title}
                </div>
                {step.description && (
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-snug line-clamp-2">
                    {step.description}
                  </p>
                )}
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "absolute transition-colors",
                    isHorizontal
                      ? "top-4 left-[calc(50%+18px)] right-[calc(-50%+18px)] h-0.5 -z-0"
                      : "left-4 top-10 bottom-0 w-0.5 -z-0",
                    isCompleted
                      ? "bg-teal-600 dark:bg-teal-500"
                      : "bg-zinc-200 dark:bg-zinc-800"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  }
);

Stepper.displayName = "Stepper";
