"use client";

import { Link } from "@/i18n/navigation";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

// types
type NavLinkProps = {
  href: string;
  children: ReactNode;
  className: string;
};

export function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname();
  const isActive =
    pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
  return (
   <Link
  href={href}
  className={`relative px-3 py-2 rounded w-full flex gap-1
    text-zinc-50 hover:text-softPink-300 dark:text-zinc-800
    after:content-[''] after:absolute after:-bottom-3.5 after:h-[2px] after:w-0  ltr:after:left-0 rtl:after:right-0 after:bg-softPink-200  dark:after:bg-maroon-800 after:transition-all after:duration-300
    hover:after:w-full
    ${isActive ? "after:w-full after:bg-maroon-800  text-softPink-200 dark:text-maroon-800" : ""}`}
>
  {children}
</Link>

  );
}
