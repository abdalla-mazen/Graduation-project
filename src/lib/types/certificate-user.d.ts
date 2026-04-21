// Skill
export type Skill = {
  id: number
  name: string
  description: string | null
  track_id: number
  type: "TECHNICAL" | string
  created_at: string
  updated_at: string
}

// Certificate (داخل user.certificates)
export type UserCertificate = {
  id: number
  title: string
  course_id: number | null
  credential_url: string | null
  expiry_date: string | null
  issued_at: string
  provider: string | null
  score: number | null
  skill_id: number
  user_id: number
}

// Notification
export type Notification = {
  id: number
  message: string
  read: boolean
  user_id: number
  created_at: string
}

// Track
export type Track = {
  id: number
  name: string
  summary: string
  long_description: string
  market_demand: number
  popularity_score: number
  created_at: string
  updated_at: string
}

// Profile
export type Profile = {
  id: number
  user_id: number
  faculty: string
  faculty_id: number
  department: string
  department_id: number
  university: string
  university_id: number
  year: number
  current_semester: number
  progress_score: number
  path_type: string
  is_public: boolean
  certifications: any | null
  soft_skills: any | null
  target_track: Track
  created_at: string
  updated_at: string
}

// User
export type User = {
  id: number
  username: string
  email: string
  full_name: string | null
  github_url: string | null
  linkedin_url: string | null
  role: "STUDENT" | string
  is_active: boolean
  is_deleted: boolean
  deleted_at: string | null
  last_login: string | null
  created_at: string

  track_id: number
  track_name: string

  certificates: UserCertificate[]
  notifications: Notification[]
  profile: Profile

  course_progress: any[]
  exams: any[]
  skills: any[]
  skill_gaps: any[]
}

// Main Certificate Response
export type Certificate = {
  id: number
  title: string
  course_id: number | null
  credential_url: string | null
  expiry_date: string | null
  issued_at: string
  provider: string | null
  score: number | null

  skill_id: number
  skill: Skill

  user_id: number
  user: User

  course: any | null
}

// API Response
export type CertificatesResponse = Certificate[]