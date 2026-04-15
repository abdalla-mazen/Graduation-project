"use client";

import { Button } from "@/components/ui/button";

interface QuestionNavigationProps {
  currentAnswerIndex: number;
  totalAnswers: number;
  onPrevious: () => void;
  onNext: () => void;
  isSubmitting?: boolean;
  submitDisabled?: boolean;
  showSubmitButton?: boolean;
}

export default function QuestionNavigation({
  currentAnswerIndex,
  totalAnswers,
  onPrevious,
  onNext,
  isSubmitting = false,
  submitDisabled = false,
  showSubmitButton = true,
}: QuestionNavigationProps) {
  return (
    <div className="flex flex-col gap-3 border-t border-gray-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
      <Button
        type="button"
        variant="outline"
        size="lg"
        onClick={onPrevious}
        disabled={currentAnswerIndex === 0}
        className="!w-auto min-w-[180px] border-gray-200 text-gray-600 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-300"
      >
        Previous Question
      </Button>

      <div className="flex flex-wrap items-center gap-3 sm:justify-end">
        {currentAnswerIndex < totalAnswers - 1 && (
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={onNext}
            className="!w-auto min-w-[140px] border-gray-200 text-blue-600 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
          >
            Next Question
          </Button>
        )}

        {showSubmitButton && (
          <Button
            type="submit"
            size="lg"
            disabled={submitDisabled || isSubmitting}
            className="!w-auto min-w-[160px] bg-blue-600 text-white shadow-sm hover:bg-blue-700"
          >
            {isSubmitting ? "Submitting..." : "Submit Grade"}
          </Button>
        )}
      </div>
    </div>
  );
}
