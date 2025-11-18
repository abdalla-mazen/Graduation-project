import * as React from "react";
import { cn } from "@/lib/utils";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

/**
 * @example
 * <Textarea placeholder="your message" />
 */
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-36 w-full rounded-lg border bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-zinc-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          error
            ? "border-red-600 hover:border-red-600 focus-visible:ring-maroon-600"
            : "border-zinc-300 hover:border-zinc-400 focus-visible:ring-maroon-600",
          "dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-50 dark:placeholder:text-zinc-400 dark:focus-visible:ring-softPink-400 dark:disabled:bg-zinc-800 dark:disabled:text-zinc-600 dark:disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
