import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const LOADING_BARS = [
  "from-blue-300/50 to-blue-200/30",
  "from-sky-300/50 to-sky-200/30",
  "from-indigo-300/50 to-indigo-200/30",
];

const LOADING_ICONS = [
  "bg-blue-100 dark:bg-blue-900/40",
  "bg-sky-100 dark:bg-sky-900/40",
  "bg-indigo-100 dark:bg-indigo-900/40",
];

function LoadingCard({ index }: { index: number }) {
  return (
    <Card className="flex flex-col overflow-hidden rounded-2xl border border-blue-100/70 dark:border-blue-900/30">
      <div className={`h-1 animate-pulse bg-gradient-to-r ${LOADING_BARS[index % 3]}`} />

      <CardHeader className="flex flex-row items-start gap-3 px-5 pb-3 pt-6">
        <div
          className={`h-10 w-10 flex-shrink-0 animate-pulse rounded-xl ${LOADING_ICONS[index % 3]}`}
        />
        <div className="min-w-0 flex-1 space-y-2 pt-0.5">
          <Skeleton className="h-4 w-3/4 rounded-md" />
          <Skeleton className="h-3 w-1/4 rounded-md" />
        </div>
      </CardHeader>

      <CardContent className="flex-1 space-y-2 px-5 pb-4">
        <Skeleton className="h-3.5 w-full rounded-md" />
        <Skeleton className="h-3.5 w-[90%] rounded-md" />
        <Skeleton className="h-3.5 w-[70%] rounded-md" />
      </CardContent>

      <CardFooter className="flex flex-col items-start gap-3 px-5 pb-5 pt-0">
        <div className="flex flex-wrap gap-1.5">
          <Skeleton className="h-5 w-12 rounded-full" />
          <Skeleton className="h-5 w-10 rounded-full" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
        <Skeleton className="mt-1 h-8 w-full rounded-xl" />
      </CardFooter>
    </Card>
  );
}

export default function ProjectSuggestionsSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-sky-50 px-4 py-10 dark:from-slate-950 dark:via-slate-950 dark:to-blue-950/20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded-sm" />
            <Skeleton className="h-3 w-20 rounded-md" />
          </div>

          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="space-y-2">
              <Skeleton className="h-8 w-56 rounded-md" />
              <div className="mt-1 flex items-center gap-2">
                <Skeleton className="h-4 w-40 rounded-md" />
                <Skeleton className="h-5 w-20 rounded-md" />
                <Skeleton className="h-4 w-10 rounded-md" />
              </div>
            </div>

            <Skeleton className="h-9 w-28 rounded-xl" />
          </div>
        </div>

        <div className="flex items-center gap-6 border-b border-blue-100/70 pb-5 dark:border-blue-900/30">
          <div className="flex items-center gap-1.5">
            <Skeleton className="h-3.5 w-14 rounded-md" />
          </div>
          <div className="flex items-center gap-1.5">
            <Skeleton className="h-3.5 w-20 rounded-md" />
          </div>
          <div className="flex items-center gap-1.5">
            <Skeleton className="h-2 w-2 rounded-full" />
            <Skeleton className="h-3.5 w-16 rounded-md" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <LoadingCard key={index} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
