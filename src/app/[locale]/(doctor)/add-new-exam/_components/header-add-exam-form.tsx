import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock3, Sparkles, Target } from "lucide-react";
import React from "react";

type props = {
  data: {
    duration: number;
    passingScore: number;
    totalMarks: number;
    examType: string;
    startsAt: string;
  };
};
export default function HeaderAddExamForm({ data }: props) {
  return (
    <div className="mx-auto ">
      <div className="mb-6 overflow-hidden rounded-[32px] border border-white/70 bg-white/85 p-6 shadow-[0_24px_80px_-32px_rgba(15,23,42,0.35)] backdrop-blur md:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-4">
            <Badge className="w-fit rounded-full border-blue-200 bg-blue-50 px-3 py-1 text-blue-700 hover:bg-blue-50">
              <Sparkles className="mr-2 h-3.5 w-3.5" />
              Doctor workspace
            </Badge>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight text-zinc-950 md:text-4xl">
                Design and publish a polished exam in minutes
              </h1>
              <p className="max-w-xl text-sm leading-6 text-zinc-600 md:text-base">
                Build a clear exam setup with course selection, grading rules, and schedule details
                in one focused flow.
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:min-w-[320px]">
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
              <div className="mb-2 flex items-center gap-2 text-zinc-500">
                <Clock3 className="h-4 w-4" />
                <span className="text-xs font-medium uppercase tracking-[0.2em]">Duration</span>
              </div>
              <p className="text-2xl font-semibold text-zinc-950">{data.duration}</p>
              <p className="text-xs text-zinc-500">Minutes</p>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
              <div className="mb-2 flex items-center gap-2 text-zinc-500">
                <Target className="h-4 w-4" />
                <span className="text-xs font-medium uppercase tracking-[0.2em]">Passing</span>
              </div>
              <p className="text-2xl font-semibold text-zinc-950">
                {data.passingScore.toFixed(0)}%
              </p>
              <p className="text-xs text-zinc-500">Required score</p>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
              <div className="mb-2 flex items-center gap-2 text-zinc-500">
                <CheckCircle2 className="h-4 w-4" />
                <span className="text-xs font-medium uppercase tracking-[0.2em]">Marks</span>
              </div>
              <p className="text-2xl font-semibold text-zinc-950">{data.totalMarks.toFixed(0)}</p>
              <p className="text-xs text-zinc-500">Total grade</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
