import React from "react";
export function JobsSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, idx) => (
        <div
          key={idx}
          className="shadow-xl p-4 rounded-lg my-2 animate-pulse bg-gray-200"
        >
          <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div> {/* Job Title */}
          <div className="h-4 bg-gray-300 rounded w-1/2 mb-1"></div> {/* Company Name */}
          <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div> {/* Company URL */}
          <div className="flex gap-3 mt-2">
            <div className="h-6 w-20 bg-gray-400 rounded-lg"></div> {/* Remote/On-site */}
            <div className="h-6 w-24 bg-gray-400 rounded-lg"></div> {/* Full/Part time */}
          </div>
        </div>
      ))}
    </div>
  );
}