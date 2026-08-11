"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ContextMenuPosition {
  x: number;
  y: number;
}

interface ContextMenuContextValue {
  open: boolean;
  position: ContextMenuPosition;
  setOpen: (open: boolean) => void;
  setPosition: (pos: ContextMenuPosition) => void;
  variant?: "default" | "glass" | "ios-glass";
}

const ContextMenuContext = React.createContext<ContextMenuContextValue>({
  open: false,
  position: { x: 0, y: 0 },
  setOpen: () => {},
  setPosition: () => {},
});

export interface ContextMenuProps {
  variant?: "default" | "glass" | "ios-glass";
  children: React.ReactNode;
  className?: string;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
  variant = "ios-glass",
  children,
  className,
}) => {
  const [open, setOpen] = React.useState(false);
  const [position, setPosition] = React.useState<ContextMenuPosition>({ x: 0, y: 0 });

  // Outside click & ESC
  React.useEffect(() => {
    if (!open) return;
    const handleOutsideClick = () => setOpen(false);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("click", handleOutsideClick);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("click", handleOutsideClick);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <ContextMenuContext.Provider
      value={{ open, position, setOpen, setPosition, variant }}
    >
      <div className={cn("relative select-none", className)}>{children}</div>
    </ContextMenuContext.Provider>
  );
};

export const ContextMenuTrigger: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  const { setOpen, setPosition } = React.useContext(ContextMenuContext);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setPosition({ x: e.clientX, y: e.clientY });
    setOpen(true);
  };

  return (
    <div onContextMenu={handleContextMenu} className={className}>
      {children}
    </div>
  );
};

const variantStyles = {
  default:
    "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-2xl",
  glass:
    "bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-white/40 dark:border-zinc-800/80 text-zinc-900 dark:text-zinc-100 shadow-2xl",
  "ios-glass":
    "bg-white/45 dark:bg-zinc-900/45 backdrop-blur-2xl border border-white/60 dark:border-zinc-800/80 text-zinc-900 dark:text-zinc-100 shadow-2xl shadow-black/10",
};

export const ContextMenuContent: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  const { open, position, variant = "ios-glass" } = React.useContext(ContextMenuContext);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.94 }}
          transition={{ duration: 0.12 }}
          style={{ top: position.y, left: position.x }}
          className={cn(
            "fixed z-50 min-w-[180px] p-1.5 rounded-2xl border flex flex-col gap-0.5 shadow-2xl",
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

export interface ContextMenuItemProps {
  onClick?: () => void;
  icon?: React.ReactNode;
  shortcut?: string;
  disabled?: boolean;
  destructive?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const ContextMenuItem: React.FC<ContextMenuItemProps> = ({
  onClick,
  icon,
  shortcut,
  disabled = false,
  destructive = false,
  children,
  className,
}) => {
  const { setOpen } = React.useContext(ContextMenuContext);

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

export const ContextMenuLabel: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <div className={cn("px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500", className)}>
    {children}
  </div>
);

export const ContextMenuSeparator: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn("h-px my-1 bg-zinc-100 dark:bg-zinc-800", className)} />
);

export default ContextMenu;
