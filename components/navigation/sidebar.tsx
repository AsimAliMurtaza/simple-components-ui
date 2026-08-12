"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface SidebarItemDef {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
  active?: boolean;
  onClick?: () => void;
}

export interface SidebarGroupDef {
  title?: string;
  items: SidebarItemDef[];
}

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  header?: React.ReactNode;
  groups: SidebarGroupDef[];
  footer?: React.ReactNode;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  variant?: "default" | "bordered" | "glass" | "ios-glass";
}

const variantStyles = {
  default: "bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800",
  bordered: "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-sm",
  glass: "bg-white/70 dark:bg-zinc-900/70 border border-white/40 dark:border-zinc-800 backdrop-blur-xl rounded-3xl shadow-lg",
  "ios-glass": "bg-white/40 dark:bg-zinc-900/40 border border-white/50 dark:border-zinc-800/80 backdrop-blur-2xl rounded-3xl shadow-xl",
};

export const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  (
    {
      header,
      groups = [],
      footer,
      collapsible = true,
      defaultCollapsed = false,
      variant = "bordered",
      className,
      ...props
    },
    ref
  ) => {
    const [collapsed, setCollapsed] = React.useState(defaultCollapsed);

    return (
      <aside
        ref={ref}
        style={{ width: collapsed ? "64px" : "240px" }}
        className={cn(
          "relative flex flex-col transition-all duration-200 ease-out select-none h-full min-h-[400px] shrink-0 p-3",
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {/* Header slot */}
        {header && (
          <div className="flex items-center justify-between pb-3 mb-2 border-b border-zinc-200/60 dark:border-zinc-800/60 min-w-0">
            {!collapsed && <div className="truncate">{header}</div>}
          </div>
        )}

        {/* Navigation Groups */}
        <div className="flex-1 space-y-4 overflow-y-auto min-w-0">
          {groups.map((group, gIdx) => (
            <div key={gIdx} className="space-y-1">
              {group.title && !collapsed && (
                <h4 className="px-2 text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-sans">
                  {group.title}
                </h4>
              )}

              <div className="space-y-0.5">
                {group.items.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={item.onClick}
                    className={cn(
                      "w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer",
                      item.active
                        ? "bg-teal-50 text-teal-700 dark:bg-zinc-800 dark:text-teal-400 font-bold shadow-sm"
                        : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/60",
                      collapsed && "justify-center px-0"
                    )}
                    title={collapsed ? item.label : undefined}
                  >
                    {item.icon && <span className="shrink-0 text-base">{item.icon}</span>}
                    {!collapsed && <span className="truncate flex-1 text-left">{item.label}</span>}
                    {!collapsed && item.badge && (
                      <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold rounded-md bg-teal-100 text-teal-800 dark:bg-zinc-800 dark:text-teal-400 shrink-0">
                        {item.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer slot */}
        {footer && !collapsed && (
          <div className="pt-3 mt-2 border-t border-zinc-200/60 dark:border-zinc-800/60">
            {footer}
          </div>
        )}

        {/* Collapse toggle */}
        {collapsible && (
          <button
            type="button"
            onClick={() => setCollapsed((prev) => !prev)}
            className="absolute -right-3 top-6 p-1 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors shadow-sm cursor-pointer"
          >
            {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        )}
      </aside>
    );
  }
);

Sidebar.displayName = "Sidebar";
