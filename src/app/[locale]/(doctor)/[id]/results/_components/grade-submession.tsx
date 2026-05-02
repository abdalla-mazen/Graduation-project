"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";
import {
  createGradeSubmissionSchema,
  GradeSubmissionValues,
} from "@/lib/schemas/grade-submission.schema";
import { Answer, GradeSubmissionsProps } from "@/lib/types/submession";
import SubmissionsSidebar from "./submissions-sidebar";
import GradeSubmissionsHeader from "./grade-submissions-header";
import QuestionPanel from "./question-panel";
import QuestionNavigation from "./question-navigation";
import { useSubmession } from "../_hooks/use-submession";

const getAnswerScore = (answer: Answer) => {
  if (answer.open_score != null) {
    return answer.open_score;
  }

  if (answer.question_type === "mcq") {
    return answer.is_correct ? answer.max_marks : 0;
  }

  return 0;
};

export default function GradeSubmissions({ data }: GradeSubmissionsProps) {
  const { submissions } = data;

  const needsGrading = useMemo(
    () => submissions.filter((s) => s.status === "submitted"),
    [submissions]
  );

  const graded = useMemo(
    () => submissions.filter((s) => s.status === "graded"),
    [submissions]
  );

  const [activeTab, setActiveTab] = useState<"submitted" | "graded">("submitted");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentAnswerIndex, setCurrentAnswerIndex] = useState(0);
  const { isPending, submit } = useSubmession();

  const [scores, setScores] = useState<Record<number, Record<number, number>>>(() => {
    const init: Record<number, Record<number, number>> = {};

    submissions.forEach((sub) => {
      init[sub.submission_id] = {};
      sub.answers.forEach((ans) => {
        init[sub.submission_id][ans.answer_id] = getAnswerScore(ans);
      });
    });

    return init;
  });

  const [feedbacks, setFeedbacks] = useState<Record<number, string>>(() => {
    const init: Record<number, string> = {};

    submissions.forEach((sub) => {
      init[sub.submission_id] = sub.teacher_feedback ?? "";
    });

    return init;
  });
  const scoresRef = useRef(scores);
  const feedbacksRef = useRef(feedbacks);

  const displayedSubmissions =
    activeTab === "submitted" ? needsGrading : graded;

  const [selectedSubmissionId, setSelectedSubmissionId] = useState<number | null>(
    displayedSubmissions[0]?.submission_id ?? null
  );

  const selectedSubmission =
    displayedSubmissions.find((s) => s.submission_id === selectedSubmissionId) ??
    displayedSubmissions[0] ??
    null;

  const currentAnswer =
    selectedSubmission?.answers[currentAnswerIndex] ?? null;

  const totalAnswers = selectedSubmission?.answers.length ?? 0;
  const selectedSubmissionKey = selectedSubmission?.submission_id ?? null;
  const currentAnswerKey = currentAnswer?.answer_id ?? null;
  const currentMaxScore = currentAnswer?.max_marks ?? 0;
  const gradeSchema = useMemo(
    () => createGradeSubmissionSchema(currentMaxScore),
    [currentMaxScore]
  );

  const form = useForm<GradeSubmissionValues>({
    resolver: zodResolver(gradeSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      score: 0,
      feedback: "",
    },
  });

  const updateScore = (submissionId: number, answerId: number, value: number) => {
    setScores((prev) => ({
      ...prev,
      [submissionId]: {
        ...(prev[submissionId] ?? {}),
        [answerId]: value,
      },
    }));
  };

  const updateFeedback = (submissionId: number, value: string) => {
    setFeedbacks((prev) => ({
      ...prev,
      [submissionId]: value,
    }));
  };

  useEffect(() => {
    scoresRef.current = scores;
  }, [scores]);

  useEffect(() => {
    feedbacksRef.current = feedbacks;
  }, [feedbacks]);

  useEffect(() => {
    if (selectedSubmissionKey == null || currentAnswerKey == null) {
      return;
    }

    form.reset({
      score: scoresRef.current[selectedSubmissionKey]?.[currentAnswerKey] ?? 0,
      feedback: feedbacksRef.current[selectedSubmissionKey] ?? "",
    });
  }, [currentAnswerKey, form, selectedSubmissionKey]);

  const watchedScore = form.watch("score");
  const watchedFeedback = form.watch("feedback");

  useEffect(() => {
    if (selectedSubmissionKey == null || currentAnswerKey == null) {
      return;
    }

    updateScore(
      selectedSubmissionKey,
      currentAnswerKey,
      Number.isFinite(watchedScore) ? watchedScore : 0
    );
  }, [currentAnswerKey, selectedSubmissionKey, watchedScore]);

  useEffect(() => {
    if (selectedSubmissionKey == null) {
      return;
    }

    updateFeedback(selectedSubmissionKey, watchedFeedback ?? "");
  }, [selectedSubmissionKey, watchedFeedback]);

  const adjustScore = (delta: number) => {
    if (!selectedSubmission || !currentAnswer || currentAnswer.question_type !== "open") {
      return;
    }

    const next = Math.min(
      currentAnswer.max_marks,
      Math.max(0, Number(((form.getValues("score") || 0) + delta).toFixed(2)))
    );

    form.setValue("score", next, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const handleTabChange = (tab: "submitted" | "graded") => {
    setActiveTab(tab);
    const list = tab === "submitted" ? needsGrading : graded;
    setSelectedSubmissionId(list[0]?.submission_id ?? null);
    setCurrentAnswerIndex(0);
  };

  const handleSelectSubmission = (submissionId: number) => {
    setSelectedSubmissionId(submissionId);
    setCurrentAnswerIndex(0);
  };

  const handlePrevQuestion = () => {
    setCurrentAnswerIndex((i) => Math.max(0, i - 1));
  };

  const handleNextQuestion = () => {
    setCurrentAnswerIndex((i) => Math.min(totalAnswers - 1, i + 1));
  };

  const handleSubmitGrade = async (values: GradeSubmissionValues) => {
    if (!currentAnswer || selectedSubmission?.status === "graded") {
      return;
    }

    const normalizedData: GradeSubmissionValues = {
      score:
        currentAnswer.question_type === "open"
          ? Number(values.score)
          : getAnswerScore(currentAnswer),
      feedback: values.feedback ?? "",
    };

    if (normalizedData.score > currentAnswer.max_marks) {
      form.setError("score", {
        type: "manual",
        message: `Score cannot exceed ${currentAnswer.max_marks.toFixed(2)}`,
      });
      return;
    }

    try {
      await submit({
        id: currentAnswer.answer_id,
        score: normalizedData.score,
        feedback: normalizedData.feedback,
      });

      toast.success("Grade submitted successfully.");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to submit grade."
      );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 text-sm text-gray-800">
      {sidebarOpen && (
        <SubmissionsSidebar
          submissions={displayedSubmissions}
          selectedSubmissionId={selectedSubmission?.submission_id ?? null}
          onSelectSubmission={handleSelectSubmission}
        />
      )}

      <main className="flex-1 flex flex-col overflow-hidden">
        <GradeSubmissionsHeader
          activeTab={activeTab}
          onTabChange={handleTabChange}
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
        />

        {!selectedSubmission || !currentAnswer ? (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            No submissions to display.
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-6 py-6 max-w-2xl">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmitGrade)} className="space-y-6">
                <QuestionPanel
                  answer={currentAnswer}
                  currentAnswerIndex={currentAnswerIndex}
                  totalAnswers={totalAnswers}
                  form={form}
                  onAdjustScore={adjustScore}
                />

                <QuestionNavigation
                  currentAnswerIndex={currentAnswerIndex}
                  totalAnswers={totalAnswers}
                  onPrevious={handlePrevQuestion}
                  onNext={handleNextQuestion}
                  isSubmitting={isPending}
                  showSubmitButton={selectedSubmission.status !== "graded"}
                />
              </form>
            </Form>
          </div>
        )}
      </main>
    </div>
  );
}
