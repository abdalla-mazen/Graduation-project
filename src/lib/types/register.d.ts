export interface User {
  certificates: any[];
  course_progress: any[];
  created_at: string;
  deleted_at: string | null;
  email: string;
  exams: any[];
  full_name: string | null;
  github_url: string | null;
  id: number;
  is_active: boolean;
  is_deleted: boolean;
  last_login: string | null;
  linkedin_url: string | null;
  notifications: any[];
  profile: null;
  role: "TEACHER" | "STUDENT"; 
  skill_gaps: any[];
  skills: any[];
  track_id: number | null;
  track_name: string | null;
  username: string;
}

export interface ApiResponse {
  ok: boolean;
  user?: User;
  error?: string;
}