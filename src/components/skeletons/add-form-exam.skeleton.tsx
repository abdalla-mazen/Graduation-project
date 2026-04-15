import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// ─── Reusable helpers ────────────────────────────────────────────────────────

function SectionHeaderSkeleton() {
  return (
    <div className="mb-5 flex items-center gap-3">
      {/* icon bubble */}
      <Skeleton className="h-11 w-11 rounded-2xl" />
      {/* title */}
      <Skeleton className="h-5 w-36 rounded-md" />
    </div>
  );
}

function FieldSkeleton({ wide = false }: { wide?: boolean }) {
  return (
    <div className={`space-y-2 ${wide ? "md:col-span-2" : ""}`}>
      <Skeleton className="h-4 w-28 rounded-md" />
      <Skeleton className="h-12 w-full rounded-xl" />
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function StepperSkeleton({ label }: { label: string }) {
  return (
    <div className="space-y-2 rounded-2xl border border-zinc-200 bg-white p-4">
      <Skeleton className="h-4 w-32 rounded-md" />
      <Skeleton className="h-12 w-full rounded-xl" />
    </div>
  );
}

// ─── Main skeleton ────────────────────────────────────────────────────────────

export default function AddExamFormSkeleton() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.14),_transparent_38%),linear-gradient(180deg,_#f8fbff_0%,_#f3f4f6_100%)] px-4 py-6 sm:px-6 lg:px-8">
      {/* ── Header skeleton ───────────────────────────────────────────────── */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-7 w-48 rounded-lg" />
          <Skeleton className="h-4 w-72 rounded-md" />
        </div>
        {/* stat pills */}
        <div className="flex gap-3">
          {[80, 64, 72].map((w, i) => (
            <Skeleton key={i} className={`h-9 w-${w === 80 ? "20" : w === 64 ? "16" : "18"} rounded-full`} />
          ))}
        </div>
      </div>

      {/* ── Two-column grid ───────────────────────────────────────────────── */}
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        {/* LEFT column */}
        <div className="space-y-6">
          {/* Course Selection card */}
          <Card className="overflow-hidden rounded-[28px] border-white/80 bg-white/90 shadow-[0_18px_60px_-36px_rgba(15,23,42,0.35)] backdrop-blur">
            <CardContent className="p-6 md:p-7">
              <SectionHeaderSkeleton />
              <FieldSkeleton />
              <Skeleton className="mt-2 h-4 w-80 rounded-md" />
            </CardContent>
          </Card>

          {/* Exam Details card */}
          <Card className="overflow-hidden rounded-[28px] border-white/80 bg-white/90 shadow-[0_18px_60px_-36px_rgba(15,23,42,0.35)] backdrop-blur">
            <CardContent className="space-y-6 p-6 md:p-7">
              <SectionHeaderSkeleton />

              <div className="grid gap-5 md:grid-cols-2">
                {/* Title – full width */}
                <FieldSkeleton wide />

                {/* Exam Type */}
                <FieldSkeleton />

                {/* Quick Preview */}
                <div className="space-y-2">
                  <Skeleton className="h-4 w-28 rounded-md" />
                  <Skeleton className="h-12 w-full rounded-xl" />
                </div>

                {/* Description – full width */}
                <div className="space-y-2 md:col-span-2">
                  <Skeleton className="h-4 w-24 rounded-md" />
                  <Skeleton className="min-h-[140px] w-full rounded-2xl" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT column */}
        <div className="space-y-6">
          {/* Schedule card */}
          <Card className="overflow-hidden rounded-[28px] border-white/80 bg-white/90 shadow-[0_18px_60px_-36px_rgba(15,23,42,0.35)] backdrop-blur">
            <CardContent className="space-y-6 p-6 md:p-7">
              <SectionHeaderSkeleton />

              <div className="grid gap-4">
                {/* Starts At */}
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20 rounded-md" />
                  <Skeleton className="h-12 w-full rounded-xl" />
                  <Skeleton className="h-3.5 w-64 rounded-md" />
                </div>
                {/* Ends At */}
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20 rounded-md" />
                  <Skeleton className="h-12 w-full rounded-xl" />
                  <Skeleton className="h-3.5 w-72 rounded-md" />
                </div>
              </div>

              <Separator />

              {/* Scheduling note box */}
              <div className="rounded-2xl bg-zinc-50 p-4 space-y-2">
                <Skeleton className="h-4 w-32 rounded-md" />
                <Skeleton className="h-3.5 w-full rounded-md" />
                <Skeleton className="h-3.5 w-5/6 rounded-md" />
              </div>
            </CardContent>
          </Card>

          {/* Score Configuration card */}
          <Card className="overflow-hidden rounded-[28px] border-white/80 bg-white/90 shadow-[0_18px_60px_-36px_rgba(15,23,42,0.35)] backdrop-blur">
            <CardContent className="space-y-6 p-6 md:p-7">
              {/* Section label + title */}
              <div className="space-y-1">
                <Skeleton className="h-3.5 w-32 rounded-md" />
                <Skeleton className="h-6 w-48 rounded-md" />
              </div>

              {/* Three steppers */}
              <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                <StepperSkeleton label="Duration (min)" />
                <StepperSkeleton label="Passing Score (%)" />
                <StepperSkeleton label="Total Marks" />
              </div>

              {/* Summary box */}
              <div className="rounded-2xl border border-blue-100 bg-blue-50/80 p-4 space-y-2">
                <Skeleton className="h-4 w-28 rounded-md" />
                <Skeleton className="h-3.5 w-full rounded-md" />
                <Skeleton className="h-3.5 w-4/5 rounded-md" />
              </div>

              {/* Submit button */}
              <Skeleton className="h-12 w-full rounded-xl" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}