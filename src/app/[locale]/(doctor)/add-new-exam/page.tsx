import getAcadmicCourse from "@/lib/apis/get-acadmic-course.api";
import { CoursesResponse } from "@/lib/types/subjects";
import React, { Suspense } from "react";
import AddExamForm from "./_components/add-exam-form";
import AddExamFormSkeleton from "@/components/skeletons/add-form-exam.skeleton";

// Separate async component so Suspense can catch the fetch
async function AddExamContent() {
  const courses: CoursesResponse = await getAcadmicCourse();
  return <AddExamForm courses={courses} />;
}

export default function Page() {
  return (
    <Suspense fallback={<AddExamFormSkeleton />}>
      <AddExamContent />
    </Suspense>
  );
}
