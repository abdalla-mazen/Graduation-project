"use client";

import React from "react";
import { JobsResponse, LinkedinPost } from "@/lib/types/posts";
import LinkedInJobsEmpty from "./empty-posts";
import { Button } from "@/components/ui/button";
import { Linkedin } from "lucide-react";
import { useRouter } from "@/i18n/navigation";

type Props = {
  posts: JobsResponse;
};

export default function GetPosts({ posts }: Props) {
 const router = useRouter()
  const handleCompare = (post:LinkedinPost) => {
const postQuery = encodeURIComponent(JSON.stringify(post));
router.push(`/linkedin/compare?post=${postQuery}`);
  };

  return (
    <>
      {posts.count > 0 ? (
        <>
          {/* Header */}
          <h1 className="text-3xl font-bold my-2">LinkedIn Jobs</h1>

          <p className="text-xl font-bold">Connect your LinkedIn</p>

          <div className="flex flex-col gap-3 sm:flex-row items-center sm:justify-between">
            <p className="text-center my-2">
              See personalized job recommendations based on your profile and skills.
            </p>

            <Button className="w-fit bg-mainColor flex items-center gap-2">
              <Linkedin size={18} />
              Connect
            </Button>
          </div>

          {/* Jobs List */}
          {posts.posts.map((post, index) => (
            <div
             key={index} 
             onClick={() => handleCompare(post)}
            className="shadow-xl p-4 rounded-lg my-3 border bg-white">
              <p className="font-bold text-xl">
                Job Title : <span className="font-normal">{post.job_title}</span>
              </p>

              <p className="font-bold">
                Company Name : <span className="font-normal">{post.company_name}</span>
              </p>

              <p className="font-bold">
                Experience : <span className="font-normal">{post.experience_years}</span>
              </p>

              <p className="font-bold mt-2">Job Description :</p>

              <p className="text-gray-600 mt-1">{post.job_description}</p>

              <p className="font-semibold mt-3">Required Skills</p>

              <div className="flex flex-wrap gap-2 mt-2">
                {post.preferred_skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </>
      ) : (
        <LinkedInJobsEmpty />
      )}
    </>
  );
}
