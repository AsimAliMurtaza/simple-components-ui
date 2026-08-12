"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CopyButtonProps {
  value: string;
  className?: string;
  label?: string;
}

export function CopyButton({ value, className, label }: CopyButtonProps) {
  const [hasCopied, setHasCopied] = React.useState(false);

  const copyToClipboard = React.useCallback(async () => {
    if (!value) return;
    await navigator.clipboard.writeText(value);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  }, [value]);

  return (
    <button
      type="button"
      onClick={copyToClipboard}
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono rounded-lg transition-all select-none border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 cursor-pointer shrink-0",
        hasCopied &&
          "text-emerald-600 dark:text-emerald-400 border-emerald-500/50 bg-emerald-50 dark:bg-emerald-950/40",
        className,
      )}
      title="Copy to clipboard"
    >
      {hasCopied ? (
        <Check size={14} className="text-emerald-500" />
      ) : (
        <Copy size={14} />
      )}
      {label && <span>{hasCopied ? "Copied" : label}</span>}
    </button>
  );
}
