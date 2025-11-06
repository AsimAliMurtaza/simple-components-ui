import * as React from 'react';
import { HTMLMotionProps } from 'framer-motion';

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

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    helperText?: string;
    errorText?: string;
    variant?: "default" | "underline" | "bordered" | "glass" | "ghost";
    labelAnimate?: boolean;
    leftAdornment?: React.ReactNode;
    rightAdornment?: React.ReactNode;
    adornmentClickable?: boolean;
    type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
}
declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;

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

export { Button, Input, Text };
