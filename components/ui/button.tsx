"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react"; // For loading spinner

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "glass"
    | "ios-glass"
    | "gradient"
    | "neon";
  size?: "default" | "sm" | "lg" | "xl" | "icon";
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  ripple?: boolean;
  glow?: boolean;
  animate?: boolean;
}

const variantMap = {
  default:
    "bg-teal-600 text-white hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-700 shadow-sm",
  destructive:
    "bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 shadow-sm",
  outline:
    "border border-zinc-300 bg-transparent text-zinc-900 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800",
  secondary:
    "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700",
  ghost: "hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300",
  link: "text-teal-600 underline-offset-4 hover:underline dark:text-teal-400",
  glass:
    "bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-white/40 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 hover:bg-white/90 dark:hover:bg-zinc-900/90 shadow-md",
  "ios-glass":
    "bg-white/40 dark:bg-zinc-900/40 backdrop-blur-2xl border border-white/60 dark:border-zinc-800/80 text-zinc-900 dark:text-white hover:bg-white/60 dark:hover:bg-zinc-900/60 shadow-lg",
  gradient:
    "bg-gradient-to-r from-teal-500 to-indigo-500 text-white hover:from-teal-600 hover:to-indigo-600 shadow-md",
  neon: "bg-black text-emerald-400 border border-emerald-400 hover:bg-emerald-400 hover:text-black shadow-md",
};

const sizeMap = {
  default: "h-10 px-4 py-2 text-sm",
  sm: "h-8 px-3 py-1 text-xs",
  lg: "h-12 px-6 py-3 text-base",
  xl: "h-14 px-8 py-4 text-lg",
  icon: "h-10 w-10 p-0",
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      loading = false,
      leftIcon,
      rightIcon,
      ripple = true,
      glow = false,
      animate = true,
      children,
      disabled,
      onClick,
      ...props
    },
    ref
  ) => {
    const [rippleEffect, setRippleEffect] = React.useState<{
      x: number;
      y: number;
      timestamp: number;
    } | null>(null);

    const handleClick = React.useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        if (disabled || loading) return;

        if (ripple) {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          setRippleEffect({ x, y, timestamp: Date.now() });
        }

        onClick?.(e);
      },
      [disabled, loading, ripple, onClick]
    );

    React.useEffect(() => {
      if (rippleEffect) {
        const timer = setTimeout(() => setRippleEffect(null), 600);
        return () => clearTimeout(timer);
      }
    }, [rippleEffect]);

    const buttonVariants = {
      initial: { scale: 1 },
      hover: { scale: animate ? 1.02 : 1 },
      tap: { scale: animate ? 0.98 : 1 },
    };

    const iconVariants = {
      initial: { rotate: 0 },
      hover: { rotate: loading ? 0 : 5 },
    };

    const isDisabled = disabled || loading;

    return (
      <motion.button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 relative overflow-hidden select-none cursor-pointer",

          // Variant styles
          variantMap[variant],

          // Size styles
          sizeMap[size],

          // Focus ring colors based on variant
          {
            "focus:ring-teal-500":
              variant === "default" ||
              variant === "link" ||
              variant === "gradient",
            "focus:ring-red-500": variant === "destructive",
            "focus:ring-zinc-500":
              variant === "outline" ||
              variant === "secondary" ||
              variant === "ghost",
            "focus:ring-white/50": variant === "glass" || variant === "ios-glass",
            "focus:ring-emerald-400": variant === "neon",
          },

          // Glow effect
          glow && {
            "shadow-lg shadow-teal-500/30":
              variant === "default" || variant === "gradient",
            "shadow-lg shadow-red-500/30": variant === "destructive",
            "shadow-lg shadow-emerald-400/30": variant === "neon",
          },

          // Disabled state
          isDisabled && "opacity-50 cursor-not-allowed",

          className
        )}
        variants={buttonVariants}
        initial="initial"
        whileHover={!isDisabled ? "hover" : "initial"}
        whileTap={!isDisabled ? "tap" : "initial"}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        onClick={handleClick}
        disabled={isDisabled}
        type={props.type || "button"}
        aria-label={props["aria-label"]}
        id={props.id}
        name={props.name}
        value={props.value}
        form={props.form}
        formAction={props.formAction}
        formEncType={props.formEncType}
        formMethod={props.formMethod}
        formNoValidate={props.formNoValidate}
        formTarget={props.formTarget}
        autoFocus={props.autoFocus}
        tabIndex={props.tabIndex}
        role={props.role}
        title={props.title}
        style={props.style}
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
        onMouseDown={props.onMouseDown}
        onMouseUp={props.onMouseUp}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
        onKeyDown={props.onKeyDown}
        onKeyUp={props.onKeyUp}
        onKeyPress={props.onKeyPress}
      >
        {/* Ripple Effect */}
        {rippleEffect && ripple && (
          <motion.span
            className="absolute rounded-full bg-white/30"
            style={{
              left: rippleEffect.x - 10,
              top: rippleEffect.y - 10,
              width: 20,
              height: 20,
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        )}

        {/* Left Icon */}
        {leftIcon && !loading && (
          <motion.span
            className={cn("mr-2", size === "icon" && "mr-0")}
            variants={iconVariants}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {leftIcon}
          </motion.span>
        )}

        {/* Loading Spinner */}
        {loading && (
          <motion.div
            className={cn("mr-2", size === "icon" && "mr-0")}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <Loader2
              className={cn(
                "animate-spin",
                size === "sm" && "h-3 w-3",
                size === "default" && "h-4 w-4",
                size === "lg" && "h-5 w-5",
                size === "xl" && "h-6 w-6",
                size === "icon" && "h-4 w-4"
              )}
            />
          </motion.div>
        )}

        {/* Button Text */}
        {children && size !== "icon" && (
          <motion.span
            className="inline-flex items-center"
            initial={{ opacity: 1 }}
            animate={{ opacity: loading ? 0.7 : 1 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.span>
        )}

        {/* Right Icon */}
        {rightIcon && !loading && (
          <motion.span
            className={cn("ml-2", size === "icon" && "ml-0")}
            variants={iconVariants}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {rightIcon}
          </motion.span>
        )}

        {/* Neon glow effect for neon variant */}
        {variant === "neon" && glow && (
          <div className="absolute inset-0 rounded-md bg-emerald-400/20 blur-sm -z-10" />
        )}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export default Button;
