import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronRight, Slash, ArrowRight, Home } from "lucide-react";

export interface BreadcrumbItemDef {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  current?: boolean;
}

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItemDef[];
  separator?: "chevron" | "slash" | "arrow" | "dot";
  showHomeIcon?: boolean;
  homeHref?: string;
  maxItems?: number;
}

export const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  (
    {
      items = [],
      separator = "chevron",
      showHomeIcon = true,
      homeHref = "/",
      maxItems = 4,
      className,
      ...props
    },
    ref
  ) => {
    const renderSeparator = () => {
      switch (separator) {
        case "slash":
          return <Slash size={12} className="mx-2 text-zinc-400 shrink-0" />;
        case "arrow":
          return <ArrowRight size={12} className="mx-2 text-zinc-400 shrink-0" />;
        case "dot":
          return <span className="mx-2 text-zinc-400 shrink-0">•</span>;
        case "chevron":
        default:
          return <ChevronRight size={12} className="mx-2 text-zinc-400 shrink-0" />;
      }
    };

    // Handle middle truncation if items exceed maxItems
    let displayItems = items;

    if (items.length > maxItems && maxItems >= 3) {
      displayItems = [
        items[0],
        { label: "...", href: undefined },
        ...items.slice(items.length - (maxItems - 2)),
      ];
    }

    return (
      <nav
        ref={ref}
        aria-label="Breadcrumb navigation"
        className={cn("flex items-center text-xs font-medium text-zinc-500 dark:text-zinc-400 select-none", className)}
        {...props}
      >
        <ol className="flex items-center flex-wrap">
          {/* Home Icon Link */}
          {showHomeIcon && (
            <li className="inline-flex items-center">
              <a
                href={homeHref}
                className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors inline-flex items-center gap-1"
              >
                <Home size={14} />
              </a>
              {items.length > 0 && renderSeparator()}
            </li>
          )}

          {/* Breadcrumb Items */}
          {displayItems.map((item, index) => {
            const isLast = index === displayItems.length - 1;
            const isCurrent = item.current || isLast;

            return (
              <li key={index} className="inline-flex items-center">
                {isCurrent || !item.href ? (
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5",
                      isCurrent
                        ? "font-bold text-zinc-900 dark:text-zinc-100"
                        : "text-zinc-400"
                    )}
                    aria-current={isCurrent ? "page" : undefined}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </span>
                ) : (
                  <a
                    href={item.href}
                    className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors inline-flex items-center gap-1.5"
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </a>
                )}

                {!isLast && renderSeparator()}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  }
);

Breadcrumb.displayName = "Breadcrumb";
