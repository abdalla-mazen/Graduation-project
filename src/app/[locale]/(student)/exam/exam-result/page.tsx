// import { getResultExam } from "@/lib/apis/get-result-exam.api";
// import { ExamAttemptsResponse } from "@/lib/types/exam-result";
// import { Courses } from "@/lib/types/acad-semeter";
// import { getacadCourses } from "@/lib/apis/get-acad-courses.api";

// export default async function Page() {
//   const payload: ExamAttemptsResponse = await getResultExam();
//   const data: Courses = await getacadCourses();

//   const names = data.map((item) => item.name);
//   const namesSet = new Set(names);

//   // ✅ FILTER HERE
//   const filteredPayload = payload.filter((item) =>
//     namesSet.has(item.course_name)
//   );

//   return (
//     <div className="min-h-screen bg-slate-100 p-6">
//       <div className="max-w-3xl mx-auto space-y-5">

//         {/* HEADER */}
//         <div>
//           <h1 className="text-2xl font-medium text-slate-900">
//             Exam results
//           </h1>
//           <p className="text-sm text-slate-500 mt-1">
//             View your performance and grading status
//           </p>
//         </div>

//         {/* LIST */}
//         <div className="space-y-4">
//           {filteredPayload.length === 0 ? (
//             <p className="text-center text-slate-500 mt-10">
//               No results available yet
//             </p>
//           ) : (
//             filteredPayload.map((item) => {
//               const isPending = item.final_score == null;
//               const passed = item.passed;

//               return (
//                 <div
//                   key={item.id}
//                   className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-4"
//                 >
//                   {/* TOP ROW */}
//                   <div className="flex justify-between items-start gap-3">
//                     <div>
//                       <h2 className="text-base font-medium text-slate-900">
//                         {item.exam_title}
//                       </h2>
//                       <p className="text-sm text-slate-500 mt-0.5">
//                         {item.course_name}
//                       </p>
//                     </div>

//                     <span
//                       className={`shrink-0 text-xs font-medium px-3 py-1 rounded-full ${
//                         isPending
//                           ? "bg-amber-50 text-amber-700"
//                           : "bg-green-50 text-green-700"
//                       }`}
//                     >
//                       {isPending ? "Pending" : "Graded"}
//                     </span>
//                   </div>

//                   {/* PENDING STATE */}
//                   {isPending ? (
//                     <div className="flex items-center gap-3 bg-slate-50 border border-slate-200/80 rounded-xl p-4">
//                       <p className="text-sm text-slate-500 leading-relaxed">
//                         Your exam is currently being reviewed by the instructor.
//                       </p>
//                     </div>
//                   ) : (
//                     /* SCORES */
//                     <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
//                       {[
//                         { label: "Type", value: item.exam_type },
//                         { label: "Final score", value: item.final_score },
//                         {
//                           label: "Passed",
//                           value: passed ? "Yes" : "No",
//                           color: passed ? "text-green-700" : "text-red-700",
//                         },
//                       ].map(({ label, value, color }) => (
//                         <div key={label} className="bg-slate-50 rounded-xl p-3">
//                           <p className="text-xs text-slate-400 mb-1">
//                             {label}
//                           </p>
//                           <p
//                             className={`text-sm font-medium ${
//                               color ?? "text-slate-900"
//                             }`}
//                           >
//                             {value}
//                           </p>
//                         </div>
//                       ))}
//                     </div>
                    
//                   )}
//                 </div>
//               );
//             })
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

import { getResultExam } from "@/lib/apis/get-result-exam.api";
import { ExamAttemptsResponse } from "@/lib/types/exam-result";
import { Courses } from "@/lib/types/acad-semeter";
import { getacadCourses } from "@/lib/apis/get-acad-courses.api";

export default async function Page() {
  const payload: ExamAttemptsResponse = await getResultExam();
  const data: Courses = await getacadCourses();

  const names = data.map((item) => item.name);
  const namesSet = new Set(names);

  // FILTER
  const filteredPayload = payload.filter((item) =>
    namesSet.has(item.course_name)
  );

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-3xl mx-auto space-y-5">

        {/* HEADER */}
        <div>
          <h1 className="text-2xl font-medium text-slate-900">
            Exam results
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            View your performance and grading status
          </p>
        </div>

        {/* LIST */}
        <div className="space-y-4">
          {filteredPayload.length === 0 ? (
            <p className="text-center text-slate-500 mt-10">
              No results available yet
            </p>
          ) : (
            filteredPayload.map((item) => {
              const isPending = item.final_score == null;
              const passed = item.passed;

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-4"
                >
                  {/* TOP ROW */}
                  <div className="flex justify-between items-start gap-3">
                    <div>
                      <h2 className="text-base font-medium text-slate-900">
                        {item.exam_title}
                      </h2>
                      <p className="text-sm text-slate-500 mt-0.5">
                        {item.course_name}
                      </p>
                    </div>

                    <span
                      className={`shrink-0 text-xs font-medium px-3 py-1 rounded-full ${
                        isPending
                          ? "bg-amber-50 text-amber-700"
                          : "bg-green-50 text-green-700"
                      }`}
                    >
                      {isPending ? "Pending" : "Graded"}
                    </span>
                  </div>

                  {/* PENDING STATE */}
                  {isPending ? (
                    <div className="flex items-center gap-3 bg-slate-50 border border-slate-200/80 rounded-xl p-4">
                      <p className="text-sm text-slate-500 leading-relaxed">
                        Your exam is currently being reviewed by the instructor.
                      </p>
                    </div>
                  ) : (
                    <>
                      {/* SCORES */}
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
                        {[
                          { label: "Type", value: item.exam_type },
                          { label: "Final score", value: item.final_score },
                          {
                            label: "Passed",
                            value: passed ? "Yes" : "No",
                            color: passed ? "text-green-700" : "text-red-700",
                          },
                        ].map(({ label, value, color }) => (
                          <div key={label} className="bg-slate-50 rounded-xl p-3">
                            <p className="text-xs text-slate-400 mb-1">
                              {label}
                            </p>
                            <p
                              className={`text-sm font-medium ${
                                color ?? "text-slate-900"
                              }`}
                            >
                              {value}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* TEACHER FEEDBACK */}
                      {item.teacher_feedback && (
                        <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3">
                          <p className="text-xs text-slate-400 mb-1">
                            Teacher Feedback
                          </p>
                          <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                            {item.teacher_feedback}
                          </p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
