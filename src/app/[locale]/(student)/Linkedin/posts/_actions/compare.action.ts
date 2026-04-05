// import { LinkedinPost } from "@/lib/types/posts";

import { LinkedinPost } from "@/lib/types/posts";

// export default async function compareAction( data : LinkedinPost ) {


// const token =
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiaGFzc2FuZmFycmFnIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoiaGFzc2FuQGV4YW1wbGUuY29tIiwiZXhwIjoxODAyNDQ5Mzk5LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDoxMjM0LyIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjcyOTUvYXBpIn0.pAFTjHaIPOoT0IDR9sMByI0sWe3MZuGPONmAL7EiKgE";


//     const response = await fetch( `https://nexusporject.runasp.net/LinkedIn/CompareCv`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//         },
//          body: JSON.stringify({
//             job_description: {
//               job_title: data.job_title,
//               company_name: data.company_name,
//             //   required_skills: data.preferred_skills,
//             required_skills: data.required_skills,
//               preferred_skills: data.preferred_skills,
//               experience_years: data.experience_years,
//               education_required: data.education_required ?? [],
//               languages_required: data.languages_required ?? [],
//               job_description: data.job_description,
//               post_url: data.post_url ?? "",
//               hr_email: data.hr_email ?? "",
//             },
//           }),
//     });
//      if (!response.ok) throw new Error("Failed to compare");
//     return response.json();
// }

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