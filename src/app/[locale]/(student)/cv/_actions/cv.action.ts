// "use server";

// export default async function cvAction(file: File) {
//   const formData = new FormData();
//   formData.append("file", file);
//   const response = await fetch(
//     `https://app2.nexxuus.site/api/analyze_cv/`,
//     {
//       body: formData,
//       method: "POST",
//     },
//   );
//   if (!response.ok) throw new Error("Failed to upload file");
//   const payload = await response.json();

//   return payload;
// }
// "use server";

// export async function cvAction(formData: FormData) {
//   // خلي بالك هنا File موجود جوا FormData
//   const file = formData.get("file");

//   const response = await fetch(
//     `https://app2.nexxuus.site/api/analyze_cv/`,
//     {
//       method: "POST",
//       body: formData, // مهم تبعته مباشرة، بدون wrapping
//     }
//   );

//   if (!response.ok) throw new Error("Failed to upload file");
//   const payload = await response.json();
//   return payload;
// }

// cv.action.ts
// "use server";

// export default async function cvAction(formData: FormData) {
//   const response = await fetch(
//     `https://nexus-generate-cv-and-analysis-cv-evo8oz-79e5af-187-77-71-179.traefik.me/api/analyze_cv/`,
//     {
//       body: formData,
//       method: "POST",
//     },
//   );
//   if (!response.ok) throw new Error("Failed to upload file");
//   return await response.json();
// }

// "use server";

// export default async function cvAction(formData: FormData) {
//   const response = await fetch(
//     `https://nexus-generate-cv-and-analysis-cv-evo8oz-79e5af-187-77-71-179.traefik.me/api/analyze_cv/`,
//     {
//       body: formData,
//       method: "POST",
//     },
//   );

//   if (!response.ok) throw new Error("Failed to upload file");
//   return await response.json();
// }
