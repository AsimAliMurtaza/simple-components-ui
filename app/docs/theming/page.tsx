import * as React from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/docs/breadcrumbs";
import { CodeBlock } from "@/components/docs/code-block";
import { ArrowLeft, ArrowRight, Moon, Palette } from "lucide-react";

export const metadata = {
  title: "Theming & Styling — Simple Components UI",
  description:
    "Learn how to customize themes, dark mode, and iOS glassmorphism variants in Simple Components UI.",
};

export default function ThemingPage() {
  return (
    <div className="space-y-8 select-none">
      <Breadcrumbs items={[{ title: "Theming & Styling" }]} />

      <div className="space-y-3 pb-6 border-b border-zinc-200 dark:border-zinc-800">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Theming & Styling
        </h1>
        <p className="text-base text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
          Simple Components seamlessly adapts to dark and light modes out of the
          box using Tailwind CSS and CSS variables.
        </p>
      </div>

      {/* Dark Mode Toggle */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
          <Moon size={18} className="text-purple-500" />
          Dark Mode Activation
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
          Dark mode is toggled by adding or removing the{" "}
          <code className="text-xs font-mono font-bold bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">
            .dark
          </code>{" "}
          class on the root{" "}
          <code className="text-xs font-mono font-bold bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">
            &lt;html&gt;
          </code>{" "}
          element.
        </p>

        <CodeBlock
          code={`// Toggle dark mode class on document root
function toggleDarkMode() {
  document.documentElement.classList.toggle("dark");
}`}
          language="tsx"
        />
      </section>

      {/* Surface Variants */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
          <Palette size={18} className="text-teal-600 dark:text-blue-500" />
          Surface Variants & iOS Glassmorphism
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
          Most components support rich surface variants to fit your
          application&apos;s aesthetic:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-1">
            <span className="text-xs font-mono font-bold text-teal-700 dark:text-blue-400">
              variant=&quot;default&quot;
            </span>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Standard crisp background surface with subtle borders.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-zinc-950 border-2 border-zinc-300 dark:border-zinc-800 space-y-1">
            <span className="text-xs font-mono font-bold text-purple-600 dark:text-purple-400">
              variant=&quot;bordered&quot;
            </span>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              High-contrast solid borders for dense dashboards.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-white/40 dark:border-zinc-800 space-y-1">
            <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
              variant=&quot;glass&quot;
            </span>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Translucent backdrop blur container.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/40 dark:bg-zinc-900/40 backdrop-blur-2xl border border-white/60 dark:border-zinc-800 space-y-1">
            <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400">
              variant=&quot;ios-glass&quot;
            </span>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Ultra-smooth iOS frosted glass visual design.
            </p>
          </div>
        </div>
      </section>

      {/* Next Navigation */}
      <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
        <Link
          href="/docs/getting-started"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-semibold hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Quickstart</span>
        </Link>
        <Link
          href="/docs/accessibility"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white text-xs font-semibold transition-colors shadow-md"
        >
          <span>Accessibility</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
