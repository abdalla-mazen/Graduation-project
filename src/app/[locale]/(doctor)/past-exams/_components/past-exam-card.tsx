import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { BookOpen, CalendarDays, Clock3 } from "lucide-react";
import React from "react";

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

type props = {
  exam: Exam;
  status: {
    label: string;
    className: string;
  };
};

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function PastExamCard({ exam, status }: props) {
  return (
    <Card key={exam.id} className="rounded-2xl border shadow-sm transition hover:shadow-md">
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <CardTitle className="line-clamp-1 text-lg">{exam.title}</CardTitle>
            <CardDescription className="line-clamp-1">{exam.academic_course_name}</CardDescription>
          </div>

          <Badge className={status.className}>{status.label}</Badge>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge className="border-zinc-200 bg-transparent capitalize text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800">
            {exam.exam_type}
          </Badge>
          <Badge className="border-zinc-200 bg-transparent text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800">
            {exam.duration_minutes} min
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid gap-3 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <BookOpen className="h-4 w-4" />
            <span className="font-medium text-foreground">Course:</span>
            <span>{exam.academic_course_name}</span>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <CalendarDays className="h-4 w-4" />
            <span className="font-medium text-foreground">Starts:</span>
            <span>{formatDate(exam.starts_at)}</span>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock3 className="h-4 w-4" />
            <span className="font-medium text-foreground">Ends:</span>
            <span>{formatDate(exam.ends_at)}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 rounded-xl bg-muted/50 p-3 text-sm">
          <div>
            <p className="text-muted-foreground">Questions</p>
            <p className="font-semibold">{exam.question_count}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Total Marks</p>
            <p className="font-semibold">{exam.total_marks}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Passing Score</p>
            <p className="font-semibold">{exam.passing_score}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Published</p>
            <p className="font-semibold">{exam.is_published ? "Yes" : "No"}</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          {exam.is_published ? (
            <Button asChild className="    flex-1 bg-blue-600 hover:bg-blue-700">
              <Link href={`/${exam.id}/results`}>View Results</Link>
            </Button>
          ) : (
            <Button
              variant="outline"
              asChild
              className="flex-1 border-blue-600 text-blue-600 hover:bg-blue-50 hover:text-blue-600"
            >
              <Link
                href={`/${exam.id}/questions?name=${encodeURIComponent(exam.title)}&totalMarks=${encodeURIComponent(exam.total_marks)}`}
              >
                View Details
              </Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
