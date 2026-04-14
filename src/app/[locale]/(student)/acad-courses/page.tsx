import { Suspense } from "react"
import GetCoursesData from "./_componnets/getCourses"
import CoursesSkeleton from "./_componnets/skeleton"

export default async function Page() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-8 pb-4 border-b">
        <h1 className="text-2xl font-semibold tracking-tight">Academic Courses</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <Suspense fallback = {<CoursesSkeleton/>}>
      <GetCoursesData/>

      </Suspense>
      </div>
    </div>
  )
}
