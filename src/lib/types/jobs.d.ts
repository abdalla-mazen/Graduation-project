export interface JobPosts {
  job_url: string;
  job_title: string;
  company_url: string;
  company_name: string;
  location: string;
  is_remote: boolean;
}
export type LinkedInJobs = JobPosts[];