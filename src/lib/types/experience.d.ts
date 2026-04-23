export type Experience = {
  company_name: string;
  description: string;
  end_date: string | null;
  id: number;
  skills: string[];
  start_date: string;
  title: string;
};

export type Experiences = Experience[];

export type DeleteExperienceResponse = {
  message: string;
};
