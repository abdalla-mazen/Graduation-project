// declare type DatabaseProperties = {
//   _id: string;
//   createdAt: string;
//   updatedAt?: string;
//   passwordChangedAt?: string;
// };

// declare type ErrorResponse = {
//   error: string;
// };

// declare type SuccessResponse<T> = {

//   ok: boolean;
// } & T;

// declare type PaginatedResponse<T> = {
//   metadata: {
//     currentPage: number;
//     totalPages: number;
//     limit: number;
//     totalItems: number;
//   };
// } & T;

// declare type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;


// types/api.d.ts (إذا لم يكن موجود)
// interface ApiResponse<T> {
//   error?: string;
//   user: UserData;
//   access_token: string;
// }

// interface LoginResponse {
//   user: UserData;
//   access_token: string;
// }

// interface UserData {
//   id: number;
//   username: string;
//   email: string;
//   role: "STUDENT" | "INSTRUCTOR" | "ADMIN";
//   name?: string;
//   // أضف باقي الحقول إذا لزم الأمر
// }


// ==================== AUTH RESPONSE ====================
export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user: User;
}

// ==================== USER ====================
export interface User {
  id: number;
  email: string;
  username: string;
  full_name: string | null;

  github_url: string | null;
  linkedin_url: string | null;

  role: "STUDENT" | "ADMIN" | "INSTRUCTOR";

  is_active: boolean;
  is_deleted: boolean;

  created_at: string;
  last_login: string | null;
  deleted_at: string | null;

  department_id: number;
  current_semester: number;
  year: number;

  track_id: number;
  target_track_id: number;
  track_name: string;

  certificates: Certificate[];
  course_progress: CourseProgress[];
  exams: Exam[];
  notifications: Notification[];
  skill_gaps: SkillGap[];
  skills: Skill[];

  profile: Profile;
}

// ==================== PROFILE ====================
export interface Profile {
  current_semester: number;
  department_id: number;
  faculty_id: number;
  target_track_id: number;
  university_id: number;
  year: number;
}

// ==================== CERTIFICATE ====================
export interface Certificate {
  id: number;
  name: string;
  issuer: string;
  issue_date: string;
  expiration_date: string | null;
  credential_url: string | null;
}

// ==================== COURSE PROGRESS ====================
export interface CourseProgress {
  id: number;
  course_name: string;
  progress_percentage: number; // 0 - 100
  completed: boolean;
}

// ==================== EXAM ====================
export interface Exam {
  id: number;
  title: string;
  score: number | null;
  max_score: number;
  taken_at: string | null;
}

// ==================== NOTIFICATION ====================
export interface Notification {
  id: number;
  message: string;
  is_read: boolean;
  created_at: string;
}

// ==================== SKILL ====================
export interface Skill {
  id: number;
  name: string;
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
}

// ==================== SKILL GAP ====================
export interface SkillGap {
  id: number;
  skill_name: string;
  required_level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
}

// ==================== ERROR RESPONSE ====================
export interface ErrorResponse {
  error: string;
  message?: string;
  statusCode?: number;
}

// ==================== GENERIC API RESPONSE ====================
export type ApiResponse<T> =
  | { data: T; error?: never }
  | { error: string; data?: never };