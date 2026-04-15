import { Skeleton } from "@/components/ui/skeleton";
import { User } from "lucide-react";

export default function GradeSubmissionsSkeleton() {
  return (
    <div className="flex h-screen bg-gray-50 text-sm text-gray-800">
      {/* ── Sidebar ───────────────────────────────────────────────────────── */}
      <aside className="w-56 bg-white border-r border-gray-200 flex flex-col shrink-0">
        {/* Header */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100">
          <User size={15} className="text-gray-400" />
          <span className="font-semibold text-gray-400 text-xs uppercase tracking-wide">
            Students
          </span>
        </div>

        {/* Student items */}
        <div className="flex flex-col gap-1 p-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-1.5 px-2 py-2.5">
              <div className="flex items-center gap-2">
                <Skeleton className="w-6 h-6 rounded-full shrink-0" />
                <Skeleton className="h-3.5 w-24 rounded" />
              </div>
              <div className="pl-8">
                <Skeleton className="h-2.5 w-16 rounded" />
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* ── Main ──────────────────────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
          <Skeleton className="h-6 w-44 rounded" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-48 rounded-lg" />
            <Skeleton className="h-7 w-7 rounded" />
          </div>
        </div>

        {/* Grading area */}
        <div className="flex-1 px-6 py-6 max-w-2xl space-y-6">
          {/* Question label + title */}
          <div className="space-y-2">
            <Skeleton className="h-3 w-24 rounded" />
            <Skeleton className="h-5 w-80 rounded" />
            <Skeleton className="h-3 w-40 rounded" />
          </div>

          {/* Student Answer */}
          <div className="space-y-2">
            <Skeleton className="h-3 w-28 rounded" />
            <Skeleton className="h-12 w-full rounded-lg" />
          </div>

          {/* Score */}
          <div className="space-y-2">
            <Skeleton className="h-3 w-16 rounded" />
            <Skeleton className="h-10 w-40 rounded-lg" />
          </div>

          {/* Feedback */}
          <div className="space-y-2">
            <Skeleton className="h-3 w-24 rounded" />
            <Skeleton className="h-20 w-full rounded-lg" />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-2">
            <Skeleton className="h-9 w-36 rounded-md" />
            <div className="flex gap-3">
              <Skeleton className="h-9 w-32 rounded-md" />
              <Skeleton className="h-9 w-28 rounded-md" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}