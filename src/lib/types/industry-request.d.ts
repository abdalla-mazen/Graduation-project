export type Trend = {
  [key: string]: string;
};

export type Trends = {
  count: number;
  track_id: number;
  trends: Trend[];
};