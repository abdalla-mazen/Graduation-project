export interface Track {
  id: number;
  name: string;
  summary: string;
  long_description: string | null;
  market_demand: number;
  popularity_score: number;
  created_at: string;     
  updated_at: string;   
}
export type TracksList = Track[];