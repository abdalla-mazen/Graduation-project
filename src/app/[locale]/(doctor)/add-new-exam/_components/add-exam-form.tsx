"use client";

import type React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Minus, Plus, BookOpen, CalendarDays, FileText } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { addExamSchema, AddExamValues } from "@/lib/schemas/add-exam.schema";
import { CoursesResponse } from "@/lib/types/subjects";
import DateTimePickerField from "./date-time-picker-field";
import HeaderAddExamForm from "./header-add-exam-form";
import { addNewExamAction } from "../_actions/add-exam.action";
import { useRouter } from "@/i18n/navigation";

interface StepperProps {
  value: number;
  step?: number;
  min?: number;
  decimals?: number;
  onChange: (v: number) => void;
}

function Stepper({ value, step = 1, min = 0, decimals = 0, onChange }: StepperProps) {
  const fmt = (n: number) => n.toFixed(decimals);

  return (
    <div className="flex h-12 items-center overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - step))}
        className="flex h-full w-12 items-center justify-center border-r border-zinc-200 text-zinc-500 transition-colors hover:bg-zinc-50 hover:text-zinc-900"
      >
        <Minus className="h-3.5 w-3.5" />
      </button>
      <span className="flex-1 px-3 text-center text-sm font-semibold tabular-nums text-zinc-900">
        {fmt(value)}
      </span>
      <button
        type="button"
        onClick={() => onChange(value + step)}
        className="flex h-full w-12 items-center justify-center border-l border-zinc-200 text-zinc-500 transition-colors hover:bg-zinc-50 hover:text-zinc-900"
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

function SectionHeader({ icon, title }: { icon: React.ReactNode; title: React.ReactNode }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 shadow-sm ring-1 ring-blue-100">
        {icon}
      </div>
      <h2 className="text-lg font-semibold tracking-tight text-zinc-950">{title}</h2>
    </div>
  );
}

export default function AddExamForm({ courses }: { courses: CoursesResponse }) {
  const router = useRouter();
  const form = useForm<AddExamValues>({
    resolver: zodResolver(addExamSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      academic_course_id: courses[0]?.id ?? 0,
      title: "",
      description: "",
      exam_type: "midterm",
      duration_minutes: 90,
      passing_score: 50,
      total_marks: 100,
      starts_at: "2026-06-12T09:00:00",
      ends_at: "2026-06-12T11:00:00",
    },
  });

  const duration = form.watch("duration_minutes");
  const passingScore = form.watch("passing_score");
  const totalMarks = form.watch("total_marks");
  const examType = form.watch("exam_type");
  const startsAt = form.watch("starts_at");

  const onSubmit = async (data: AddExamValues) => {
    const payload: GetExamResponse = await addNewExamAction(data);
    // if (payload.ok) {
    //   router.push(`/${payload.exam.id}/questions`);
    // }

    if (payload.ok) {
      router.push(
        `/${payload.exam.id}/questions?name=${encodeURIComponent(payload.exam.title)}&totalMarks=${encodeURIComponent(payload.exam.total_marks)}`,
      );
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.14),_transparent_38%),linear-gradient(180deg,_#f8fbff_0%,_#f3f4f6_100%)] px-4 py-6 sm:px-6 lg:px-8">
      <HeaderAddExamForm
        data={{
          duration,
          passingScore,
          totalMarks,
          examType,
          startsAt,
        }}
      />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]"
        >
          <div className="space-y-6">
            <Card className="overflow-hidden rounded-[28px] border-white/80 bg-white/90 shadow-[0_18px_60px_-36px_rgba(15,23,42,0.35)] backdrop-blur">
              <CardContent className="p-6 md:p-7">
                <SectionHeader icon={<BookOpen className="h-5 w-5" />} title="Course Selection" />
                <FormField
                  control={form.control}
                  name="academic_course_id"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-sm font-medium text-zinc-800">
                        Academic Course
                      </FormLabel>
                      <FormControl>
                        <Select
                          value={field.value ? String(field.value) : ""}
                          onValueChange={(value) => field.onChange(Number(value))}
                        >
                          <SelectTrigger className="h-12 rounded-xl border-zinc-200 bg-white">
                            <SelectValue placeholder="Choose the course for this exam" />
                          </SelectTrigger>
                          <SelectContent>
                            {courses.map((course) => (
                              <SelectItem key={course.id} value={String(course.id)}>
                                {course.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <p className="text-sm text-zinc-500">
                        This links the exam to the correct academic subject for students.
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card className="overflow-hidden rounded-[28px] border-white/80 bg-white/90 shadow-[0_18px_60px_-36px_rgba(15,23,42,0.35)] backdrop-blur">
              <CardContent className="space-y-6 p-6 md:p-7">
                <SectionHeader icon={<FileText className="h-5 w-5" />} title="Exam Details" />

                <div className="grid gap-5 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem className="space-y-2 md:col-span-2">
                        <FormLabel
                          htmlFor="exam-title"
                          className="text-sm font-medium text-zinc-800"
                        >
                          Exam Title
                        </FormLabel>
                        <FormControl>
                          <Input
                            id="exam-title"
                            {...field}
                            placeholder="Enter exam title"
                            className="h-12 rounded-xl border-zinc-200 bg-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="exam_type"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-sm font-medium text-zinc-800">
                          Exam Type
                        </FormLabel>
                        <FormControl>
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger className="h-12 rounded-xl border-zinc-200 bg-white">
                              <SelectValue placeholder="Select exam type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="midterm">Midterm</SelectItem>
                              <SelectItem value="final">Final</SelectItem>
                              <SelectItem value="quiz">Quiz</SelectItem>
                              <SelectItem value="assignment">Assignment</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-2">
                    <FormLabel className="text-sm font-medium text-zinc-800">
                      Quick Preview
                    </FormLabel>
                    <div className="flex h-12 items-center rounded-xl border border-dashed border-blue-200 bg-blue-50 px-4 text-sm font-medium capitalize text-blue-700">
                      {examType} exam
                    </div>
                  </div>

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="space-y-2 md:col-span-2">
                        <FormLabel
                          htmlFor="description"
                          className="text-sm font-medium text-zinc-800"
                        >
                          Description
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            id="description"
                            {...field}
                            value={field.value ?? ""}
                            placeholder="Add instructions, scope, or any notes for your students..."
                            className="min-h-[140px] resize-y rounded-2xl border-zinc-200 bg-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="overflow-hidden rounded-[28px] border-white/80 bg-white/90 shadow-[0_18px_60px_-36px_rgba(15,23,42,0.35)] backdrop-blur">
              <CardContent className="space-y-6 p-6 md:p-7">
                <SectionHeader
                  icon={<CalendarDays className="h-5 w-5" />}
                  title={
                    <>
                      Schedule <span className="text-sm font-normal text-zinc-500">(optional)</span>
                    </>
                  }
                />

                <div className="grid gap-4">
                  <FormField
                    control={form.control}
                    name="starts_at"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormControl>
                          <DateTimePickerField
                            id="starts-at"
                            label="Starts At"
                            value={field.value}
                            onChange={field.onChange}
                            defaultHour={9}
                            helperText="Set when students are first allowed to enter the exam."
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="ends_at"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormControl>
                          <DateTimePickerField
                            id="ends-at"
                            label="Ends At"
                            value={field.value}
                            onChange={field.onChange}
                            defaultHour={11}
                            minDateTime={startsAt}
                            helperText="The end time will stay aligned after the selected start time."
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Separator />

                <div className="rounded-2xl bg-zinc-50 p-4">
                  <p className="text-sm font-semibold text-zinc-900">Scheduling note</p>
                  <p className="mt-1 text-sm leading-6 text-zinc-500">
                    Use the calendar picker to define the publishing window clearly, then adjust the
                    exact hour and minute for students.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden rounded-[28px] border-white/80 bg-white/90 shadow-[0_18px_60px_-36px_rgba(15,23,42,0.35)] backdrop-blur">
              <CardContent className="space-y-6 p-6 md:p-7">
                <div className="space-y-1">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
                    Grading Setup
                  </p>
                  <h3 className="text-xl font-semibold tracking-tight text-zinc-950">
                    Score Configuration
                  </h3>
                </div>

                <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                  <FormField
                    control={form.control}
                    name="duration_minutes"
                    render={({ field }) => (
                      <FormItem className="space-y-2 rounded-2xl border border-zinc-200 bg-white p-4">
                        <FormLabel className="text-sm font-medium text-zinc-800">
                          Duration (min)
                        </FormLabel>
                        <FormControl>
                          <Stepper value={field.value} step={5} min={5} onChange={field.onChange} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="passing_score"
                    render={({ field }) => (
                      <FormItem className="space-y-2 rounded-2xl border border-zinc-200 bg-white p-4">
                        <FormLabel className="text-sm font-medium text-zinc-800">
                          Passing Score (%)
                        </FormLabel>
                        <FormControl>
                          <Stepper
                            value={field.value}
                            step={5}
                            min={0}
                            decimals={2}
                            onChange={(value) => field.onChange(Math.min(100, value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="total_marks"
                    render={({ field }) => (
                      <FormItem className="space-y-2 rounded-2xl border border-zinc-200 bg-white p-4">
                        <FormLabel className="text-sm font-medium text-zinc-800">
                          Total Marks
                        </FormLabel>
                        <FormControl>
                          <Stepper
                            value={field.value}
                            step={10}
                            min={10}
                            decimals={2}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="rounded-2xl border border-blue-100 bg-blue-50/80 p-4">
                  <p className="text-sm font-semibold text-blue-900">Exam summary</p>
                  <p className="mt-1 text-sm leading-6 text-blue-800/80">
                    Students will need at least {passingScore.toFixed(0)}% out of{" "}
                    {totalMarks.toFixed(0)} marks, with a duration of {duration} minutes.
                  </p>
                </div>

                <Button
                  type="submit"
                  className="h-12 w-full rounded-xl bg-blue-600 text-base font-semibold shadow-lg shadow-blue-600/20 hover:bg-blue-700"
                >
                  Create Exam
                </Button>
              </CardContent>
            </Card>
          </div>
        </form>
      </Form>
    </div>
  );
}
