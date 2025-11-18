import * as React from "react";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

// types
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  id?: string;
  name?: string;
  label?: string;
}

/**
 *   <InputSearch  id="search" name="search" label="search"  error=" field is required"/>
 */
const InputSearch = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, label, id, name, ...props }, ref) => (
    <div className="space-y-1">
      {/* label */}
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-zinc-400">
          {label}
        </label>
      )}

      {/* input */}
      <div className="relative">
        <input
          type="search"
          id={id}
          name={name}
          className={cn(
            "flex h-12 w-full rounded-[.625rem] border border-zinc-300 bg-transparent px-3 py-1 text-zinc-800 text-sm focus-visible:ring-0 placeholder: focus-visible:ring-offset-0 transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-zinc-400 focus-visible:outline-none   focus:border-maroon-600 disabled:cursor-not-allowed hover:border-zinc-400 disabled:bg-zinc-100 disabled:text-zinc-400 disabled:opacity-50 md:text-sm ps-10",
            error && "border-red-600 focus-visible:ring-maroon-600",
            "dark:border-zinc-600 dark:bg-zinc-700 dark:text-white dark:placeholder:text-zinc-400 dark:focus-visible:ring-softPink-400 dark:disabled:bg-zinc-800 dark:disabled:text-zinc-600 dark:disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
        />
      </div>
    </div>
  )
);

InputSearch.displayName = "InputSearch";
export default InputSearch;
