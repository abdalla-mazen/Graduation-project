export type Trend = {
  id: number;
  skill_name: string;
  description: string;
  demand_score: number;
  created_at: string;
  track_id: number;
};

export type TrendsResponse = {
  count: number;
  track_id: number;
  trends: Trend[];
};