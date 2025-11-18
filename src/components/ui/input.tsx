"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

/**
 * @example
 * <Input placeholder="your name " />
 * <Input type="email" placeholder="your email" error />
 * <Input type="number" placeholder="your age" />
 */
const TextInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type = "text", error, className, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex bg-transparent disabled:bg-zinc-100 file:bg-transparent disabled:opacity-50 px-3 py-1 border border-zinc-300 hover:border-zinc-400 focus:border-blue-600 file:border-0 rounded-[.625rem] focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 w-full h-12 file:font-medium text-zinc-800 disabled:text-zinc-400 placeholder:text-zinc-400 file:text-foreground text-sm md:text-sm file:text-sm transition-colors disabled:cursor-not-allowed",
          error && "border-red-600 focus-visible:ring-maroon-600",
          "dark:border-zinc-600 dark:bg-zinc-700 dark:text-white dark:placeholder:text-zinc-400 dark:focus-visible:ring-softPink-400 dark:disabled:bg-zinc-800 dark:disabled:text-zinc-600 dark:disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

TextInput.displayName = "TextInput";

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type = "text", ...props }, ref) => {
    return <TextInput ref={ref} type={type} {...props} />;
  }
);

Input.displayName = "Input";

export { Input };
