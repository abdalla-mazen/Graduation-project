"use client";

import React, { useState } from "react";
import { JobsResponse, LinkedinPost } from "@/lib/types/posts";
import LinkedInJobsEmpty from "./empty-posts";
import {
  Linkedin,
  Briefcase,
  ChevronRight,
  Building2,
  GraduationCap,
  Languages,
  ExternalLink,
  Mail,
} from "lucide-react";
import { Link, useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

type Props = {
  posts: JobsResponse;
};

export default function GetPosts({ posts }: Props) {
  const router = useRouter();
  const [expanded, setExpanded] = useState<number | null>(null);

  const handleCompare = (e: React.MouseEvent, post: LinkedinPost) => {
    e.stopPropagation();
    const postQuery = encodeURIComponent(JSON.stringify(post));
    router.push(`/Linkedin/posts/compare?post=${postQuery}`);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
      {posts.count > 0 ? (
        <div className="max-w-3xl mx-auto px-2 sm:px-4 py-4 sm:py-10">
          {/* Header */}
          <div className="mb-6 sm:mb-10 px-4 sm:px-0">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-6 rounded-full bg-blue-600" />
              <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">
                Opportunities
              </span>
            </div>
            <h1
              className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight tracking-tight mb-1"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              LinkedIn Posts
            </h1>
            <p className="text-slate-500 text-sm">
              {posts.count} position{posts.count !== 1 ? "s" : ""} found for you
            </p>
          </div>

          {/* Connect Banner */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0077B5] to-[#005885] p-4 sm:p-5 mb-6 sm:mb-8 shadow-lg shadow-blue-200">
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: "radial-gradient(circle at 80% 50%, white 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm sm:text-base mb-1">
                  Connect your LinkedIn Profile
                </p>
                <p className="text-blue-100 text-xs sm:text-sm leading-relaxed">
                  Get personalized job recommendations tailored to your skills and experience.
                </p>
              </div>
              <button className="shrink-0 flex items-center gap-2 bg-white text-[#0077B5] font-semibold text-sm px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl hover:bg-blue-50 transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 w-full sm:w-auto justify-center sm:justify-start">
                <Linkedin size={16} fill="#0077B5" />
                Connect Now
              </button>
            </div>
          </div>

          {/* Jobs List */}
          <div className="flex flex-col gap-3 sm:gap-4 -mx-2 sm:mx-0">
            {posts.posts.map((post, index) => {
              const isOpen = expanded === index;
              return (
                <div
                  key={index}
                  className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden transition-all duration-300 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100"
                >
                  {/* Card Header */}
                  <div
                    className="flex items-start justify-between gap-3 p-4 sm:p-6 cursor-pointer"
                    onClick={() => setExpanded(isOpen ? null : index)}
                  >
                    <div className="flex-1 min-w-0">
                      <h2 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors duration-200 break-words">
                        {post.job_title}
                      </h2>
                      <div className="flex items-center gap-1.5 mt-1 text-slate-500 text-xs sm:text-sm">
                        <Building2 size={13} className="shrink-0" />
                        <span className="truncate">{post.company_name}</span>
                      </div>
                    </div>

                    <div
                      className={`shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isOpen ? "bg-blue-600 rotate-90" : "bg-slate-100 group-hover:bg-blue-100"
                      }`}
                    >
                      <ChevronRight
                        size={14}
                        className={`transition-colors duration-300 ${
                          isOpen ? "text-white" : "text-slate-400 group-hover:text-blue-600"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Quick chips */}
                  <div className="px-4 sm:px-6 pb-3 sm:pb-4 flex flex-wrap gap-1.5 sm:gap-2">
                    {post.experience_years && (
                      <span className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 border border-slate-100 rounded-full px-2.5 sm:px-3 py-1">
                        <Briefcase size={11} />
                        {post.experience_years}
                      </span>
                    )}
                    {post.languages_required?.map((lang, i) => (
                      <span
                        key={i}
                        className="flex items-center gap-1.5 text-xs text-violet-600 bg-violet-50 border border-violet-100 rounded-full px-2.5 sm:px-3 py-1"
                      >
                        <Languages size={11} />
                        {lang}
                      </span>
                    ))}
                  </div>

                  {/* Preferred Skills preview */}
                  {post.preferred_skills?.length > 0 && (
                    <div className="px-4 sm:px-6 pb-4 sm:pb-5 flex flex-wrap gap-1.5">
                      {(isOpen ? post.preferred_skills : post.preferred_skills.slice(0, 3)).map(
                        (skill, i) => (
                          <span
                            key={i}
                            className="bg-blue-50 text-blue-700 border border-blue-100 px-2.5 py-0.5 rounded-full text-xs font-medium"
                          >
                            {skill}
                          </span>
                        ),
                      )}
                      {!isOpen && post.preferred_skills.length > 3 && (
                        <span className="text-slate-400 text-xs px-2 py-0.5 flex items-center">
                          +{post.preferred_skills.length - 3} more
                        </span>
                      )}
                    </div>
                  )}

                  {/* Expanded Section */}
                  {isOpen && (
                    <div className="border-t border-slate-100 px-4 sm:px-6 py-4 sm:py-5 flex flex-col gap-5 sm:gap-6 bg-slate-50/60">
                      {/* Description */}
                      {post.job_description && (
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                            Description
                          </p>
                          <p className="text-slate-600 text-sm leading-relaxed">
                            {post.job_description}
                          </p>
                        </div>
                      )}

                      {/* Required Skills */}
                      {post.required_skills?.length > 0 && (
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                            Required Skills
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {post.required_skills.map((skill, i) => (
                              <span
                                key={i}
                                className="bg-orange-50 text-orange-700 border border-orange-100 px-2.5 py-0.5 rounded-full text-xs font-medium"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Preferred Skills (full) */}
                      {post.preferred_skills?.length > 0 && (
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                            Preferred Skills
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {post.preferred_skills.map((skill, i) => (
                              <span
                                key={i}
                                className="bg-blue-50 text-blue-700 border border-blue-100 px-2.5 py-0.5 rounded-full text-xs font-medium"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Education */}
                      {post.education_required?.length > 0 && (
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                            Education
                          </p>
                          <div className="flex flex-col gap-1.5">
                            {post.education_required.map((edu, i) => (
                              <div
                                key={i}
                                className="flex items-start gap-2 text-sm text-slate-600"
                              >
                                <GraduationCap
                                  size={13}
                                  className="text-slate-400 shrink-0 mt-0.5"
                                />
                                <span className="break-words">{edu}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Languages */}
                      {post.languages_required?.length > 0 && (
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                            Languages
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {post.languages_required.map((lang, i) => (
                              <span
                                key={i}
                                className="bg-violet-50 text-violet-700 border border-violet-100 px-2.5 py-0.5 rounded-full text-xs font-medium flex items-center gap-1"
                              >
                                <Languages size={11} />
                                {lang}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Contact & Links */}
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                          Contact & Links
                        </p>
                        <div className="flex flex-col gap-2">
                          {post.hr_email && (
                            <Link
                              href={`mailto:${post.hr_email}`}
                              onClick={(e) => e.stopPropagation()}
                              className="flex items-start gap-2 text-sm text-slate-600 hover:text-blue-600 transition-colors break-all"
                            >
                              <Mail size={13} className="text-slate-400 shrink-0 mt-0.5" />
                              <span>{post.hr_email}</span>
                            </Link>
                          )}
                          {post.post_url && (
                            <Link
                              href={post.post_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 transition-colors"
                            >
                              <ExternalLink size={13} className="shrink-0" />
                              View Original Post
                            </Link>
                          )}
                        </div>
                      </div>

                      {/* CTA */}
                      <Button
                        onClick={(e) => handleCompare(e, post)}
                        className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-semibold text-sm py-3 rounded-xl transition-all duration-200 shadow-md shadow-blue-200"
                      >
                        Compare with My Profile →
                      </Button>
                    </div>
                  )}

                  <div className="h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <LinkedInJobsEmpty />
      )}
    </div>
  );
}
