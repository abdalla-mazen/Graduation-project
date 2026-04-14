export type ExamAttempt = {
  id: number;
  exam_id: number;
  exam_title: string;
  exam_type: string;
  course_name: string;

  student_id: number;

  status: "in_progress" | "submitted" | "graded" | string;

  started_at: string;
  submitted_at: string | null;

  auto_score: number | null;
  manual_score: number | null;
  final_score: number | null;

  passed: boolean | null;

  teacher_feedback: string | null;
};

export type ExamAttemptsResponse = ExamAttempt[];