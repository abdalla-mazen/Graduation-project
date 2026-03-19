// import { JobsSkeleton } from "../Jobs/_Components/Skeleton";
import GetPosts from "./_components/GetPosts";
// import getPosts from "@/lib/apis/get-jobs-linkedin.api";
import { JobsResponse } from "@/lib/types/posts";
import { postsLinkedin } from "@/lib/constants/posts.constant";

export default function Jobs() {
  // const posts: JobsResponse = await getPosts();

  // Random select jops
  const getRandomJops = (jobs: JobsResponse, count: number) => {
    const shuffled = jobs.posts.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, count);
    return {
      count: selected.length,
      posts: selected,
    };
  };

  const posts = getRandomJops(postsLinkedin, 10);
  // const posts : JobsResponse  = postsLinkedin
  return (
    <div className=" w-full md:w-3/4 mx-auto mt-2">
      <div className="shadow-lg rounded-lg p-5">
        {/* <Suspense fallback={<JobsSkeleton />}> */}
        <GetPosts posts={posts} />
        {/* </Suspense> */}
      </div>
    </div>
  );
}
