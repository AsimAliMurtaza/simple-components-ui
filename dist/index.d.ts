import * as React from 'react';
import { HTMLMotionProps } from 'framer-motion';

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

export { Alert, type AlertProps, Button, type ButtonProps, Checkbox, type CheckboxProps, type FileItem, FileUpload, type FileUploadProps, Form, type FormContextValue, FormField, type FormFieldContextValue, type FormFieldProps, type FormProps, Input, type InputProps, Progress, type ProgressProps, RadioGroup, RadioGroupItem, type RadioGroupItemProps, type RadioGroupProps, Select, SelectContent, SelectItem, type SelectOption, type SelectProps, SelectTrigger, SelectValue, Skeleton, type SkeletonProps, Slider, type SliderMark, type SliderProps, Snackbar, type SnackbarProps, Spinner, type SpinnerProps, Switch, type SwitchProps, Text, type TextProps, Textarea, type TextareaProps, type ToastData, type ToastPosition, ToastProvider, type ToastProviderProps, type ToastType, toast, useForm, useFormField, useToast };
