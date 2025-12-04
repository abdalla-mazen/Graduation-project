export interface Option {
  id: number;
  question_id: number;
  text: string;
}

export interface Question {
  id: number;
  difficulty: Difficulty;
  text: string;
  options: Option[];
}

export interface AssessmentResponse {
  level: string;
  page: number;
  per_page: number;
  questions: Question[];
  total_questions: number;
  track: string;
}