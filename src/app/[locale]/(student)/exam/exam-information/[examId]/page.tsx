"use client";

import React, { useEffect, useState } from "react";
import { useStartExam } from "../_hooks/use-exam-questions";
import { useSubmitExam } from "../_hooks/use-exam-submit";
import { useParams, useRouter } from "next/navigation";
import { ExamSubmitPayload } from "@/lib/types/exam-submit";
import { Link } from "@/i18n/navigation";

type AnswerMap = {
  [questionId: number]: number;
};

export default function Page() {
  const { mutate, data, isPending, error } = useStartExam();
  const { mutate: submitExam, isPending: isSubmitting } = useSubmitExam();

  const params = useParams();
  const router = useRouter();

  const examId = Number(params.examId);

  const [answers, setAnswers] = useState<AnswerMap>({});
  const [timeLeft, setTimeLeft] = useState<number>(0);

  const isFinished = timeLeft === 0;

  // ---------------- FETCH EXAM ----------------
  useEffect(() => {
    if (!isNaN(examId)) {
      mutate(examId, {
        onSuccess: (res: any) => {
          setTimeLeft(res.remaining_seconds || 0);
        },
      });
    }
  }, [examId, mutate]);

  // ---------------- TIMER ----------------
  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  // ---------------- FORMAT TIME ----------------
  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, "0")}:${s
      .toString()
      .padStart(2, "0")}`;
  };

  // ---------------- SUBMIT ----------------
  const handleSubmit = () => {
    if (!data?.submission_id) return;

    const payload: ExamSubmitPayload = {
      submission_id: data.submission_id,
      answers: Object.entries(answers).map(
        ([question_id, chosen_option_id]) => ({
          question_id: Number(question_id),
          chosen_option_id: Number(chosen_option_id),
        })
      ),
    };

    submitExam(
      { examId, payload },
      {
        onSuccess: (res) => {
          console.log("✅ Submitted successfully:", res);

          // 🔥 تحويل بعد النجاح
          router.push(`/exam/exam-information`);
        },
        onError: (err) => {
          console.error("❌ Submit failed:", err);
        },
      }
    );
  };

  // ---------------- LOADING ----------------
  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <p className="text-lg font-semibold text-blue-600 animate-pulse">
          Loading Exam...
        </p>
      </div>
    );
  }

  // ---------------- ERROR ----------------
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        <p>Error loading exam</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      {/* HEADER */}
      <div className="flex justify-between items-center bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 text-white p-4 shadow">
        <h1 className="text-lg font-bold">Exam Questions</h1>
        <div className="bg-white/15 px-4 py-2 rounded-xl font-bold">
          ⏳ {formatTime(timeLeft)}
        </div>
      </div>

      {/* BODY */}
      <div className="mx-auto w-full max-w-5xl p-4 space-y-6">
        {/* INFO */}
        <div className="bg-white rounded-2xl p-4 shadow border">
          <h2 className="text-lg font-semibold text-slate-900">
            Answer Questions
          </h2>
          <p className="text-sm text-slate-500">
            Choose the correct answer for each question
          </p>
        </div>

        {/* QUESTIONS */}
        <div className="space-y-6">
          {data?.questions?.map((q: any, index: number) => (
            <div
              key={q.id}
              className="bg-white p-5 rounded-2xl shadow border"
            >
              <h2 className="font-semibold text-slate-900 mb-4">
                {index + 1}. {q.text}
              </h2>

              <div className="space-y-3">
                {q.options.map((opt: any) => {
                  const selected = answers[q.id] === opt.id;

                  return (
                    <label
                      key={opt.id}
                      className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition
                      ${
                        selected
                          ? "border-blue-500 bg-blue-50"
                          : "border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${q.id}`}
                        value={opt.id}
                        disabled={isFinished}
                        checked={selected}
                        onChange={() =>
                          setAnswers((prev) => ({
                            ...prev,
                            [q.id]: opt.id,
                          }))
                        }
                      />
                      <span className="text-slate-700 font-medium">
                        {opt.text}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* SUBMIT BUTTON */}
        <div className="flex justify-center mt-6">
          {/* <button
            onClick={handleSubmit}
            disabled={isSubmitting || isFinished}
            className="bg-mainColor text-white px-6 py-3 rounded-xl font-semibold w-full"
          >
            <Link href={"/exam/exam-result"}>{isSubmitting
              ? "Submitting..."
              : isFinished
              ? "Time Finished"
              : "Submit Exam"}</Link>
          </button> */}
          {isFinished ? (
  <Link
    href="/exam/exam-result"
    className="bg-mainColor text-white px-6 py-3 rounded-xl font-semibold w-full text-center block"
  >
    Time Finished - Go To Result
  </Link>
) : (
  <button
    onClick={handleSubmit}
    disabled={isSubmitting}
    className="bg-mainColor text-white px-6 py-3 rounded-xl font-semibold w-full"
  >
    {isSubmitting ? "Submitting..." : "Submit Exam"}
  </button>
)}
        </div>
      </div>
    </div>
  );
}