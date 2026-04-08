export type RegisterPayload = {
  username: string;
  email: string;
  password: string;
  role: string;
  profile_setup: {
    university_id: number;
    faculty_id: number;
    department_id: number;
    target_track_id: number;
    path_type: string;
    year?: number;
    current_semester?: number;
  };
};