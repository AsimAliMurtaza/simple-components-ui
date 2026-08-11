"use client";

import * as React from "react";
import {
  Form,
  FormField,
  Input,
  Textarea,
  Select,
  Checkbox,
  RadioGroup,
  RadioGroupItem,
  Switch,
  Slider,
  FileUpload,
  Button,
  Alert,
  ToastProvider,
  toast,
  Snackbar,
  Progress,
  Spinner,
  Skeleton,
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
  ContextMenuSeparator,
  DataTable,
  ColumnDef,
  Badge,
  Avatar,
  AvatarGroup,
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineHeader,
  TimelineIcon,
  TimelineBody,
  TimelineTitle,
  TimelineTime,
  Search,
} from "@/index";
import {
  Moon,
  Sun,
  Mail,
  User,
  Sparkles,
  Send,
  Layers,
  Bell,
  RefreshCw,
  Zap,
  CheckCircle2,
  Maximize2,
  PanelRight,
  MoreVertical,
  MousePointer,
  Info,
  Trash2,
  Copy,
  Share2,
  Database,
  CheckCircle,
  AlertCircle,
  Edit,
} from "lucide-react";

interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "pending" | "suspended";
  avatar: string;
  lastActive: string;
}

const mockUsers: UserRecord[] = [
  {
    id: "usr-1",
    name: "Jane Doe",
    email: "jane.doe@example.com",
    role: "Senior Lead Developer",
    status: "active",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    lastActive: "2 mins ago",
  },
  {
    id: "usr-2",
    name: "Alex Rivera",
    email: "alex.r@example.com",
    role: "UI/UX Product Designer",
    status: "active",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    lastActive: "1 hour ago",
  },
  {
    id: "usr-3",
    name: "Sarah Chen",
    email: "sarah.c@example.com",
    role: "Frontend Engineer",
    status: "pending",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    lastActive: "Yesterday",
  },
  {
    id: "usr-4",
    name: "Michael Scott",
    email: "michael.s@example.com",
    role: "Regional Manager",
    status: "suspended",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    lastActive: "3 days ago",
  },
  {
    id: "usr-5",
    name: "Elena Rostova",
    email: "elena.r@example.com",
    role: "DevOps Architect",
    status: "active",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
    lastActive: "Just now",
  },
  {
    id: "usr-6",
    name: "David Kim",
    email: "david.k@example.com",
    role: "QA Automation Lead",
    status: "pending",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150",
    lastActive: "4 hours ago",
  },
];

function PageShowcase() {
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [progressVal, setProgressVal] = React.useState(65);
  const [stepVal, setStepVal] = React.useState(2);
  const [isLoadingSkeleton, setIsLoadingSkeleton] = React.useState(false);
  const [tableLoading, setTableLoading] = React.useState(false);
  const [searchVal, setSearchVal] = React.useState("");

  const [formData, setFormData] = React.useState({
    fullName: "Jane Doe",
    email: "jane.doe@example.com",
    bio: "Full-stack developer who loves UI design, TypeScript, and micro-interactions.",
    role: "designer",
    techStack: ["react", "tailwind"],
    experienceLevel: "senior",
    notifications: true,
    satisfaction: 85,
    budgetRange: [2000, 8000] as [number, number],
  });

  const [formErrors, setFormErrors] = React.useState<Record<string, string>>({});
  const [submittedData, setSubmittedData] = React.useState<Record<string, unknown> | null>(null);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!formData.fullName) errors.fullName = "Full name is required";
    if (!formData.email || !formData.email.includes("@")) errors.email = "Valid email address is required";

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setSubmittedData(formData);
      toast.success("Profile updated successfully!");
    }
  };

  const triggerToast = (type: "info" | "success" | "warning" | "danger" | "promise") => {
    if (type === "success") {
      toast.success("Changes saved successfully!", {
        description: "Your preference settings have been synchronized.",
        variant: "default",
      });
    } else if (type === "danger") {
      toast.danger("Connection lost!", {
        description: "Please check your network settings.",
        variant: "default",
      });
    } else if (type === "warning") {
      toast.warning("Storage limit almost full", {
        description: "You have used 92% of your allocation.",
        variant: "default",
      });
    } else if (type === "promise") {
      toast.promise(
        new Promise((resolve) => setTimeout(resolve, 2000)),
        {
          loading: "Processing payment details...",
          success: "Transaction completed successfully!",
          error: "Payment declined.",
        },
        { variant: "default" }
      );
    } else {
      toast.info("New update available", {
        description: "Version 2.4 contains security patches.",
        variant: "default",
      });
    }
  };

  // DataTable Column definitions
  const userColumns: ColumnDef<UserRecord>[] = [
    {
      id: "user",
      header: "User",
      sortable: true,
      accessorKey: "name",
      cell: (row) => (
        <div className="flex items-center gap-3">
          <Avatar src={row.avatar} name={row.name} size="sm" status={row.status === "active" ? "online" : "away"} />
          <div>
            <div className="font-semibold text-zinc-900 dark:text-zinc-100">{row.name}</div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">{row.email}</div>
          </div>
        </div>
      ),
    },
    {
      id: "role",
      header: "Role",
      sortable: true,
      accessorKey: "role",
    },
    {
      id: "status",
      header: "Status",
      sortable: true,
      filterable: true,
      filterOptions: [
        { label: "Active", value: "active" },
        { label: "Pending", value: "pending" },
        { label: "Suspended", value: "suspended" },
      ],
      accessorKey: "status",
      cell: (row) => {
        const intent =
          row.status === "active"
            ? "success"
            : row.status === "pending"
            ? "warning"
            : "danger";

        return (
          <Badge intent={intent} variant="soft" size="sm">
            {row.status.toUpperCase()}
          </Badge>
        );
      },
    },
    {
      id: "lastActive",
      header: "Last Active",
      sortable: true,
      accessorKey: "lastActive",
    },
  ];

  return (
    <div className="space-y-12">
      {/* 1. Data Component Suite Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 pb-3 border-b border-zinc-200 dark:border-zinc-800">
          <Database className="h-5 w-5 text-emerald-500" />
          <h2 className="text-xl font-bold tracking-tight">Data Component Suite</h2>
        </div>

        {/* DataTable Showcase */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-lg space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
            <div>
              <h3 className="text-base font-semibold">Interactive DataTable Showcase</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Supports Multi-Column Sorting, Searching, Filtering, Column Visibility, Row Selection & Pagination
              </p>
            </div>

            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setTableLoading(true);
                setTimeout(() => setTableLoading(false), 1500);
              }}
              leftIcon={<RefreshCw size={14} className={tableLoading ? "animate-spin" : ""} />}
            >
              Simulate Loading
            </Button>
          </div>

          <DataTable
            data={mockUsers}
            columns={userColumns}
            loading={tableLoading}
            pageSize={4}
            variant="default"
            getRowId={(r) => r.id}
            onRowClick={(r) => toast.info(`Selected ${r.name}`)}
            rowActions={(r) => (
              <>
                <DropdownItem icon={<Edit size={14} />} onClick={() => toast.info(`Editing ${r.name}`)}>
                  Edit User
                </DropdownItem>
                <DropdownSeparator />
                <DropdownItem icon={<Trash2 size={14} />} destructive onClick={() => toast.danger(`Removed ${r.name}`)}>
                  Delete
                </DropdownItem>
              </>
            )}
          />
        </div>

        {/* AvatarGroup, Badges, Search & Timeline Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Avatar & Badges */}
          <div className="lg:col-span-6 p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-lg space-y-6">
            <div className="space-y-3">
              <h3 className="text-base font-semibold border-b border-zinc-100 dark:border-zinc-800 pb-2">
                Avatar & AvatarGroup
              </h3>
              <div className="flex items-center gap-4">
                <Avatar name="Jane Doe" size="lg" status="online" />
                <Avatar name="Alex Rivera" size="lg" status="busy" />
                <Avatar name="Sarah Chen" size="lg" status="away" />
                <Avatar name="Michael Scott" size="lg" status="offline" />
              </div>

              <div className="pt-2 flex items-center gap-3">
                <span className="text-xs font-medium text-zinc-500">Stacked Group:</span>
                <AvatarGroup max={3} size="md">
                  <Avatar name="Jane Doe" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" />
                  <Avatar name="Alex Rivera" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150" />
                  <Avatar name="Sarah Chen" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150" />
                  <Avatar name="Michael Scott" />
                  <Avatar name="Elena Rostova" />
                </AvatarGroup>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-base font-semibold border-b border-zinc-100 dark:border-zinc-800 pb-2">
                Badges & Search Input
              </h3>

              <div className="flex flex-wrap items-center gap-2">
                <Badge intent="primary" variant="soft">Primary Soft</Badge>
                <Badge intent="success" variant="dot">Online Active</Badge>
                <Badge intent="warning" variant="outline">Warning</Badge>
                <Badge intent="danger" variant="default">Critical</Badge>
                <Badge intent="purple" variant="soft" onRemove={() => toast.info("Removed badge")}>Removable</Badge>
              </div>

              <Search
                value={searchVal}
                onChange={setSearchVal}
                placeholder="Search resources..."
                variant="default"
                className="mt-2"
              />
            </div>
          </div>

          {/* Timeline */}
          <div className="lg:col-span-6 p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-lg space-y-4">
            <h3 className="text-base font-semibold border-b border-zinc-100 dark:border-zinc-800 pb-2">
              Activity Timeline
            </h3>

            <Timeline lineStyle="solid">
              <TimelineItem active>
                <TimelineConnector />
                <TimelineIcon color="success" icon={<CheckCircle size={14} />} />
                <TimelineBody>
                  <TimelineHeader>
                    <TimelineTitle>Version 2.4 Deployed</TimelineTitle>
                    <TimelineTime>10 mins ago</TimelineTime>
                  </TimelineHeader>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Production bundle compiled and verified on edge servers.
                  </p>
                </TimelineBody>
              </TimelineItem>

              <TimelineItem active>
                <TimelineConnector />
                <TimelineIcon color="primary" icon={<User size={14} />} />
                <TimelineBody>
                  <TimelineHeader>
                    <TimelineTitle>New Team Member Joined</TimelineTitle>
                    <TimelineTime>2 hours ago</TimelineTime>
                  </TimelineHeader>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Elena Rostova accepted developer invite.
                  </p>
                </TimelineBody>
              </TimelineItem>

              <TimelineItem active>
                <TimelineIcon color="warning" icon={<AlertCircle size={14} />} />
                <TimelineBody>
                  <TimelineHeader>
                    <TimelineTitle>Storage Threshold Alert</TimelineTitle>
                    <TimelineTime>5 hours ago</TimelineTime>
                  </TimelineHeader>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Volume disk usage reached 85% capacity.
                  </p>
                </TimelineBody>
              </TimelineItem>
            </Timeline>
          </div>
        </div>
      </section>

      {/* 2. Form Suite Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 pb-3 border-b border-zinc-200 dark:border-zinc-800">
          <Layers className="h-5 w-5 text-blue-500" />
          <h2 className="text-xl font-bold tracking-tight">Form Component Suite</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-lg space-y-6">
            <Form onSubmit={handleFormSubmit} errors={formErrors} className="space-y-4">
              <FormField name="fullName" label="Full Name" required tooltip="Legal first and last name">
                <Input
                  placeholder="e.g. Alex Morgan"
                  leftAdornment={<User size={18} />}
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, fullName: e.target.value }))
                  }
                  clearable
                />
              </FormField>

              <FormField name="email" label="Email Address" required>
                <Input
                  type="email"
                  placeholder="alex@company.com"
                  leftAdornment={<Mail size={18} />}
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                />
              </FormField>

              <FormField name="role" label="Role">
                <Select
                  options={[
                    { value: "developer", label: "Software Developer" },
                    { value: "designer", label: "UI/UX Designer" },
                    { value: "pm", label: "Product Manager" },
                  ]}
                  value={formData.role}
                  onChange={(val) =>
                    setFormData((prev) => ({ ...prev, role: val as string }))
                  }
                />
              </FormField>

              <FormField name="bio" label="About Yourself">
                <Textarea
                  placeholder="Short background bio..."
                  rows={3}
                  autoResize
                  showCount
                  maxLength={160}
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, bio: e.target.value }))
                  }
                />
              </FormField>

              <FormField name="experienceLevel" label="Experience Level">
                <RadioGroup
                  value={formData.experienceLevel}
                  onValueChange={(val) =>
                    setFormData((prev) => ({ ...prev, experienceLevel: val }))
                  }
                  variant="card"
                  orientation="horizontal"
                >
                  <RadioGroupItem value="junior" label="Junior" description="0-2 yrs" />
                  <RadioGroupItem value="mid" label="Mid-Level" description="2-5 yrs" />
                  <RadioGroupItem value="senior" label="Senior" description="5+ yrs" />
                </RadioGroup>
              </FormField>

              <FormField name="satisfaction" label="Productivity Score">
                <Slider
                  value={formData.satisfaction}
                  onValueChange={(val) =>
                    setFormData((prev) => ({ ...prev, satisfaction: val as number }))
                  }
                  min={0}
                  max={100}
                />
              </FormField>

              <FormField name="notifications" label="Settings">
                <Switch
                  label="Receive weekly digest notifications"
                  checked={formData.notifications}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({ ...prev, notifications: checked }))
                  }
                />
              </FormField>

              <FormField name="resume" label="File Attachment">
                <FileUpload
                  accept="application/pdf, image/*"
                  maxSize={5 * 1024 * 1024}
                  multiple
                />
              </FormField>

              <Checkbox
                label="I agree to Terms & Conditions"
                defaultChecked
                variant="card"
              />

              <Button type="submit" variant="default" size="lg" leftIcon={<Send size={18} />} glow className="w-full">
                Submit Profile
              </Button>
            </Form>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-lg space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-zinc-100 dark:border-zinc-800">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                <h3 className="text-base font-semibold">Live Form State</h3>
              </div>
              <pre className="text-xs font-mono bg-zinc-100 dark:bg-zinc-950 p-4 rounded-xl overflow-x-auto text-zinc-800 dark:text-zinc-300 border border-zinc-200/50 dark:border-zinc-800/80">
                {JSON.stringify(submittedData || formData, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Feedback Suite Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 pb-3 border-b border-zinc-200 dark:border-zinc-800">
          <Bell className="h-5 w-5 text-amber-500" />
          <h2 className="text-xl font-bold tracking-tight">Feedback Component Suite</h2>
        </div>

        {/* Alert Banners */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Alert
            variant="default"
            intent="info"
            title="System Maintenance Scheduled"
            description="Our server cluster will undergo maintenance tonight at 02:00 UTC."
            dismissible
          />
          <Alert
            variant="default"
            intent="success"
            title="Deployment Successful"
            description="Your changes are now live on production."
            action={
              <Button size="sm" variant="outline">
                View Logs
              </Button>
            }
          />
          <Alert
            variant="bordered"
            intent="warning"
            title="Low Storage Warning"
            description="Less than 1GB remaining on main storage volume."
            dismissible
          />
          <Alert
            variant="filled"
            intent="danger"
            title="Security Alert"
            description="Multiple failed login attempts detected."
            dismissible
          />
        </div>

        {/* Toast & Snackbar Buttons */}
        <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-lg space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-zinc-100 dark:border-zinc-800">
            <Zap className="h-5 w-5 text-blue-500" />
            <h3 className="text-base font-semibold">Toast & Snackbar Notification Triggers</h3>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm" variant="default" onClick={() => triggerToast("success")}>
              Success Toast
            </Button>
            <Button size="sm" variant="destructive" onClick={() => triggerToast("danger")}>
              Danger Toast
            </Button>
            <Button size="sm" variant="secondary" onClick={() => triggerToast("info")}>
              Info Toast
            </Button>
            <Button size="sm" variant="outline" onClick={() => triggerToast("warning")}>
              Warning Toast
            </Button>
            <Button size="sm" variant="gradient" onClick={() => triggerToast("promise")}>
              Promise Toast
            </Button>
            <Button
              size="sm"
              variant="neon"
              onClick={() => setSnackbarOpen(true)}
              leftIcon={<RefreshCw size={14} />}
            >
              Trigger Snackbar
            </Button>
          </div>

          <Snackbar
            open={snackbarOpen}
            message="Item moved to workspace trash."
            actionLabel="Undo"
            onAction={() => {
              setSnackbarOpen(false);
              toast.info("Action undone!");
            }}
            onClose={() => setSnackbarOpen(false)}
            variant="default"
          />
        </div>

        {/* Progress & Spinners */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-lg space-y-4">
            <h3 className="text-base font-semibold border-b border-zinc-100 dark:border-zinc-800 pb-2">
              Progress Bar & Ring
            </h3>

            <Progress
              value={progressVal}
              label="Linear Progress"
              showValue
              variant="default"
              color="primary"
            />

            <Progress
              type="circle"
              value={progressVal}
              size="lg"
              showValue
              color="purple"
              label="Circular Ring"
            />

            <Progress
              steps={4}
              currentStep={stepVal}
              label="Multi-step Progress"
              showValue
              color="success"
            />

            <div className="flex items-center gap-2 pt-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setProgressVal((p) => Math.max(0, p - 15))}
              >
                - 15%
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setProgressVal((p) => Math.min(100, p + 15))}
              >
                + 15%
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => setStepVal((s) => (s % 4) + 1)}
              >
                Next Step ({stepVal}/4)
              </Button>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-lg space-y-4">
            <h3 className="text-base font-semibold border-b border-zinc-100 dark:border-zinc-800 pb-2">
              Spinners & Skeleton
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-800/40 flex items-center justify-between">
                <span className="text-xs font-mono">iOS Segment</span>
                <Spinner variant="ios" size="md" color="primary" />
              </div>
              <div className="p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-800/40 flex items-center justify-between">
                <span className="text-xs font-mono">Pulse</span>
                <Spinner variant="pulse" size="md" color="purple" />
              </div>
              <div className="p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-800/40 flex items-center justify-between">
                <span className="text-xs font-mono">Dots</span>
                <Spinner variant="dots" size="md" color="success" />
              </div>
              <div className="p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-800/40 flex items-center justify-between">
                <span className="text-xs font-mono">Ring</span>
                <Spinner variant="ring" size="md" color="danger" />
              </div>
            </div>

            <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsLoadingSkeleton((prev) => !prev)}
              >
                {isLoadingSkeleton ? "Show Content" : "Toggle Skeleton"}
              </Button>
            </div>

            {isLoadingSkeleton && (
              <div className="space-y-2 p-3 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                <Skeleton variant="avatar" />
                <Skeleton variant="text" width="70%" />
                <Skeleton variant="rect" height={60} />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. Overlay Suite Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 pb-3 border-b border-zinc-200 dark:border-zinc-800">
          <MousePointer className="h-5 w-5 text-purple-500" />
          <h2 className="text-xl font-bold tracking-tight">Overlay Component Suite</h2>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-lg space-y-6">
          {/* Right Click Context Menu Zone */}
          <ContextMenu variant="default">
            <ContextMenuTrigger className="p-6 rounded-2xl border-2 border-dashed border-zinc-300 dark:border-zinc-700 bg-blue-50/20 dark:bg-blue-950/20 text-center cursor-context-menu">
              <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                Right-Click anywhere in this box to open Context Menu
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                Opens context menu at exact cursor coordinates
              </p>
            </ContextMenuTrigger>

            <ContextMenuContent>
              <ContextMenuLabel>Actions</ContextMenuLabel>
              <ContextMenuItem icon={<Copy size={14} />} shortcut="⌘C" onClick={() => toast.info("Copied!")}>
                Copy Link
              </ContextMenuItem>
              <ContextMenuItem icon={<Share2 size={14} />} shortcut="⌘S" onClick={() => toast.info("Shared!")}>
                Share Project
              </ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem icon={<Trash2 size={14} />} shortcut="Del" destructive onClick={() => toast.danger("Deleted!")}>
                Remove Item
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>

          {/* Interactive Trigger Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <Button
              size="sm"
              variant="default"
              leftIcon={<Maximize2 size={16} />}
              onClick={() => setModalOpen(true)}
            >
              Open Modal Dialog
            </Button>

            <Button
              size="sm"
              variant="secondary"
              leftIcon={<PanelRight size={16} />}
              onClick={() => setDrawerOpen(true)}
            >
              Open Side Drawer
            </Button>

            {/* Popover */}
            <Popover
              variant="default"
              placement="top"
              content={
                <div className="space-y-1 text-xs">
                  <p className="font-semibold text-zinc-900 dark:text-zinc-100">Floating Popover Card</p>
                  <p className="text-zinc-500 dark:text-zinc-400">Translucent popover window anchored to trigger.</p>
                </div>
              }
            >
              <Button size="sm" variant="outline">Popover</Button>
            </Popover>

            {/* Dropdown Menu */}
            <Dropdown variant="default">
              <DropdownTrigger>
                <Button size="sm" variant="outline" rightIcon={<MoreVertical size={16} />}>
                  Dropdown Menu
                </Button>
              </DropdownTrigger>
              <DropdownContent>
                <DropdownLabel>Options</DropdownLabel>
                <DropdownItem icon={<User size={14} />} onClick={() => toast.info("Profile clicked")}>
                  User Profile
                </DropdownItem>
                <DropdownSeparator />
                <DropdownItem icon={<Trash2 size={14} />} destructive onClick={() => toast.danger("Deleted item")}>
                  Delete Item
                </DropdownItem>
              </DropdownContent>
            </Dropdown>

            {/* Tooltip */}
            <Tooltip content="Custom Tooltip Label" placement="top" variant="default">
              <Button size="sm" variant="ghost" leftIcon={<Info size={16} />}>
                Tooltip
              </Button>
            </Tooltip>
          </div>

          {/* Modal */}
          <Modal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            title="Modal Dialog Title"
            description="Accessible dialog overlay with focus trap and scroll lock."
            variant="default"
            footer={
              <>
                <Button size="sm" variant="outline" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
                <Button size="sm" variant="default" onClick={() => setModalOpen(false)}>
                  Confirm Action
                </Button>
              </>
            }
          >
            <div className="space-y-3 text-xs">
              <p>Modals lock body scrolling, support ESC key dismiss, and adapt to light & dark themes.</p>
              <Input placeholder="Interactive input inside modal..." variant="bordered" />
            </div>
          </Modal>

          {/* Drawer */}
          <Drawer
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            anchor="right"
            title="Side Drawer Navigation"
            description="Slide-out drawer panel with swipe-to-dismiss support."
            variant="default"
            footer={
              <Button size="sm" variant="default" className="w-full" onClick={() => setDrawerOpen(false)}>
                Close Drawer
              </Button>
            }
          >
            <div className="space-y-4 text-xs">
              <Alert variant="default" intent="info" title="Drawer Navigation" description="Supports left, right, top, or bottom anchors." />
              <Progress value={78} label="Storage usage" showValue variant="default" />
            </div>
          </Drawer>
        </div>
      </section>
    </div>
  );
}

export default function Home() {
  const [darkMode, setDarkMode] = React.useState(true);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <ToastProvider position="top-right">
      <div className={darkMode ? "dark" : ""}>
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300 p-4 sm:p-8 font-sans">
          {/* Header */}
          <header className="max-w-6xl mx-auto flex items-center justify-between pb-8 border-b border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20">
                <Sparkles className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-600 dark:from-white dark:via-zinc-200 dark:to-zinc-400">
                  Simple Components UI
                </h1>
                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                  Data, Form, Feedback & Overlay Component Suite Showcase
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant={darkMode ? "secondary" : "outline"}
                size="sm"
                onClick={toggleDarkMode}
                leftIcon={darkMode ? <Sun size={16} /> : <Moon size={16} />}
              >
                {darkMode ? "Light Mode" : "Dark Mode"}
              </Button>
            </div>
          </header>

          {/* Main Showcase Section */}
          <main className="max-w-6xl mx-auto py-8">
            <PageShowcase />
          </main>
        </div>
      </div>
    </ToastProvider>
  );
}
