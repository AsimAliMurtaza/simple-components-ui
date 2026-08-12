export interface NavItem {
  title: string;
  href: string;
  badge?: string;
  isNew?: boolean;
}

export interface NavCategory {
  title: string;
  items: NavItem[];
}

export interface PropDefinition {
  name: string;
  type: string;
  default?: string;
  description: string;
  required?: boolean;
}

export interface ComponentDoc {
  slug: string;
  title: string;
  description: string;
  category: "Forms" | "Overlays" | "Feedback" | "Data Display" | "Layout" | "Navigation" | "Drag & Drop" | "General";
  usageCode: string;
  props: PropDefinition[];
  variants?: { name: string; description?: string }[];
}

export const docsConfig: { nav: NavCategory[]; components: Record<string, ComponentDoc> } = {
  nav: [
    {
      title: "Getting Started",
      items: [
        { title: "Introduction", href: "/docs" },
        { title: "Installation", href: "/docs/installation" },
        { title: "Quickstart", href: "/docs/getting-started" },
        { title: "Theming & Styling", href: "/docs/theming" },
        { title: "Accessibility", href: "/docs/accessibility" },
        { title: "Contributing", href: "/docs/contributing" },
      ],
    },
    {
      title: "General & Base UI",
      items: [
        { title: "Button", href: "/docs/components/button" },
        { title: "Text", href: "/docs/components/text" },
      ],
    },
    {
      title: "Layout Suite",
      items: [
        { title: "Container", href: "/docs/components/container" },
        { title: "Stack", href: "/docs/components/stack" },
        { title: "Grid Layout", href: "/docs/components/grid-layout" },
        { title: "Split Pane", href: "/docs/components/split-pane", badge: "Interactive" },
        { title: "Resizable Panel", href: "/docs/components/resizable-panel", badge: "Interactive" },
        { title: "Scroll Area", href: "/docs/components/scroll-area" },
      ],
    },
    {
      title: "Navigation Suite",
      items: [
        { title: "Navbar", href: "/docs/components/navbar" },
        { title: "Sidebar", href: "/docs/components/sidebar" },
        { title: "Tabs", href: "/docs/components/tabs", badge: "Animated" },
        { title: "Breadcrumb", href: "/docs/components/breadcrumb" },
        { title: "Stepper", href: "/docs/components/stepper" },
      ],
    },
    {
      title: "Form Suite",
      items: [
        { title: "Form & FormField", href: "/docs/components/form" },
        { title: "Input", href: "/docs/components/input" },
        { title: "Textarea", href: "/docs/components/textarea" },
        { title: "Select", href: "/docs/components/select" },
        { title: "Checkbox", href: "/docs/components/checkbox" },
        { title: "Radio Group", href: "/docs/components/radio-group" },
        { title: "Switch", href: "/docs/components/switch" },
        { title: "Slider", href: "/docs/components/slider" },
        { title: "File Upload", href: "/docs/components/file-upload" },
      ],
    },
    {
      title: "Overlay Suite",
      items: [
        { title: "Modal", href: "/docs/components/modal" },
        { title: "Drawer", href: "/docs/components/drawer" },
        { title: "Popover", href: "/docs/components/popover" },
        { title: "Tooltip", href: "/docs/components/tooltip" },
        { title: "Dropdown Menu", href: "/docs/components/dropdown" },
        { title: "Context Menu", href: "/docs/components/context-menu" },
      ],
    },
    {
      title: "Feedback Suite",
      items: [
        { title: "Alert Banner", href: "/docs/components/alert" },
        { title: "Toast System", href: "/docs/components/toast" },
        { title: "Snackbar", href: "/docs/components/snackbar" },
        { title: "Progress Bar & Ring", href: "/docs/components/progress" },
        { title: "Spinner", href: "/docs/components/spinner" },
        { title: "Skeleton", href: "/docs/components/skeleton" },
      ],
    },
    {
      title: "Data Display Suite",
      items: [
        { title: "Data Table", href: "/docs/components/data-table", badge: "Full Featured" },
        { title: "Table", href: "/docs/components/table" },
        { title: "Pagination", href: "/docs/components/pagination" },
        { title: "Filter Bar", href: "/docs/components/filter-bar" },
        { title: "Search Input", href: "/docs/components/search" },
        { title: "Badge", href: "/docs/components/badge" },
        { title: "Avatar & Group", href: "/docs/components/avatar" },
        { title: "Timeline", href: "/docs/components/timeline" },
        { title: "Empty State", href: "/docs/components/empty-state" },
      ],
    },
    {
      title: "Layout & Drag & Drop",
      items: [
        { title: "Draggable Grid", href: "/docs/components/dnd-grid", badge: "Interactive" },
      ],
    },
  ],

  components: {
    button: {
      slug: "button",
      title: "Button",
      description: "Interactive button component supporting rich visual variants, size presets, glow effects, loading states, and left/right icon slots.",
      category: "General",
      usageCode: `import { Button } from "@simple-components-ui/components";

export default function Example() {
  return (
    <Button variant="default" size="default" glow>
      Get Started
    </Button>
  );
}`,
      props: [
        { name: "variant", type: '"default" | "secondary" | "outline" | "ghost" | "destructive" | "gradient" | "neon" | "glass" | "ios-glass"', default: '"default"', description: "Visual variant theme." },
        { name: "size", type: '"default" | "sm" | "lg" | "xl" | "icon"', default: '"default"', description: "Button dimensions padding and typography size." },
        { name: "glow", type: "boolean", default: "false", description: "Adds subtle pulse glow shadow under button." },
        { name: "loading", type: "boolean", default: "false", description: "Displays animated loading spinner inside button." },
        { name: "disabled", type: "boolean", default: "false", description: "Disables interaction and reduces opacity." },
        { name: "leftIcon", type: "React.ReactNode", description: "Icon rendered before button text." },
        { name: "rightIcon", type: "React.ReactNode", description: "Icon rendered after button text." },
      ],
    },

    text: {
      slug: "text",
      title: "Text Typography",
      description: "Polished typography component supporting semantic tags (p, h1..h6, span), size options, font weights, color variants, and text truncation.",
      category: "General",
      usageCode: `import { Text } from "@simple-components-ui/components";

export default function Example() {
  return (
    <Text as="h2" size="2xl" weight="bold" variant="gradient">
      Headline Title
    </Text>
  );
}`,
      props: [
        { name: "as", type: '"p" | "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div" | "label"', default: '"p"', description: "Underlying HTML element tag to render." },
        { name: "size", type: '"xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl"', default: '"base"', description: "Font size scale." },
        { name: "weight", type: '"normal" | "medium" | "semibold" | "bold" | "extrabold"', default: '"normal"', description: "Typography font weight." },
        { name: "variant", type: '"default" | "muted" | "subtle" | "accent" | "gradient" | "success" | "danger" | "warning"', default: '"default"', description: "Color theme variant." },
        { name: "align", type: '"left" | "center" | "right" | "justify"', default: '"left"', description: "Text alignment." },
        { name: "truncate", type: "boolean", default: "false", description: "Truncates single line text with ellipsis." },
      ],
    },

    container: {
      slug: "container",
      title: "Container",
      description: "Responsive layout max-width wrapper component with padding choices, centered auto margins, and glass surface variants.",
      category: "Layout",
      usageCode: `import { Container } from "@simple-components-ui/components";

export default function Example() {
  return (
    <Container size="7xl" padding="md" variant="ios-glass">
      <div>Container Content Area</div>
    </Container>
  );
}`,
      props: [
        { name: "size", type: '"sm" | "md" | "lg" | "xl" | "2xl" | "7xl" | "full"', default: '"7xl"', description: "Maximum container width constraint." },
        { name: "padding", type: '"none" | "sm" | "md" | "lg"', default: '"md"', description: "Internal padding spacing." },
        { name: "centered", type: "boolean", default: "true", description: "Centers container horizontally using mx-auto." },
        { name: "variant", type: '"default" | "bordered" | "glass" | "ios-glass"', default: '"default"', description: "Container surface styling." },
      ],
    },

    stack: {
      slug: "stack",
      title: "Stack",
      description: "Flexbox layout component for organizing elements vertically or horizontally with uniform spacing, alignment, and optional dividers.",
      category: "Layout",
      usageCode: `import { Stack, Button } from "@simple-components-ui/components";

export default function Example() {
  return (
    <Stack direction="row" gap={4} align="center" justify="between">
      <Button variant="outline">Cancel</Button>
      <Button variant="default">Save Changes</Button>
    </Stack>
  );
}`,
      props: [
        { name: "direction", type: '"col" | "row"', default: '"col"', description: "Flex direction layout." },
        { name: "gap", type: "0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12", default: "4", description: "Spacing gap between child items." },
        { name: "align", type: '"start" | "center" | "end" | "stretch" | "baseline"', default: '"stretch"', description: "Cross-axis alignment (items-center, etc)." },
        { name: "justify", type: '"start" | "center" | "end" | "between" | "around" | "evenly"', default: '"start"', description: "Main-axis distribution (justify-between, etc)." },
        { name: "wrap", type: "boolean", default: "false", description: "Enables flex-wrap for multiline wrapping." },
        { name: "divider", type: "boolean", default: "false", description: "Renders clean divider lines between stacked items." },
      ],
    },

    "grid-layout": {
      slug: "grid-layout",
      title: "Grid Layout",
      description: "CSS Grid container component with column count presets and responsive breakpoint props.",
      category: "Layout",
      usageCode: `import { Grid } from "@simple-components-ui/components";

export default function Example() {
  return (
    <Grid cols={1} smCols={2} lgCols={4} gap={4}>
      <div>Card 1</div>
      <div>Card 2</div>
      <div>Card 3</div>
      <div>Card 4</div>
    </Grid>
  );
}`,
      props: [
        { name: "cols", type: "1 | 2 | 3 | 4 | 5 | 6 | 12", default: "1", description: "Base column count." },
        { name: "smCols", type: "1 | 2 | 3 | 4 | 5 | 6 | 12", description: "Small breakpoint column count (sm:grid-cols-X)." },
        { name: "mdCols", type: "1 | 2 | 3 | 4 | 5 | 6 | 12", description: "Medium breakpoint column count (md:grid-cols-X)." },
        { name: "lgCols", type: "1 | 2 | 3 | 4 | 5 | 6 | 12", description: "Large breakpoint column count (lg:grid-cols-X)." },
        { name: "gap", type: "0 | 1 | 2 | 3 | 4 | 6 | 8 | 12", default: "4", description: "Grid gap spacing." },
      ],
    },

    "split-pane": {
      slug: "split-pane",
      title: "Split Pane",
      description: "Interactive two-pane container supporting horizontal or vertical orientation with mouse drag resizing handle.",
      category: "Layout",
      usageCode: `import { SplitPane } from "@simple-components-ui/components";

export default function Example() {
  return (
    <SplitPane
      orientation="horizontal"
      defaultSplit={40}
      left={<div className="p-4">Left Sidebar</div>}
      right={<div className="p-4">Right Main Panel</div>}
      variant="ios-glass"
    />
  );
}`,
      props: [
        { name: "left", type: "React.ReactNode", required: true, description: "Left (or Top) pane content." },
        { name: "right", type: "React.ReactNode", required: true, description: "Right (or Bottom) pane content." },
        { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Split axis direction." },
        { name: "defaultSplit", type: "number", default: "50", description: "Initial split ratio percentage (10..90)." },
        { name: "minSplit", type: "number", default: "15", description: "Minimum split percentage threshold." },
        { name: "maxSplit", type: "number", default: "85", description: "Maximum split percentage threshold." },
        { name: "variant", type: '"default" | "bordered" | "glass" | "ios-glass"', default: '"bordered"', description: "Pane container surface variant." },
      ],
    },

    "resizable-panel": {
      slug: "resizable-panel",
      title: "Resizable Panel",
      description: "Collapsible and resizable sidebar panel with drag handle, expand/collapse button, and min/max width bounds.",
      category: "Layout",
      usageCode: `import { ResizablePanel } from "@simple-components-ui/components";

export default function Example() {
  return (
    <ResizablePanel defaultWidth={280} minWidth={180} maxWidth={400} side="left" variant="ios-glass">
      <div className="p-4">Panel Content</div>
    </ResizablePanel>
  );
}`,
      props: [
        { name: "defaultWidth", type: "number", default: "260", description: "Default width in pixels." },
        { name: "minWidth", type: "number", default: "160", description: "Minimum draggable width." },
        { name: "maxWidth", type: "number", default: "480", description: "Maximum draggable width." },
        { name: "side", type: '"left" | "right"', default: '"left"', description: "Panel positioning side." },
        { name: "collapsible", type: "boolean", default: "true", description: "Enables collapse/expand toggle button." },
        { name: "variant", type: '"default" | "bordered" | "glass" | "ios-glass"', default: '"bordered"', description: "Surface styling variant." },
      ],
    },

    "scroll-area": {
      slug: "scroll-area",
      title: "Scroll Area",
      description: "Custom scrollbar container with smooth styled scrollbars matching dark and light themes.",
      category: "Layout",
      usageCode: `import { ScrollArea } from "@simple-components-ui/components";

export default function Example() {
  return (
    <ScrollArea maxHeight="250px" scrollbarVariant="ios-glass">
      <div className="p-4 space-y-2">
        <p>Long content list item 1...</p>
        <p>Long content list item 2...</p>
      </div>
    </ScrollArea>
  );
}`,
      props: [
        { name: "maxHeight", type: "string | number", default: '"350px"', description: "Maximum container height boundary." },
        { name: "orientation", type: '"vertical" | "horizontal" | "both"', default: '"vertical"', description: "Scroll axis direction." },
        { name: "scrollbarVariant", type: '"default" | "minimal" | "ios-glass"', default: '"default"', description: "Scrollbar thumb and track styling." },
      ],
    },

    navbar: {
      slug: "navbar",
      title: "Navbar",
      description: "Top navigation bar component supporting logo slot, nav links, action slot, sticky position, mobile drawer toggle, and glassmorphism.",
      category: "Navigation",
      usageCode: `import { Navbar, Button } from "@simple-components-ui/components";

const navItems = [
  { label: "Home", href: "#", active: true },
  { label: "Features", href: "#" },
  { label: "Pricing", href: "#" },
];

export default function Example() {
  return (
    <Navbar
      logo={<span className="font-bold">MyBrand</span>}
      items={navItems}
      actions={<Button size="sm">Sign In</Button>}
      variant="ios-glass"
    />
  );
}`,
      props: [
        { name: "logo", type: "React.ReactNode", description: "Left logo slot element." },
        { name: "items", type: "NavItemDef[]", description: "Array of nav link objects." },
        { name: "actions", type: "React.ReactNode", description: "Right action buttons slot." },
        { name: "sticky", type: "boolean", default: "true", description: "Fixes navbar to top of viewport." },
        { name: "variant", type: '"default" | "bordered" | "glass" | "ios-glass"', default: '"ios-glass"', description: "Navbar surface theme." },
      ],
    },

    sidebar: {
      slug: "sidebar",
      title: "Sidebar Navigation",
      description: "Vertical navigation sidebar with item groups, active highlight, collapse toggle, and badge indicators.",
      category: "Navigation",
      usageCode: `import { Sidebar } from "@simple-components-ui/components";
import { Home, Settings, Users } from "lucide-react";

const groups = [
  {
    title: "Main",
    items: [
      { id: "dash", label: "Dashboard", icon: <Home size={16} />, active: true },
      { id: "users", label: "Users", icon: <Users size={16} />, badge: "12" },
    ],
  },
];

export default function Example() {
  return <Sidebar groups={groups} variant="ios-glass" />;
}`,
      props: [
        { name: "groups", type: "SidebarGroupDef[]", required: true, description: "Array of item groups with titles and nav items." },
        { name: "header", type: "React.ReactNode", description: "Top header brand slot." },
        { name: "footer", type: "React.ReactNode", description: "Bottom user profile / footer slot." },
        { name: "collapsible", type: "boolean", default: "true", description: "Shows collapse sidebar toggle button." },
        { name: "defaultCollapsed", type: "boolean", default: "false", description: "Initial collapsed state on render." },
        { name: "variant", type: '"default" | "bordered" | "glass" | "ios-glass"', default: '"bordered"', description: "Sidebar surface variant." },
      ],
    },

    tabs: {
      slug: "tabs",
      title: "Tabs",
      description: "Interactive tab navigation component with Framer Motion animated active tab indicator slider.",
      category: "Navigation",
      usageCode: `import { Tabs } from "@simple-components-ui/components";

const tabs = [
  { id: "account", label: "Account" },
  { id: "password", label: "Password" },
  { id: "notifications", label: "Notifications", badge: "2" },
];

export default function Example() {
  return <Tabs items={tabs} variant="pill" defaultTab="account" />;
}`,
      props: [
        { name: "items", type: "TabItemDef[]", required: true, description: "Array of tab item objects." },
        { name: "activeTab", type: "string", description: "Controlled active tab ID." },
        { name: "defaultTab", type: "string", description: "Uncontrolled initial active tab ID." },
        { name: "onTabChange", type: "(id: string) => void", description: "Callback triggered when active tab changes." },
        { name: "variant", type: '"pill" | "line" | "card" | "ios-glass"', default: '"pill"', description: "Tab bar visual style." },
        { name: "fullWidth", type: "boolean", default: "false", description: "Stretches tab buttons to fill container width." },
      ],
    },

    breadcrumb: {
      slug: "breadcrumb",
      title: "Breadcrumb Navigation",
      description: "Standalone breadcrumb trail component supporting custom separator icons, home icon, and middle truncation.",
      category: "Navigation",
      usageCode: `import { Breadcrumb } from "@simple-components-ui/components";

const items = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Settings", href: "/settings" },
  { label: "Team Permissions", current: true },
];

export default function Example() {
  return <Breadcrumb items={items} separator="chevron" showHomeIcon />;
}`,
      props: [
        { name: "items", type: "BreadcrumbItemDef[]", required: true, description: "Array of breadcrumb items." },
        { name: "separator", type: '"chevron" | "slash" | "arrow" | "dot"', default: '"chevron"', description: "Separator icon character." },
        { name: "showHomeIcon", type: "boolean", default: "true", description: "Displays home icon as first item." },
        { name: "homeHref", type: "string", default: '"/"', description: "Link destination for home icon." },
        { name: "maxItems", type: "number", default: "4", description: "Maximum items before middle truncation." },
      ],
    },

    stepper: {
      slug: "stepper",
      title: "Stepper",
      description: "Multi-step process workflow indicator with completed, active, and pending step states and animated connector lines.",
      category: "Navigation",
      usageCode: `import { Stepper } from "@simple-components-ui/components";

const steps = [
  { id: "1", title: "Account Details", description: "Enter personal info" },
  { id: "2", title: "Payment Info", description: "Add credit card" },
  { id: "3", title: "Review & Submit", description: "Confirm order" },
];

export default function Example() {
  return <Stepper steps={steps} activeStep={1} orientation="horizontal" clickable />;
}`,
      props: [
        { name: "steps", type: "StepDef[]", required: true, description: "Array of step definitions." },
        { name: "activeStep", type: "number", default: "0", description: "Index of currently active step (0-indexed)." },
        { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Stepper layout orientation." },
        { name: "onStepClick", type: "(index: number) => void", description: "Callback when step is clicked." },
        { name: "clickable", type: "boolean", default: "false", description: "Allows user to click steps to jump." },
      ],
    },

    form: {
      slug: "form",
      title: "Form & FormField",
      description: "Form layout wrapper and accessible FormField component supporting labels, error messages, hint texts, and required indicators.",
      category: "Forms",
      usageCode: `import { Form, FormField, Input, Button } from "@simple-components-ui/components";

export default function Example() {
  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <FormField label="Email" required hint="We'll never share your email.">
        <Input type="email" placeholder="you@example.com" />
      </FormField>
      <Button type="submit">Submit</Button>
    </Form>
  );
}`,
      props: [
        { name: "label", type: "string", description: "Label text for the input field." },
        { name: "error", type: "string", description: "Validation error message text." },
        { name: "hint", type: "string", description: "Subtle hint or helper text." },
        { name: "required", type: "boolean", default: "false", description: "Shows red asterisk required indicator." },
        { name: "optional", type: "boolean", default: "false", description: "Shows (optional) text badge." },
        { name: "onSubmit", type: "(e: React.FormEvent) => void", description: "Form submit event handler." },
      ],
    },

    input: {
      slug: "input",
      title: "Input",
      description: "Form text input component with clearable button, password visibility toggle, size choices, and left/right adornments.",
      category: "Forms",
      usageCode: `import { Input } from "@simple-components-ui/components";
import { Mail } from "lucide-react";

export default function Example() {
  return (
    <Input
      type="email"
      placeholder="alex@company.com"
      leftAdornment={<Mail size={16} />}
      clearable
    />
  );
}`,
      props: [
        { name: "variant", type: '"default" | "bordered" | "filled" | "glass" | "ios-glass"', default: '"default"', description: "Styling variant." },
        { name: "size", type: '"sm" | "default" | "lg"', default: '"default"', description: "Input height and font size." },
        { name: "status", type: '"default" | "error" | "success" | "warning"', default: '"default"', description: "Status outline highlight indicator." },
        { name: "clearable", type: "boolean", default: "false", description: "Shows clear button when text is present." },
        { name: "leftAdornment", type: "React.ReactNode", description: "Prefix element inside input field." },
        { name: "rightAdornment", type: "React.ReactNode", description: "Suffix element inside input field." },
      ],
    },

    textarea: {
      slug: "textarea",
      title: "Textarea",
      description: "Multi-line text area component supporting automatic vertical height resizing, character counter, and status outlines.",
      category: "Forms",
      usageCode: `import { Textarea } from "@simple-components-ui/components";

export default function Example() {
  return (
    <Textarea
      placeholder="Write your feedback..."
      rows={4}
      autoResize
      showCount
      maxLength={200}
    />
  );
}`,
      props: [
        { name: "variant", type: '"default" | "bordered" | "filled" | "glass" | "ios-glass"', default: '"default"', description: "Visual variant." },
        { name: "size", type: '"sm" | "default" | "lg"', default: '"default"', description: "Padding and font size." },
        { name: "status", type: '"default" | "error" | "success" | "warning"', default: '"default"', description: "Status outline border." },
        { name: "autoResize", type: "boolean", default: "false", description: "Automatically resizes vertical height on input typing." },
        { name: "showCount", type: "boolean", default: "false", description: "Displays live character counter badge." },
        { name: "maxLength", type: "number", description: "Maximum character limit constraint." },
      ],
    },

    select: {
      slug: "select",
      title: "Select Dropdown",
      description: "Custom searchable select component supporting single/multi selection, option search filtering, and custom option rendering.",
      category: "Forms",
      usageCode: `import { Select } from "@simple-components-ui/components";

const options = [
  { value: "react", label: "React" },
  { value: "next", label: "Next.js" },
];

export default function Example() {
  return <Select options={options} placeholder="Choose Framework" searchable />;
}`,
      props: [
        { name: "options", type: "SelectOption[]", required: true, description: "Array of selectable option items ({ value, label })." },
        { name: "value", type: "string | string[]", description: "Selected value (string or array for multiple)." },
        { name: "onChange", type: "(value: any) => void", description: "Callback when selection changes." },
        { name: "placeholder", type: "string", default: '"Select..."', description: "Placeholder text when empty." },
        { name: "searchable", type: "boolean", default: "true", description: "Shows search filter input inside popup." },
        { name: "multiple", type: "boolean", default: "false", description: "Enables multi-option checkbox selection." },
        { name: "variant", type: '"default" | "bordered" | "glass" | "ios-glass"', default: '"default"', description: "Select trigger styling variant." },
      ],
    },

    checkbox: {
      slug: "checkbox",
      title: "Checkbox",
      description: "Checkbox input component supporting animated checkmark physics, label/description text, and card selection variant.",
      category: "Forms",
      usageCode: `import { Checkbox } from "@simple-components-ui/components";

export default function Example() {
  return (
    <Checkbox
      label="Accept terms and conditions"
      description="You agree to our Privacy Policy."
      variant="card"
    />
  );
}`,
      props: [
        { name: "label", type: "string", description: "Checkbox label text." },
        { name: "description", type: "string", description: "Subtle description line below label." },
        { name: "checked", type: "boolean", description: "Controlled checked state." },
        { name: "onChange", type: "(checked: boolean) => void", description: "Callback when toggle state changes." },
        { name: "variant", type: '"default" | "card" | "ios-glass"', default: '"default"', description: "Visual variant container." },
        { name: "disabled", type: "boolean", default: "false", description: "Disables interaction." },
      ],
    },

    "radio-group": {
      slug: "radio-group",
      title: "Radio Group",
      description: "Radio selection group component supporting horizontal or vertical layout and card option selection cards.",
      category: "Forms",
      usageCode: `import { RadioGroup, RadioGroupItem } from "@simple-components-ui/components";

export default function Example() {
  return (
    <RadioGroup defaultValue="1" variant="card">
      <RadioGroupItem value="1" label="Option 1" description="Basic tier" />
      <RadioGroupItem value="2" label="Option 2" description="Pro tier" />
    </RadioGroup>
  );
}`,
      props: [
        { name: "value", type: "string", description: "Controlled selected value." },
        { name: "defaultValue", type: "string", description: "Uncontrolled initial value." },
        { name: "onChange", type: "(value: string) => void", description: "Callback triggered on radio selection." },
        { name: "orientation", type: '"vertical" | "horizontal"', default: '"vertical"', description: "Radio items arrangement axis." },
        { name: "variant", type: '"default" | "card" | "ios-glass"', default: '"default"', description: "Card container style." },
      ],
    },

    switch: {
      slug: "switch",
      title: "Switch Toggle",
      description: "Spring animated toggle switch supporting size presets, label text, and glassmorphism styling.",
      category: "Forms",
      usageCode: `import { Switch } from "@simple-components-ui/components";

export default function Example() {
  return <Switch label="Enable Notifications" defaultChecked size="md" />;
}`,
      props: [
        { name: "label", type: "string", description: "Switch title text label." },
        { name: "description", type: "string", description: "Secondary text line." },
        { name: "checked", type: "boolean", description: "Controlled checked state." },
        { name: "onChange", type: "(checked: boolean) => void", description: "Callback when toggled." },
        { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Switch track and thumb dimensions." },
        { name: "disabled", type: "boolean", default: "false", description: "Disables interaction." },
      ],
    },

    slider: {
      slug: "slider",
      title: "Slider Range",
      description: "Interactive single or range slider control supporting custom step values, value labels, and mark ticks.",
      category: "Forms",
      usageCode: `import { Slider } from "@simple-components-ui/components";

export default function Example() {
  return <Slider defaultValue={50} min={0} max={100} step={5} showValue label="Brightness" />;
}`,
      props: [
        { name: "value", type: "number | [number, number]", description: "Controlled slider value." },
        { name: "defaultValue", type: "number | [number, number]", default: "0", description: "Initial slider value." },
        { name: "min", type: "number", default: "0", description: "Minimum slider boundary." },
        { name: "max", type: "number", default: "100", description: "Maximum slider boundary." },
        { name: "step", type: "number", default: "1", description: "Granular step increment value." },
        { name: "label", type: "string", description: "Slider title label." },
        { name: "showValue", type: "boolean", default: "true", description: "Displays current numeric value badge." },
        { name: "disabled", type: "boolean", default: "false", description: "Disables interaction." },
      ],
    },

    "file-upload": {
      slug: "file-upload",
      title: "File Upload Zone",
      description: "Drag and drop file uploader component with file size limits, file type filtering, live thumbnail previews, and remove file actions.",
      category: "Forms",
      usageCode: `import { FileUpload } from "@simple-components-ui/components";

export default function Example() {
  return (
    <FileUpload
      accept="image/*, .pdf"
      maxSize={5 * 1024 * 1024}
      maxFiles={3}
      onFilesSelected={(files) => console.log(files)}
    />
  );
}`,
      props: [
        { name: "accept", type: "string", description: "File mime type filter string (e.g. image/*, application/pdf)." },
        { name: "multiple", type: "boolean", default: "false", description: "Allows selecting multiple files." },
        { name: "maxSize", type: "number", description: "Maximum allowed file size in bytes (e.g. 5MB = 5242880)." },
        { name: "maxFiles", type: "number", default: "5", description: "Maximum number of files allowed." },
        { name: "onFilesSelected", type: "(files: File[]) => void", description: "Callback triggered when files are selected/dropped." },
        { name: "disabled", type: "boolean", default: "false", description: "Disables drop zone interaction." },
      ],
    },

    modal: {
      slug: "modal",
      title: "Modal Dialog",
      description: "Accessible dialog overlay supporting focus trapping, ESC key dismiss, backdrop blur, animation presets, and sticky header/footer.",
      category: "Overlays",
      usageCode: `import { Modal, Button } from "@simple-components-ui/components";

export default function Example() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Account Confirmation"
        description="Are you sure you want to proceed?"
        variant="ios-glass"
      >
        <p className="text-xs">Dialog content body goes here...</p>
      </Modal>
    </>
  );
}`,
      props: [
        { name: "open", type: "boolean", required: true, default: "false", description: "Controls modal visibility." },
        { name: "onClose", type: "() => void", required: true, description: "Callback triggered on close request." },
        { name: "title", type: "React.ReactNode", description: "Dialog header title." },
        { name: "description", type: "React.ReactNode", description: "Subheader description text." },
        { name: "size", type: '"sm" | "md" | "lg" | "xl" | "full"', default: '"md"', description: "Maximum width container preset." },
        { name: "variant", type: '"default" | "bordered" | "glass" | "ios-glass"', default: '"ios-glass"', description: "Backdrop surface variant." },
        { name: "closeOnEsc", type: "boolean", default: "true", description: "Closes modal on Escape key press." },
        { name: "footer", type: "React.ReactNode", description: "Bottom sticky action buttons slot." },
      ],
    },

    drawer: {
      slug: "drawer",
      title: "Drawer Panel",
      description: "Slide-out navigation drawer panel supporting left/right/top/bottom anchor positions, backdrop blur, and focus locking.",
      category: "Overlays",
      usageCode: `import { Drawer, Button } from "@simple-components-ui/components";

export default function Example() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Drawer</Button>
      <Drawer open={open} onClose={() => setOpen(false)} anchor="right" title="Settings Panel">
        <div>Drawer Body</div>
      </Drawer>
    </>
  );
}`,
      props: [
        { name: "open", type: "boolean", required: true, default: "false", description: "Controls drawer visibility." },
        { name: "onClose", type: "() => void", required: true, description: "Callback triggered on close request." },
        { name: "anchor", type: '"left" | "right" | "top" | "bottom"', default: '"right"', description: "Screen edge anchor side." },
        { name: "title", type: "React.ReactNode", description: "Header title element." },
        { name: "size", type: '"sm" | "md" | "lg" | "full"', default: '"md"', description: "Drawer panel dimension size." },
        { name: "variant", type: '"default" | "bordered" | "glass" | "ios-glass"', default: '"default"', description: "Drawer surface styling." },
      ],
    },

    popover: {
      slug: "popover",
      title: "Popover",
      description: "Floating popover card component supporting directional placement, hover/click trigger, and backdrop blur.",
      category: "Overlays",
      usageCode: `import { Popover, Button } from "@simple-components-ui/components";

export default function Example() {
  return (
    <Popover placement="top" content={<div>Popover Content</div>}>
      <Button>Trigger Popover</Button>
    </Popover>
  );
}`,
      props: [
        { name: "content", type: "React.ReactNode", required: true, description: "Popover body content element." },
        { name: "placement", type: '"top" | "bottom" | "left" | "right"', default: '"bottom"', description: "Directional placement relative to trigger." },
        { name: "trigger", type: '"click" | "hover"', default: '"click"', description: "Interaction event trigger mode." },
        { name: "variant", type: '"default" | "bordered" | "glass" | "ios-glass"', default: '"ios-glass"', description: "Popover surface variant." },
      ],
    },

    tooltip: {
      slug: "tooltip",
      title: "Tooltip",
      description: "Micro hover tooltip indicator component with directional arrow, scale entrance animation, and custom delay.",
      category: "Overlays",
      usageCode: `import { Tooltip, Button } from "@simple-components-ui/components";

export default function Example() {
  return (
    <Tooltip content="Save changes to database" placement="top">
      <Button size="sm">Hover Me</Button>
    </Tooltip>
  );
}`,
      props: [
        { name: "content", type: "React.ReactNode", required: true, description: "Tooltip text or element." },
        { name: "placement", type: '"top" | "bottom" | "left" | "right"', default: '"top"', description: "Tooltip placement direction." },
        { name: "delay", type: "number", default: "200", description: "Hover show delay in milliseconds." },
      ],
    },

    dropdown: {
      slug: "dropdown",
      title: "Dropdown Menu",
      description: "Compound action dropdown menu component supporting triggers, labels, item icons, keyboard navigation, and destructive items.",
      category: "Overlays",
      usageCode: `import { Dropdown, DropdownTrigger, DropdownContent, DropdownItem } from "@simple-components-ui/components";

export default function Example() {
  return (
    <Dropdown>
      <DropdownTrigger><button>Options</button></DropdownTrigger>
      <DropdownContent>
        <DropdownItem>Profile</DropdownItem>
        <DropdownItem destructive>Logout</DropdownItem>
      </DropdownContent>
    </Dropdown>
  );
}`,
      props: [
        { name: "placement", type: '"bottom-start" | "bottom-end" | "top-start" | "top-end"', default: '"bottom-start"', description: "Dropdown popup alignment." },
        { name: "variant", type: '"default" | "bordered" | "glass" | "ios-glass"', default: '"default"', description: "Menu container surface variant." },
      ],
    },

    "context-menu": {
      slug: "context-menu",
      title: "Context Menu",
      description: "Right-click context menu container supporting mouse coordinates positioning, item shortcuts, and glassmorphism.",
      category: "Overlays",
      usageCode: `import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem } from "@simple-components-ui/components";

export default function Example() {
  return (
    <ContextMenu>
      <ContextMenuTrigger><div>Right click here</div></ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem shortcut="⌘C">Copy</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}`,
      props: [
        { name: "variant", type: '"default" | "bordered" | "glass" | "ios-glass"', default: '"default"', description: "Context menu surface theme." },
      ],
    },

    alert: {
      slug: "alert",
      title: "Alert Banner",
      description: "Status notification banner supporting intent colors (info, success, warning, danger), icons, and dismiss button.",
      category: "Feedback",
      usageCode: `import { Alert } from "@simple-components-ui/components";

export default function Example() {
  return (
    <Alert
      intent="success"
      title="Deployment Complete"
      description="Your changes are now live."
      dismissible
    />
  );
}`,
      props: [
        { name: "intent", type: '"info" | "success" | "warning" | "danger"', default: '"info"', description: "Status intent theme color." },
        { name: "title", type: "string", description: "Header title text." },
        { name: "description", type: "string", description: "Body description text." },
        { name: "icon", type: "React.ReactNode", description: "Custom leading icon." },
        { name: "dismissible", type: "boolean", default: "false", description: "Shows close button." },
        { name: "onDismiss", type: "() => void", description: "Callback when closed." },
        { name: "variant", type: '"default" | "bordered" | "glass" | "ios-glass"', default: '"default"', description: "Alert surface styling." },
      ],
    },

    toast: {
      slug: "toast",
      title: "Toast System",
      description: "Global toast notification provider supporting toast.success(), toast.danger(), toast.info(), duration, and custom position.",
      category: "Feedback",
      usageCode: `import { ToastProvider, toast, Button } from "@simple-components-ui/components";

export default function App() {
  return (
    <ToastProvider position="top-right">
      <Button onClick={() => toast.success("Saved successfully!")}>
        Show Toast
      </Button>
    </ToastProvider>
  );
}`,
      props: [
        { name: "position", type: '"top-left" | "top-right" | "top-center" | "bottom-left" | "bottom-right" | "bottom-center"', default: '"top-right"', description: "Toast container screen position." },
        { name: "duration", type: "number", default: "4000", description: "Default display duration in ms." },
      ],
    },

    snackbar: {
      slug: "snackbar",
      title: "Snackbar Banner",
      description: "Bottom notification banner supporting action button (e.g. Undo), auto-dismiss timer, and glassmorphism.",
      category: "Feedback",
      usageCode: `import { Snackbar } from "@simple-components-ui/components";

export default function Example() {
  return (
    <Snackbar
      open={true}
      message="Item moved to Trash"
      actionLabel="Undo"
      onAction={() => console.log("Undo clicked")}
    />
  );
}`,
      props: [
        { name: "open", type: "boolean", default: "false", description: "Controls snackbar visibility." },
        { name: "message", type: "string", required: true, description: "Notification text message." },
        { name: "actionLabel", type: "string", description: "Action button label (e.g. Undo)." },
        { name: "onAction", type: "() => void", description: "Callback when action button is clicked." },
        { name: "onClose", type: "() => void", description: "Callback when snackbar closes." },
        { name: "duration", type: "number", default: "5000", description: "Auto-dismiss duration in ms." },
        { name: "variant", type: '"default" | "bordered" | "glass" | "ios-glass"', default: '"default"', description: "Surface variant." },
      ],
    },

    progress: {
      slug: "progress",
      title: "Progress Bar & Ring",
      description: "Linear progress bar and circular progress ring components supporting animated progress values, colors, and value labels.",
      category: "Feedback",
      usageCode: `import { Progress } from "@simple-components-ui/components";

export default function Example() {
  return <Progress value={75} showValue color="primary" type="line" />;
}`,
      props: [
        { name: "value", type: "number", default: "0", description: "Progress percentage value (0..100)." },
        { name: "type", type: '"line" | "circle"', default: '"line"', description: "Progress display format." },
        { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Bar thickness or circle diameter size." },
        { name: "color", type: '"primary" | "success" | "warning" | "danger" | "purple"', default: '"primary"', description: "Progress fill color theme." },
        { name: "showValue", type: "boolean", default: "false", description: "Displays percentage text label." },
        { name: "label", type: "string", description: "Title label text." },
      ],
    },

    spinner: {
      slug: "spinner",
      title: "Spinner Loader",
      description: "Animated loading spinner component supporting iOS segment spinner, pulse ring, and dots variants.",
      category: "Feedback",
      usageCode: `import { Spinner } from "@simple-components-ui/components";

export default function Example() {
  return <Spinner variant="ios" size="md" color="primary" />;
}`,
      props: [
        { name: "variant", type: '"default" | "ios" | "pulse" | "dots"', default: '"default"', description: "Spinner animation style." },
        { name: "size", type: '"sm" | "md" | "lg" | "xl"', default: '"md"', description: "Spinner icon dimensions." },
        { name: "color", type: '"primary" | "secondary" | "success" | "white"', default: '"primary"', description: "Spinner stroke color." },
      ],
    },

    skeleton: {
      slug: "skeleton",
      title: "Skeleton Loader",
      description: "Animated skeleton placeholder loader for content loading states (text lines, avatars, rectangles, cards).",
      category: "Feedback",
      usageCode: `import { Skeleton } from "@simple-components-ui/components";

export default function Example() {
  return (
    <div className="space-y-2">
      <Skeleton variant="avatar" />
      <Skeleton variant="text" width="60%" />
    </div>
  );
}`,
      props: [
        { name: "variant", type: '"text" | "rect" | "circle" | "avatar" | "card"', default: '"rect"', description: "Shape variant." },
        { name: "width", type: "string | number", description: "Custom width CSS value." },
        { name: "height", type: "string | number", description: "Custom height CSS value." },
        { name: "animated", type: "boolean", default: "true", description: "Enables pulse animation effect." },
      ],
    },

    table: {
      slug: "table",
      title: "Table Primitives",
      description: "Semantic HTML table components (Table, TableHeader, TableBody, TableRow, TableCell) with striped and glass variants.",
      category: "Data Display",
      usageCode: `import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@simple-components-ui/components";

export default function Example() {
  return (
    <Table variant="default">
      <TableHeader><TableRow><TableHead>Name</TableHead></TableRow></TableHeader>
      <TableBody><TableRow><TableCell>Jane</TableCell></TableRow></TableBody>
    </Table>
  );
}`,
      props: [
        { name: "variant", type: '"default" | "bordered" | "striped" | "glass" | "ios-glass"', default: '"default"', description: "Table surface styling." },
        { name: "dense", type: "boolean", default: "false", description: "Reduces cell padding for compact rows." },
      ],
    },

    "data-table": {
      slug: "data-table",
      title: "Data Table",
      description: "Full-featured data table supporting Multi-Column Sorting, Global Search, Column Filtering, Pagination, Column Visibility toggle, Checkbox Row Selection, Loading Skeletons, and Empty States.",
      category: "Data Display",
      usageCode: `import { DataTable, ColumnDef, Badge } from "@simple-components-ui/components";

interface User { id: string; name: string; role: string; status: "active" | "pending"; }

const columns: ColumnDef<User>[] = [
  { id: "name", header: "Name", accessorKey: "name", sortable: true },
  { id: "role", header: "Role", accessorKey: "role", sortable: true },
  { id: "status", header: "Status", accessorKey: "status", cell: (row) => <Badge intent="success">{row.status}</Badge> },
];

export default function Example() {
  return (
    <DataTable
      data={[{ id: "1", name: "Jane Doe", role: "Dev", status: "active" }]}
      columns={columns}
      pageSize={5}
    />
  );
}`,
      props: [
        { name: "data", type: "T[]", required: true, description: "Array of record data items." },
        { name: "columns", type: "ColumnDef<T>[]", required: true, description: "Column configuration definitions." },
        { name: "searchable", type: "boolean", default: "true", description: "Enables global text search input." },
        { name: "pageSize", type: "number", default: "5", description: "Rows per pagination page." },
        { name: "loading", type: "boolean", default: "false", description: "Displays animated skeleton row placeholders." },
        { name: "variant", type: '"default" | "bordered" | "striped" | "glass" | "ios-glass"', default: '"ios-glass"', description: "Table surface variant." },
      ],
    },

    pagination: {
      slug: "pagination",
      title: "Pagination Controls",
      description: "Page navigation component supporting current page, total pages, prev/next buttons, page size selector, and item range info.",
      category: "Data Display",
      usageCode: `import { Pagination } from "@simple-components-ui/components";

export default function Example() {
  return (
    <Pagination
      currentPage={1}
      totalPages={10}
      totalItems={100}
      pageSize={10}
      onPageChange={(page) => console.log(page)}
    />
  );
}`,
      props: [
        { name: "currentPage", type: "number", required: true, description: "Current active page number (1-indexed)." },
        { name: "totalPages", type: "number", required: true, description: "Total count of pages." },
        { name: "onPageChange", type: "(page: number) => void", required: true, description: "Callback when page button is clicked." },
        { name: "totalItems", type: "number", description: "Total item count across all pages." },
        { name: "pageSize", type: "number", default: "10", description: "Number of items displayed per page." },
        { name: "variant", type: '"default" | "bordered" | "glass" | "ios-glass"', default: '"default"', description: "Button styling theme." },
      ],
    },

    "filter-bar": {
      slug: "filter-bar",
      title: "Filter Bar",
      description: "Active filter chip bar component allowing users to view, remove individual filter chips, or clear all filters.",
      category: "Data Display",
      usageCode: `import { FilterBar } from "@simple-components-ui/components";

const filters = [
  { id: "status", label: "Status", value: "Active" },
];

export default function Example() {
  return <FilterBar activeFilters={filters} onRemoveFilter={(id) => {}} onClearAll={() => {}} />;
}`,
      props: [
        { name: "activeFilters", type: "ActiveFilter[]", required: true, description: "Array of currently active filter items ({ id, label, value })." },
        { name: "onRemoveFilter", type: "(id: string) => void", required: true, description: "Callback when a single filter tag is removed." },
        { name: "onClearAll", type: "() => void", description: "Callback when Clear All button is clicked." },
        { name: "variant", type: '"default" | "bordered" | "glass" | "ios-glass"', default: '"default"', description: "Filter bar surface variant." },
      ],
    },

    search: {
      slug: "search",
      title: "Search Input",
      description: "Search input component with search icon, clear button, and keyboard shortcut badge (⌘K).",
      category: "Data Display",
      usageCode: `import { Search } from "@simple-components-ui/components";

export default function Example() {
  return <Search placeholder="Search docs..." shortcut="⌘K" clearable />;
}`,
      props: [
        { name: "value", type: "string", description: "Controlled search query string." },
        { name: "onChange", type: "(e: React.ChangeEvent<HTMLInputElement>) => void", description: "Input change handler." },
        { name: "placeholder", type: "string", default: '"Search..."', description: "Search field placeholder." },
        { name: "shortcut", type: "string", description: "Keyboard shortcut text badge (e.g. ⌘K)." },
        { name: "clearable", type: "boolean", default: "true", description: "Shows clear X button when query is present." },
        { name: "variant", type: '"default" | "bordered" | "glass" | "ios-glass"', default: '"default"', description: "Search bar visual variant." },
      ],
    },

    badge: {
      slug: "badge",
      title: "Badge Pill",
      description: "Status badge pill component supporting intent colors (primary, secondary, success, warning, danger, purple) and dot variants.",
      category: "Data Display",
      usageCode: `import { Badge } from "@simple-components-ui/components";

export default function Example() {
  return <Badge intent="success" variant="dot">Online</Badge>;
}`,
      props: [
        { name: "intent", type: '"primary" | "secondary" | "success" | "warning" | "danger" | "purple"', default: '"primary"', description: "Badge status color theme." },
        { name: "variant", type: '"default" | "soft" | "outline" | "dot"', default: '"default"', description: "Visual variant style." },
        { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Badge size scale." },
      ],
    },

    avatar: {
      slug: "avatar",
      title: "Avatar & AvatarGroup",
      description: "User avatar component supporting image fallback to initials, online/offline status indicators, and AvatarGroup overlapping stack.",
      category: "Data Display",
      usageCode: `import { Avatar, AvatarGroup } from "@simple-components-ui/components";

export default function Example() {
  return (
    <AvatarGroup max={3}>
      <Avatar name="Alex" status="online" />
      <Avatar name="Jane" />
    </AvatarGroup>
  );
}`,
      props: [
        { name: "src", type: "string", description: "Avatar image URL." },
        { name: "name", type: "string", description: "User name (used to generate fallback initials)." },
        { name: "size", type: '"xs" | "sm" | "md" | "lg" | "xl"', default: '"md"', description: "Avatar dimensions." },
        { name: "status", type: '"online" | "offline" | "away" | "busy"', description: "Status dot indicator." },
        { name: "variant", type: '"circle" | "square"', default: '"circle"', description: "Shape variant." },
      ],
    },

    timeline: {
      slug: "timeline",
      title: "Timeline Stream",
      description: "Vertical event stream timeline component with step connectors, icons, titles, and timestamps.",
      category: "Data Display",
      usageCode: `import { Timeline, TimelineItem, TimelineIcon, TimelineBody, TimelineTitle } from "@simple-components-ui/components";

export default function Example() {
  return (
    <Timeline>
      <TimelineItem active>
        <TimelineIcon color="success" />
        <TimelineBody><TimelineTitle>Deployed v0.3.0</TimelineTitle></TimelineBody>
      </TimelineItem>
    </Timeline>
  );
}`,
      props: [
        { name: "lineStyle", type: '"solid" | "dashed" | "dotted"', default: '"solid"', description: "Connector vertical line style." },
      ],
    },

    "empty-state": {
      slug: "empty-state",
      title: "Empty State",
      description: "Empty state placeholder component with illustration icon, title, description, and call-to-action button slot.",
      category: "Data Display",
      usageCode: `import { EmptyState, Button } from "@simple-components-ui/components";

export default function Example() {
  return (
    <EmptyState
      title="No items found"
      description="Get started by creating your first item."
      action={<Button>Create Item</Button>}
      variant="ios-glass"
    />
  );
}`,
      props: [
        { name: "title", type: "string", required: true, description: "Empty state main heading." },
        { name: "description", type: "string", description: "Subheading message explanation." },
        { name: "icon", type: "React.ReactNode", description: "Custom illustration icon element." },
        { name: "action", type: "React.ReactNode", description: "Call to action button slot." },
        { name: "variant", type: '"default" | "bordered" | "glass" | "ios-glass"', default: '"default"', description: "Container surface variant." },
      ],
    },

    "dnd-grid": {
      slug: "dnd-grid",
      title: "Draggable Resizable Grid",
      description: "Interactive Drag-and-Drop dashboard grid layout component supporting SSR hydration safety, card header handles, reset layout button, and responsive grid layouts.",
      category: "Drag & Drop",
      usageCode: `import { DraggableResizableGrid } from "@simple-components-ui/components";

const initialLayout = [
  { i: "widget-1", x: 0, y: 0, w: 6, h: 4 },
  { i: "widget-2", x: 6, y: 0, w: 6, h: 4 },
];

export default function Example() {
  return (
    <DraggableResizableGrid
      initialLayout={initialLayout}
      getItemTitle={(id) => ({ title: \`Widget \${id}\` })}
      renderItem={(id) => <div>Widget Content \${id}</div>}
      variant="ios-glass"
    />
  );
}`,
      props: [
        { name: "initialLayout", type: "GridItemConfig[]", required: true, description: "Array of grid items with x, y, w, h coordinates." },
        { name: "renderItem", type: "(id: string) => React.ReactNode", required: true, description: "Render function for widget body inside card." },
        { name: "getItemTitle", type: "(id: string) => { title: string; icon?: React.ReactNode }", description: "Function returning title header metadata." },
        { name: "storageKey", type: "string", default: '"draggable-grid-layout"', description: "Key used to persist layout state in localStorage." },
        { name: "variant", type: '"default" | "bordered" | "glass" | "ios-glass"', default: '"ios-glass"', description: "Card container surface variant." },
      ],
    },
  },
};
