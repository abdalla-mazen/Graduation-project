"use client";

import { Button } from "@/components/ui/button";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

interface ResultProps {
  correct: number;
  length: number;
  score?: number;
  maxScore?: number;
  totalQuestions?: number;
  correctAnswers?: number;
  wrongAnswers?: number;
  invalidated?: boolean;
  finishedAt?: string | null;
}

export default function Result({
  correct,
  length,
  score,
  maxScore,
  totalQuestions,
  correctAnswers,
  wrongAnswers,
  invalidated = false,
  finishedAt,
}: ResultProps) {
  const fallbackTotalQuestions = Math.max(totalQuestions ?? length, 1);

  const getScoreMetrics = () => {
    if (typeof score !== "number" || Number.isNaN(score) || score < 0) {
      return null;
    }

    if (typeof maxScore === "number" && maxScore > 0) {
      const normalizedCorrect =
        score <= fallbackTotalQuestions ? score : (score / maxScore) * fallbackTotalQuestions;

      return {
        percentage: Number(((score / maxScore) * 100).toFixed(1)),
        correctCount: Math.round(Math.min(Math.max(normalizedCorrect, 0), fallbackTotalQuestions)),
      };
    }

    if (score <= fallbackTotalQuestions) {
      return {
        percentage: Number(((score / fallbackTotalQuestions) * 100).toFixed(1)),
        correctCount: Math.round(score),
      };
    }

    if (score <= 100) {
      return {
        percentage: Number(score.toFixed(1)),
        correctCount: Math.round((score / 100) * fallbackTotalQuestions),
      };
    }

    return null;
  };

  const scoreMetrics = getScoreMetrics();
  const resolvedCorrect =
    typeof correctAnswers === "number"
      ? Math.min(Math.max(correctAnswers, 0), fallbackTotalQuestions)
      : correct > 0 || !scoreMetrics
        ? correct
        : Math.min(scoreMetrics.correctCount, fallbackTotalQuestions);
  const percentage =
    typeof score === "number" && !Number.isNaN(score)
      ? Number(score.toFixed(1))
      : scoreMetrics
        ? scoreMetrics.percentage
        : Number(((resolvedCorrect / fallbackTotalQuestions) * 100).toFixed(1));
  const wrongCount =
    typeof wrongAnswers === "number"
      ? Math.max(wrongAnswers, 0)
      : Math.max(fallbackTotalQuestions - resolvedCorrect, 0);

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-[32px] bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
          <h1 className="text-center text-3xl font-bold text-slate-900 sm:text-4xl">
            Assessment Results
          </h1>

          <div className="mt-6 rounded-[28px] bg-slate-50 px-4 py-6 text-center sm:px-6">
            <div className="mx-auto h-44 w-44">
              <CircularProgressbar
                className="font-bold text-center"
                value={percentage}
                styles={buildStyles({
                  textSize: "18px",
                  pathColor: invalidated ? "#ef4444" : "#3b82f6",
                  trailColor: "#e5e7eb",
                  textColor: invalidated ? "#ef4444" : "#3b82f6",
                })}
              />
            </div>

            <div className="mt-4">
              <span
                className={`text-2xl font-bold ${invalidated ? "text-red-500" : "text-blue-500"}`}
              >
                {percentage}%
              </span>
              <p className="mt-1 text-sm font-medium text-slate-500">your score</p>
            </div>

            <p className="mt-4 text-2xl font-bold text-slate-900">
              {invalidated ? "Exam Invalidated" : "Great Effort!"}
            </p>

            {invalidated && (
              <p className="mt-2 text-sm font-medium text-red-500">
                The exam was closed because the allowed violation limit was reached.
              </p>
            )}
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-4 text-center">
              <p className="font-semibold text-slate-500">Wrong Answers</p>
              <span className="mt-2 block text-2xl font-semibold text-slate-900">
                <span className="text-red-500">{wrongCount}</span>/{fallbackTotalQuestions}
              </span>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4 text-center">
              <p className="font-semibold text-slate-500">Correct Answers</p>
              <span className="mt-2 block text-2xl font-semibold text-slate-900">
                <span className="text-green-500">{resolvedCorrect}</span>/{fallbackTotalQuestions}
              </span>
            </div>
          </div>

          {finishedAt && (
            <div className="mt-4 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-center text-sm font-medium text-slate-600">
              Finished at: {finishedAt}
            </div>
          )}

          <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button className="w-full rounded-2xl border bg-white font-bold text-blue-500 hover:bg-blue-500 hover:text-white sm:w-1/3">
              View Details
            </Button>
            <Button className="w-full rounded-2xl bg-blue-500 font-bold text-white hover:bg-blue-600 sm:w-1/3">
              Create learning plan
            </Button>
            <Button className="w-full rounded-2xl border bg-white font-bold text-blue-500 hover:bg-blue-500 hover:text-white sm:w-1/3">
              Retake assessment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
