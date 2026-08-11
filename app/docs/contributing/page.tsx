import * as React from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/docs/breadcrumbs";
import { CodeBlock } from "@/components/docs/code-block";
import { ArrowLeft, ArrowRight, Terminal, Code2 } from "lucide-react";

export const metadata = {
  title: "Contributing — Simple Components UI",
  description: "Guidelines and instructions for contributing to Simple Components UI.",
};

export default function ContributingPage() {
  return (
    <div className="space-y-8 select-none">
      <Breadcrumbs items={[{ title: "Contributing" }]} />

      <div className="space-y-3 pb-6 border-b border-zinc-200 dark:border-zinc-800">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Contributing
        </h1>
        <p className="text-base text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
          Thank you for considering contributing to Simple Components UI! We welcome bug fixes, new component requests, documentation updates, and performance improvements.
        </p>
      </div>

      {/* Local Development Setup */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
          <Terminal size={18} className="text-blue-500" />
          Local Development Setup
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
          1. Clone the repository and install project dependencies:
        </p>

        <CodeBlock
          code={`git clone https://github.com/AsimAliMurtaza/simple-components-ui.git
cd simple-components-ui
npm install`}
          language="bash"
        />

        <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
          2. Start the local Next.js documentation & showcase server:
        </p>

        <CodeBlock code="npm run dev" language="bash" />
      </section>

      {/* Verification */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
          <Code2 size={18} className="text-emerald-500" />
          Building & Testing
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
          Before submitting a pull request, ensure the npm package build compiles without TypeScript errors:
        </p>

        <CodeBlock code="npm run build" language="bash" />
      </section>

      {/* Next Navigation */}
      <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
        <Link
          href="/docs/accessibility"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-semibold hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Accessibility</span>
        </Link>
        <Link
          href="/docs/components"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors shadow-md"
        >
          <span>Component Directory</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
