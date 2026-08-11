"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
export type AvatarStatus = "online" | "offline" | "busy" | "away";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  name?: string;
  size?: AvatarSize;
  shape?: "circle" | "rounded" | "square";
  status?: AvatarStatus;
  className?: string;
}

const sizeMap = {
  xs: { box: "w-6 h-6 text-[10px]", status: "w-2 h-2" },
  sm: { box: "w-8 h-8 text-xs", status: "w-2.5 h-2.5" },
  md: { box: "w-10 h-10 text-sm", status: "w-3 h-3" },
  lg: { box: "w-12 h-12 text-base", status: "w-3.5 h-3.5" },
  xl: { box: "w-16 h-16 text-xl", status: "w-4 h-4" },
  "2xl": { box: "w-20 h-20 text-2xl", status: "w-5 h-5" },
};

const shapeMap = {
  circle: "rounded-full",
  rounded: "rounded-2xl",
  square: "rounded-lg",
};

const statusColors: Record<AvatarStatus, string> = {
  online: "bg-emerald-500",
  offline: "bg-zinc-400",
  busy: "bg-red-500",
  away: "bg-amber-500",
};

const getInitials = (name?: string) => {
  if (!name) return "?";
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      src,
      alt,
      name,
      size = "md",
      shape = "circle",
      status,
      className,
      ...props
    },
    ref
  ) => {
    const [imageError, setImageError] = React.useState(false);
    const { box, status: statusSize } = sizeMap[size];

    return (
      <div
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center shrink-0 select-none bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-semibold shadow-sm border border-white/20 dark:border-zinc-800/80",
          box,
          shapeMap[shape],
          className
        )}
        {...props}
      >
        {src && !imageError ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={src}
            alt={alt || name || "Avatar"}
            onError={() => setImageError(true)}
            className={cn("w-full h-full object-cover", shapeMap[shape])}
          />
        ) : (
          <span>{getInitials(name || alt)}</span>
        )}

        {status && (
          <span
            className={cn(
              "absolute bottom-0 right-0 rounded-full ring-2 ring-white dark:ring-zinc-900",
              statusSize,
              statusColors[status]
            )}
          />
        )}
      </div>
    );
  }
);

Avatar.displayName = "Avatar";

export interface AvatarGroupProps {
  max?: number;
  size?: AvatarSize;
  children: React.ReactNode;
  className?: string;
}

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  max = 4,
  size = "md",
  children,
  className,
}) => {
  const childrenArray = React.Children.toArray(children);
  const visibleAvatars = childrenArray.slice(0, max);
  const overflowCount = childrenArray.length - max;
  const { box } = sizeMap[size];

  return (
    <div className={cn("inline-flex items-center -space-x-3 select-none", className)}>
      {visibleAvatars.map((child, idx) => (
        <div key={idx} className="ring-2 ring-white dark:ring-zinc-900 rounded-full">
          {child}
        </div>
      ))}

      {overflowCount > 0 && (
        <div
          className={cn(
            "relative inline-flex items-center justify-center rounded-full ring-2 ring-white dark:ring-zinc-900 bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold text-xs shrink-0 shadow-sm",
            box
          )}
        >
          +{overflowCount}
        </div>
      )}
    </div>
  );
};

export default Avatar;
