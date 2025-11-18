"use client";

import { Info } from "lucide-react";
import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";
type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      closeButton
      icons={{ info: <Info size={18} /> }}
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:absolute group-[.toast]:bottom-2 group-[.toast]:right-2  group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          info: "group-[.toaster]:bg-zinc-100 group-[.toaster]:text-zinc-800 group-[.toaster]:border-zinc-400 dark:group-[.toaster]:bg-zinc-300 dark:group-[.toaster]:text-zinc-800 dark:group-[.toaster]:border-none",
          success:
            "group-[.toaster]:bg-green-50 group-[.toaster]:text-green-900 group-[.toaster]:border-green-200 dark:group-[.toaster]:bg-emerald-300 dark:group-[.toaster]:text-zinc-800 dark:group-[.toaster]:border-none",
          error:
            "group-[.toaster]:bg-red-50 group-[.toaster]:text-red-900 group-[.toaster]:border-red-200 dark:group-[.toaster]:bg-red-300 dark:group-[.toaster]:text-zinc-800 dark:group-[.toaster]:border-none",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
