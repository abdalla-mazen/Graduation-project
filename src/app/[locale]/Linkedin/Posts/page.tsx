import React, { Suspense } from "react";
import { JobsSkeleton } from "../Jobs/_Components/Skeleton";
import GetPosts from "./_components/GetPosts";
import getPosts from "@/lib/apis/get-jobs-linkedin.api";
import { JobsResponse } from "@/lib/types/posts";

export default async function Jobs() {
    const posts: JobsResponse = await getPosts();
  return (
    <div className="w-3/4 mx-auto mt-2">
      <div className="shadow-lg rounded-lg p-5">
        <Suspense fallback={<JobsSkeleton />}>
          <GetPosts posts={posts} />
        </Suspense>
      </div>
    </div>
  );
}
