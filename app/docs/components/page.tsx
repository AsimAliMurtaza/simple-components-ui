import * as React from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/docs/breadcrumbs";
import { docsConfig } from "@/config/docs";
import { ChevronRight, Component as ComponentIcon } from "lucide-react";

export const metadata = {
  title: "Component Directory — Simple Components UI",
  description: "Browse all available React components in Simple Components UI.",
};

export default function ComponentsDirectoryPage() {
  const componentCategories = docsConfig.nav.filter(
    (c) => c.title !== "Getting Started",
  );

  return (
    <div className="space-y-8 select-none">
      <Breadcrumbs items={[{ title: "Component Directory" }]} />

      <div className="space-y-3 pb-6 border-b border-zinc-200 dark:border-zinc-800">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Component Directory
        </h1>
        <p className="text-base text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
          Explore our collection of 30+ production-ready React components
          categorized by functionality.
        </p>
      </div>

      <div className="space-y-10">
        {componentCategories.map((cat) => (
          <div key={cat.title} className="space-y-4">
            <h2 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <ComponentIcon size={18} className="text-blue-500" />
              {cat.title}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {cat.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 hover:shadow-md transition-all group flex items-center justify-between"
                >
                  <div className="space-y-1">
                    <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {item.title}
                    </div>
                    {item.badge && (
                      <span className="inline-block px-2 py-0.5 text-[10px] font-mono font-semibold rounded-md bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <ChevronRight
                    size={16}
                    className="text-zinc-400 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all shrink-0"
                  />
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
