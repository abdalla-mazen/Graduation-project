import PastExamCardSkeleton from "@/components/skeletons/past-exam-card-skeleton";
import getDoctorExams from "@/lib/apis/get-doctor-exams.api";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, ShieldAlert } from "lucide-react";
import Link from "next/link";
import PastExamCard from "./_components/past-exam-card";
import { Suspense } from "react";

type Exam = {
  academic_course_id: number;
  academic_course_name: string;
  created_at: string;
  description: string | null;
  duration_minutes: number;
  ends_at: string;
  exam_type: string;
  id: number;
  is_published: boolean;
  passing_score: number;
  question_count: number;
  starts_at: string;
  teacher_id: number;
  title: string;
  total_marks: number;
};

type ExamsResponse = Exam[] | { error?: string };

function getStatus(startsAt: string, endsAt: string, isPublished: boolean) {
  const now = new Date();
  const start = new Date(startsAt);
  const end = new Date(endsAt);
  if (!isPublished) {
    return {
      label: "Not Published",
      className:
        "border-transparent bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300",
    };
  }

  if (now < start) {
    return {
      label: "Upcoming",
      className:
        "border-transparent bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/40 dark:text-blue-300",
    };
  }

  if (now >= start && now <= end) {
    return {
      label: "Active",
      className: "border-transparent bg-blue-600 text-white hover:bg-blue-700",
    };
  }

  return {
    label: "Finished",
    className:
      "border-transparent bg-zinc-200 text-zinc-700 hover:bg-zinc-300 dark:bg-zinc-700 dark:text-zinc-200",
  };
}

export default async function Page() {
  const response: ExamsResponse = await getDoctorExams();

  // guard
  if (!Array.isArray(response)) {
    if (response?.error === "Teachers only") {
      return (
        <div className="min-h-screen bg-muted/30 p-4 md:p-6">
          <div className="mx-auto max-w-3xl">
            <Card className="rounded-2xl border shadow-sm">
              <CardContent className="flex min-h-[320px] flex-col items-center justify-center space-y-4 text-center">
                <div className="rounded-full bg-red-100 p-4 text-red-600">
                  <ShieldAlert className="h-8 w-8" />
                </div>

                <div className="space-y-2">
                  <h1 className="text-2xl font-bold">Unauthorized Access</h1>
                  <p className="text-muted-foreground">This page is available for teachers only.</p>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row">
                  <Button asChild>
                    <Link href="/">Go Home</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/login">Login with Teacher Account</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-muted/30 p-4 md:p-6">
        <div className="mx-auto max-w-3xl">
          <Card className="rounded-2xl border shadow-sm">
            <CardContent className="flex min-h-[250px] flex-col items-center justify-center space-y-3 text-center">
              <h1 className="text-2xl font-bold">Something went wrong</h1>
              <p className="text-muted-foreground">Failed to load exams. Please try again later.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const exams = response;

  return (
    <div className="min-h-screen bg-muted/30 p-4 md:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">My Exams</h1>
            <p className="text-sm text-muted-foreground">
              Manage all exams and review their details.
            </p>
          </div>

          <Button asChild className="bg-blue-600 w-fit">
            <Link className="w-full flex items-center " href="/add-new-exam">
              Add New Exam
              <Plus className="ml-2 text-white h-4 w-4" />
            </Link>
          </Button>
        </div>

        {exams.length === 0 ? (
          <Card className="rounded-2xl border-dashed">
            <CardContent className="flex min-h-[250px] flex-col items-center justify-center space-y-3 text-center">
              <h2 className="text-xl font-semibold">No exams found</h2>
              <p className="max-w-md text-sm text-muted-foreground">
                You don&apos;t have any exams yet. Start by creating a new one.
              </p>
              <Button asChild>
                <Link href="/doctor/exams/create">Create Exam</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {exams.map((exam) => {
              const status = getStatus(exam.starts_at, exam.ends_at, exam.is_published);

              return (
                <Suspense key={exam.id} fallback={<PastExamCardSkeleton />}>
                  <PastExamCard exam={exam} status={status} />
                </Suspense>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
