"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { type FinishExamResult } from "../_hooks/use-finish-exam";
import Result from "../_components/result";

export default function ResultPage() {
  const router = useRouter();
  const [examResult, setExamResult] = useState<FinishExamResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const raw = localStorage.getItem("examResult");

    if (!raw) {
      // لو مفيش نتيجة، ارجع للـ assessment
      router.replace("/assessment");
      return;
    }

    try {
      const parsed = JSON.parse(raw) as FinishExamResult;
      setExamResult(parsed);
      // امسح النتيجة من localStorage بعد ما قرأتها
      localStorage.removeItem("examResult");
    } catch (error) {
      console.error("Failed to parse exam result:", error);
      router.replace("/assessment");
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center bg-slate-100 px-4">
        <p className="animate-pulse text-center text-lg font-semibold text-blue-600 sm:text-xl">
          Loading Results...
        </p>
      </div>
    );
  }

  if (!examResult) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <Result
        correct={examResult.correct_answers ?? 0}
        length={examResult.total_questions ?? 0}
        score={examResult.score}
        maxScore={examResult.max_score}
        totalQuestions={examResult.total_questions}
        correctAnswers={examResult.correct_answers}
        wrongAnswers={examResult.wrong_answers}
        invalidated={examResult.invalidated}
        finishedAt={examResult.finished_at ?? null}
      />
    </div>
  );
}