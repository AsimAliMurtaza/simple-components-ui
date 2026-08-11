import * as React from 'react';
import { HTMLMotionProps } from 'framer-motion';
import { Layout } from 'react-grid-layout';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "glass" | "gradient" | "neon";
    size?: "default" | "sm" | "lg" | "xl" | "icon";
    loading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    ripple?: boolean;
    glow?: boolean;
    animate?: boolean;
}
declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;

type MotionAnimationVariant = "default" | "fade" | "slide" | "scale" | "bounce" | "cascadeUp" | "rotate" | "pop";
interface TextProps extends HTMLMotionProps<"p"> {
    animation?: MotionAnimationVariant;
    as?: React.ElementType;
    size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
    color?: string;
    children?: React.ReactNode;
    staggerMs?: number;
}
declare const Text: React.ForwardRefExoticComponent<Omit<TextProps, "ref"> & React.RefAttributes<HTMLElement>>;

interface GridItemConfig extends Layout {
    title?: string;
    icon?: React.ReactNode;
}
interface GridProps {
    /** Unique key for localStorage persistence */
    storageKey: string;
    /** Default grid layout if none is saved */
    initialLayout: Layout[];
    /** Function that renders each grid item */
    renderItem: (id: string) => React.ReactNode;
    /** Optional item titles map or renderer */
    getItemTitle?: (id: string) => {
        title?: string;
        icon?: React.ReactNode;
    };
    /** Optional: Responsive breakpoints */
    breakpoints?: Record<string, number>;
    /** Optional: Columns per breakpoint */
    cols?: Record<string, number>;
    /** Optional: Custom className */
    className?: string;
    /** Optional: Grid row height */
    rowHeight?: number;
    /** Optional: Spacing between items [x, y] */
    margin?: [number, number];
    /** Disable dragging/resizing if needed */
    isDraggable?: boolean;
    isResizable?: boolean;
    /** Custom drag handle CSS class */
    draggableHandle?: string;
    /** Show layout reset button header */
    showReset?: boolean;
    /** Card visual variant */
    variant?: "default" | "bordered" | "glass" | "ios-glass";
}
/**
 * DraggableResizableGrid — A responsive, persistent, and animated layout component
 * built with react-grid-layout, Tailwind, and drag handle controls.
 */
declare const DraggableResizableGrid: React.FC<GridProps>;

interface FormContextValue {
    disabled?: boolean;
    readOnly?: boolean;
    size?: "sm" | "default" | "lg";
    layout?: "vertical" | "horizontal";
    errors?: Record<string, string>;
}
declare const useForm: () => FormContextValue;
interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
    disabled?: boolean;
    readOnly?: boolean;
    size?: "sm" | "default" | "lg";
    layout?: "vertical" | "horizontal";
    errors?: Record<string, string>;
    children: React.ReactNode;
}
declare const Form: React.ForwardRefExoticComponent<FormProps & React.RefAttributes<HTMLFormElement>>;
interface FormFieldContextValue {
    id?: string;
    name?: string;
    errorText?: string;
    helperText?: string;
    required?: boolean;
    disabled?: boolean;
    size?: "sm" | "default" | "lg";
    layout?: "vertical" | "horizontal";
}
declare const useFormField: () => FormFieldContextValue;
interface FormFieldProps {
    id?: string;
    name?: string;
    label?: React.ReactNode;
    helperText?: string;
    errorText?: string;
    tooltip?: string;
    required?: boolean;
    optionalText?: string;
    disabled?: boolean;
    size?: "sm" | "default" | "lg";
    layout?: "vertical" | "horizontal";
    className?: string;
    labelClassName?: string;
    contentClassName?: string;
    children: React.ReactNode;
}
declare const FormField: React.ForwardRefExoticComponent<FormFieldProps & React.RefAttributes<HTMLDivElement>>;

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"> {
    label?: string;
    helperText?: string;
    errorText?: string;
    variant?: "default" | "underline" | "bordered" | "glass" | "ghost";
    size?: "sm" | "default" | "lg";
    status?: "default" | "error" | "success" | "warning";
    labelAnimate?: boolean;
    leftAdornment?: React.ReactNode;
    rightAdornment?: React.ReactNode;
    adornmentClickable?: boolean;
    clearable?: boolean;
    onClear?: () => void;
}
declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;

interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size" | "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"> {
    label?: string;
    helperText?: string;
    errorText?: string;
    variant?: "default" | "underline" | "bordered" | "glass" | "ghost";
    size?: "sm" | "default" | "lg";
    status?: "default" | "error" | "success" | "warning";
    autoResize?: boolean;
    showCount?: boolean;
    leftAdornment?: React.ReactNode;
    rightAdornment?: React.ReactNode;
}
declare const Textarea: React.ForwardRefExoticComponent<TextareaProps & React.RefAttributes<HTMLTextAreaElement>>;

interface SelectOption {
    value: string;
    label: React.ReactNode;
    description?: string;
    icon?: React.ReactNode;
    disabled?: boolean;
}
interface SelectProps {
    options?: SelectOption[];
    value?: string | string[];
    defaultValue?: string | string[];
    onChange?: (value: string | string[]) => void;
    placeholder?: string;
    searchable?: boolean;
    clearable?: boolean;
    multiple?: boolean;
    disabled?: boolean;
    errorText?: string;
    helperText?: string;
    label?: string;
    variant?: "default" | "bordered" | "glass" | "ghost";
    size?: "sm" | "default" | "lg";
    className?: string;
}
declare const Select: React.ForwardRefExoticComponent<SelectProps & React.RefAttributes<HTMLDivElement>>;
declare const SelectTrigger: React.ForwardRefExoticComponent<SelectProps & React.RefAttributes<HTMLDivElement>>;
declare const SelectValue: ({ children }: {
    children?: React.ReactNode;
}) => React.JSX.Element;
declare const SelectContent: ({ children }: {
    children?: React.ReactNode;
}) => React.JSX.Element;
declare const SelectItem: ({ children }: {
    children?: React.ReactNode;
}) => React.JSX.Element;

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "onChange"> {
    label?: React.ReactNode;
    description?: React.ReactNode;
    checked?: boolean;
    defaultChecked?: boolean;
    indeterminate?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    variant?: "default" | "card" | "filled";
    size?: "sm" | "md" | "lg";
    color?: "primary" | "success" | "danger" | "warning" | "purple";
    errorText?: string;
    helperText?: string;
}
declare const Checkbox: React.ForwardRefExoticComponent<CheckboxProps & React.RefAttributes<HTMLInputElement>>;

interface RadioGroupProps {
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    name?: string;
    orientation?: "vertical" | "horizontal";
    disabled?: boolean;
    variant?: "default" | "card" | "pill";
    size?: "sm" | "md" | "lg";
    className?: string;
    children: React.ReactNode;
    errorText?: string;
    helperText?: string;
    label?: string;
}
declare const RadioGroup: React.ForwardRefExoticComponent<RadioGroupProps & React.RefAttributes<HTMLDivElement>>;
interface RadioGroupItemProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "onChange"> {
    value: string;
    label?: React.ReactNode;
    description?: React.ReactNode;
    badge?: React.ReactNode;
}
declare const RadioGroupItem: React.ForwardRefExoticComponent<RadioGroupItemProps & React.RefAttributes<HTMLInputElement>>;

interface SwitchProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "size" | "onChange"> {
    checked?: boolean;
    defaultChecked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    label?: React.ReactNode;
    description?: React.ReactNode;
    size?: "sm" | "md" | "lg";
    color?: "primary" | "success" | "danger" | "warning" | "purple";
    checkedIcon?: React.ReactNode;
    uncheckedIcon?: React.ReactNode;
    loading?: boolean;
    disabled?: boolean;
    errorText?: string;
    helperText?: string;
}
declare const Switch: React.ForwardRefExoticComponent<SwitchProps & React.RefAttributes<HTMLButtonElement>>;

interface SliderMark {
    value: number;
    label?: React.ReactNode;
}
interface SliderProps {
    value?: number | [number, number];
    defaultValue?: number | [number, number];
    min?: number;
    max?: number;
    step?: number;
    onValueChange?: (value: number | [number, number]) => void;
    showValueTooltip?: boolean;
    formatTooltip?: (val: number) => string;
    marks?: SliderMark[];
    disabled?: boolean;
    size?: "sm" | "md" | "lg";
    color?: "primary" | "success" | "danger" | "warning" | "purple";
    label?: string;
    helperText?: string;
    errorText?: string;
    className?: string;
}
declare const Slider: React.ForwardRefExoticComponent<SliderProps & React.RefAttributes<HTMLDivElement>>;

interface FileItem {
    id: string;
    file: File;
    name: string;
    size: number;
    type: string;
    previewUrl?: string;
    error?: string;
    progress?: number;
}
interface FileUploadProps {
    accept?: string;
    multiple?: boolean;
    maxSize?: number;
    maxFiles?: number;
    onFilesSelected?: (files: File[]) => void;
    onFileRemove?: (fileId: string) => void;
    variant?: "dropzone" | "compact" | "button";
    disabled?: boolean;
    label?: string;
    dragAndDropText?: string;
    helperText?: string;
    errorText?: string;
    className?: string;
}
declare const FileUpload: React.ForwardRefExoticComponent<FileUploadProps & React.RefAttributes<HTMLDivElement>>;

interface AlertProps {
    title?: React.ReactNode;
    description?: React.ReactNode;
    intent?: "info" | "success" | "warning" | "danger" | "neutral";
    variant?: "default" | "bordered" | "filled" | "glass" | "ios-glass";
    icon?: React.ReactNode;
    hideIcon?: boolean;
    action?: React.ReactNode;
    dismissible?: boolean;
    onDismiss?: () => void;
    className?: string;
    children?: React.ReactNode;
}
declare const Alert: React.ForwardRefExoticComponent<AlertProps & React.RefAttributes<HTMLDivElement>>;

type ToastType = "info" | "success" | "warning" | "danger" | "loading" | "custom";
type ToastPosition = "top-right" | "top-left" | "top-center" | "bottom-right" | "bottom-left" | "bottom-center";
interface ToastData {
    id: string;
    title?: React.ReactNode;
    description?: React.ReactNode;
    type?: ToastType;
    variant?: "default" | "filled" | "glass" | "ios-glass";
    duration?: number;
    icon?: React.ReactNode;
    action?: {
        label: string;
        onClick: () => void;
    };
    onDismiss?: () => void;
    component?: React.ReactNode;
}
interface ToastContextValue {
    toasts: ToastData[];
    position: ToastPosition;
    setPosition: (pos: ToastPosition) => void;
    addToast: (toast: Omit<ToastData, "id">) => string;
    removeToast: (id: string) => void;
    clearToasts: () => void;
}
interface ToastProviderProps {
    position?: ToastPosition;
    children: React.ReactNode;
}
declare const ToastProvider: React.FC<ToastProviderProps>;
declare const useToast: () => ToastContextValue;
declare const toast: {
    info: (title: React.ReactNode, options?: Partial<Omit<ToastData, "id" | "title" | "type">>) => string;
    success: (title: React.ReactNode, options?: Partial<Omit<ToastData, "id" | "title" | "type">>) => string;
    warning: (title: React.ReactNode, options?: Partial<Omit<ToastData, "id" | "title" | "type">>) => string;
    danger: (title: React.ReactNode, options?: Partial<Omit<ToastData, "id" | "title" | "type">>) => string;
    loading: (title: React.ReactNode, options?: Partial<Omit<ToastData, "id" | "title" | "type">>) => string;
    custom: (component: React.ReactNode, options?: Partial<Omit<ToastData, "id" | "type">>) => string;
    dismiss: (id: string) => void | undefined;
    promise: <T>(promise: Promise<T>, msgs: {
        loading: string;
        success: string;
        error: string;
    }, options?: Partial<ToastData>) => Promise<T>;
};

interface SnackbarProps {
    open?: boolean;
    message: React.ReactNode;
    actionLabel?: string;
    onAction?: () => void;
    secondaryActionLabel?: string;
    onSecondaryAction?: () => void;
    icon?: React.ReactNode;
    autoHideDuration?: number;
    onClose?: () => void;
    variant?: "default" | "filled" | "glass" | "ios-glass";
    dismissible?: boolean;
    className?: string;
}
declare const Snackbar: React.ForwardRefExoticComponent<SnackbarProps & React.RefAttributes<HTMLDivElement>>;

interface ProgressProps {
    value?: number;
    type?: "linear" | "circle";
    indeterminate?: boolean;
    size?: "sm" | "md" | "lg" | "xl";
    color?: "primary" | "success" | "warning" | "danger" | "purple";
    variant?: "default" | "bordered" | "glass" | "ios-glass";
    showValue?: boolean;
    formatValue?: (val: number) => string;
    label?: React.ReactNode;
    steps?: number;
    currentStep?: number;
    animatedStripes?: boolean;
    className?: string;
}
declare const Progress: React.ForwardRefExoticComponent<ProgressProps & React.RefAttributes<HTMLDivElement>>;

interface SpinnerProps {
    variant?: "spin" | "dots" | "pulse" | "ios" | "ring" | "gradient";
    size?: "sm" | "md" | "lg" | "xl";
    color?: "primary" | "success" | "warning" | "danger" | "purple" | "white" | "current";
    label?: React.ReactNode;
    className?: string;
}
declare const Spinner: React.ForwardRefExoticComponent<SpinnerProps & React.RefAttributes<HTMLDivElement>>;

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "rect" | "circle" | "avatar" | "text" | "button" | "card";
    animation?: "shimmer" | "pulse" | "wave" | "none";
    width?: string | number;
    height?: string | number;
    className?: string;
}
declare const Skeleton: React.ForwardRefExoticComponent<SkeletonProps & React.RefAttributes<HTMLDivElement>>;

interface ModalProps {
    open?: boolean;
    onClose?: () => void;
    title?: React.ReactNode;
    description?: React.ReactNode;
    size?: "sm" | "md" | "lg" | "xl" | "full";
    variant?: "default" | "bordered" | "glass" | "ios-glass";
    animation?: "scaleUp" | "slideUp" | "fade";
    closeOnOverlayClick?: boolean;
    closeOnEsc?: boolean;
    hideCloseButton?: boolean;
    footer?: React.ReactNode;
    className?: string;
    bodyClassName?: string;
    children?: React.ReactNode;
}
declare const Modal: React.ForwardRefExoticComponent<ModalProps & React.RefAttributes<HTMLDivElement>>;

interface DrawerProps {
    open?: boolean;
    onClose?: () => void;
    anchor?: "right" | "left" | "top" | "bottom";
    title?: React.ReactNode;
    description?: React.ReactNode;
    variant?: "default" | "bordered" | "glass" | "ios-glass";
    size?: "sm" | "md" | "lg" | "full";
    closeOnOverlayClick?: boolean;
    closeOnEsc?: boolean;
    hideCloseButton?: boolean;
    footer?: React.ReactNode;
    className?: string;
    children?: React.ReactNode;
}
declare const Drawer: React.ForwardRefExoticComponent<DrawerProps & React.RefAttributes<HTMLDivElement>>;

type PopoverPlacement = "top" | "bottom" | "left" | "right";
interface PopoverProps {
    content: React.ReactNode;
    placement?: PopoverPlacement;
    trigger?: "click" | "hover";
    variant?: "default" | "bordered" | "glass" | "ios-glass";
    showArrow?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    className?: string;
    children: React.ReactNode;
}
declare const Popover: React.ForwardRefExoticComponent<PopoverProps & React.RefAttributes<HTMLDivElement>>;

type TooltipPlacement = "top" | "bottom" | "left" | "right";
interface TooltipProps {
    content: React.ReactNode;
    placement?: TooltipPlacement;
    delay?: number;
    variant?: "default" | "glass" | "ios-glass";
    showArrow?: boolean;
    className?: string;
    children: React.ReactNode;
}
declare const Tooltip: React.FC<TooltipProps>;

interface DropdownProps {
    variant?: "default" | "bordered" | "glass" | "ios-glass";
    align?: "left" | "right";
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    children: React.ReactNode;
    className?: string;
}
declare const Dropdown: React.FC<DropdownProps>;
declare const DropdownTrigger: React.FC<{
    children: React.ReactNode;
    className?: string;
}>;
declare const DropdownContent: React.FC<{
    children: React.ReactNode;
    className?: string;
}>;
interface DropdownItemProps {
    onClick?: () => void;
    icon?: React.ReactNode;
    shortcut?: string;
    disabled?: boolean;
    destructive?: boolean;
    children: React.ReactNode;
    className?: string;
}
declare const DropdownItem: React.FC<DropdownItemProps>;
declare const DropdownLabel: React.FC<{
    children: React.ReactNode;
    className?: string;
}>;
declare const DropdownSeparator: React.FC<{
    className?: string;
}>;

interface ContextMenuProps {
    variant?: "default" | "glass" | "ios-glass";
    children: React.ReactNode;
    className?: string;
}
declare const ContextMenu: React.FC<ContextMenuProps>;
declare const ContextMenuTrigger: React.FC<{
    children: React.ReactNode;
    className?: string;
}>;
declare const ContextMenuContent: React.FC<{
    children: React.ReactNode;
    className?: string;
}>;
interface ContextMenuItemProps {
    onClick?: () => void;
    icon?: React.ReactNode;
    shortcut?: string;
    disabled?: boolean;
    destructive?: boolean;
    children: React.ReactNode;
    className?: string;
}
declare const ContextMenuItem: React.FC<ContextMenuItemProps>;
declare const ContextMenuLabel: React.FC<{
    children: React.ReactNode;
    className?: string;
}>;
declare const ContextMenuSeparator: React.FC<{
    className?: string;
}>;

interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
    variant?: "default" | "bordered" | "striped" | "glass" | "ios-glass";
    size?: "sm" | "md" | "lg";
    hoverable?: boolean;
}
declare const Table: React.ForwardRefExoticComponent<TableProps & React.RefAttributes<HTMLTableElement>>;
declare const TableHeader: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableSectionElement> & React.RefAttributes<HTMLTableSectionElement>>;
declare const TableBody: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableSectionElement> & React.RefAttributes<HTMLTableSectionElement>>;
declare const TableFooter: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableSectionElement> & React.RefAttributes<HTMLTableSectionElement>>;
declare const TableRow: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableRowElement> & {
    selected?: boolean;
} & React.RefAttributes<HTMLTableRowElement>>;
declare const TableHead: React.ForwardRefExoticComponent<React.ThHTMLAttributes<HTMLTableCellElement> & React.RefAttributes<HTMLTableCellElement>>;
declare const TableCell: React.ForwardRefExoticComponent<React.TdHTMLAttributes<HTMLTableCellElement> & React.RefAttributes<HTMLTableCellElement>>;
declare const TableCaption: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableCaptionElement> & React.RefAttributes<HTMLTableCaptionElement>>;

type SortDirection = "asc" | "desc" | false;
interface SortableHeaderProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
    sortDirection?: SortDirection;
    onSort?: (direction: SortDirection) => void;
    children: React.ReactNode;
    className?: string;
}
declare const SortableHeader: React.ForwardRefExoticComponent<SortableHeaderProps & React.RefAttributes<HTMLTableCellElement>>;

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    totalItems?: number;
    pageSize?: number;
    pageSizeOptions?: number[];
    onPageChange: (page: number) => void;
    onPageSizeChange?: (pageSize: number) => void;
    siblingCount?: number;
    showFirstLast?: boolean;
    showPageSizeSelector?: boolean;
    variant?: "default" | "bordered" | "glass" | "ios-glass";
    className?: string;
}
declare const Pagination: React.FC<PaginationProps>;

interface ActiveFilter {
    id: string;
    label: string;
    value: string;
}
interface FilterBarProps {
    activeFilters?: ActiveFilter[];
    onRemoveFilter?: (id: string) => void;
    onClearAll?: () => void;
    variant?: "default" | "bordered" | "glass" | "ios-glass";
    className?: string;
    children?: React.ReactNode;
}
declare const FilterBar: React.FC<FilterBarProps>;

interface SearchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "onChange"> {
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    onDebouncedChange?: (value: string) => void;
    debounceTime?: number;
    loading?: boolean;
    clearable?: boolean;
    shortcut?: string;
    size?: "sm" | "md" | "lg";
    variant?: "default" | "bordered" | "glass" | "ios-glass";
    className?: string;
}
declare const Search: React.ForwardRefExoticComponent<SearchProps & React.RefAttributes<HTMLInputElement>>;

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    intent?: "primary" | "secondary" | "success" | "warning" | "danger" | "neutral" | "purple";
    variant?: "default" | "outline" | "soft" | "dot" | "glass" | "ios-glass";
    size?: "sm" | "md" | "lg";
    icon?: React.ReactNode;
    onRemove?: () => void;
    className?: string;
    children: React.ReactNode;
}
declare const Badge: React.ForwardRefExoticComponent<BadgeProps & React.RefAttributes<HTMLSpanElement>>;

type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
type AvatarStatus = "online" | "offline" | "busy" | "away";
interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
    src?: string;
    alt?: string;
    name?: string;
    size?: AvatarSize;
    shape?: "circle" | "rounded" | "square";
    status?: AvatarStatus;
    className?: string;
}
declare const Avatar: React.ForwardRefExoticComponent<AvatarProps & React.RefAttributes<HTMLDivElement>>;
interface AvatarGroupProps {
    max?: number;
    size?: AvatarSize;
    children: React.ReactNode;
    className?: string;
}
declare const AvatarGroup: React.FC<AvatarGroupProps>;

interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
    lineStyle?: "solid" | "dashed" | "dotted";
    className?: string;
    children: React.ReactNode;
}
declare const Timeline: React.ForwardRefExoticComponent<TimelineProps & React.RefAttributes<HTMLDivElement>>;
interface TimelineItemProps extends React.HTMLAttributes<HTMLDivElement> {
    active?: boolean;
    className?: string;
    children: React.ReactNode;
}
declare const TimelineItem: React.ForwardRefExoticComponent<TimelineItemProps & React.RefAttributes<HTMLDivElement>>;
interface TimelineIconProps extends React.HTMLAttributes<HTMLDivElement> {
    color?: "primary" | "success" | "warning" | "danger" | "purple" | "neutral";
    variant?: "default" | "outline" | "glass" | "ios-glass";
    icon?: React.ReactNode;
    className?: string;
}
declare const TimelineIcon: React.ForwardRefExoticComponent<TimelineIconProps & React.RefAttributes<HTMLDivElement>>;
interface TimelineConnectorProps {
    className?: string;
}
declare const TimelineConnector: React.FC<TimelineConnectorProps>;
declare const TimelineBody: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const TimelineHeader: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const TimelineTitle: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLHeadingElement> & React.RefAttributes<HTMLHeadingElement>>;
declare const TimelineTime: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLSpanElement> & React.RefAttributes<HTMLSpanElement>>;

interface EmptyStateProps {
    icon?: React.ReactNode;
    title?: React.ReactNode;
    description?: React.ReactNode;
    action?: React.ReactNode;
    secondaryAction?: React.ReactNode;
    variant?: "default" | "bordered" | "dashed" | "glass" | "ios-glass";
    className?: string;
    children?: React.ReactNode;
}
declare const EmptyState: React.ForwardRefExoticComponent<EmptyStateProps & React.RefAttributes<HTMLDivElement>>;

interface ColumnDef<T> {
    id: string;
    header: React.ReactNode;
    accessorKey?: keyof T;
    cell?: (row: T, index: number) => React.ReactNode;
    sortable?: boolean;
    filterable?: boolean;
    filterOptions?: {
        label: string;
        value: string;
    }[];
    hidden?: boolean;
}
interface DataTableProps<T> {
    data: T[];
    columns: ColumnDef<T>[];
    getRowId?: (row: T, index: number) => string;
    searchable?: boolean;
    searchPlaceholder?: string;
    loading?: boolean;
    pageSize?: number;
    pageSizeOptions?: number[];
    variant?: "default" | "bordered" | "striped" | "glass" | "ios-glass";
    onRowClick?: (row: T) => void;
    rowActions?: (row: T) => React.ReactNode;
    className?: string;
}
declare function DataTable<T extends object>({ data, columns: initialColumns, getRowId, searchable, searchPlaceholder, loading, pageSize: initialPageSize, pageSizeOptions, variant, onRowClick, rowActions, className, }: DataTableProps<T>): React.JSX.Element;

export { type ActiveFilter, Alert, type AlertProps, Avatar, AvatarGroup, type AvatarGroupProps, type AvatarProps, type AvatarSize, type AvatarStatus, Badge, type BadgeProps, Button, type ButtonProps, Checkbox, type CheckboxProps, type ColumnDef, ContextMenu, ContextMenuContent, ContextMenuItem, type ContextMenuItemProps, ContextMenuLabel, type ContextMenuProps, ContextMenuSeparator, ContextMenuTrigger, DataTable, type DataTableProps, DraggableResizableGrid, Drawer, type DrawerProps, Dropdown, DropdownContent, DropdownItem, type DropdownItemProps, DropdownLabel, type DropdownProps, DropdownSeparator, DropdownTrigger, EmptyState, type EmptyStateProps, type FileItem, FileUpload, type FileUploadProps, FilterBar, type FilterBarProps, Form, type FormContextValue, FormField, type FormFieldContextValue, type FormFieldProps, type FormProps, type GridItemConfig, type GridProps, Input, type InputProps, Modal, type ModalProps, Pagination, type PaginationProps, Popover, type PopoverPlacement, type PopoverProps, Progress, type ProgressProps, RadioGroup, RadioGroupItem, type RadioGroupItemProps, type RadioGroupProps, Search, type SearchProps, Select, SelectContent, SelectItem, type SelectOption, type SelectProps, SelectTrigger, SelectValue, Skeleton, type SkeletonProps, Slider, type SliderMark, type SliderProps, Snackbar, type SnackbarProps, type SortDirection, SortableHeader, type SortableHeaderProps, Spinner, type SpinnerProps, Switch, type SwitchProps, Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, type TableProps, TableRow, Text, type TextProps, Textarea, type TextareaProps, Timeline, TimelineBody, TimelineConnector, type TimelineConnectorProps, TimelineHeader, TimelineIcon, type TimelineIconProps, TimelineItem, type TimelineItemProps, type TimelineProps, TimelineTime, TimelineTitle, type ToastData, type ToastPosition, ToastProvider, type ToastProviderProps, type ToastType, Tooltip, type TooltipPlacement, type TooltipProps, toast, useForm, useFormField, useToast };
