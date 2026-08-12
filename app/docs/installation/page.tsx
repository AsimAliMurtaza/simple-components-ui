import * as React from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/docs/breadcrumbs";
import { CodeBlock } from "@/components/docs/code-block";
import { ArrowLeft, ArrowRight, Terminal } from "lucide-react";

export const metadata = {
  title: "Installation — Simple Components UI",
  description:
    "How to install and configure @simple-components-ui/components in your React / Next.js project.",
};

export default function InstallationPage() {
  return (
    <div className="space-y-8 select-none">
      <Breadcrumbs items={[{ title: "Installation" }]} />

      <div className="space-y-3 pb-6 border-b border-zinc-200 dark:border-zinc-800">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Installation
        </h1>
        <p className="text-base text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
          Add Simple Components to your project using npm, yarn, or pnpm.
        </p>
      </div>

      {/* Step 1: Install Package */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
          <Terminal size={18} className="text-teal-600 dark:text-blue-500" />
          1. Install NPM Package
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
          Run the following command in your terminal to install the published
          library package:
        </p>

        <CodeBlock
          code="npm install @simple-components-ui/components"
          language="bash"
        />

        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Or using pnpm or yarn:
        </p>

        <CodeBlock
          code="pnpm add @simple-components-ui/components"
          language="bash"
        />
      </section>

      {/* Step 2: Peer Dependencies */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight">
          2. Peer Dependencies
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
          Simple Components relies on <strong>Framer Motion</strong> for
          animations and <strong>Lucide React</strong> for icons. Ensure they
          are installed in your project:
        </p>

        <CodeBlock
          code="npm install framer-motion lucide-react clsx tailwind-merge"
          language="bash"
        />
      </section>

      {/* Step 3: Styles & Tailwind Setup */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight">
          3. Configure CSS Styles
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
          Import Tailwind CSS in your global stylesheet (`globals.css` or
          `app/globals.css`).
        </p>

        <CodeBlock
          code={`@import "tailwindcss";

/* Optional Dark Mode variant support */
@custom-variant dark (&:is(.dark *));`}
          language="css"
          filename="globals.css"
        />
      </section>

      {/* Step 4: Verification */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight">4. Verify Setup</h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
          Import and render a component in your page or component file:
        </p>

        <CodeBlock
          code={`import { Button, ToastProvider } from "@simple-components-ui/components";

export default function App() {
  return (
    <ToastProvider>
      <div className="p-8">
        <Button variant="default" glow>
          Hello World
        </Button>
      </div>
    </ToastProvider>
  );
}`}
          language="tsx"
        />
      </section>

      {/* Next / Prev Navigation */}
      <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
        <Link
          href="/docs"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-semibold hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Introduction</span>
        </Link>
        <Link
          href="/docs/getting-started"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white text-xs font-semibold transition-colors shadow-md"
        >
          <span>Quickstart Guide</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
