import React from 'react'
import { getCourses } from '@/lib/apis/get-courses.api'
import { Courses } from '@/lib/types/courses'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button';
import Explanation from '../_actions/explanationBuuton';
export default async function GetCoursesData() {
     const courses: Courses = await getCourses()
     const typeStyle: Record<string, { bg: string; text: string }> = {
     Core:     { bg: '#dbeeff', text: '#003e75' },
     Elective: { bg: '#d6f5ec', text: '#0a5c3e' },
     Advanced: { bg: '#ede9fe', text: '#3b1fa8' },
}
  return <>

        
         {courses.map((course) => {
          const ts = typeStyle[course.course_type] ?? typeStyle['Core']
          return (
            <div
              key={course.code}
              className="relative bg-card border rounded-xl p-5 transition-all duration-200 overflow-hidden flex flex-col">
              <div className="flex justify-between items-start mb-3 mt-1">
                <div  className="font-mono text-xs px-2 py-1 rounded-lg text-white  bg-mainColor">
                  {course.code}
                </div>
                <span
                  className="text-xs font-medium px-2.5 py-1 rounded-md"
                  style={{ background: ts.bg, color: ts.text }}
                >
                  {course.course_type}
                </span>
              </div>

              {/* Name */}
              <p className="font-semibold text-[15px] leading-snug mb-4">
                {course.name}
              </p>

              {/* Progress */}
              <div className="space-y-1.5 mb-4 flex flex-col gap-2">
                <div className="flex justify-between font-bold text-sm ">
                  <span>Importance</span>
                  <span>{`${course.calculated_importance_score * 10}%`}</span>
                </div>
                <Progress
                  value={course.calculated_importance_score * 10}
                  className="h-1.5"
                />
              </div>

              <div className="border-t my-1" />

              {/* Action buttons */}
              <div className="flex flex-col gap-2 mt-3 text-white">

              <Explanation courseId={course.id} />
              <Button className=' bg-mainColor '>Practical Project</Button>
              <Button className=' bg-mainColor'>Published Exam Now</Button>
              </div>
            </div>
          )
        })}
  
  </>
}
