"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  title: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav className={cn("flex items-center text-xs text-zinc-500 dark:text-zinc-400 font-medium select-none mb-4", className)}>
      <Link
        href="/docs"
        className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors flex items-center gap-1"
      >
        <Home size={13} />
        <span>Docs</span>
      </Link>

      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight size={13} className="mx-1.5 opacity-40 shrink-0" />
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors truncate"
            >
              {item.title}
            </Link>
          ) : (
            <span className="text-zinc-900 dark:text-zinc-100 font-semibold truncate">
              {item.title}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
