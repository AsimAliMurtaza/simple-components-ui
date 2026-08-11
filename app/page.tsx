"use client";

import * as React from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Terminal,
  ShieldCheck,
  Zap,
  Palette,
  Layers,
  Github,
  Copy,
  Check,
  Database,
  MousePointer,
  Code2,
  User,
} from "lucide-react";
import {
  Button,
  Input,
  Badge,
  Avatar,
  AvatarGroup,
} from "@/index";
import { DocHeader } from "@/components/docs/doc-header";

export default function LandingPage() {
  const [copied, setCopied] = React.useState(false);

  const copyInstall = async () => {
    await navigator.clipboard.writeText("npm install @simple-components-ui/components");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col font-sans select-none transition-colors duration-200">
      <DocHeader />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 sm:px-6 max-w-6xl mx-auto w-full text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200 dark:bg-zinc-900 dark:border-zinc-800 dark:text-teal-400 text-xs font-semibold shadow-sm">
          <Sparkles size={14} />
          <span>v0.3.0 Published on NPM</span>
        </div>

        <div className="space-y-4 max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.1]">
            Simple Components UI
          </h1>
          <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Reusable React components for building modern, fast, and responsive web applications.
          </p>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            href="/docs/getting-started"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-teal-600 hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-700 text-white font-semibold text-sm transition-colors shadow-lg shadow-teal-500/20 cursor-pointer"
          >
            <span>Get Started</span>
            <ArrowRight size={16} />
          </Link>

          <Link
            href="/docs/components"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 font-semibold text-sm hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <span>View Components</span>
          </Link>
        </div>

        {/* NPM Command Bar */}
        <div className="pt-4 max-w-md mx-auto">
          <div className="flex items-center justify-between p-3 px-4 rounded-2xl bg-zinc-900 text-zinc-100 font-mono text-xs shadow-xl border border-zinc-800">
            <div className="flex items-center gap-2">
              <Terminal size={14} className="text-teal-400 shrink-0" />
              <span className="text-zinc-300">npm install @simple-components-ui/components</span>
            </div>
            <button
              type="button"
              onClick={copyInstall}
              className="p-1 rounded-lg hover:bg-zinc-800 transition-colors text-zinc-400 hover:text-white"
              title="Copy command"
            >
              {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
            </button>
          </div>
        </div>
      </section>

      {/* Component Showcase Gallery */}
      <section className="py-16 px-4 sm:px-6 max-w-6xl mx-auto w-full space-y-8">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Built for Modern Web Applications
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Over 30+ production-ready components categorized into clean design suites.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Form Suite */}
          <Link
            href="/docs/components/input"
            className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-teal-500 dark:hover:border-teal-500/50 shadow-md space-y-4 group transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-2xl bg-teal-50 dark:bg-zinc-800 text-teal-600 dark:text-teal-400">
                <Layers size={20} />
              </div>
              <span className="text-xs font-mono text-zinc-400 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                Form Suite →
              </span>
            </div>
            <div>
              <h3 className="text-base font-bold">Form Controls</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                Input, Textarea, Select, Checkbox, RadioGroup, Switch, Slider, FileUpload.
              </p>
            </div>
            <div className="pt-2 space-y-2 pointer-events-none">
              <Input placeholder="Enter username..." leftAdornment={<User size={14} />} size="sm" />
              <Button size="sm" variant="default" className="w-full">
                Submit
              </Button>
            </div>
          </Link>

          {/* Card 2: Overlay Suite */}
          <Link
            href="/docs/components/modal"
            className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-purple-500/50 shadow-md space-y-4 group transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-2xl bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400">
                <MousePointer size={20} />
              </div>
              <span className="text-xs font-mono text-zinc-400 group-hover:text-purple-500 transition-colors">
                Overlay Suite →
              </span>
            </div>
            <div>
              <h3 className="text-base font-bold">Overlays & Dialogs</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                Modal, Drawer, Popover, Tooltip, Dropdown Menu, Context Menu.
              </p>
            </div>
            <div className="pt-2 flex items-center justify-center gap-2 pointer-events-none">
              <Badge intent="purple" variant="soft">Modal Dialog</Badge>
              <Badge intent="primary" variant="soft">Drawer Panel</Badge>
            </div>
          </Link>

          {/* Card 3: Data Suite */}
          <Link
            href="/docs/components/data-table"
            className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500/50 shadow-md space-y-4 group transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                <Database size={20} />
              </div>
              <span className="text-xs font-mono text-zinc-400 group-hover:text-emerald-500 transition-colors">
                Data Suite →
              </span>
            </div>
            <div>
              <h3 className="text-base font-bold">Data Table & Display</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                DataTable, Sorting, Searching, Pagination, Badges, Avatar & Group, Timeline.
              </p>
            </div>
            <div className="pt-2 flex items-center justify-between pointer-events-none">
              <AvatarGroup max={3} size="sm">
                <Avatar name="Jane Doe" />
                <Avatar name="Alex Rivera" />
                <Avatar name="Sarah Chen" />
              </AvatarGroup>
              <Badge intent="success" variant="dot">Active</Badge>
            </div>
          </Link>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="py-16 bg-zinc-50/60 dark:bg-zinc-900/40 border-y border-zinc-200/80 dark:border-zinc-800/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Designed for Developer Productivity
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Key characteristics that make Simple Components UI a pleasure to use.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="space-y-2">
              <div className="p-2 rounded-xl bg-teal-100 text-teal-700 dark:bg-zinc-800 dark:text-teal-400 w-fit">
                <Zap size={20} />
              </div>
              <h3 className="text-base font-bold">React + TypeScript</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Written natively in TypeScript with strict prop typing and full autocomplete in IDEs.
              </p>
            </div>

            <div className="space-y-2">
              <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 w-fit">
                <Palette size={20} />
              </div>
              <h3 className="text-base font-bold">Tailwind CSS Styling</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Uses Tailwind utility classes and CSS variables with effortless light & dark mode support.
              </p>
            </div>

            <div className="space-y-2">
              <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 w-fit">
                <Sparkles size={20} />
              </div>
              <h3 className="text-base font-bold">Framer Motion Animations</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Smooth micro-interactions, scale entrance physics, and fluid transitions.
              </p>
            </div>

            <div className="space-y-2">
              <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 w-fit">
                <ShieldCheck size={20} />
              </div>
              <h3 className="text-base font-bold">Accessibility Conscious</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Keyboard ESC key listeners, focus lock on modal overlays, and ARIA dialog attributes.
              </p>
            </div>

            <div className="space-y-2">
              <div className="p-2 rounded-xl bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 w-fit">
                <Layers size={20} />
              </div>
              <h3 className="text-base font-bold">Reusable APIs</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Compound primitives for Menus, ContextMenus, Tables, and FormFields.
              </p>
            </div>

            <div className="space-y-2">
              <div className="p-2 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 w-fit">
                <Code2 size={20} />
              </div>
              <h3 className="text-base font-bold">Open Source & Free</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Licensed under MIT and available publicly on npm as @simple-components-ui/components.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* GitHub CTA Footer Banner */}
      <section className="py-16 px-4 sm:px-6 max-w-4xl mx-auto w-full text-center space-y-6">
        <div className="p-8 sm:p-12 rounded-3xl bg-teal-600 dark:bg-zinc-900 border border-teal-700 dark:border-zinc-800 text-white shadow-2xl space-y-4">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Ready to Build Your Application?
          </h2>
          <p className="text-sm opacity-90 max-w-lg mx-auto">
            Explore our comprehensive documentation or install the library package directly from npm.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/docs"
              className="px-6 py-3 rounded-2xl bg-white text-teal-800 dark:text-zinc-900 font-semibold text-xs hover:bg-zinc-100 transition-colors shadow-lg cursor-pointer"
            >
              Read Documentation
            </Link>
            <a
              href="https://github.com/AsimAliMurtaza/simple-components-ui"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-2xl bg-teal-700 dark:bg-zinc-800 border border-teal-500 dark:border-zinc-700 text-white font-semibold text-xs hover:bg-teal-800 dark:hover:bg-zinc-700 transition-colors flex items-center gap-1.5"
            >
              <Github size={15} />
              GitHub
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
