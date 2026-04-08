type CourseLevel = "basic" | "intermediate" | "advanced";
type CourseType = "platform";

interface Course {
  free_link: string | null;
  id: number;
  level: CourseLevel;
  paid_link: string | null;
  title: string;
  type: CourseType;
  url: string;
  weight: number;
}

interface RoadmapWeek {
  courses: Course[];
  hours: number;
  kpis: string[];
  phase: string;
  skills: string[];
  week: number;
}

interface RoadmapResponse {
  ok: boolean;
  roadmap: RoadmapWeek[];
  track_id: number;
}