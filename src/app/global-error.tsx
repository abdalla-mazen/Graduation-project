"use client";

import "./globals.css";

import { useEffect } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  CircleAlert,
  Home,
  RefreshCw,
  ShieldAlert,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type GlobalErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const recoveryActions = [
  {
    title: "Retry the app shell",
    description: "Attempt to rerender the root layout and restore the page.",
  },
  {
    title: "Return home",
    description: "Go back to the homepage and reopen the app from there.",
  },
];

const recoveryNotes = [
  "This is the last-resort fallback used when the normal app shell cannot render.",
  "Retrying is safe and helps if the failure was temporary or intermittent.",
  "If the issue keeps happening, home is the cleanest route to start over.",
];

export default function GlobalErrorPage({
  error,
  reset,
}: GlobalErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const showDigest =
    process.env.NODE_ENV === "development" && Boolean(error.digest);

  return (
    <html suppressHydrationWarning>
      <body className="bg-[#f7f8fc] text-slate-950 dark:bg-[#070a12] dark:text-white">
        <main className="relative min-h-screen overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute left-[-4rem] top-16 h-40 w-40 rounded-full bg-blue-200/35 blur-3xl dark:bg-blue-900/20 sm:h-56 sm:w-56" />
            <div className="absolute bottom-0 right-[-3rem] h-52 w-52 rounded-full bg-cyan-200/30 blur-3xl dark:bg-cyan-900/20 sm:h-72 sm:w-72" />
          </div>

          <div className="mx-auto flex min-h-screen max-w-5xl items-center px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            <div className="w-full space-y-5">
              <section
                aria-labelledby="global-error-title"
                className="overflow-hidden rounded-[32px] border border-slate-200/80 bg-white/95 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur dark:border-slate-800 dark:bg-[#0d1220]/95"
              >
                <div className="grid lg:grid-cols-[minmax(0,1.1fr)_360px]">
                  <div className="p-6 sm:p-8 lg:p-10">
                    <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-blue-700 dark:bg-blue-950/50 dark:text-blue-300">
                      <CircleAlert className="h-3.5 w-3.5" aria-hidden="true" />
                      Global fallback
                    </div>

                    <h1
                      id="global-error-title"
                      className="mt-4 max-w-[11ch] text-balance text-[clamp(2.75rem,7vw,4.75rem)] font-black leading-[0.95] tracking-tight text-slate-950 dark:text-white"
                    >
                      Something went wrong
                    </h1>

                    <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-500 dark:text-slate-400 sm:text-base sm:leading-8">
                      The app shell ran into a problem before the normal layout
                      could finish loading. Try again, or go home and restart
                      from a stable route.
                    </p>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                      <Button
                        type="button"
                        onClick={reset}
                        className="h-12 min-w-[148px] rounded-2xl bg-blue-600 px-6 text-white hover:bg-blue-700 sm:w-auto dark:bg-blue-500 dark:hover:bg-blue-400"
                      >
                        <RefreshCw className="h-4 w-4" aria-hidden="true" />
                        Try again
                      </Button>

                      <Link
                        href="/"
                        className={cn(
                          buttonVariants({ variant: "outline" }),
                          "h-12 min-w-[148px] rounded-2xl border-slate-200 px-6 text-slate-800 hover:bg-slate-50 sm:w-auto dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-900"
                        )}
                      >
                        <Home className="h-4 w-4" aria-hidden="true" />
                        Go home
                      </Link>
                    </div>

                    <div className="mt-8 grid gap-3 md:grid-cols-2">
                      {recoveryActions.map((action) => (
                        <div
                          key={action.title}
                          className="rounded-3xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-900/50"
                        >
                          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-sm dark:bg-slate-900 dark:text-blue-300">
                            <CheckCircle2
                              className="h-4 w-4"
                              aria-hidden="true"
                            />
                          </div>
                          <h2 className="mt-4 text-base font-black text-slate-900 dark:text-white">
                            {action.title}
                          </h2>
                          <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                            {action.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <aside className="border-t border-slate-100 bg-[linear-gradient(180deg,rgba(248,250,252,0.85)_0%,rgba(239,246,255,0.95)_100%)] p-6 dark:border-slate-800 dark:bg-[linear-gradient(180deg,rgba(15,23,42,0.72)_0%,rgba(13,18,32,0.95)_100%)] sm:p-8 lg:border-l lg:border-t-0">
                    <div className="flex h-full flex-col justify-between gap-6">
                      <div>
                        <div className="flex h-16 w-16 items-center justify-center rounded-[22px] bg-white text-blue-700 shadow-sm dark:bg-slate-900 dark:text-blue-300">
                          <ShieldAlert className="h-8 w-8" aria-hidden="true" />
                        </div>

                        <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
                          Recovery
                        </p>
                        <h2 className="mt-2 text-3xl font-black leading-tight text-slate-900 dark:text-white">
                          Root layout recovery
                        </h2>
                        <p className="mt-3 text-sm leading-7 text-slate-500 dark:text-slate-400">
                          This fallback protects the user experience when the app
                          shell fails. Retrying is safe, and home is the best
                          reset point if needed.
                        </p>
                      </div>

                      <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
                          Status
                        </p>
                        <p
                          className="mt-3 text-sm font-medium leading-7 text-slate-700 dark:text-slate-200"
                          aria-live="assertive"
                        >
                          The app shell is temporarily unavailable.
                        </p>

                        <div className="mt-4 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/60">
                          <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
                            You can still recover safely without getting stuck on
                            a broken root layout state.
                          </p>
                        </div>
                      </div>
                    </div>
                  </aside>
                </div>
              </section>

              <Card className="rounded-[32px] border-slate-200/80 bg-white/95 shadow-[0_24px_80px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:bg-[#0d1220]/95">
                <CardHeader className="p-6 sm:p-8">
                  <CardTitle className="text-xl font-black text-slate-950 dark:text-white sm:text-2xl">
                    Helpful details
                  </CardTitle>
                  <CardDescription className="text-sm leading-7 text-slate-500 dark:text-slate-400">
                    A quick summary of what this fallback means and what to do
                    next.
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4 p-6 pt-0 sm:p-8 sm:pt-0">
                  <ul className="grid gap-3 md:grid-cols-3" role="list">
                    {recoveryNotes.map((note) => (
                      <li
                        key={note}
                        className="rounded-3xl border border-slate-200 bg-slate-50/80 p-4 text-sm leading-7 text-slate-600 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-300"
                      >
                        {note}
                      </li>
                    ))}
                  </ul>

                  {showDigest ? (
                    <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900/60">
                      <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                        Error digest
                      </p>
                      <code className="mt-2 block break-all text-sm text-slate-700 dark:text-slate-200">
                        {error.digest}
                      </code>
                    </div>
                  ) : null}
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
