"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextScrambleProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
  speed?: number;
  characterSet?: string;
  triggerOnHover?: boolean;
  autostart?: boolean;
  variant?: "default" | "teal" | "matrix" | "gradient";
  className?: string;
}

const DEFAULT_CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>?/~0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const variantClasses = {
  default: "text-zinc-900 dark:text-zinc-100 font-mono",
  teal: "text-teal-600 dark:text-teal-400 font-mono font-semibold",
  matrix: "text-emerald-400 dark:text-emerald-300 font-mono drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]",
  gradient: "bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-indigo-400 font-mono font-bold",
};

export const TextScramble = React.forwardRef<HTMLSpanElement, TextScrambleProps>(
  (
    {
      text,
      speed = 30,
      characterSet = DEFAULT_CHARS,
      triggerOnHover = true,
      autostart = true,
      variant = "matrix",
      className,
      ...props
    },
    ref
  ) => {
    const [displayText, setDisplayText] = React.useState(text);
    const [isScrambling, setIsScrambling] = React.useState(false);

    const scramble = React.useCallback(() => {
      if (isScrambling) return;
      setIsScrambling(true);

      let iteration = 0;
      const totalSteps = text.length * 3;

      const interval = setInterval(() => {
        setDisplayText(() =>
          text
            .split("")
            .map((char, index) => {
              if (char === " ") return " ";
              if (index < iteration / 3) return text[index];
              return characterSet[Math.floor(Math.random() * characterSet.length)];
            })
            .join("")
        );

        iteration += 1;

        if (iteration >= totalSteps) {
          clearInterval(interval);
          setDisplayText(text);
          setIsScrambling(false);
        }
      }, speed);
    }, [text, speed, characterSet, isScrambling]);

    React.useEffect(() => {
      if (autostart) {
        scramble();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [autostart]);

    return (
      <span
        ref={ref}
        onMouseEnter={triggerOnHover ? scramble : undefined}
        className={cn(
          "inline-block select-none cursor-pointer font-mono tracking-wider transition-colors duration-150",
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {displayText}
      </span>
    );
  }
);

TextScramble.displayName = "TextScramble";

export default TextScramble;
