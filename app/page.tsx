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
} from "@/index";
import {
  Moon,
  Sun,
  Mail,
  User,
  Sparkles,
  Send,
  CheckCircle,
  Sliders,
  Layers,
  Bell,
  RefreshCw,
  Zap,
} from "lucide-react";

function FeedbackDemo() {
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [progressVal, setProgressVal] = React.useState(65);
  const [stepVal, setStepVal] = React.useState(2);
  const [isLoadingSkeleton, setIsLoadingSkeleton] = React.useState(false);

  const triggerToast = (type: "info" | "success" | "warning" | "danger" | "promise") => {
    if (type === "success") {
      toast.success("Changes saved successfully!", {
        description: "Your preference settings have been synchronized to cloud.",
        variant: "ios-glass",
      });
    } else if (type === "danger") {
      toast.danger("Connection lost!", {
        description: "Please check your network settings and try again.",
        variant: "ios-glass",
      });
    } else if (type === "warning") {
      toast.warning("Storage limit almost full", {
        description: "You have used 92% of your monthly allocation.",
        variant: "ios-glass",
      });
    } else if (type === "promise") {
      toast.promise(
        new Promise((resolve) => setTimeout(resolve, 2000)),
        {
          loading: "Processing payment details...",
          success: "Transaction completed successfully!",
          error: "Payment declined by issuing bank.",
        },
        { variant: "ios-glass" }
      );
    } else {
      toast.info("New update available", {
        description: "Version 2.4 contains critical security patches.",
        variant: "ios-glass",
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Alert Component Showcase */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-blue-500" />
            <h2 className="text-lg font-semibold">Alert Banners</h2>
          </div>
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400">
            iOS Glassmorphism & Status Intents
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Alert
            variant="ios-glass"
            intent="info"
            title="System Maintenance Scheduled"
            description="Our server cluster will undergo maintenance tonight at 02:00 UTC."
            dismissible
          />

          <Alert
            variant="ios-glass"
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
            title="Low Disk Space Warning"
            description="Less than 1GB remaining on main storage volume."
            dismissible
          />

          <Alert
            variant="filled"
            intent="danger"
            title="Security Alert"
            description="Multiple failed login attempts detected from IP 192.168.1.45"
            dismissible
          />
        </div>
      </div>

      {/* Toast & Snackbar Interactive Triggers */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-amber-500" />
            <h2 className="text-lg font-semibold">Toast & Snackbar Triggers</h2>
          </div>
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
            Trigger Action Snackbar
          </Button>
        </div>

        <Snackbar
          open={snackbarOpen}
          message="Item archived to your cloud workspace."
          actionLabel="Undo"
          onAction={() => {
            setSnackbarOpen(false);
            toast.info("Archive action undone");
          }}
          onClose={() => setSnackbarOpen(false)}
          variant="ios-glass"
        />
      </div>

      {/* Progress & Spinner Showcase */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Progress Bar & Circle */}
        <div className="space-y-4">
          <h3 className="text-base font-semibold border-b border-zinc-100 dark:border-zinc-800 pb-2">
            Progress Indicators
          </h3>

          <Progress
            value={progressVal}
            label="Linear Glass Progress"
            showValue
            variant="ios-glass"
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

        {/* Spinners */}
        <div className="space-y-4">
          <h3 className="text-base font-semibold border-b border-zinc-100 dark:border-zinc-800 pb-2">
            Spinner Activity Styles
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-800/40 flex items-center justify-between">
              <span className="text-xs font-mono">iOS Segmented</span>
              <Spinner variant="ios" size="lg" color="primary" />
            </div>

            <div className="p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-800/40 flex items-center justify-between">
              <span className="text-xs font-mono">Pulse Glow</span>
              <Spinner variant="pulse" size="md" color="purple" />
            </div>

            <div className="p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-800/40 flex items-center justify-between">
              <span className="text-xs font-mono">Wave Dots</span>
              <Spinner variant="dots" size="md" color="success" />
            </div>

            <div className="p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-800/40 flex items-center justify-between">
              <span className="text-xs font-mono">Ring Spin</span>
              <Spinner variant="ring" size="md" color="danger" />
            </div>
          </div>
        </div>
      </div>

      {/* Skeleton Showcase */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
          <h2 className="text-lg font-semibold">Skeleton Wave Loaders</h2>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsLoadingSkeleton((prev) => !prev)}
          >
            {isLoadingSkeleton ? "Show Content" : "Toggle Skeleton"}
          </Button>
        </div>

        {isLoadingSkeleton ? (
          <div className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-4">
            <div className="flex items-center gap-3">
              <Skeleton variant="avatar" />
              <div className="space-y-1.5 flex-1">
                <Skeleton variant="text" width="40%" />
                <Skeleton variant="text" width="60%" />
              </div>
            </div>
            <Skeleton variant="card" height={120} />
          </div>
        ) : (
          <div className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
              JD
            </div>
            <div>
              <h4 className="text-sm font-semibold">Jane Doe</h4>
              <p className="text-xs text-zinc-500">Full-stack Software Engineer</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  const [darkMode, setDarkMode] = React.useState(true);
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

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!formData.fullName) errors.fullName = "Full name is required";
    if (!formData.email || !formData.email.includes("@")) errors.email = "Valid email address is required";
    if (!formData.bio) errors.bio = "Please write a short bio";

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setSubmittedData(formData);
    }
  };

  const selectRoleOptions = [
    { value: "developer", label: "Software Developer", description: "Frontend, Backend, or Fullstack" },
    { value: "designer", label: "UI/UX Designer", description: "Product & Graphic Design" },
    { value: "pm", label: "Product Manager", description: "Strategy & Roadmap Planning" },
    { value: "devops", label: "DevOps Engineer", description: "Infrastructure & CI/CD Pipelines" },
  ];

  const selectTechOptions = [
    { value: "react", label: "React / Next.js" },
    { value: "typescript", label: "TypeScript" },
    { value: "tailwind", label: "Tailwind CSS" },
    { value: "framer", label: "Framer Motion" },
    { value: "graphql", label: "GraphQL" },
  ];

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
                  Form Suite & iOS Glassmorphism Feedback Components
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

          {/* Main Body Grid */}
          <main className="max-w-6xl mx-auto py-10 space-y-12">
            {/* Section 1: Feedback Components Showcase */}
            <FeedbackDemo />

            {/* Section 2: Form Components Suite */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Interactive Form */}
              <section className="lg:col-span-7 flex flex-col gap-6">
                <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl shadow-zinc-200/50 dark:shadow-none">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-100 dark:border-zinc-800">
                    <div className="flex items-center gap-2">
                      <Layers className="h-5 w-5 text-blue-500" />
                      <h2 className="text-lg font-semibold">User Onboarding Form</h2>
                    </div>
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                      Compound Form Context
                    </span>
                  </div>

                  <Form onSubmit={handleFormSubmit} errors={formErrors} className="space-y-6">
                    {/* Input Component */}
                    <FormField
                      name="fullName"
                      label="Full Name"
                      required
                      tooltip="Enter your legal first and last name"
                    >
                      <Input
                        placeholder="e.g. Alex Morgan"
                        leftAdornment={<User size={18} />}
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            fullName: e.target.value,
                          }))
                        }
                        clearable
                      />
                    </FormField>

                    {/* Input with Password / Email */}
                    <FormField
                      name="email"
                      label="Email Address"
                      required
                      helperText="We will send your verification link to this email."
                    >
                      <Input
                        type="email"
                        placeholder="alex@company.com"
                        leftAdornment={<Mail size={18} />}
                        value={formData.email}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                      />
                    </FormField>

                    {/* Select Component */}
                    <FormField
                      name="role"
                      label="Primary Role"
                      helperText="Select the option that best describes your daily responsibilities."
                    >
                      <Select
                        options={selectRoleOptions}
                        value={formData.role}
                        onChange={(val) =>
                          setFormData((prev) => ({ ...prev, role: val as string }))
                        }
                        searchable
                      />
                    </FormField>

                    {/* Multi-Select Select */}
                    <FormField
                      name="techStack"
                      label="Technologies & Frameworks"
                      helperText="Multi-select dropdown"
                    >
                      <Select
                        options={selectTechOptions}
                        value={formData.techStack}
                        onChange={(val) =>
                          setFormData((prev) => ({
                            ...prev,
                            techStack: val as string[],
                          }))
                        }
                        multiple
                        clearable
                      />
                    </FormField>

                    {/* Textarea Component */}
                    <FormField name="bio" label="About Yourself" required>
                      <Textarea
                        placeholder="Tell us a few words about your background and recent projects..."
                        rows={3}
                        autoResize
                        showCount
                        maxLength={200}
                        value={formData.bio}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, bio: e.target.value }))
                        }
                      />
                    </FormField>

                    {/* RadioGroup Component */}
                    <FormField name="experienceLevel" label="Experience Level">
                      <RadioGroup
                        value={formData.experienceLevel}
                        onValueChange={(val) =>
                          setFormData((prev) => ({ ...prev, experienceLevel: val }))
                        }
                        variant="card"
                        orientation="horizontal"
                      >
                        <RadioGroupItem
                          value="junior"
                          label="Junior"
                          description="0 - 2 years"
                        />
                        <RadioGroupItem
                          value="mid"
                          label="Mid-Level"
                          description="2 - 5 years"
                        />
                        <RadioGroupItem
                          value="senior"
                          label="Senior"
                          description="5+ years"
                        />
                      </RadioGroup>
                    </FormField>

                    {/* Switch Component */}
                    <FormField name="notifications" label="Notification Settings">
                      <Switch
                        label="Receive weekly product updates"
                        description="Get concise digest notifications right to your inbox."
                        checked={formData.notifications}
                        onCheckedChange={(checked) =>
                          setFormData((prev) => ({
                            ...prev,
                            notifications: checked,
                          }))
                        }
                      />
                    </FormField>

                    {/* Slider Component */}
                    <FormField name="satisfaction" label="Productivity Score">
                      <Slider
                        value={formData.satisfaction}
                        onValueChange={(val) =>
                          setFormData((prev) => ({
                            ...prev,
                            satisfaction: val as number,
                          }))
                        }
                        min={0}
                        max={100}
                        step={5}
                        marks={[
                          { value: 0, label: "0%" },
                          { value: 50, label: "50%" },
                          { value: 100, label: "100%" },
                        ]}
                      />
                    </FormField>

                    {/* Range Slider Component */}
                    <FormField
                      name="budgetRange"
                      label="Estimated Project Budget ($)"
                    >
                      <Slider
                        value={formData.budgetRange}
                        onValueChange={(val) =>
                          setFormData((prev) => ({
                            ...prev,
                            budgetRange: val as [number, number],
                          }))
                        }
                        min={500}
                        max={10000}
                        step={500}
                        color="purple"
                        formatTooltip={(v) => `$${v}`}
                      />
                    </FormField>

                    {/* FileUpload Component */}
                    <FormField name="resume" label="Resume / Portfolio Document">
                      <FileUpload
                        accept="application/pdf, image/*"
                        maxSize={5 * 1024 * 1024}
                        multiple
                        dragAndDropText="Drag & drop your PDF resume or avatar image"
                      />
                    </FormField>

                    {/* Checkbox Component */}
                    <Checkbox
                      label="I agree to the Terms of Service and Privacy Policy"
                      description="By submitting, you agree to receive essential system alerts."
                      defaultChecked
                      variant="card"
                      color="primary"
                    />

                    <Button
                      type="submit"
                      variant="default"
                      size="lg"
                      leftIcon={<Send size={18} />}
                      glow
                      className="w-full"
                    >
                      Submit Form
                    </Button>
                  </Form>
                </div>
              </section>

              {/* Right Column: Live State & Component Gallery */}
              <section className="lg:col-span-5 flex flex-col gap-6">
                {/* Submitted Form State */}
                <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-lg">
                  <div className="flex items-center gap-2 mb-4 pb-3 border-b border-zinc-100 dark:border-zinc-800">
                    <CheckCircle className="h-5 w-5 text-emerald-500" />
                    <h3 className="text-base font-semibold">Live Form State</h3>
                  </div>

                  <pre className="text-xs font-mono bg-zinc-100 dark:bg-zinc-950 p-4 rounded-xl overflow-x-auto text-zinc-800 dark:text-zinc-300 border border-zinc-200/50 dark:border-zinc-800/80">
                    {JSON.stringify(submittedData || formData, null, 2)}
                  </pre>
                </div>

                {/* Component Variants Showcase */}
                <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-lg space-y-6">
                  <div className="flex items-center gap-2 pb-3 border-b border-zinc-100 dark:border-zinc-800">
                    <Sliders className="h-5 w-5 text-purple-500" />
                    <h3 className="text-base font-semibold">
                      Variant & Style Showcase
                    </h3>
                  </div>

                  {/* Input Variants */}
                  <div className="space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                      Input Variants
                    </span>
                    <Input variant="bordered" placeholder="Bordered variant" />
                    <Input variant="underline" placeholder="Underline variant" />
                    <Input variant="glass" placeholder="Glassmorphism variant" />
                    <Input
                      status="error"
                      errorText="Validation error state"
                      defaultValue="Invalid value"
                    />
                    <Input status="success" defaultValue="Valid value confirmed" />
                  </div>

                  {/* Checkbox Colors */}
                  <div className="space-y-3 pt-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                      Checkbox Accent Colors
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <Checkbox label="Primary" color="primary" defaultChecked />
                      <Checkbox label="Success" color="success" defaultChecked />
                      <Checkbox label="Danger" color="danger" defaultChecked />
                      <Checkbox label="Warning" color="warning" defaultChecked />
                    </div>
                  </div>

                  {/* Switches Sizes */}
                  <div className="space-y-3 pt-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                      Switch Sizes & Loading
                    </span>
                    <div className="flex items-center gap-4">
                      <Switch size="sm" defaultChecked />
                      <Switch size="md" defaultChecked color="success" />
                      <Switch size="lg" defaultChecked color="purple" />
                      <Switch size="md" loading />
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </ToastProvider>
  );
}
