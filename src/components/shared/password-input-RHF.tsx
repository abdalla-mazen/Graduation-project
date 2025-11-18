"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface PasswordInputProps {
  name?: string;
  label?: string;
}

export default function PasswordInputRHF({
  name = "password",
  label = "Password",
}: PasswordInputProps) {
  //  State
  const [show, setShow] = useState(false);

  // Form
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-2">
          {/* Label */}
          <FormLabel className="text-sm font-medium text-zinc-800 dark:text-zinc-100">
            {label}
          </FormLabel>

          {/* Input Field */}
          <div className="relative">
            <FormControl>
              <Input
                {...field}
                type={show ? "text" : "password"}
                placeholder="************"
                className={`flex h-12 w-full rounded-[.625rem] border px-3 py-2 text-sm text-zinc-800 bg-transparent placeholder:text-zinc-400 transition-colors
                  focus-visible:outline-none focus-visible:ring-0 focus:border-maroon-600
                  disabled:cursor-not-allowed disabled:bg-zinc-100 disabled:text-zinc-400 disabled:opacity-50
                  dark:border-zinc-600 dark:bg-zinc-700 dark:text-white dark:placeholder:text-zinc-400
                  dark:focus-visible:ring-softPink-400 dark:disabled:bg-zinc-800 dark:disabled:text-zinc-600
                `}
              />
            </FormControl>

            {/* Eye Icon */}
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-700 transition-colors dark:text-zinc-400 dark:hover:text-zinc-200 rtl:left-3  rtl:right-auto "
              tabIndex={-1}
            >
              {show ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Error Message */}
          <FormMessage className="text-xs text-red-600 mt-1" />
        </FormItem>
      )}
    />
  );
}
