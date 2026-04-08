import { GetQuestionsAssesment } from "@/lib/apis/get-question-assesment.api";
import { AssessmentResponse } from "@/lib/types/assessment";
import ExamPage from "./QuestionCard";

export default async function QuestionsList() {
  const data: AssessmentResponse = await GetQuestionsAssesment();
  return <ExamPage dataQuestions={data} />;
}