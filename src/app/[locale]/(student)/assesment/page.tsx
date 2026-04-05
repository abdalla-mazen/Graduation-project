
import { Suspense } from "react";
import AssessmentSkeleton from "@/components/skeletons/assesment.skeleton";
import QuestionsList from "./_components/question-list";

export default async function page() {
  // const data: AssessmentResponse = await GetQuestionsAssesment();
  return (
    // <main>
    //   <ExamPage dataQuestions={data} />
    //   {/* AssessmentSkeleton */}
    // </main>


  <main>
      <Suspense fallback={<AssessmentSkeleton />}>
        <QuestionsList />
      </Suspense>
    </main>
  );
}
