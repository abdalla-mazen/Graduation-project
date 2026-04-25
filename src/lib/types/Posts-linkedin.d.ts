export type Post = {
  job_title: string;
  company_name: string;
  required_skills: string[];
  preferred_skills: string[];
  experience_years: string;
  education_required: string[];
  languages_required: string[];
  job_description: string;
  post_url: string;
  hr_email: string;
};

export type PostsResponse = {
  count: number;
  posts: Post[];
};