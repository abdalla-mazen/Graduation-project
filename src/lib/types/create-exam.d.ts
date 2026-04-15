type Exam = {
  id: number;
  academic_course_id: number;
  academic_course_name: string;

  title: string;
  description: string | null;

  exam_type: "midterm" | "final" | "quiz" | "assignment";

  duration_minutes: number;
  total_marks: number;
  passing_score: number;

  starts_at: string; // ISO datetime
  ends_at: string;   // ISO datetime
  created_at: string;

  is_published: boolean;
  question_count: number;

  teacher_id: number;
};

type GetExamResponse = {
  exam: Exam;
  ok: boolean;
};