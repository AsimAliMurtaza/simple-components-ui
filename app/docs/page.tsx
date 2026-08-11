import * as React from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/docs/breadcrumbs";
import { CodeBlock } from "@/components/docs/code-block";
import { Sparkles, ArrowRight, ShieldCheck, Zap, Palette, Layers } from "lucide-react";

export const metadata = {
  title: "Introduction — Simple Components UI",
  description: "Overview, design principles, and problem solved by Simple Components UI.",
};

export default function IntroductionPage() {
  return (
    <div className="space-y-8 select-none">
      <Breadcrumbs items={[{ title: "Introduction" }]} />

      <div className="space-y-3 pb-6 border-b border-zinc-200 dark:border-zinc-800">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Introduction
        </h1>
        <p className="text-base text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
          Simple Components UI is an open-source React component library built with TypeScript, Tailwind CSS, and Framer Motion for crafting modern, accessible web applications.
        </p>
      </div>

      {/* What is it */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-teal-600 dark:text-blue-500" />
          What is Simple Components UI?
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
          Simple Components UI provides production-ready, fully typed UI primitives across 5 core categories: <strong>Form Controls</strong>, <strong>Overlay Dialogs</strong>, <strong>Feedback Notifications</strong>, <strong>Data Displays</strong>, and <strong>Drag & Drop Layouts</strong>.
        </p>
      </section>

      {/* Why it exists */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight">Why Simple Components UI?</h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
          Most traditional component libraries force developers into a trade-off between completely unstyled primitives (which require writing hundreds of CSS utility classes from scratch) and overly rigid component frameworks (which are hard to customize).
        </p>
        <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
          Simple Components UI bridges this gap by offering:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
            <div className="p-2 rounded-xl bg-teal-100 text-teal-700 dark:bg-blue-950 dark:text-blue-400 w-fit">
              <Zap size={18} />
            </div>
            <h3 className="text-sm font-bold">Plug-and-Play Simplicity</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Import pre-styled, animated components with zero boilerplate setup.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
            <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 w-fit">
              <Palette size={18} />
            </div>
            <h3 className="text-sm font-bold">iOS Glassmorphism & Variants</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Built-in frosted glass, bordered, and filled variants for stunning modern visual design.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
            <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 w-fit">
              <ShieldCheck size={18} />
            </div>
            <h3 className="text-sm font-bold">100% Type Safe</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Strict TypeScript definitions with full autocompletion for all props and event handlers.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
            <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 w-fit">
              <Layers size={18} />
            </div>
            <h3 className="text-sm font-bold">Compound API Pattern</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Flexible composition primitives for Menus, ContextMenus, Tables, and FormFields.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Snippet */}
      <section className="space-y-3 pt-4">
        <h2 className="text-xl font-bold tracking-tight">Quick Preview</h2>
        <CodeBlock
          code={`import { Button, Input, toast } from "@simple-components-ui/components";

export default function App() {
  return (
    <div className="space-y-4">
      <Input placeholder="Enter your email" clearable />
      <Button glow onClick={() => toast.success("Subscribed!")}>
        Subscribe
      </Button>
    </div>
  );
}`}
          language="tsx"
        />
      </section>

      {/* Next Navigation Callout */}
      <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
        <div />
        <Link
          href="/docs/installation"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white text-xs font-semibold transition-colors shadow-md"
        >
          <span>Installation Guide</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
