// src/components/ui/button.tsx
"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Base + accessibility from shadcn (ring/ring-offset)
 * + your custom visual variants (maroon/softPink palette via CSS vars).
 */
export const buttonVariants = cva(
  "inline-flex justify-center items-center gap-2 rounded-md w-full font-medium text-sm whitespace-nowrap" +
    "ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 " +
    "focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 " +
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // keeps a neutral default using design tokens
        default: "bg-primary text-primary-foreground hover:bg-primary/90",

        // your palette (maroon/softPink) for primary/secondary
        primary:
          "bg-maroon-600 text-white hover:bg-maroon-700 " +
          "dark:bg-softPink-300 dark:text-zinc-800 dark:hover:bg-softPink-400",

        secondary:
          "bg-maroon-50 text-maroon-600 hover:bg-maroon-100 " +
          "dark:bg-zinc-700 dark:text-softPink-300 dark:hover:bg-zinc-600",

        outline:
          "border border-input bg-background text-maroon-600 hover:bg-accent hover:text-accent-foreground " +
          "dark:border-softPink-300 dark:text-softPink-300",

        subtle:
          "bg-zinc-50 border border-zinc-400 text-zinc-800 hover:bg-zinc-100 " +
          "dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-700 dark:border-zinc-500",

        ghost:
          "bg-transparent hover:bg-accent hover:text-accent-foreground " +
          "dark:hover:bg-zinc-700 dark:text-zinc-50",

        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",

        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3 text-xs",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
      loading: {
        true: "cursor-wait",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      loading: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean; // explicit prop for TS ergonomics
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      loading = false,
      asChild = false,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, loading, className }))}
        disabled={loading || props.disabled}
        {...props}
      >
        <span className="flex items-center gap-2">
          {children}
          {loading && (
            <LoaderCircle className="animate-spin" aria-hidden="true" />
          )}
        </span>
      </Comp>
    );
  }
);
Button.displayName = "Button";
