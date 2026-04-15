"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { User, CheckCircle2, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Submission } from "@/lib/types/submession";



interface SubmissionsSidebarProps {
  submissions: Submission[];
  selectedSubmissionId: number | null;
  onSelectSubmission: (submissionId: number) => void;
}

export default function SubmissionsSidebar({
  submissions,
  selectedSubmissionId,
  onSelectSubmission,
}: SubmissionsSidebarProps) {
  return (
    <aside className="w-56 bg-white border-r border-gray-200 flex flex-col shrink-0">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100">
        <User size={15} className="text-gray-500" />
        <span className="font-semibold text-gray-700 text-xs uppercase tracking-wide">
          Students
        </span>
      </div>

      <ScrollArea className="flex-1">
        {submissions.length === 0 && (
          <p className="text-xs text-gray-400 text-center py-6 px-4">No submissions here.</p>
        )}

        {submissions.map((sub) => {
          const isSelected = selectedSubmissionId === sub.submission_id;

          return (
            <button
              key={sub.submission_id}
              onClick={() => onSelectSubmission(sub.submission_id)}
              className={cn(
                "w-full text-left px-4 py-2.5 flex flex-col gap-0.5 transition-colors",
                isSelected ? "bg-blue-50 border-r-2 border-blue-500" : "hover:bg-gray-50",
              )}
            >
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0",
                    isSelected ? "bg-blue-500" : "bg-gray-300",
                  )}
                >
                  {sub.student_name[0]?.toUpperCase() ?? "?"}
                </div>

                <span
                  className={cn(
                    "font-medium text-sm truncate",
                    isSelected ? "text-blue-700" : "text-gray-800",
                  )}
                >
                  {sub.student_name}
                </span>
              </div>

              <div className="flex items-center gap-1 pl-8">
                {sub.status === "submitted" ? (
                  <>
                    <Clock size={10} className="text-blue-400" />
                    <span className="text-[11px] text-gray-500">Needs Grading</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={10} className="text-green-500" />
                    <span className="text-[11px] text-gray-500">Graded</span>
                  </>
                )}
              </div>
            </button>
          );
        })}
      </ScrollArea>
    </aside>
  );
}
