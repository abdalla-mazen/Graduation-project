export type Suggestion = {
  title: string;
  description: string;
  skills: string[];
};

export type TrackData = {
  track: string;
  suggestions: Suggestion[];
};