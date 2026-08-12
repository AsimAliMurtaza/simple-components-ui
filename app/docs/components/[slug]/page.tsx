"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import { Breadcrumbs } from "@/components/docs/breadcrumbs";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { docsConfig } from "@/config/docs";
import {
  Button,
  Text,
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
  Container,
  Stack,
  Grid,
  SplitPane,
  ResizablePanel,
  ScrollArea,
  Navbar,
  Sidebar,
  Tabs,
  Breadcrumb,
  Stepper,
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
  Home,
  Users,
  Settings,
  Bell,
  Sparkles,
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
    doc?.description ||
    `Documentation and live examples for the ${title} component.`;

  // Render live interactive preview based on component slug
  const renderLiveComponent = () => {
    switch (slug) {
      case "button":
        return (
          <div className="flex flex-wrap items-center justify-center gap-3 max-w-2xl">
            <Button variant="default" size="default" glow>
              Default Glow
            </Button>
            <Button variant="secondary" size="default">
              Secondary
            </Button>
            <Button variant="outline" size="default">
              Outline
            </Button>
            <Button variant="ghost" size="default">
              Ghost
            </Button>
            <Button variant="destructive" size="default">
              Destructive
            </Button>
            <Button variant="glass" size="default">
              Glass
            </Button>
            <Button variant="ios-glass" size="default">
              iOS Glass
            </Button>
            <Button variant="gradient" size="default">
              Gradient
            </Button>
            <Button variant="neon" size="default">
              Neon
            </Button>
          </div>
        );

      case "text":
        return (
          <div className="space-y-3 max-w-md w-full">
            <Text as="h3" size="2xl" weight="bold" variant="default">
              Heading Title
            </Text>
            <Text as="p" size="base" variant="accent">
              Accent styled subheader text.
            </Text>
            <Text as="p" size="sm" variant="muted">
              Polished typography component supporting semantic HTML tags, size
              scale, font weights, and text truncation.
            </Text>
            <Text as="p" size="sm" variant="gradient">
              Gradient text variant effect.
            </Text>
          </div>
        );

      case "container":
        return (
          <div className="w-full space-y-4 max-w-xl">
            <Container variant="bordered" size="full" padding="sm">
              <p className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                Bordered Container
              </p>
            </Container>
            <Container variant="ios-glass" size="full" padding="sm">
              <p className="text-xs font-bold text-teal-700 dark:text-teal-400">
                iOS Glassmorphism Container
              </p>
            </Container>
          </div>
        );

      case "stack":
        return (
          <div className="w-full space-y-4 max-w-md">
            <Stack
              direction="row"
              gap={3}
              align="center"
              justify="center"
              divider
              className="p-3 border border-zinc-200 dark:border-zinc-800 rounded-2xl"
            >
              <div className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                Horizontal 1
              </div>
              <div className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                Horizontal 2
              </div>
              <div className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                Horizontal 3
              </div>
            </Stack>
          </div>
        );

      case "grid-layout":
        return (
          <Grid cols={1} smCols={3} gap={3} className="w-full max-w-lg">
            <div className="p-4 text-center text-xs font-bold rounded-2xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
              Column 1
            </div>
            <div className="p-4 text-center text-xs font-bold rounded-2xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
              Column 2
            </div>
            <div className="p-4 text-center text-xs font-bold rounded-2xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
              Column 3
            </div>
          </Grid>
        );

      case "split-pane":
        return (
          <SplitPane
            left={
              <div className="p-6 text-center text-xs font-semibold text-zinc-600 dark:text-zinc-300">
                Left Pane (Drag divider)
              </div>
            }
            right={
              <div className="p-6 text-center text-xs font-semibold text-teal-700 dark:text-teal-400">
                Right Pane
              </div>
            }
            defaultSplit={45}
            variant="ios-glass"
            className="w-full max-w-xl h-44"
          />
        );

      case "resizable-panel":
        return (
          <div className="flex border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden w-full max-w-xl h-44">
            <ResizablePanel
              defaultWidth={180}
              minWidth={130}
              maxWidth={280}
              variant="ios-glass"
            >
              <div className="p-2 text-xs font-bold text-zinc-700 dark:text-zinc-300">
                Sidebar Panel
              </div>
            </ResizablePanel>
            <div className="flex-1 p-4 text-xs text-zinc-500 flex items-center justify-center">
              Main Canvas Area
            </div>
          </div>
        );

      case "scroll-area":
        return (
          <ScrollArea
            maxHeight="150px"
            scrollbarVariant="ios-glass"
            className="w-full max-w-sm border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl bg-white dark:bg-zinc-900"
          >
            <div className="space-y-2 text-xs">
              <p className="font-bold text-teal-600">Styled Custom Scrollbar</p>
              <p className="text-zinc-600 dark:text-zinc-300">
                Item 1: Custom scrollbar track and thumb.
              </p>
              <p className="text-zinc-600 dark:text-zinc-300">
                Item 2: Adapts smoothly in both light and dark modes.
              </p>
              <p className="text-zinc-600 dark:text-zinc-300">
                Item 3: Supports vertical, horizontal, or dual axis scrolling.
              </p>
              <p className="text-zinc-600 dark:text-zinc-300">
                Item 4: Translucent glassmorphism scrollbar thumb style.
              </p>
            </div>
          </ScrollArea>
        );

      case "navbar":
        return (
          <Navbar
            logo={
              <div className="flex items-center gap-2 font-extrabold text-sm">
                <Sparkles size={16} className="text-teal-600" />
                <span>MyNavbar</span>
              </div>
            }
            items={[
              {
                label: "Home",
                href: "#",
                active: true,
                icon: <Home size={14} />,
              },
              { label: "Team", href: "#", icon: <Users size={14} /> },
              { label: "Settings", href: "#", icon: <Settings size={14} /> },
            ]}
            actions={
              <Button size="sm" variant="default">
                Sign In
              </Button>
            }
            sticky={false}
            variant="ios-glass"
            className="w-full"
          />
        );

      case "sidebar":
        return (
          <Sidebar
            groups={[
              {
                title: "Navigation",
                items: [
                  {
                    id: "dash",
                    label: "Dashboard",
                    icon: <Home size={16} />,
                    active: true,
                  },
                  {
                    id: "users",
                    label: "Users",
                    icon: <Users size={16} />,
                    badge: "12",
                  },
                  {
                    id: "settings",
                    label: "Settings",
                    icon: <Settings size={16} />,
                  },
                ],
              },
            ]}
            variant="ios-glass"
            className="h-60"
          />
        );

      case "tabs":
        return (
          <div className="w-full max-w-md space-y-4">
            <Tabs
              items={[
                { id: "account", label: "Account", icon: <User size={14} /> },
                {
                  id: "notifications",
                  label: "Notifications",
                  icon: <Bell size={14} />,
                  badge: "3",
                },
                {
                  id: "settings",
                  label: "Settings",
                  icon: <Settings size={14} />,
                },
              ]}
              variant="pill"
              defaultTab="account"
            />
            <Tabs
              items={[
                { id: "overview", label: "Overview" },
                { id: "analytics", label: "Analytics" },
                { id: "reports", label: "Reports" },
              ]}
              variant="ios-glass"
              defaultTab="overview"
            />
          </div>
        );

      case "breadcrumb":
        return (
          <Breadcrumb
            items={[
              { label: "Dashboard", href: "#" },
              { label: "Settings", href: "#" },
              { label: "API Tokens", current: true },
            ]}
            separator="chevron"
            showHomeIcon
          />
        );

      case "stepper":
        return (
          <Stepper
            steps={[
              { id: "1", title: "Account", description: "Personal details" },
              { id: "2", title: "Billing", description: "Credit card info" },
              { id: "3", title: "Confirm", description: "Review plan" },
            ]}
            activeStep={1}
            clickable
            className="w-full max-w-xl"
          />
        );

      case "input":
        return (
          <div className="w-full max-w-sm space-y-3">
            <Input
              placeholder="Default input..."
              leftAdornment={<Mail size={16} />}
              clearable
            />
            <Input placeholder="Bordered input..." variant="bordered" />
            <Input placeholder="iOS Glass input..." variant="ios-glass" />
          </div>
        );

      case "textarea":
        return (
          <div className="w-full max-w-md space-y-3">
            <Textarea
              placeholder="Default textarea with autoResize & character count..."
              rows={3}
              autoResize
              showCount
              maxLength={140}
            />
            <Textarea
              placeholder="iOS Glassmorphism textarea..."
              variant="ios-glass"
              rows={2}
            />
          </div>
        );

      case "select":
        return (
          <div className="w-full max-w-xs space-y-3">
            <Select
              options={[
                { value: "react", label: "React.js" },
                { value: "next", label: "Next.js 15" },
                { value: "tailwind", label: "Tailwind CSS" },
              ]}
              placeholder="Select Framework (Default)..."
            />
            <Select
              options={[
                { value: "esm", label: "ES Module" },
                { value: "cjs", label: "CommonJS" },
              ]}
              placeholder="Select Module (iOS Glass)..."
              variant="ios-glass"
            />
          </div>
        );

      case "checkbox":
        return (
          <div className="flex flex-col gap-3 w-full max-w-sm">
            <Checkbox label="Standard Checkbox" defaultChecked />
            <Checkbox
              label="Card Selection Variant"
              description="Interactive card variant with border highlight."
              variant="card"
              defaultChecked
            />
            <Checkbox
              label="iOS Glassmorphism Variant"
              description="Translucent backdrop blur check box."
              variant="ios-glass"
              defaultChecked
            />
          </div>
        );

      case "radio-group":
        return (
          <div className="w-full max-w-md space-y-4">
            <RadioGroup
              defaultValue="starter"
              variant="card"
              orientation="horizontal"
            >
              <RadioGroupItem
                value="starter"
                label="Starter Plan"
                description="Free forever"
              />
              <RadioGroupItem
                value="pro"
                label="Pro Plan"
                description="$19 / mo"
              />
            </RadioGroup>
          </div>
        );

      case "switch":
        return (
          <div className="flex items-center gap-6">
            <Switch label="Digest Emails" defaultChecked size="md" />
            <Switch
              label="Push Notifications"
              variant="ios-glass"
              size="md"
              defaultChecked
            />
          </div>
        );

      case "slider":
        return (
          <div className="w-full max-w-xs space-y-3">
            <Slider
              defaultValue={60}
              min={0}
              max={100}
              label="Volume Level"
              showValue
            />
          </div>
        );

      case "file-upload":
        return (
          <div className="w-full max-w-md">
            <FileUpload
              accept="image/*, application/pdf"
              maxSize={5 * 1024 * 1024}
            />
          </div>
        );

      case "form":
        return (
          <Form className="w-full max-w-sm space-y-3 p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <FormField
              label="Full Name"
              required
              hint="Enter your legal first & last name."
            >
              <Input
                placeholder="Alex Morgan"
                leftAdornment={<User size={16} />}
              />
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
                <p className="font-semibold text-zinc-900 dark:text-zinc-100">
                  Popover Content
                </p>
                <p className="text-zinc-500 dark:text-zinc-400">
                  Translucent backdrop blur popup window.
                </p>
              </div>
            }
          >
            <Button size="sm" variant="outline">
              Trigger Popover
            </Button>
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
          <Dropdown variant="ios-glass">
            <DropdownTrigger>
              <Button
                size="sm"
                variant="outline"
                rightIcon={<MoreVertical size={16} />}
              >
                Actions Menu
              </Button>
            </DropdownTrigger>
            <DropdownContent>
              <DropdownLabel>Options</DropdownLabel>
              <DropdownItem
                icon={<User size={14} />}
                onClick={() => toast.info("Profile clicked")}
              >
                User Profile
              </DropdownItem>
              <DropdownSeparator />
              <DropdownItem
                icon={<Trash2 size={14} />}
                destructive
                onClick={() => toast.danger("Deleted")}
              >
                Delete
              </DropdownItem>
            </DropdownContent>
          </Dropdown>
        );

      case "context-menu":
        return (
          <ContextMenu variant="ios-glass">
            <ContextMenuTrigger className="p-6 rounded-2xl border-2 border-dashed border-zinc-300 dark:border-zinc-700 bg-teal-50/20 dark:bg-teal-950/20 text-center cursor-context-menu w-full max-w-sm">
              <p className="text-xs font-semibold text-teal-600 dark:text-teal-400">
                Right-Click inside this container
              </p>
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuLabel>Actions</ContextMenuLabel>
              <ContextMenuItem icon={<Copy size={14} />} shortcut="⌘C">
                Copy
              </ContextMenuItem>
              <ContextMenuItem icon={<Share2 size={14} />} shortcut="⌘S">
                Share
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        );

      case "alert":
        return (
          <div className="w-full max-w-md space-y-3">
            <Alert
              intent="info"
              title="Info Alert (Default)"
              description="Server upgrade scheduled at 02:00 UTC."
              dismissible
            />
            <Alert
              intent="success"
              title="Success Alert (iOS Glass)"
              description="Changes deployed cleanly."
              variant="ios-glass"
            />
            <Alert
              intent="warning"
              title="Warning Alert"
              description="High memory utilization threshold reached."
            />
            <Alert
              intent="danger"
              title="Danger Alert"
              description="Database connection lost."
            />
          </div>
        );

      case "toast":
        return (
          <div className="flex flex-wrap items-center gap-2">
            <Button
              size="sm"
              variant="default"
              onClick={() => toast.success("Operation completed!")}
            >
              Success Toast
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => toast.danger("Connection error!")}
            >
              Danger Toast
            </Button>
          </div>
        );

      case "snackbar":
        return <SnackbarDemo />;

      case "progress":
        return (
          <div className="w-full max-w-xs space-y-4">
            <Progress
              value={70}
              label="Linear Progress"
              showValue
              color="primary"
            />
            <Progress
              type="circle"
              value={75}
              size="md"
              showValue
              color="purple"
            />
          </div>
        );

      case "spinner":
        return (
          <div className="flex items-center justify-center gap-6">
            <Spinner variant="default" size="md" color="primary" />
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
          <Table variant="striped" className="w-full max-w-md">
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
          <div className="w-full max-w-xs space-y-3">
            <Search placeholder="Search components..." variant="default" />
            <Search placeholder="iOS Glass search..." variant="ios-glass" />
          </div>
        );

      case "badge":
        return (
          <div className="flex flex-wrap items-center gap-2">
            <Badge intent="primary" variant="default">
              Primary
            </Badge>
            <Badge intent="success" variant="soft">
              Soft Green
            </Badge>
            <Badge intent="warning" variant="outline">
              Outline
            </Badge>
            <Badge intent="danger" variant="dot">
              Live Dot
            </Badge>
            <Badge intent="purple" variant="soft">
              Purple
            </Badge>
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
            variant="ios-glass"
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
        items={[{ title: "Components", href: "/docs/components" }, { title }]}
      />

      <div className="space-y-3 pb-6 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {title}
          </h1>
          {doc?.category && (
            <span className="px-2.5 py-1 text-xs font-mono font-semibold rounded-lg bg-teal-100 dark:bg-zinc-800 text-teal-800 dark:text-teal-400">
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
        <h2 className="text-xl font-bold tracking-tight">
          Interactive Preview
        </h2>
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
          <h2 className="text-xl font-bold tracking-tight">
            API Props Reference
          </h2>
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
      <Button
        size="sm"
        onClick={() => setOpen(true)}
        leftIcon={<Maximize2 size={14} />}
      >
        Open Modal
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Modal Dialog"
        variant="ios-glass"
      >
        <p className="text-xs">
          Modal contents lock background scroll and handle ESC key dismiss.
        </p>
      </Modal>
    </>
  );
}

function DrawerDemo() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button
        size="sm"
        variant="secondary"
        onClick={() => setOpen(true)}
        leftIcon={<PanelRight size={14} />}
      >
        Open Side Drawer
      </Button>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title="Side Drawer"
        anchor="right"
        variant="ios-glass"
      >
        <p className="text-xs">Slide-out navigation drawer panel.</p>
      </Drawer>
    </>
  );
}

function SnackbarDemo() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button
        size="sm"
        variant="outline"
        onClick={() => setOpen(true)}
        leftIcon={<RefreshCw size={14} />}
      >
        Trigger Snackbar
      </Button>
      <Snackbar
        open={open}
        message="Changes saved"
        actionLabel="Undo"
        onClose={() => setOpen(false)}
        variant="ios-glass"
      />
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
