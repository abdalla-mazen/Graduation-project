export interface Course {
  code: string;
  created_at: string;
  curriculum_year: number;
  department_id: number;
  id: number;
  name: string;
  semester: number; 
  skills: string;
}

export type Courses = Course[];