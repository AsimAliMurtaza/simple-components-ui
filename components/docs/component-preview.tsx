"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { CodeBlock } from "./code-block";
import { Sun, Moon, Eye, Code } from "lucide-react";

export interface ComponentPreviewProps {
  children: React.ReactNode;
  code: string;
  className?: string;
  align?: "center" | "start" | "end";
}

export function ComponentPreview({
  children,
  code,
  className,
  align = "center",
}: ComponentPreviewProps) {
  const [tab, setTab] = React.useState<"preview" | "code">("preview");
  const [previewDark, setPreviewDark] = React.useState(false);

  const alignStyles = {
    center: "items-center justify-center",
    start: "items-start justify-start",
    end: "items-end justify-end",
  };

  return (
    <div className={cn("my-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-lg overflow-hidden select-none", className)}>
      {/* Header toolbar */}
      <div className="flex items-center justify-between px-4 py-3 bg-zinc-50/80 dark:bg-zinc-950/80 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-zinc-200/60 dark:bg-zinc-800/60 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setTab("preview")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all cursor-pointer",
              tab === "preview"
                ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-sm"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
            )}
          >
            <Eye size={14} />
            Preview
          </button>

          <button
            type="button"
            onClick={() => setTab("code")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all cursor-pointer",
              tab === "code"
                ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-sm"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
            )}
          >
            <Code size={14} />
            Code
          </button>
        </div>

        {tab === "preview" && (
          <button
            type="button"
            onClick={() => setPreviewDark((prev) => !prev)}
            className="p-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer"
            title="Toggle preview dark mode"
          >
            {previewDark ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        )}
      </div>

      {/* Body content */}
      {tab === "preview" ? (
        <div
          className={cn(
            "p-6 sm:p-10 flex min-h-[220px] transition-colors duration-200 overflow-x-auto",
            alignStyles[align],
            previewDark ? "dark bg-zinc-950 text-zinc-100" : "bg-zinc-50/40 dark:bg-zinc-950/40"
          )}
        >
          <div className="w-full flex justify-center max-w-full">{children}</div>
        </div>
      ) : (
        <div className="p-0 border-0 rounded-none my-0">
          <CodeBlock code={code} className="my-0 border-0 rounded-none" />
        </div>
      )}
    </div>
  );
}
