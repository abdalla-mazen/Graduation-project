import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// variant defines a different color
const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-maroon-600 text-white shadow hover:bg-maroon-700 dark:bg-softPink-300 dark:text-zinc-800 dark:hover:bg-softPink-400",
        secondary:
          "border-transparent bg-maroon-50 text-maroon-600  hover:bg-maroon-100 dark:bg-zinc-700 dark:text-softPink-300 dark:hover:bg-zinc-600",
        subtle:
          "border-transparent bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}
/**
 * Badge component
 * @example
 * <Badge variant="secondary">Secondary</Badge>
 */
function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
