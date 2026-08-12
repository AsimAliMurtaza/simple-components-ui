"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface NavItemDef {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode;
  items?: NavItemDef[];
  actions?: React.ReactNode;
  sticky?: boolean;
  variant?: "default" | "bordered" | "glass" | "ios-glass";
}

const variantStyles = {
  default: "bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800",
  bordered: "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl my-2 shadow-sm",
  glass: "bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-b border-white/40 dark:border-zinc-800 shadow-sm",
  "ios-glass": "bg-white/50 dark:bg-zinc-900/50 backdrop-blur-2xl border border-white/50 dark:border-zinc-800/80 rounded-3xl my-2 shadow-lg",
};

export const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  (
    {
      logo,
      items = [],
      actions,
      sticky = true,
      variant = "ios-glass",
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [mobileOpen, setMobileOpen] = React.useState(false);

    return (
      <header
        ref={ref}
        className={cn(
          "w-full z-40 transition-colors select-none",
          sticky && "sticky top-0",
          variantStyles[variant],
          className
        )}
        {...props}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo / Brand */}
          <div className="flex items-center gap-3">
            {logo || (
              <span className="font-extrabold text-base tracking-tight text-zinc-900 dark:text-white">
                BrandLogo
              </span>
            )}
          </div>

          {/* Desktop Nav Items */}
          {items.length > 0 && (
            <nav className="hidden md:flex items-center gap-1">
              {items.map((item, idx) => (
                <a
                  key={idx}
                  href={item.href || "#"}
                  onClick={item.onClick}
                  className={cn(
                    "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer",
                    item.active
                      ? "bg-teal-50 text-teal-700 dark:bg-zinc-800 dark:text-teal-400 shadow-sm"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
                  )}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </a>
              ))}
            </nav>
          )}

          {/* Custom Children or Actions */}
          <div className="hidden md:flex items-center gap-2">
            {actions || children}
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden p-2 rounded-xl text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Navigation Panel */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-zinc-200/80 dark:border-zinc-800/80 overflow-hidden bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl px-4 py-4 space-y-3"
            >
              {items.map((item, idx) => (
                <a
                  key={idx}
                  href={item.href || "#"}
                  onClick={() => {
                    item.onClick?.();
                    setMobileOpen(false);
                  }}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-colors",
                    item.active
                      ? "bg-teal-50 text-teal-700 dark:bg-zinc-800 dark:text-teal-400 font-bold"
                      : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  )}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </a>
              ))}
              {actions && <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800">{actions}</div>}
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    );
  }
);

Navbar.displayName = "Navbar";
