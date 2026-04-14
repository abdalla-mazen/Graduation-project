
import { getExamInformation } from "@/lib/apis/get-exam-information.api";
import { AcademicExamsResponse } from "@/lib/types/exam-information";
import Exambutton from "./_componnents/exambutton";
import { Courses } from "@/lib/types/acad-semeter";
import { getacadCourses } from "@/lib/apis/get-acad-courses.api";

export default async function Page() {
  const exams: AcademicExamsResponse = await getExamInformation();
  const payload: Courses = await getacadCourses();

  const names = payload.map((item) => item.name);
  const namesSet = new Set(names);
  const filteredExams = exams.filter((exam) =>
    namesSet.has(exam.academic_course_name)
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 p-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        {filteredExams.length > 0 ? (
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Exams Information
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Manage and view all your exams
            </p>
          </div>
        ) : (
          ""
        )}

        {/* Empty State */}
        {filteredExams.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
              No exams yet
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs leading-relaxed">
              You don't have any exams scheduled right now.
            </p>
          </div>
        ) : (
          /* Grid */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExams.map((exam) => {
              const statusColor =
                exam.my_status === "not_started"
                  ? "bg-yellow-100 text-yellow-700"
                  : exam.my_status === "submitted"
                  ? "bg-green-100 text-green-700"
                  : "bg-blue-100 text-blue-700";

              return (
                <div
                  key={exam.id}
                  className="group bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 p-6 shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  {/* Top */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {exam.title}
                      </h2>
                      <p className="text-xs text-gray-500 mt-1">
                        {exam.academic_course_name}
                      </p>
                    </div>

                    {/* Status Badge */}
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-medium ${statusColor}`}
                    >
                      {exam.my_status}
                    </span>
                  </div>

                  {/* Middle Info */}
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-gray-400 text-xs">Type</p>
                      <p className="font-medium">{exam.exam_type}</p>
                    </div>

                    <div>
                      <p className="text-gray-400 text-xs">Duration</p>
                      <p className="font-medium">{exam.duration_minutes} min</p>
                    </div>

                    <div>
                      <p className="text-gray-400 text-xs">Questions</p>
                      <p className="font-medium">{exam.question_count}</p>
                    </div>

                    <div>
                      <p className="text-gray-400 text-xs">Total Marks</p>
                      <p className="font-medium">{exam.total_marks}</p>
                    </div>

                    <div>
                      <p className="text-gray-400 text-xs">Passing</p>
                      <p className="font-medium">{exam.passing_score}</p>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="my-4 border-t border-gray-200 dark:border-zinc-800" />

                  {/* Dates */}
                  <div className="text-xs text-gray-500 space-y-1">
                    <p>
                      <span className="font-medium text-gray-600 dark:text-gray-300">
                        Start:
                      </span>{" "}
                      {new Date(exam.starts_at).toLocaleString()}
                    </p>
                    <p>
                      <span className="font-medium text-gray-600 dark:text-gray-300">
                        End:
                      </span>{" "}
                      {new Date(exam.ends_at).toLocaleString()}
                    </p>
                  </div>

                  {/* Action */}
                  <Exambutton examId={exam.id} status={exam.my_status} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
