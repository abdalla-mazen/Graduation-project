"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface GradeSubmissionsHeaderProps {
  activeTab: "submitted" | "graded";
  onTabChange: (tab: "submitted" | "graded") => void;
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export default function GradeSubmissionsHeader({
  activeTab,
  onTabChange,
  sidebarOpen,
  onToggleSidebar,
}: GradeSubmissionsHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
      <h1 className="text-lg font-bold text-gray-900">Grade submissions</h1>

      <div className="flex items-center gap-2">
        <div className="flex items-center rounded-xl border border-gray-200 bg-gray-50 p-1">
          {(["submitted", "graded"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => onTabChange(tab)}
              className={cn(
                "min-w-[128px] rounded-lg px-4 py-2 text-sm font-semibold transition-all",
                activeTab === tab
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-transparent text-gray-600 hover:bg-white hover:text-blue-600",
              )}
            >
              {tab === "submitted" ? "Needs Grading" : "Graded"}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={onToggleSidebar}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-500 transition-colors hover:bg-gray-50 hover:text-blue-600"
        >
          {sidebarOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>
    </div>
  );
}
