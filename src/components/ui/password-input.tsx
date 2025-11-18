"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { forwardRef, useState } from "react";


// Extend native input props so react-hook-form can pass value, onChange, onBlur, name, ref
interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string | boolean;
}
/**
 *   <PasswordInput  id="password" name="password" label="Password"  error=" field is required"/>
 */

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ id, name, label, error, className, ...rest }, ref) => {
    const [show, setShow] = useState(false);

    return (
      <div className="space-y-1">
        {/* label */}
        {label && (
          <label htmlFor={id} className="font-medium text-zinc-400 text-sm">
            {label}
          </label>
        )}

        {/* input */}
        <div className="relative">
          <Input
            ref={ref}
            id={id}
            name={name}
            placeholder="********"
            type={show ? "text" : "password"}
            className={cn(
              "flex bg-transparent disabled:bg-zinc-100 file:bg-transparent disabled:opacity-50 px-3 py-1 border border-zinc-300 hover:border-zinc-400 focus:border-blue-600 file:border-0 rounded-[.625rem] focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 w-full h-12 file:font-medium text-zinc-800 disabled:text-zinc-400 placeholder:text-zinc-400 file:text-foreground text-sm md:text-sm file:text-sm transition-colors disabled:cursor-not-allowed",
              error && "border-red-600 focus-visible:ring-blue-600",
              "dark:border-zinc-600 dark:bg-zinc-700 dark:text-white dark:placeholder:text-zinc-400 dark:focus-visible:ring-softPink-400 dark:disabled:bg-zinc-800 dark:disabled:text-zinc-600 dark:disabled:opacity-50",
              className
            )}
            {...rest}
          />

          {/* eye icon */}
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="top-1/2 ltr:right-3 rtl:left-3 absolute text-gray-600 -translate-y-1/2"
            aria-label={show ? "Hide password" : "Show password"}
          >
            {show ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        </div>
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
