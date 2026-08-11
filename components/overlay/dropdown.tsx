"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Context
interface DropdownContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  variant?: "default" | "bordered" | "glass" | "ios-glass";
  align?: "left" | "right";
}

const DropdownContext = React.createContext<DropdownContextValue>({
  open: false,
  setOpen: () => {},
});

export interface DropdownProps {
  variant?: "default" | "bordered" | "glass" | "ios-glass";
  align?: "left" | "right";
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  variant = "ios-glass",
  align = "left",
  open: propOpen,
  onOpenChange,
  children,
  className,
}) => {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);
  const isControlled = propOpen !== undefined;
  const isOpen = isControlled ? propOpen : uncontrolledOpen;

  const containerRef = React.useRef<HTMLDivElement>(null);

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (!isControlled) setUncontrolledOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange]
  );

  // Outside click
  React.useEffect(() => {
    if (!isOpen) return;
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen, setOpen]);

  return (
    <DropdownContext.Provider value={{ open: isOpen, setOpen, variant, align }}>
      <div ref={containerRef} className={cn("relative inline-block select-none", className)}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

export const DropdownTrigger: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  const { open, setOpen } = React.useContext(DropdownContext);
  return (
    <div
      onClick={() => setOpen(!open)}
      className={cn("cursor-pointer inline-flex items-center", className)}
    >
      {children}
    </div>
  );
};

const variantStyles = {
  default:
    "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-xl",
  bordered:
    "bg-white dark:bg-zinc-950 border-2 border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-xl",
  glass:
    "bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-white/40 dark:border-zinc-800/80 text-zinc-900 dark:text-zinc-100 shadow-2xl",
  "ios-glass":
    "bg-white/45 dark:bg-zinc-900/45 backdrop-blur-2xl border border-white/60 dark:border-zinc-800/80 text-zinc-900 dark:text-zinc-100 shadow-2xl shadow-black/10",
};

export const DropdownContent: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  const { open, variant = "ios-glass", align = "left" } = React.useContext(DropdownContext);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -6, scale: 0.96 }}
          animate={{ opacity: 1, y: 4, scale: 1 }}
          exit={{ opacity: 0, y: -6, scale: 0.96 }}
          transition={{ duration: 0.15 }}
          className={cn(
            "absolute z-50 mt-1 min-w-[180px] p-1.5 rounded-2xl border flex flex-col gap-0.5",
            align === "right" ? "right-0" : "left-0",
            variantStyles[variant],
            className
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export interface DropdownItemProps {
  onClick?: () => void;
  icon?: React.ReactNode;
  shortcut?: string;
  disabled?: boolean;
  destructive?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const DropdownItem: React.FC<DropdownItemProps> = ({
  onClick,
  icon,
  shortcut,
  disabled = false,
  destructive = false,
  children,
  className,
}) => {
  const { setOpen } = React.useContext(DropdownContext);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (disabled) return;
    onClick?.();
    setOpen(false);
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        "flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium cursor-pointer transition-colors select-none",
        destructive
          ? "text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40"
          : "text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800/60",
        disabled && "opacity-40 cursor-not-allowed",
        className
      )}
    >
      <div className="flex items-center gap-2 min-w-0">
        {icon && <span className="shrink-0">{icon}</span>}
        <span className="truncate">{children}</span>
      </div>

      {shortcut && (
        <span className="text-[10px] font-mono opacity-50 ml-3 tracking-widest uppercase">
          {shortcut}
        </span>
      )}
    </div>
  );
};

export const DropdownLabel: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <div className={cn("px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500", className)}>
    {children}
  </div>
);

export const DropdownSeparator: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn("h-px my-1 bg-zinc-100 dark:bg-zinc-800", className)} />
);

export default Dropdown;
