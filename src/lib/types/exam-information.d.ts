export type AcademicExam = {
  id: number;
  title: string;
  description: string | null;

  academic_course_id: number;
  academic_course_name: string;

  teacher_id: number;

  exam_type: "midterm" | "final" | "quiz" | string;

  duration_minutes: number;

  total_marks: number;
  passing_score: number;

  question_count: number;

  is_published: boolean;

  starts_at: string; // ISO Date
  ends_at: string;   // ISO Date
  created_at: string;

  my_score: number | null;

  my_status: "not_started" | "in_progress" | "submitted" | string;
};
export type AcademicExamsResponse = AcademicExam[];