import type { ReactNode } from "react";
import { Mail, User, Hash } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { authOptions } from "@/auth";
import { getServerSession } from "next-auth/next";

function getInitials(name?: string) {
  if (!name) return "U";

  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <p className="text-center text-sm text-slate-500">
          You must be signed in to view this page.
        </p>
      </div>
    );
  }

  const user = session.user;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/70 px-4 py-6 sm:px-6 sm:py-10">
      <div className="relative mx-auto w-full max-w-sm sm:max-w-md">
        <div className="pointer-events-none absolute inset-x-6 top-8 h-32 rounded-full bg-blue-500/15 blur-3xl sm:inset-x-8 sm:top-10 sm:h-40" />
        <div className="pointer-events-none absolute -bottom-8 right-4 h-24 w-24 rounded-full bg-sky-300/25 blur-3xl sm:-bottom-10 sm:right-6 sm:h-28 sm:w-28" />

        <Card className="relative overflow-hidden border border-blue-100 bg-white/95 shadow-[0_30px_70px_-38px_rgba(37,99,235,0.45)] backdrop-blur-sm">
          <div className="h-1 w-full bg-gradient-to-r from-sky-400 via-blue-600 to-cyan-400" />

          <CardContent className="p-0">
            <div className="flex flex-col items-center gap-4 px-4 pb-5 pt-6 text-center sm:px-6 sm:pb-6 sm:pt-8">
              <div className="relative">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 text-xl font-semibold tracking-tight text-white shadow-lg shadow-blue-300/60 sm:h-20 sm:w-20 sm:rounded-3xl sm:text-2xl">
                  {getInitials(user?.name)}
                </div>

                {user?.isActive && (
                  <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white bg-emerald-500 shadow-sm shadow-emerald-400/50" />
                )}
              </div>

              <div className="w-full">
                <h1 className="break-words text-lg font-semibold capitalize tracking-tight text-slate-900 sm:text-xl">
                  {user?.name}
                </h1>
                <p className="mt-0.5 break-all text-sm text-slate-500">@{user?.username}</p>
              </div>

              <Badge className="max-w-full border-blue-200 bg-blue-50 px-3 py-0.5 text-[11px] uppercase tracking-widest text-blue-700 hover:bg-blue-50">
                <span className="truncate">{user?.role}</span>
              </Badge>

              <div className="flex flex-wrap items-center justify-center gap-2">
                {user?.isActive && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[11px] text-emerald-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Active
                  </span>
                )}

                {user.isFirstTime && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-sky-50 px-2.5 py-0.5 text-[11px] text-sky-700">
                    New Member
                  </span>
                )}
              </div>
            </div>

            <Separator className="bg-blue-100" />

            <div className="flex flex-col gap-3 px-4 py-4 sm:px-6 sm:py-5">
              <InfoRow
                icon={<Mail size={14} className="text-blue-600" />}
                label="Email"
                value={user.email}
              />

              <InfoRow
                icon={<User size={14} className="text-blue-600" />}
                label="Username"
                value={`@${user.username}`}
              />

              <InfoRow
                icon={<Hash size={14} className="text-blue-600" />}
                label="User ID"
                value={`#${user.id}`}
              />
            </div>

            <Separator className="bg-blue-100" />
          </CardContent>
        </Card>

        <p className="mt-4 break-all px-2 text-center text-[10px] uppercase tracking-widest text-slate-400 sm:text-[11px]">
          Profile • {user.id}
        </p>
      </div>
    </div>
  );
}

function InfoRow({ icon, label, value }: { icon: ReactNode; label: string; value?: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 px-3 py-3 sm:gap-4 sm:px-4">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50">
          {icon}
        </span>

        <div className="min-w-0 flex-1 text-left">
          <p className="text-xs text-slate-500">{label}</p>
          <p className="break-all text-sm font-medium text-slate-800 sm:truncate">{value || "-"}</p>
        </div>
      </div>

      <span className="hidden shrink-0 text-right text-xs uppercase tracking-[0.18em] text-blue-400 sm:inline">
        Info
      </span>
    </div>
  );
}
