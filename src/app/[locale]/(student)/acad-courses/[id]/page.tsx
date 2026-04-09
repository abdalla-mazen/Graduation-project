import { getResources } from '@/lib/apis/get-resourses.api'
import { Resources } from '@/lib/types/resourses'
import React from 'react'

interface PageProps {
  params: { id: number }
}

export default async function Page({ params }: PageProps) {
  const payload: Resources = await getResources(String(params.id))

  return (
  <>
    {/* Header */}
    <div className="flex flex-col gap-1 ms-6 mt-6">
      <h1 className="text-2xl font-bold text-foreground">Course Resources</h1>
      <p className="text-sm text-muted-foreground">
        {payload.length} resources available
      </p>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-6">
      {payload.map((resource) => (
        <div
          key={resource.id}
          className="group bg-card border rounded-2xl p-5 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-start justify-between gap-3">
            <p className="text-sm text-muted-foreground leading-snug line-clamp-2">
              {resource.description ?? 'No description available'}
            </p>

            <span className="shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full bg-mainColor text-white">
              {resource.is_free ? 'Free' : 'Paid'}
            </span>
          </div>

          <p className="font-semibold text-[15px] leading-snug text-foreground">
            {resource.title}
          </p>

          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between text-xs text-mainColor">
              <span className="font-medium">Quality Score</span>
              <span className="font-bold">
                {resource.quality_score * 10} / 100
              </span>
            </div>

            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-500"
                style={{ width: `${resource.quality_score * 10}%` }}
              />
            </div>
          </div>

          <div className="border-t" />

          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-blue-500 hover:text-blue-700 transition-colors duration-150 mt-auto"
          >
            <span className="truncate">Open Resource</span>
          </a>
        </div>
      ))}
    </div>
  </>
)}
