"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import { Breadcrumbs } from "@/components/docs/breadcrumbs";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { docsConfig } from "@/config/docs";
import {
  Button,
  Input,
  Textarea,
  Select,
  Checkbox,
  RadioGroup,
  RadioGroupItem,
  Switch,
  Slider,
  FileUpload,
  Form,
  FormField,
  Modal,
  Drawer,
  Popover,
  Tooltip,
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownLabel,
  DropdownSeparator,
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  Alert,
  toast,
  Snackbar,
  Progress,
  Spinner,
  Skeleton,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  DataTable,
  ColumnDef,
  Pagination,
  FilterBar,
  Search,
  Badge,
  Avatar,
  AvatarGroup,
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineIcon,
  TimelineBody,
  TimelineTitle,
  TimelineTime,
  EmptyState,
} from "@/index";
import {
  Mail,
  User,
  Maximize2,
  PanelRight,
  MoreVertical,
  Info,
  Trash2,
  Copy,
  Share2,
  CheckCircle,
  RefreshCw,
} from "lucide-react";

export default function ComponentPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const doc = docsConfig.components[slug];
  const navItem = docsConfig.nav
    .flatMap((c) => c.items)
    .find((item) => item.href === `/docs/components/${slug}`);

  const title = doc?.title || navItem?.title || slug.toUpperCase();
  const description =
    doc?.description || `Documentation and live examples for the ${title} component.`;

  // Render live interactive preview based on component slug
  const renderLiveComponent = () => {
    switch (slug) {
      case "button":
        return (
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="default" size="default" glow>
              Primary Glow
            </Button>
            <Button variant="secondary" size="default">
              Secondary
            </Button>
            <Button variant="outline" size="default">
              Outline
            </Button>
            <Button variant="destructive" size="default">
              Destructive
            </Button>
            <Button variant="gradient" size="default">
              Gradient
            </Button>
          </div>
        );

      case "input":
        return (
          <div className="w-full max-w-sm space-y-3">
            <Input
              placeholder="e.g. alex@company.com"
              leftAdornment={<Mail size={16} />}
              clearable
            />
            <Input
              type="password"
              placeholder="Enter password..."
              variant="bordered"
            />
          </div>
        );

      case "textarea":
        return (
          <div className="w-full max-w-md">
            <Textarea
              placeholder="Write a brief description..."
              rows={3}
              autoResize
              showCount
              maxLength={140}
            />
          </div>
        );

      case "select":
        return (
          <div className="w-full max-w-xs">
            <Select
              options={[
                { value: "react", label: "React.js" },
                { value: "next", label: "Next.js 15" },
                { value: "tailwind", label: "Tailwind CSS" },
              ]}
              placeholder="Select Framework..."
            />
          </div>
        );

      case "checkbox":
        return (
          <div className="flex flex-col gap-3">
            <Checkbox label="Standard Checkbox" defaultChecked />
            <Checkbox label="Card Selection Variant" variant="card" defaultChecked />
          </div>
        );

      case "radio-group":
        return (
          <RadioGroup defaultValue="starter" variant="card" orientation="horizontal">
            <RadioGroupItem value="starter" label="Starter Plan" description="Free forever" />
            <RadioGroupItem value="pro" label="Pro Plan" description="$19 / mo" />
          </RadioGroup>
        );

      case "switch":
        return (
          <div className="flex items-center gap-6">
            <Switch label="Digest Emails" defaultChecked />
            <Switch label="Push Notifications" />
          </div>
        );

      case "slider":
        return (
          <div className="w-full max-w-xs">
            <Slider defaultValue={60} min={0} max={100} label="Volume Level" />
          </div>
        );

      case "file-upload":
        return (
          <div className="w-full max-w-md">
            <FileUpload accept="image/*, application/pdf" maxSize={5 * 1024 * 1024} />
          </div>
        );

      case "form":
        return (
          <Form className="w-full max-w-sm space-y-3">
            <FormField label="Full Name" required>
              <Input placeholder="Alex Morgan" leftAdornment={<User size={16} />} />
            </FormField>
            <Button type="button" variant="default" glow className="w-full">
              Submit
            </Button>
          </Form>
        );

      case "modal":
        return <ModalDemo />;

      case "drawer":
        return <DrawerDemo />;

      case "popover":
        return (
          <Popover
            variant="ios-glass"
            placement="top"
            content={
              <div className="space-y-1 text-xs">
                <p className="font-semibold text-zinc-900 dark:text-zinc-100">Popover Content</p>
                <p className="text-zinc-500 dark:text-zinc-400">Translucent backdrop blur popup window.</p>
              </div>
            }
          >
            <Button size="sm" variant="outline">Trigger Popover</Button>
          </Popover>
        );

      case "tooltip":
        return (
          <Tooltip content="Custom Tooltip Indicator" placement="top">
            <Button size="sm" variant="ghost" leftIcon={<Info size={16} />}>
              Hover Me
            </Button>
          </Tooltip>
        );

      case "dropdown":
        return (
          <Dropdown variant="default">
            <DropdownTrigger>
              <Button size="sm" variant="outline" rightIcon={<MoreVertical size={16} />}>
                Actions Menu
              </Button>
            </DropdownTrigger>
            <DropdownContent>
              <DropdownLabel>Options</DropdownLabel>
              <DropdownItem icon={<User size={14} />} onClick={() => toast.info("Profile clicked")}>
                User Profile
              </DropdownItem>
              <DropdownSeparator />
              <DropdownItem icon={<Trash2 size={14} />} destructive onClick={() => toast.danger("Deleted")}>
                Delete
              </DropdownItem>
            </DropdownContent>
          </Dropdown>
        );

      case "context-menu":
        return (
          <ContextMenu variant="default">
            <ContextMenuTrigger className="p-6 rounded-2xl border-2 border-dashed border-zinc-300 dark:border-zinc-700 bg-blue-50/20 dark:bg-blue-950/20 text-center cursor-context-menu w-full max-w-sm">
              <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                Right-Click inside this container
              </p>
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuLabel>Actions</ContextMenuLabel>
              <ContextMenuItem icon={<Copy size={14} />} shortcut="⌘C">Copy</ContextMenuItem>
              <ContextMenuItem icon={<Share2 size={14} />} shortcut="⌘S">Share</ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        );

      case "alert":
        return (
          <div className="w-full max-w-md space-y-3">
            <Alert intent="info" title="System Maintenance" description="Server upgrade at 02:00 UTC." dismissible />
            <Alert intent="success" title="Deployment Live" description="Changes deployed cleanly." />
          </div>
        );

      case "toast":
        return (
          <div className="flex flex-wrap items-center gap-2">
            <Button size="sm" variant="default" onClick={() => toast.success("Operation completed!")}>
              Success Toast
            </Button>
            <Button size="sm" variant="destructive" onClick={() => toast.danger("Connection error!")}>
              Danger Toast
            </Button>
          </div>
        );

      case "snackbar":
        return <SnackbarDemo />;

      case "progress":
        return (
          <div className="w-full max-w-xs space-y-4">
            <Progress value={70} label="Linear Progress" showValue color="primary" />
            <Progress type="circle" value={70} size="md" showValue color="purple" />
          </div>
        );

      case "spinner":
        return (
          <div className="flex items-center gap-6">
            <Spinner variant="ios" size="md" color="primary" />
            <Spinner variant="pulse" size="md" color="purple" />
            <Spinner variant="dots" size="md" color="success" />
          </div>
        );

      case "skeleton":
        return (
          <div className="w-full max-w-xs space-y-2 p-3 border border-zinc-200 dark:border-zinc-800 rounded-2xl">
            <Skeleton variant="avatar" />
            <Skeleton variant="text" width="80%" />
            <Skeleton variant="rect" height={50} />
          </div>
        );

      case "table":
        return (
          <Table variant="default" className="w-full max-w-md">
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Jane Doe</TableCell>
                <TableCell>Lead Engineer</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Alex Rivera</TableCell>
                <TableCell>Designer</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        );

      case "data-table":
        return <DataTableDemo />;

      case "pagination":
        return (
          <Pagination
            currentPage={1}
            totalPages={5}
            totalItems={50}
            pageSize={10}
            onPageChange={() => {}}
            variant="default"
            className="w-full max-w-md"
          />
        );

      case "filter-bar":
        return (
          <FilterBar
            activeFilters={[
              { id: "status", label: "Status", value: "Active" },
              { id: "role", label: "Role", value: "Developer" },
            ]}
            onRemoveFilter={() => {}}
            onClearAll={() => {}}
            variant="default"
            className="w-full max-w-md"
          />
        );

      case "search":
        return (
          <div className="w-full max-w-xs">
            <Search placeholder="Search components..." variant="default" />
          </div>
        );

      case "badge":
        return (
          <div className="flex flex-wrap items-center gap-2">
            <Badge intent="primary" variant="soft">Primary</Badge>
            <Badge intent="success" variant="dot">Online</Badge>
            <Badge intent="warning" variant="outline">Pending</Badge>
            <Badge intent="danger" variant="default">Critical</Badge>
          </div>
        );

      case "avatar":
        return (
          <div className="flex items-center gap-4">
            <Avatar name="Jane Doe" size="lg" status="online" />
            <AvatarGroup max={3} size="md">
              <Avatar name="Jane Doe" />
              <Avatar name="Alex Rivera" />
              <Avatar name="Sarah Chen" />
              <Avatar name="Michael Scott" />
            </AvatarGroup>
          </div>
        );

      case "timeline":
        return (
          <Timeline lineStyle="solid" className="max-w-xs w-full">
            <TimelineItem active>
              <TimelineConnector />
              <TimelineIcon color="success" icon={<CheckCircle size={14} />} />
              <TimelineBody>
                <TimelineTitle>Version 0.3.0 Live</TimelineTitle>
                <TimelineTime>Just now</TimelineTime>
              </TimelineBody>
            </TimelineItem>
          </Timeline>
        );

      case "empty-state":
        return (
          <EmptyState
            title="No search results"
            description="Try searching with different keywords."
            variant="default"
            className="max-w-sm"
          />
        );

      case "dnd-grid":
        return (
          <div className="w-full h-48 border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-2xl flex items-center justify-center text-xs font-semibold text-zinc-500">
            Interactive Draggable Resizable Grid Layout
          </div>
        );

      default:
        return <div>Component preview for {title}</div>;
    }
  };

  return (
    <div className="space-y-8 select-none">
      <Breadcrumbs
        items={[
          { title: "Components", href: "/docs/components" },
          { title },
        ]}
      />

      <div className="space-y-3 pb-6 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">{title}</h1>
          {doc?.category && (
            <span className="px-2.5 py-1 text-xs font-mono font-semibold rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
              {doc.category}
            </span>
          )}
        </div>
        <p className="text-base text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
          {description}
        </p>
      </div>

      {/* Live Interactive Preview Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight">Interactive Preview</h2>
        <ComponentPreview
          code={
            doc?.usageCode ||
            `import { ${title} } from "@simple-components-ui/components";\n\n<${title} />`
          }
        >
          {renderLiveComponent()}
        </ComponentPreview>
      </section>

      {/* API Props Reference Table */}
      {doc?.props && doc.props.length > 0 && (
        <section className="space-y-4 pt-4">
          <h2 className="text-xl font-bold tracking-tight">API Props Reference</h2>
          <PropsTable props={doc.props} />
        </section>
      )}
    </div>
  );
}

// Helper demos for Modal, Drawer, Snackbar, DataTable
function ModalDemo() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button size="sm" onClick={() => setOpen(true)} leftIcon={<Maximize2 size={14} />}>
        Open Modal
      </Button>
      <Modal open={open} onClose={() => setOpen(false)} title="Modal Dialog" variant="default">
        <p className="text-xs">Modal contents lock background scroll and handle ESC key dismiss.</p>
      </Modal>
    </>
  );
}

function DrawerDemo() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button size="sm" variant="secondary" onClick={() => setOpen(true)} leftIcon={<PanelRight size={14} />}>
        Open Side Drawer
      </Button>
      <Drawer open={open} onClose={() => setOpen(false)} title="Side Drawer" anchor="right" variant="default">
        <p className="text-xs">Slide-out navigation drawer panel.</p>
      </Drawer>
    </>
  );
}

function SnackbarDemo() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button size="sm" variant="outline" onClick={() => setOpen(true)} leftIcon={<RefreshCw size={14} />}>
        Trigger Snackbar
      </Button>
      <Snackbar open={open} message="Changes saved" actionLabel="Undo" onClose={() => setOpen(false)} variant="default" />
    </>
  );
}

interface DemoRow {
  id: string;
  name: string;
  role: string;
}

function DataTableDemo() {
  const cols: ColumnDef<DemoRow>[] = [
    { id: "name", header: "Name", accessorKey: "name", sortable: true },
    { id: "role", header: "Role", accessorKey: "role", sortable: true },
  ];

  return (
    <DataTable
      data={[
        { id: "1", name: "Jane Doe", role: "Developer" },
        { id: "2", name: "Alex Rivera", role: "Designer" },
      ]}
      columns={cols}
      pageSize={2}
      variant="default"
      className="w-full max-w-md"
    />
  );
}
