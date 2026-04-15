import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function PastExamCardSkeleton() {
  return (
    <Card className="rounded-2xl border shadow-sm">
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 space-y-2">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>

          <Skeleton className="h-6 w-24 rounded-full" />
        </div>

        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid gap-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded-sm" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 flex-1 max-w-[180px]" />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 rounded-xl bg-muted/50 p-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-5 w-12" />
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      </CardContent>
    </Card>
  );
}
