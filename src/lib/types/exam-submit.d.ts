export type ExamSubmitPayload = {
  submission_id: number;
  answers: {
    question_id: number;
    chosen_option_id: number;
  }[];
};