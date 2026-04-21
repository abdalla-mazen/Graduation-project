export type SkillType = "TECHNICAL" | "SOFT";

export interface Skill {
  id: number;
  name: string;
  track_id: number | null;
  type: SkillType;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export type SkillsResponse = Skill[];