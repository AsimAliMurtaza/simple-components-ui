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
  category: "Forms" | "Overlays" | "Feedback" | "Data Display" | "Drag & Drop" | "General";
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
    <Button variant="default" size="md" glow>
      Get Started
    </Button>
  );
}`,
      props: [
        { name: "variant", type: '"default" | "secondary" | "outline" | "ghost" | "destructive" | "gradient" | "neon" | "glass" | "ios-glass"', default: '"default"', description: "Visual variant theme." },
        { name: "size", type: '"sm" | "md" | "lg" | "icon"', default: '"md"', description: "Button dimensions padding and typography size." },
        { name: "glow", type: "boolean", default: "false", description: "Adds subtle pulse glow shadow under button." },
        { name: "loading", type: "boolean", default: "false", description: "Displays animated loading spinner inside button." },
        { name: "disabled", type: "boolean", default: "false", description: "Disables interaction and reduces opacity." },
        { name: "leftIcon", type: "React.ReactNode", default: "undefined", description: "Icon rendered before button text." },
        { name: "rightIcon", type: "React.ReactNode", default: "undefined", description: "Icon rendered after button text." },
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
        { name: "leftAdornment", type: "React.ReactNode", default: "undefined", description: "Prefix element inside input field." },
        { name: "rightAdornment", type: "React.ReactNode", default: "undefined", description: "Suffix element inside input field." },
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
        { name: "open", type: "boolean", default: "false", description: "Controls modal visibility." },
        { name: "onClose", type: "() => void", default: "undefined", description: "Callback triggered on close request." },
        { name: "title", type: "React.ReactNode", default: "undefined", description: "Dialog header title." },
        { name: "description", type: "React.ReactNode", default: "undefined", description: "Subheader description text." },
        { name: "size", type: '"sm" | "md" | "lg" | "xl" | "full"', default: '"md"', description: "Maximum width container preset." },
        { name: "variant", type: '"default" | "bordered" | "glass" | "ios-glass"', default: '"ios-glass"', description: "Backdrop surface variant." },
        { name: "closeOnEsc", type: "boolean", default: "true", description: "Closes modal on Escape key press." },
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
