export interface University {
  id: number;
  name: string;
  country: string;
  created_at: string;
}
export type UniversitiesResponse = University[];