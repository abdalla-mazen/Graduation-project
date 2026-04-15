"use client";

import Link from "next/link";
import { Home, UserCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { usePathname } from "@/i18n/navigation";

export default function DoctorNavbar() {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const navItems = [
    { label: "Home", href: "/doctor-view", icon: Home },
    {
      label: session?.user?.name || "Profile",
      href: "/profile-doctor",
      icon: UserCircle2,
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex items-center justify-around gap-3 px-4 py-3 md:px-6">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            Nexus
          </Link>

          <nav className="hidden items-center gap-2 md:flex">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex min-w-[82px] flex-col items-center justify-center rounded-xl px-3 py-2 text-xs text-muted-foreground transition hover:bg-blue-50 hover:text-blue-600",
                    isActive && "text-blue-600 bg-blue-100 hover:bg-blue-200 hover:text-blue-600",
                  )}
                >
                  <Icon className="mb-1 h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="hidden md:block">
          {status === "loading" ? (
            <span className="text-sm text-muted-foreground">Loading...</span>
          ) : (
            <span className="text-sm font-medium">
              {session?.user?.name ? `Dr. ${session.user.name}` : "Guest"}
            </span>
          )}
        </div>
      </div>

      <nav className="flex items-center justify-around border-t px-2 py-2 md:hidden">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 rounded-lg px-3 py-2 text-[11px] text-muted-foreground",
                isActive && "text-blue-600 bg-blue-100 hover:bg-blue-200 hover:text-blue-600 ",
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
