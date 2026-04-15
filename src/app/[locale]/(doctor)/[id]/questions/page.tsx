import React from "react";
import AddQuestionsForm from "./_components/add-questions-form";

type Props = {
  params: {
    id: string;
  };
  searchParams: {
    name: string;
    totalMarks: string;
  };
};
export default function page({ params, searchParams }: Props) {
  const examName = searchParams.name;
  const parsedTotalMarks = Number(searchParams.totalMarks);
  const totalMarks = Number.isFinite(parsedTotalMarks) ? parsedTotalMarks : 0;

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Add Questions</h1>
          <p className="mt-1 text-sm text-slate-500">Create questions for this exam.</p>
        </div>

        <AddQuestionsForm id={Number(params.id)} examName={examName} totalMarks={totalMarks} />
      </div>
    </div>
  );
}
