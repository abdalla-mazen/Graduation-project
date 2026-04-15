export interface Answer {
  already_graded: boolean;
  answer_id: number;
  chosen_option_id: number | null;
  chosen_option_text: string | null;
  is_correct: boolean | null;
  max_marks: number;
  open_answer_text: string | null;
  open_score: number | null;
  question_id: number;
  question_text: string;
  question_type: "mcq" | "open";
}

export interface Submission {
  answers: Answer[];
  final_score: number | null;
  passed: boolean | null;
  status: "submitted" | "graded";
  student_id: number;
  student_name: string;
  submission_id: number;
  submitted_at: string;
  teacher_feedback: string | null;
}

export interface SubmissionsResponse {
  page: number;
  pages: number;
  per_page: number;
  submissions: Submission[];
  total: number;
}

export interface GradeSubmissionsProps {
  data: SubmissionsResponse;
}
