"use client";

import * as React from "react";
import { PropDefinition } from "@/config/docs";
import { cn } from "@/lib/utils";

export interface PropsTableProps {
  props: PropDefinition[];
  className?: string;
}

export function PropsTable({ props, className }: PropsTableProps) {
  if (!props || props.length === 0) return null;

  return (
    <div className={cn("my-6 w-full overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm", className)}>
      <table className="w-full text-left text-xs border-collapse">
        <thead className="bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 font-semibold text-zinc-900 dark:text-zinc-100">
          <tr>
            <th className="p-3 px-4 w-1/5">Prop</th>
            <th className="p-3 px-4 w-2/5">Type</th>
            <th className="p-3 px-4 w-1/5">Default</th>
            <th className="p-3 px-4 w-2/5">Description</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/80 bg-white dark:bg-zinc-950 font-sans">
          {props.map((p) => (
            <tr key={p.name} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/40 transition-colors">
              <td className="p-3 px-4 font-mono font-bold text-teal-600 dark:text-blue-400">
                {p.name}
                {p.required && <span className="ml-1 text-red-500 font-sans text-xs">*</span>}
              </td>
              <td className="p-3 px-4 font-mono text-[11px] text-purple-600 dark:text-purple-400 break-words">
                {p.type}
              </td>
              <td className="p-3 px-4 font-mono text-zinc-500 dark:text-zinc-400">
                {p.default || "-"}
              </td>
              <td className="p-3 px-4 text-zinc-600 dark:text-zinc-300 leading-relaxed">
                {p.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
