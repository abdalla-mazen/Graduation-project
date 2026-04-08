import { LinkedinPost } from "@/lib/types/posts";
export default async function compareAction(data: LinkedinPost) {
  const response = await fetch(`/api/compare`, {  // ← local route
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      job_description: {
        job_title: data.job_title,
        company_name: data.company_name,
        required_skills: data.required_skills,
        preferred_skills: data.preferred_skills,
        experience_years: data.experience_years,
        education_required: data.education_required ?? [],
        languages_required: data.languages_required ?? [],
        job_description: data.job_description,
        post_url: data.post_url ?? "",
        hr_email: data.hr_email ?? "",
      },
    }),
  });

  if (!response.ok) return { error: "Failed to compare" };
  return response.json();
}