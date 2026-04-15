export type Course = {
  id: number;
  code: string;
  name: string;
  semester: number;
  curriculum_year: number;
  department_id: number;
  created_at: string;
  skills: string;
}

export type CoursesResponse = Course[];