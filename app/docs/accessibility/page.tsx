import * as React from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/docs/breadcrumbs";
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Keyboard,
  Eye,
  Monitor,
} from "lucide-react";

export const metadata = {
  title: "Accessibility — Simple Components UI",
  description:
    "Learn about accessibility features, ARIA roles, and keyboard navigation in Simple Components UI.",
};

export default function AccessibilityPage() {
  return (
    <div className="space-y-8 select-none">
      <Breadcrumbs items={[{ title: "Accessibility" }]} />

      <div className="space-y-3 pb-6 border-b border-zinc-200 dark:border-zinc-800">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Accessibility (a11y)
        </h1>
        <p className="text-base text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
          Simple Components is built with WCAG standards and keyboard
          interaction in mind.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3">
          <div className="p-2.5 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 w-fit">
            <Keyboard size={20} />
          </div>
          <h3 className="text-base font-bold">Keyboard Navigation</h3>
          <ul className="text-xs text-zinc-600 dark:text-zinc-400 space-y-1.5 list-disc list-inside">
            <li>
              <strong>Escape Key</strong> dismisses Modals, Drawers,
              ContextMenus, and Popovers.
            </li>
            <li>
              <strong>Tab & Shift+Tab</strong> navigate through form controls
              seamlessly.
            </li>
            <li>
              <strong>Arrow Keys</strong> navigate Radio Groups, Select items,
              and Menus.
            </li>
            <li>
              <strong>Enter & Space</strong> toggle Switches, Checkboxes, and
              Buttons.
            </li>
          </ul>
        </div>

        <div className="p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3">
          <div className="p-2.5 rounded-2xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 w-fit">
            <ShieldCheck size={20} />
          </div>
          <h3 className="text-base font-bold">Focus Trap & Scroll Lock</h3>
          <ul className="text-xs text-zinc-600 dark:text-zinc-400 space-y-1.5 list-disc list-inside">
            <li>
              Modals and Drawers automatically lock background document
              scrolling when open.
            </li>
            <li>Focus is automatically captured within dialog overlays.</li>
            <li>
              Focus returns to the trigger button when overlay is dismissed.
            </li>
          </ul>
        </div>

        <div className="p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3">
          <div className="p-2.5 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 w-fit">
            <Eye size={20} />
          </div>
          <h3 className="text-base font-bold">ARIA Attributes</h3>
          <ul className="text-xs text-zinc-600 dark:text-zinc-400 space-y-1.5 list-disc list-inside">
            <li>
              <code className="font-mono text-blue-600">
                role=&quot;dialog&quot;
              </code>{" "}
              and{" "}
              <code className="font-mono text-blue-600">
                aria-modal=&quot;true&quot;
              </code>{" "}
              on Modal/Drawer panels.
            </li>
            <li>
              <code className="font-mono text-blue-600">htmlFor</code> ID
              linkage between FormLabels and Inputs.
            </li>
            <li>
              <code className="font-mono text-blue-600">aria-expanded</code> on
              Dropdowns and Select popovers.
            </li>
          </ul>
        </div>

        <div className="p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3">
          <div className="p-2.5 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 w-fit">
            <Monitor size={20} />
          </div>
          <h3 className="text-base font-bold">Color Contrast</h3>
          <ul className="text-xs text-zinc-600 dark:text-zinc-400 space-y-1.5 list-disc list-inside">
            <li>Accessible contrast ratios in both Light and Dark themes.</li>
            <li>
              Status badges use dual-layer background and text color pairs.
            </li>
            <li>Visible focus ring indicators for keyboard users.</li>
          </ul>
        </div>
      </div>

      {/* Next Navigation */}
      <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
        <Link
          href="/docs/theming"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-semibold hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Theming</span>
        </Link>
        <Link
          href="/docs/contributing"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors shadow-md"
        >
          <span>Contributing</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
