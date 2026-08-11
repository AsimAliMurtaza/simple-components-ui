"use client";

import * as React from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/docs/breadcrumbs";
import { ComponentPreview } from "@/components/docs/component-preview";
import { Button, Input, Form, FormField, toast } from "@/index";
import { ArrowLeft, ArrowRight, CheckCircle2, User, Mail } from "lucide-react";

export default function GettingStartedPage() {
  const [formData, setFormData] = React.useState({ name: "", email: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Welcome, ${formData.name || "User"}!`, {
      description: "Your registration was successful.",
      variant: "ios-glass",
    });
  };

  return (
    <div className="space-y-8 select-none">
      <Breadcrumbs items={[{ title: "Quickstart" }]} />

      <div className="space-y-3 pb-6 border-b border-zinc-200 dark:border-zinc-800">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Quickstart Guide
        </h1>
        <p className="text-base text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
          Learn how to quickly build interactive forms, notifications, and modal overlays using Simple Components UI in under 2 minutes.
        </p>
      </div>

      {/* Step Checklist */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-teal-700 dark:text-blue-400">
            <CheckCircle2 size={14} /> Step 1
          </div>
          <p className="text-xs font-semibold">Install Package</p>
          <p className="text-[11px] text-zinc-500">npm install @simple-components-ui/components</p>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-purple-600 dark:text-purple-400">
            <CheckCircle2 size={14} /> Step 2
          </div>
          <p className="text-xs font-semibold">Import ToastProvider</p>
          <p className="text-[11px] text-zinc-500">Wrap root app layout with ToastProvider</p>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 size={14} /> Step 3
          </div>
          <p className="text-xs font-semibold">Use Components</p>
          <p className="text-[11px] text-zinc-500">Import Form, Input, Button, Modal</p>
        </div>
      </div>

      {/* Interactive Example Preview */}
      <section className="space-y-4 pt-4">
        <h2 className="text-xl font-bold tracking-tight">Interactive Quickstart Demo</h2>

        <ComponentPreview
          code={`import { Form, FormField, Input, Button, toast } from "@simple-components-ui/components";

export default function RegisterForm() {
  const [formData, setFormData] = React.useState({ name: "", email: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(\`Welcome, \${formData.name}!\`, {
      description: "Registration completed successfully.",
    });
  };

  return (
    <Form onSubmit={handleSubmit} className="max-w-md w-full space-y-4">
      <FormField label="Full Name" required>
        <Input
          placeholder="Jane Doe"
          leftAdornment={<User size={16} />}
          value={formData.name}
          onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
          clearable
        />
      </FormField>

      <FormField label="Email Address" required>
        <Input
          type="email"
          placeholder="jane@example.com"
          leftAdornment={<Mail size={16} />}
          value={formData.email}
          onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
        />
      </FormField>

      <Button type="submit" variant="default" glow className="w-full">
        Register Account
      </Button>
    </Form>
  );
}`}
        >
          <Form onSubmit={handleSubmit} className="max-w-md w-full space-y-4 p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <FormField label="Full Name" required>
              <Input
                placeholder="Jane Doe"
                leftAdornment={<User size={16} />}
                value={formData.name}
                onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                clearable
              />
            </FormField>

            <FormField label="Email Address" required>
              <Input
                type="email"
                placeholder="jane@example.com"
                leftAdornment={<Mail size={16} />}
                value={formData.email}
                onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
              />
            </FormField>

            <Button type="submit" variant="default" glow className="w-full">
              Register Account
            </Button>
          </Form>
        </ComponentPreview>
      </section>

      {/* Next Navigation */}
      <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
        <Link
          href="/docs/installation"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-semibold hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Installation</span>
        </Link>
        <Link
          href="/docs/theming"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white text-xs font-semibold transition-colors shadow-md"
        >
          <span>Theming Guide</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
