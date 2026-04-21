import { Skeleton } from "@/components/ui/skeleton"

function ProjectFieldSkeleton({
  wide = false,
  tall = false,
  withBadges = false,
}: {
  wide?: boolean
  tall?: boolean
  withBadges?: boolean
}) {
  return (
    <div
      className={[
        "rounded-3xl border border-slate-200 bg-slate-50/80 p-4 shadow-sm",
        wide ? "md:col-span-2" : "",
      ].join(" ")}
    >
      <div className="flex gap-3">
        <Skeleton className="h-10 w-10 shrink-0 rounded-2xl bg-blue-100/70" />
        <div className="min-w-0 flex-1 space-y-3">
          <Skeleton className="h-4 w-32 rounded-md" />
          <Skeleton className="h-3.5 w-4/5 rounded-md" />
          <Skeleton
            className={[
              "w-full rounded-2xl bg-white",
              tall ? "min-h-40" : "h-12",
            ].join(" ")}
          />

          {withBadges && (
            <div className="flex flex-wrap gap-2 pt-1">
              <Skeleton className="h-7 w-20 rounded-full" />
              <Skeleton className="h-7 w-24 rounded-full" />
              <Skeleton className="h-7 w-16 rounded-full" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function AddProjectFormSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-[32px] border border-white/70 bg-white/90 shadow-[0_24px_80px_-32px_rgba(37,99,235,0.45)] backdrop-blur">
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-r from-blue-600/10 via-sky-500/10 to-cyan-400/10" />

      <div className="relative border-b border-slate-100 px-6 py-6 sm:px-8">
        <Skeleton className="h-7 w-32 rounded-full bg-blue-100/70" />

        <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <Skeleton className="h-8 w-72 rounded-lg" />
            <Skeleton className="h-4 w-[28rem] max-w-full rounded-md" />
            <Skeleton className="h-4 w-80 max-w-full rounded-md" />
          </div>

          <div className="rounded-3xl border border-blue-100 bg-gradient-to-r from-blue-50 to-sky-50 px-4 py-3 shadow-sm">
            <div className="flex items-center gap-3">
              <Skeleton className="h-11 w-11 rounded-2xl bg-blue-200/80" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-28 rounded-md" />
                <Skeleton className="h-3.5 w-40 rounded-md" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative space-y-6 px-6 py-6 sm:px-8 sm:py-8">
        <div className="grid gap-5 md:grid-cols-2">
          <ProjectFieldSkeleton />
          <ProjectFieldSkeleton withBadges />
          <ProjectFieldSkeleton wide tall />
          <ProjectFieldSkeleton />
          <ProjectFieldSkeleton />
        </div>

        <div className="flex flex-col gap-4 rounded-3xl border border-blue-100 bg-gradient-to-r from-blue-50 to-sky-50 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <Skeleton className="h-4 w-60 rounded-md" />
            <Skeleton className="h-3.5 w-80 max-w-full rounded-md" />
          </div>
          <Skeleton className="h-12 w-full rounded-2xl sm:w-40" />
        </div>
      </div>
    </div>
  )
}
