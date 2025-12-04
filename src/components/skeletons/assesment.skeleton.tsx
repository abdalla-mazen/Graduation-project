
import { Skeleton } from "@/components/ui/skeleton";

export default function AssessmentSkeleton() {
  return (
    <div className="pt-0 flex flex-col min-h-screen">
      {/* Header */}
      <div className="p-6 bg-gray-100">
        <div className="flex justify-between gap-2">
          <Skeleton className="h-10 w-10 rounded-md" />

          <div className="flex p-4 gap-4 items-center w-full">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-8 w-48" />
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6 mx-6 bg-white flex-1">
        {/* Progress bar */}
        <Skeleton className="h-3 w-full rounded-md" />

        {/* Question Title */}
        <Skeleton className="h-7 w-3/4 mt-4" />

        {/* Answers */}
        <div className="space-y-4 mt-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center space-x-3 bg-gray-50 p-4 rounded-lg">
              <Skeleton className="h-5 w-5 rounded-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center pt-6 gap-3 mt-10">
          <Skeleton className="h-12 w-full rounded-md" />
          <Skeleton className="h-12 w-full rounded-md" />
        </div>
      </div>
    </div>
  );
}
