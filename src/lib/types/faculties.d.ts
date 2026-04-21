export type Faculty = {
  id: number;
  name: string;
  university_id: number;
  created_at: string; // ISO date string
};
export type FacultiesResponse = Faculty[];