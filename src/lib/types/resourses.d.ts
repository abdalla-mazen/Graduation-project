export type Resource = {
  id: number;
  title: string;
  description: string | null;
  is_free: boolean;
  quality_score: number;
  url: string;
};

export type Resources = Resource[];