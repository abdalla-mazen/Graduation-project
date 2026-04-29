// "use client";

// import React, { useState } from "react";
// import { LinkedinPost } from "@/lib/types/posts";
// import { Briefcase, Building2, GraduationCap, ExternalLink, Mail } from "lucide-react";
// import { Link, useRouter } from "@/i18n/navigation";
// import { Button } from "@/components/ui/button";
// import { PostsResponse } from "@/lib/types/Posts-linkedin";

// type Props = {
//   posts: PostsResponse;
// };

// // ✅ Static fallback data
// const staticPosts: LinkedinPost[] = [
//   {
//     job_title: "Frontend Developer",
//     company_name: "Google",
//     required_skills: ["React", "TypeScript"],
//     preferred_skills: ["Next.js", "Tailwind", "GraphQL"],
//     experience_years: "2-4 years",
//     education_required: ["Bachelor in Computer Science"],
//     languages_required: ["English"],
//     job_description:
//       "We are looking for a Frontend Developer to build scalable web apps and improve user experience.",
//     post_url: "https://linkedin.com",
//     hr_email: "hr@google.com",
//   },
// ];

// export default function GetPosts({ posts }: Props) {
//   console.log(posts);
//   const router = useRouter();
//   const [expanded, setExpanded] = useState<number | null>(null);

//   // ✅ use real data OR fallback
//   const hasRealData = posts?.count > 0;
//   const displayPosts = hasRealData ? posts.posts : staticPosts;

//   const handleCompare = (e: React.MouseEvent, post: LinkedinPost) => {
//     e.stopPropagation();
//     const postQuery = encodeURIComponent(JSON.stringify(post));
//     router.push(`/Linkedin/posts/compare?post=${postQuery}`);
//   };

//   return (
//     <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
//       <div className="max-w-3xl mx-auto px-2 sm:px-4 py-4 sm:py-10">
//         {/* Header */}
//         <div className="mb-6 sm:mb-10 px-4 sm:px-0">
//           <div className="flex items-center gap-2 mb-3">
//             <div className="w-1 h-6 rounded-full bg-blue-600" />
//             <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">
//               Opportunities
//             </span>
//           </div>

//           <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mb-1">
//             LinkedIn Posts
//           </h1>

//           <p className="text-slate-500 text-sm">
//             {hasRealData
//               ? posts.count === 1
//                 ? "1 opportunity tailored for you"
//                 : `${posts.count} opportunities waiting for you`
//               : "Showing demo opportunities"}
//           </p>
//         </div>

//         {/* Banner */}
//         <div className="rounded-2xl bg-gradient-to-r from-[#0077B5] to-[#005885] p-5 mb-8 text-white">
//           <p className="font-semibold">Connect your LinkedIn Profile</p>
//           <p className="text-sm text-blue-100">Get personalized job recommendations.</p>
//         </div>

//         {/* Jobs */}
//         <div className="flex flex-col gap-4">
//           {displayPosts.map((post, index) => {
//             const isOpen = expanded === index;

//             return (
//               <div
//                 key={index}
//                 className="bg-white rounded-2xl border overflow-hidden hover:shadow-lg transition"
//               >
//                 {/* Header */}
//                 <div
//                   className="p-5 cursor-pointer"
//                   onClick={() => setExpanded(isOpen ? null : index)}
//                 >
//                   <h2 className="font-bold text-lg text-slate-900">{post.job_title}</h2>

//                   <div className="flex items-center gap-2 mt-1 text-sm text-slate-500">
//                     <Building2 size={14} />
//                     {post.company_name}
//                     <span className="bg-blue-100 text-blue-700 text-xs px-2 rounded-full">
//                       Hiring
//                     </span>
//                   </div>
//                 </div>

//                 {/* Skills preview */}
//                 <div className="px-5 pb-4 flex flex-wrap gap-2">
//                   {post.experience_years && (
//                     <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs flex items-center gap-1">
//                       <Briefcase size={12} />
//                       {post.experience_years}
//                     </span>
//                   )}

//                   {post.preferred_skills?.slice(0, 3).map((s, i) => (
//                     <span
//                       key={i}
//                       className="bg-slate-100 text-slate-600 px-2 py-1 text-xs rounded-full"
//                     >
//                       {s}
//                     </span>
//                   ))}
//                 </div>

//                 {/* Expanded */}
//                 {isOpen && (
//                   <div className="border-t px-5 py-5 bg-slate-50 space-y-5">
//                     {/* Description */}
//                     <div>
//                       <p className="text-xs text-slate-400 mb-1">Description</p>
//                       <p className="text-sm text-slate-600">{post.job_description}</p>
//                     </div>

//                     {/* Skills */}
//                     <div>
//                       <p className="text-xs text-slate-400 mb-1">
//                         Preferred Skills ({post.preferred_skills?.length || 0})
//                       </p>
//                       <div className="flex flex-wrap gap-2">
//                         {post.preferred_skills?.length > 0 ? (
//                           post.preferred_skills.map((s, i) => (
//                             <span
//                               key={i}
//                               className="bg-blue-50 text-blue-700 px-2 py-1 text-xs rounded-full"
//                             >
//                               {s}
//                             </span>
//                           ))
//                         ) : (
//                           <span className="text-xs text-slate-400">No skills listed</span>
//                         )}
//                       </div>
//                     </div>

//                     {/* Education */}
//                     {post.education_required?.length > 0 && (
//                       <div>
//                         <p className="text-xs text-slate-400 mb-1">Education</p>
//                         {post.education_required.map((edu, i) => (
//                           <div key={i} className="flex gap-2 text-sm">
//                             <GraduationCap size={14} />
//                             {edu}
//                           </div>
//                         ))}
//                       </div>
//                     )}

//                     {/* Contact */}
//                     <div className="flex flex-col gap-2">
//                       {post.hr_email && (
//                         <a
//                           href={`mailto:${post.hr_email}`}
//                           className="flex items-center justify-center gap-2 border rounded-lg py-2 text-blue-600"
//                         >
//                           <Mail size={14} />
//                           Contact HR
//                         </a>
//                       )}

//                       {post.post_url && (
//                         <Link
//                           href={post.post_url}
//                           target="_blank"
//                           className="flex items-center justify-center gap-2 bg-slate-900 text-white py-2 rounded-lg"
//                         >
//                           <ExternalLink size={14} />
//                           View Post
//                         </Link>
//                       )}
//                     </div>

//                     {/* CTA */}
//                     <Button onClick={(e) => handleCompare(e, post)}>
//                       Compare with My Profile →
//                     </Button>
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useState } from "react";
import { LinkedinPost } from "@/lib/types/posts";
import {
  Briefcase,
  Building2,
  GraduationCap,
  ExternalLink,
  Mail,
} from "lucide-react";
import { Link, useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { PostsResponse } from "@/lib/types/Posts-linkedin";

type Props = {
  posts: PostsResponse;
};

export default function GetPosts({ posts }: Props) {
  console.log(posts);

  const router = useRouter();
  const [expanded, setExpanded] = useState<number | null>(null);

  const hasPosts = posts?.posts?.length > 0;

  const handleCompare = (e: React.MouseEvent, post: LinkedinPost) => {
    e.stopPropagation();
    const postQuery = encodeURIComponent(JSON.stringify(post));
    router.push(`/Linkedin/posts/compare?post=${postQuery}`);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
      <div className="max-w-3xl mx-auto px-2 sm:px-4 py-4 sm:py-10">
        {/* Header */}
        <div className="mb-6 sm:mb-10 px-4 sm:px-0">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-6 rounded-full bg-blue-600" />
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">
              Opportunities
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mb-1">
            LinkedIn Posts
          </h1>

          <p className="text-slate-500 text-sm">
            {hasPosts
              ? posts.posts.length === 1
                ? "1 opportunity found"
                : `${posts.posts.length} opportunities found`
              : "No opportunities found"}
          </p>
        </div>

        {!hasPosts ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
              <Building2 size={18} className="text-slate-400" />
            </div>

            <p className="text-sm text-slate-500">
              No posts available right now
            </p>

            <p className="text-xs text-slate-400 mt-1">
              Try again later
            </p>
          </div>
        ) : (
          /* Jobs */
          <div className="flex flex-col gap-4">
            {posts.posts.map((post, index) => {
              const isOpen = expanded === index;

              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border overflow-hidden hover:shadow-lg transition"
                >
                  {/* Header */}
                  <div
                    className="p-5 cursor-pointer"
                    onClick={() => setExpanded(isOpen ? null : index)}
                  >
                    <h2 className="font-bold text-lg text-slate-900">
                      {post.job_title}
                    </h2>

                    <div className="flex items-center gap-2 mt-1 text-sm text-slate-500">
                      <Building2 size={14} />
                      {post.company_name}
                      <span className="bg-blue-100 text-blue-700 text-xs px-2 rounded-full">
                        Hiring
                      </span>
                    </div>
                  </div>

                  {/* Skills preview */}
                  <div className="px-5 pb-4 flex flex-wrap gap-2">
                    {post.experience_years && (
                      <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs flex items-center gap-1">
                        <Briefcase size={12} />
                        {post.experience_years}
                      </span>
                    )}

                    {post.preferred_skills?.slice(0, 3).map((s, i) => (
                      <span
                        key={i}
                        className="bg-slate-100 text-slate-600 px-2 py-1 text-xs rounded-full"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* Expanded */}
                  {isOpen && (
                    <div className="border-t px-5 py-5 bg-slate-50 space-y-5">
                      {/* Description */}
                      <div>
                        <p className="text-xs text-slate-400 mb-1">
                          Description
                        </p>
                        <p className="text-sm text-slate-600">
                          {post.job_description}
                        </p>
                      </div>

                      {/* Skills */}
                      <div>
                        <p className="text-xs text-slate-400 mb-1">
                          Preferred Skills (
                          {post.preferred_skills?.length || 0})
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {post.preferred_skills?.length > 0 ? (
                            post.preferred_skills.map((s, i) => (
                              <span
                                key={i}
                                className="bg-blue-50 text-blue-700 px-2 py-1 text-xs rounded-full"
                              >
                                {s}
                              </span>
                            ))
                          ) : (
                            <span className="text-xs text-slate-400">
                              No skills listed
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Education */}
                      {post.education_required?.length > 0 && (
                        <div>
                          <p className="text-xs text-slate-400 mb-1">
                            Education
                          </p>
                          {post.education_required.map((edu, i) => (
                            <div key={i} className="flex gap-2 text-sm">
                              <GraduationCap size={14} />
                              {edu}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Contact */}
                      <div className="flex flex-col gap-2">
                       

                        {post.post_url && (
                          <Link
                            href={post.post_url}
                            target="_blank"
                            className="flex items-center justify-center gap-2 bg-mainColor text-white py-2 rounded-lg"
                          >
                            <ExternalLink size={14} />
                            View Post
                          </Link>
                        )}
                      </div>

                      {/* CTA */}
                      <Button className="bg-mainColor" onClick={(e) => handleCompare(e, post)}>
                        Compare with My Profile →
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}