import GradeSubmissions from "./_components/grade-submession";
import { Suspense } from "react";
import { getSubmissions } from "@/lib/apis/get-submissions.api";
import GradeSubmissionsSkeleton from "@/components/skeletons/grade-submession.skeleton";

async function GradeSubmissionsData({ id }: { id: number }) {
  const data = await getSubmissions(id);
  return <GradeSubmissions data={data} />;
}

export default function Page({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<GradeSubmissionsSkeleton />}>
      <GradeSubmissionsData id={Number(params.id)} />
    </Suspense>
  );
}
