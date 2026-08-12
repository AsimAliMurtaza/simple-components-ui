"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface TypewriterProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string | string[];
  speed?: number;
  deleteSpeed?: number;
  delay?: number;
  loop?: boolean;
  cursor?: boolean | React.ReactNode;
  cursorStyle?: "pipe" | "underscore" | "block";
  variant?: "default" | "teal" | "gradient" | "neon" | "muted";
  onFinish?: () => void;
  className?: string;
}

const variantClasses = {
  default: "text-zinc-900 dark:text-zinc-100",
  teal: "text-teal-600 dark:text-teal-400 font-semibold",
  gradient: "bg-clip-text text-transparent bg-gradient-to-r from-teal-500 via-emerald-500 to-indigo-500 font-extrabold",
  neon: "text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.7)] font-mono",
  muted: "text-zinc-500 dark:text-zinc-400",
};

export const Typewriter = React.forwardRef<HTMLSpanElement, TypewriterProps>(
  (
    {
      text,
      speed = 60,
      deleteSpeed = 35,
      delay = 1500,
      loop = true,
      cursor = true,
      cursorStyle = "pipe",
      variant = "default",
      onFinish,
      className,
      ...props
    },
    ref
  ) => {
    const textArray = React.useMemo(() => (Array.isArray(text) ? text : [text]), [text]);

    const [currentTextIndex, setCurrentTextIndex] = React.useState(0);
    const [displayText, setDisplayText] = React.useState("");
    const [isDeleting, setIsDeleting] = React.useState(false);

    React.useEffect(() => {
      let timer: NodeJS.Timeout;
      const currentFullText = textArray[currentTextIndex] || "";

      if (!isDeleting && displayText === currentFullText) {
        // Full string typed out
        if (!loop && currentTextIndex === textArray.length - 1) {
          onFinish?.();
          return;
        }
        timer = setTimeout(() => setIsDeleting(true), delay);
      } else if (isDeleting && displayText === "") {
        // Full string deleted
        setIsDeleting(false);
        const nextIndex = (currentTextIndex + 1) % textArray.length;
        setCurrentTextIndex(nextIndex);
      } else {
        const timeoutSpeed = isDeleting ? deleteSpeed : speed;
        timer = setTimeout(() => {
          setDisplayText((prev) =>
            isDeleting
              ? currentFullText.substring(0, prev.length - 1)
              : currentFullText.substring(0, prev.length + 1)
          );
        }, timeoutSpeed);
      }

      return () => clearTimeout(timer);
    }, [displayText, isDeleting, currentTextIndex, textArray, speed, deleteSpeed, delay, loop, onFinish]);

    const renderCursor = () => {
      if (!cursor) return null;

      if (React.isValidElement(cursor)) {
        return <span className="inline-block ml-0.5">{cursor}</span>;
      }

      const cursorChar = cursorStyle === "underscore" ? "_" : cursorStyle === "block" ? "█" : "|";

      return (
        <motion.span
          className="inline-block ml-0.5 text-teal-500 font-bold"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
        >
          {cursorChar}
        </motion.span>
      );
    };

    return (
      <span
        ref={ref}
        className={cn("inline-flex items-center select-none font-medium", variantClasses[variant], className)}
        {...props}
      >
        <span>{displayText}</span>
        {renderCursor()}
      </span>
    );
  }
);

Typewriter.displayName = "Typewriter";

export default Typewriter;
