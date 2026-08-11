"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { CopyButton } from "./copy-button";

export interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  className?: string;
}

export function CodeBlock({
  code,
  language = "tsx",
  filename,
  className,
}: CodeBlockProps) {
  return (
    <div
      className={cn(
        "relative my-4 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-900 text-zinc-100 font-mono text-xs shadow-lg select-none",
        className
      )}
    >
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-zinc-950/80 border-b border-zinc-800/80">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          {filename && (
            <span className="ml-2 text-[11px] text-zinc-400 font-sans font-medium">
              {filename}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
            {language}
          </span>
          <CopyButton value={code} label="Copy" />
        </div>
      </div>

      {/* Code body */}
      <pre className="p-4 overflow-x-auto text-xs leading-relaxed text-zinc-200 font-mono">
        <code>{code}</code>
      </pre>
    </div>
  );
}
