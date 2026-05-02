// =====================
// Common Helpers
// =====================
export type ISODateString = string;

// =====================
// Auth Response
// =====================
export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user: User;
}

// =====================
// User
// =====================
export interface User {
  email: string;
  current_semester: number;
  department_id: number;

  created_at: ISODateString;
  deleted_at: ISODateString | null;

  certificates: unknown[];
  course_progress: unknown[];

  exams: Exam[];
}

// =====================
// Exam
// =====================
export interface Exam {
  id: number;
  user_id: number;
  track_id: number;

  active: boolean;
  invalidated: boolean;

  started_at: ISODateString;
  finished_at: ISODateString | null;

  score: number;
  strikes: number;

  answers: Answer[];
  events: Event[];
}

// =====================
// Answer
// =====================
export interface Answer {
  id: number;
  exam_id: number;
  question_id: number;

  chosen_option_id: number;
  is_correct: boolean;
}

// =====================
// Event (Anti-Cheating)
// =====================
export type EventType =
  | "eye_away"
  | "tab_switch"
  | "copy"
  | "paste"
  | "blur"
  | "devtools"
  | "phone_detected";

export interface Event {
  id: number;
  exam_id: number;

  event_type: EventType;
  meta: Record<string, unknown> | null;
  timestamp: ISODateString;
}

// =====================
// Optional Generic API Wrapper
// =====================
export interface ApiResponse<T> {
  data: T;
  message?: string;
}
