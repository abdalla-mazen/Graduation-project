export type QuestionOption = {
  id: number;
  order: number;
  question_id: number;
  text: string;
};

export type Question = {
  exam_id: number;
  id: number;
  marks: number;
  order: number;
  question_type: "mcq" | string;
  text: string;
  options: QuestionOption[];
};

export type Submission = {
  id: number;
  exam_id: number;
  student_id: number;
  status: "in_progress" | "submitted" | string;
  started_at: string;
  submitted_at: string | null;
  final_score: number | null;
  auto_score: number | null;
  manual_score: number | null;
  passed: boolean | null;
  teacher_feedback: string | null;
};

export type ExamResponse = {
  questions: Question[];
  remaining_seconds: number;
  submission: Submission;
  submission_id: number;
};