// Base UI Components
export { default as Button } from "./components/ui/button";
export type { ButtonProps } from "./components/ui/button";

export { default as Text } from "./components/ui/text";
export type { TextProps } from "./components/ui/text";

export { default as Heading } from "./components/ui/heading";
export type { HeadingProps, HeadingLevel, HeadingVariant, HeadingAnimation } from "./components/ui/heading";

export { default as Typewriter } from "./components/ui/typewriter";
export type { TypewriterProps } from "./components/ui/typewriter";

export { default as TextScramble } from "./components/ui/text-scramble";
export type { TextScrambleProps } from "./components/ui/text-scramble";

export { default as GradientText } from "./components/ui/gradient-text";
export type { GradientTextProps } from "./components/ui/gradient-text";

export { default as HighlightText } from "./components/ui/highlight-text";
export type { HighlightTextProps } from "./components/ui/highlight-text";

// Productivity Utilities Suite
export { default as CommandPalette } from "./components/ui/command-palette";
export type { CommandPaletteProps, CommandItemDef } from "./components/ui/command-palette";

export { default as HoverCard } from "./components/ui/hover-card";
export type { HoverCardProps } from "./components/ui/hover-card";

export { default as InputOTP } from "./components/ui/input-otp";
export type { InputOTPProps } from "./components/ui/input-otp";

export { default as CopyButton, CopyableField } from "./components/ui/copy-button";
export type { CopyButtonProps, CopyableFieldProps } from "./components/ui/copy-button";

export { default as TagInput } from "./components/ui/tag-input";
export type { TagInputProps } from "./components/ui/tag-input";

export { default as StatCard } from "./components/data/stat-card";
export type { StatCardProps } from "./components/data/stat-card";

export { default as Marquee } from "./components/ui/marquee";
export type { MarqueeProps } from "./components/ui/marquee";

export { default as AnimatedNumber } from "./components/ui/animated-number";
export type { AnimatedNumberProps } from "./components/ui/animated-number";

export { default as SpotlightCard } from "./components/ui/spotlight-card";
export type { SpotlightCardProps } from "./components/ui/spotlight-card";

export { default as Kbd } from "./components/ui/kbd";
export type { KbdProps } from "./components/ui/kbd";

// Media & Carousel Suite
export { default as Carousel } from "./components/media/carousel";
export type { CarouselProps, CarouselSlide } from "./components/media/carousel";

export { default as ImageCard } from "./components/media/image-card";
export type { ImageCardProps } from "./components/media/image-card";

export { default as ComparisonSlider } from "./components/media/comparison-slider";
export type { ComparisonSliderProps } from "./components/media/comparison-slider";

export { default as ImageStack } from "./components/media/image-stack";
export type { ImageStackProps, ImageStackItem } from "./components/media/image-stack";

export { default as ImageGallery } from "./components/media/image-gallery";
export type { ImageGalleryProps, GalleryItem } from "./components/media/image-gallery";

// Grid Components
export { default as DraggableResizableGrid } from "./components/grid/draggable-resizeable-grid";
export type { GridProps, GridItemConfig } from "./components/grid/draggable-resizeable-grid";

// Form Component Suite
export { default as Form, FormField, useForm, useFormField } from "./components/ui/form";
export type { FormProps, FormFieldProps, FormContextValue, FormFieldContextValue } from "./components/ui/form";

export { default as Input } from "./components/ui/input";
export type { InputProps } from "./components/ui/input";

export { default as Textarea } from "./components/ui/textarea";
export type { TextareaProps } from "./components/ui/textarea";

export {
  default as Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./components/ui/select";
export type { SelectProps, SelectOption } from "./components/ui/select";

export { default as Checkbox } from "./components/ui/checkbox";
export type { CheckboxProps } from "./components/ui/checkbox";

export { default as RadioGroup, RadioGroupItem } from "./components/ui/radio-group";
export type { RadioGroupProps, RadioGroupItemProps } from "./components/ui/radio-group";

export { default as Switch } from "./components/ui/switch";
export type { SwitchProps } from "./components/ui/switch";

export { default as Slider } from "./components/ui/slider";
export type { SliderProps, SliderMark } from "./components/ui/slider";

export { default as FileUpload } from "./components/ui/file-upload";
export type { FileUploadProps, FileItem } from "./components/ui/file-upload";

// Feedback Component Suite
export { default as Alert } from "./components/ui/alert";
export type { AlertProps } from "./components/ui/alert";

export { ToastProvider, useToast, toast } from "./components/ui/toast";
export type { ToastData, ToastType, ToastPosition, ToastProviderProps } from "./components/ui/toast";

export { default as Snackbar } from "./components/ui/snackbar";
export type { SnackbarProps } from "./components/ui/snackbar";

export { default as Progress } from "./components/ui/progress";
export type { ProgressProps } from "./components/ui/progress";

export { default as Spinner } from "./components/ui/spinner";
export type { SpinnerProps } from "./components/ui/spinner";

export { default as Skeleton } from "./components/ui/skeleton";
export type { SkeletonProps } from "./components/ui/skeleton";

// Overlay Component Suite
export { default as Modal } from "./components/overlay/modal";
export type { ModalProps } from "./components/overlay/modal";

export { default as Drawer } from "./components/overlay/drawer";
export type { DrawerProps } from "./components/overlay/drawer";

export { default as Popover } from "./components/overlay/popover";
export type { PopoverProps, PopoverPlacement } from "./components/overlay/popover";

export { default as Tooltip } from "./components/overlay/tooltip";
export type { TooltipProps, TooltipPlacement } from "./components/overlay/tooltip";

export {
  default as Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownLabel,
  DropdownSeparator,
} from "./components/overlay/dropdown";
export type { DropdownProps, DropdownItemProps } from "./components/overlay/dropdown";

export {
  default as ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
} from "./components/overlay/context-menu";
export type { ContextMenuProps, ContextMenuItemProps } from "./components/overlay/context-menu";

// Data Component Suite
export {
  default as Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "./components/data/table";
export type { TableProps } from "./components/data/table";

export { default as SortableHeader } from "./components/data/sortable-header";
export type { SortableHeaderProps, SortDirection } from "./components/data/sortable-header";

export { default as Pagination } from "./components/data/pagination";
export type { PaginationProps } from "./components/data/pagination";

export { default as FilterBar } from "./components/data/filter-bar";
export type { FilterBarProps, ActiveFilter } from "./components/data/filter-bar";

export { default as Search } from "./components/data/search";
export type { SearchProps } from "./components/data/search";

export { default as Badge } from "./components/data/badge";
export type { BadgeProps } from "./components/data/badge";

export { default as Avatar, AvatarGroup } from "./components/data/avatar";
export type { AvatarProps, AvatarGroupProps, AvatarSize, AvatarStatus } from "./components/data/avatar";

export {
  default as Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineHeader,
  TimelineIcon,
  TimelineBody,
  TimelineTitle,
  TimelineTime,
} from "./components/data/timeline";
export type {
  TimelineProps,
  TimelineItemProps,
  TimelineIconProps,
  TimelineConnectorProps,
} from "./components/data/timeline";

export { default as EmptyState } from "./components/data/empty-state";
export type { EmptyStateProps } from "./components/data/empty-state";

export { default as DataTable } from "./components/data/data-table";
export type { DataTableProps, ColumnDef } from "./components/data/data-table";

// Layout Component Suite
export * from "./components/layout";

// Navigation Component Suite
export * from "./components/navigation";