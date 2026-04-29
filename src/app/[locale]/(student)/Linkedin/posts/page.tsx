import { Suspense } from "react";
import GetPosts from "./_components/GetPosts";

import { JobsSkeleton } from "../Jobs/_Components/Skeleton";
import getPostsLinkedIn from "@/lib/apis/get-posts-linkedin.api";
export default async function Posts() {

  const posts = await getPostsLinkedIn()
  console.log("rrrrrrrrrrrrrrrrrrrrrrrr" , posts)
  return (
    <div className=" w-full md:w-3/4 mx-auto mt-2">
      <div className="shadow-lg rounded-lg p-5">
        <Suspense fallback={<JobsSkeleton />}>
        <GetPosts posts={posts} />
        </Suspense>
      </div>
    </div>
  );
}
