export type Skill = {
  name: string;
  importance_score: number;
};

export type Course = {
  id: number;
  code: string;
  name: string;
  course_type: string; 
  semester: number;
  project: string;
  calculated_importance_score: number;
  skills: Skill[];
};

export type Courses = Course[];