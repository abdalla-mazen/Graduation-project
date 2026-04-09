import React from 'react'

export default function CoursesSkeleton({ count = 3 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="bg-card border rounded-xl p-5 flex flex-col gap-3 animate-pulse"
        >
          {/* Header */}
          <div className="flex justify-between items-start">
            <div className="h-4 w-16 bg-gray-300 rounded-lg" />
            <div className="h-4 w-20 bg-gray-200 rounded-md" />
          </div>

          {/* Name */}
          <div className="h-5 w-3/4 bg-gray-300 rounded" />

          {/* Progress */}
          <div className="flex justify-between items-center">
            <div className="h-3 w-1/2 bg-gray-200 rounded" />
            <div className="h-3 w-10 bg-gray-200 rounded" />
          </div>
          <div className="h-1.5 w-full bg-gray-200 rounded" />

          {/* Action buttons */}
          <div className="flex flex-col gap-2 mt-3">
            <div className="h-8 w-full bg-gray-300 rounded" />
            <div className="h-8 w-full bg-gray-300 rounded" />
            <div className="h-8 w-full bg-gray-300 rounded" />
          </div>
        </div>
      ))}
    </>
  )
}