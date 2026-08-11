"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  variant?: "default" | "bordered" | "striped" | "glass" | "ios-glass";
  size?: "sm" | "md" | "lg";
  hoverable?: boolean;
}

const TableContext = React.createContext<{
  variant?: "default" | "bordered" | "striped" | "glass" | "ios-glass";
  size?: "sm" | "md" | "lg";
  hoverable?: boolean;
}>({});

export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  (
    {
      className,
      variant = "default",
      size = "md",
      hoverable = true,
      children,
      ...props
    },
    ref
  ) => {
    const variantStyles = {
      default: "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100",
      bordered: "bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100",
      striped: "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100",
      glass: "bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-white/40 dark:border-zinc-800/80 text-zinc-900 dark:text-zinc-100",
      "ios-glass": "bg-white/40 dark:bg-zinc-900/40 backdrop-blur-2xl border border-white/60 dark:border-zinc-800/80 text-zinc-900 dark:text-zinc-100 shadow-xl shadow-black/5",
    };

    return (
      <TableContext.Provider value={{ variant, size, hoverable }}>
        <div className="relative w-full overflow-auto rounded-2xl">
          <table
            ref={ref}
            className={cn(
              "w-full caption-bottom text-sm select-none border-collapse transition-colors",
              variantStyles[variant],
              className
            )}
            {...props}
          >
            {children}
          </table>
        </div>
      </TableContext.Provider>
    );
  }
);
Table.displayName = "Table";

export const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn(
      "border-b border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/60 dark:bg-zinc-950/60 font-semibold text-zinc-900 dark:text-zinc-100",
      className
    )}
    {...props}
  />
));
TableHeader.displayName = "TableHeader";

export const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
));
TableBody.displayName = "TableBody";

export const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 font-medium text-zinc-900 dark:text-zinc-100",
      className
    )}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

export const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement> & { selected?: boolean }
>(({ className, selected, ...props }, ref) => {
  const { variant, hoverable } = React.useContext(TableContext);

  return (
    <tr
      ref={ref}
      className={cn(
        "border-b border-zinc-100 dark:border-zinc-800/60 transition-colors duration-150",
        hoverable && "hover:bg-zinc-50/80 dark:hover:bg-zinc-800/40",
        variant === "striped" && "even:bg-zinc-50/50 dark:even:bg-zinc-800/20",
        selected && "bg-blue-50/60 dark:bg-blue-950/40 hover:bg-blue-100/60 dark:hover:bg-blue-900/40",
        className
      )}
      {...props}
    />
  );
});
TableRow.displayName = "TableRow";

const paddingStyles = {
  sm: "px-3 py-2 text-xs",
  md: "px-4 py-3 text-sm",
  lg: "px-5 py-4 text-base",
};

export const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => {
  const { size = "md" } = React.useContext(TableContext);

  return (
    <th
      ref={ref}
      className={cn(
        "h-10 text-left align-middle font-semibold text-zinc-700 dark:text-zinc-300 [&:has([role=checkbox])]:pr-0",
        paddingStyles[size],
        className
      )}
      {...props}
    />
  );
});
TableHead.displayName = "TableHead";

export const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => {
  const { size = "md" } = React.useContext(TableContext);

  return (
    <td
      ref={ref}
      className={cn(
        "align-middle [&:has([role=checkbox])]:pr-0 text-zinc-800 dark:text-zinc-200",
        paddingStyles[size],
        className
      )}
      {...props}
    />
  );
});
TableCell.displayName = "TableCell";

export const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-xs text-zinc-500 dark:text-zinc-400 font-medium", className)}
    {...props}
  />
));
TableCaption.displayName = "TableCaption";

export default Table;
