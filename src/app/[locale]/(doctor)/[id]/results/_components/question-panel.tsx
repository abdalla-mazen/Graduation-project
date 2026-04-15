"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { GradeSubmissionValues } from "@/lib/schemas/grade-submission.schema";
import { Answer } from "@/lib/types/submession";
import { UseFormReturn } from "react-hook-form";

interface QuestionPanelProps {
  answer: Answer;
  currentAnswerIndex: number;
  totalAnswers: number;
  form: UseFormReturn<GradeSubmissionValues>;
  onAdjustScore: (delta: number) => void;
}

export default function QuestionPanel({
  answer,
  currentAnswerIndex,
  totalAnswers,
  form,
  onAdjustScore,
}: QuestionPanelProps) {
  const studentAnswer =
    answer.question_type === "mcq"
      ? answer.chosen_option_text
      : answer.open_answer_text;

  return (
    <>
      <div className="mb-5">
        <p className="text-xs text-gray-400 mb-1">
          Question {currentAnswerIndex + 1}/{totalAnswers}
        </p>

        <p className="font-semibold text-gray-900 text-base">
          {currentAnswerIndex + 1}. {answer.question_text}
        </p>

        <p className="text-xs text-gray-500 mt-1">
          Type:{" "}
          <span className="font-medium text-gray-700 uppercase">
            {answer.question_type}
          </span>{" "}
          | Mark(s):{" "}
          <span className="font-medium text-gray-700">
            {answer.max_marks.toFixed(1)}
          </span>
        </p>
      </div>

      <div className="mb-5">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
          Student Answer
        </p>

        <div className="border border-gray-200 rounded-lg px-4 py-3 bg-white text-gray-800 text-sm min-h-[44px]">
          {studentAnswer ?? (
            <span className="text-gray-400 italic">No answer provided</span>
          )}
        </div>

        {answer.question_type === "mcq" && answer.is_correct != null && (
          <div className="mt-1.5">
            <span
              className={cn(
                "text-xs font-medium px-2 py-0.5 rounded-full",
                answer.is_correct
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-600"
              )}
            >
              {answer.is_correct ? "Correct" : "Incorrect"}
            </span>
          </div>
        )}
      </div>

      {answer.question_type === "open" && (
        <div className="mb-5">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            Score
          </p>

          <FormField
            control={form.control}
            name="score"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white w-fit">
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      max={answer.max_marks}
                      step="0.5"
                      value={field.value}
                      onChange={(event) =>
                        field.onChange(Number(event.target.value || 0))
                      }
                      className="w-24 border-0 text-center focus-visible:ring-0 shadow-none"
                    />
                  </FormControl>

                  <Separator orientation="vertical" className="h-8" />

                  <button
                    type="button"
                    onClick={() => onAdjustScore(-0.5)}
                    className="px-3 py-2 text-gray-500 hover:bg-gray-50 transition-colors"
                  >
                    <Minus size={14} />
                  </button>

                  <Separator orientation="vertical" className="h-8" />

                  <button
                    type="button"
                    onClick={() => onAdjustScore(0.5)}
                    className="px-3 py-2 text-gray-500 hover:bg-gray-50 transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <FormMessage className="mt-2 text-left" />
              </FormItem>
            )}
          />
        </div>
      )}

      <div className="mb-8">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
          Feedback{" "}
          <span className="normal-case font-normal text-gray-400">(Optional)</span>
        </p>

        <FormField
          control={form.control}
          name="feedback"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  {...field}
                  value={field.value ?? ""}
                  className="min-h-[80px] resize-none border-gray-200 focus-visible:ring-blue-200"
                  placeholder="Add feedback for this student..."
                />
              </FormControl>

              <FormMessage className="text-left" />
            </FormItem>
          )}
        />
      </div>
    </>
  );
}
