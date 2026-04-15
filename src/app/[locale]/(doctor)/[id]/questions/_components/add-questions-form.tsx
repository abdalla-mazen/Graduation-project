"use client";

import type React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleQuestionMark, Plus, Rocket } from "lucide-react";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { addQuestionSchema, AddQuestionSchema } from "@/lib/schemas/add-question.schema";
import { addQuestionAction } from "../_actions/add-question.action";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import usePublish from "../_hooks/use-publish";

type QuestionType = "MCQ";

type QuestionPreview = {
  id: string;
  text: string;
  type: QuestionType;
  marks: number;
};

const createDefaultValues = (): AddQuestionSchema => ({
  text: "",
  question_type: "mcq",
  marks: "" as unknown as number,
  options: Array.from({ length: 4 }, () => ({
    text: "",
    is_correct: false,
  })),
});

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

export default function AddQuestionsForm({
  id,
  examName,
  totalMarks,
}: {
  id: number;
  examName: string;
  totalMarks: number;
}) {
  const [questions, setQuestions] = useState<QuestionPreview[]>([]);
  const safeTotalMarks = Number.isFinite(totalMarks) ? totalMarks : 0;
  const { isPending, error, publish } = usePublish(id);


  const form = useForm<AddQuestionSchema>({
    resolver: zodResolver(addQuestionSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: createDefaultValues(),
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: "options",
  });

  const watchedMarks = form.watch("marks");
  const watchedType = form.watch("question_type");
  const watchedOptions = form.watch("options");
  const usedMarks = questions.reduce((sum, question) => sum + question.marks, 0);
  const remainingMarks = safeTotalMarks - usedMarks;
  const remainingAfterSave = remainingMarks - watchedMarks;

  const handleCorrectAnswerChange = (selectedIndex: number) => {
    const currentOptions = form.getValues("options");

    currentOptions.forEach((_, index) => {
      form.setValue(`options.${index}.is_correct`, index === selectedIndex, {
        shouldValidate: true,
        shouldDirty: true,
      });
    });
  };

  const onSubmit = async (data: AddQuestionSchema) => {
    if (data.marks > remainingMarks) {
      toast.error("Marks exceeded", {
        description: `Only ${remainingMarks} mark${remainingMarks !== 1 ? "s are" : " is"} left from the total.`,
      });
      return;
    }

    const payload = await addQuestionAction({
      exam_id: id,
      data,
    });

    if (!payload?.success && !payload?.ok) {
      toast.error("Failed to add question", {
        description: payload?.message ?? "Something went wrong while saving the question.",
      });
      return;
    }

    setQuestions((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        text: data.text,
        type: "MCQ",
        marks: data.marks,
      },
    ]);

    toast.success("Question added", {
      description: "The question has been saved successfully.",
    });

    form.reset(createDefaultValues());
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-6">
        <Card className="overflow-hidden rounded-[28px] border-white/80 bg-white/90 shadow-[0_18px_60px_-36px_rgba(15,23,42,0.35)] backdrop-blur">
          <CardContent className="p-6 md:p-7">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-semibold capitalize tracking-tight text-zinc-950">
                  {examName
                    .split("?")[0]
                    .trim()
                    .replace(/^./, (c) => c.toUpperCase())}{" "}
                  Exam
                </h2>
                <p className="mt-1 text-sm text-zinc-500">Questions overview</p>
              </div>

              <div className="rounded-2xl border border-zinc-200 bg-white px-5 py-3 text-center shadow-sm">
                <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                  Questions
                </p>
                <p className="mt-1 text-3xl font-bold text-blue-600">{questions.length}</p>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-zinc-900">Questions added so far</h3>

              {questions.length > 0 ? (
                questions.map((question, index) => (
                  <div
                    key={question.id}
                    className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm"
                  >
                    <p className="text-sm font-semibold text-zinc-900">
                      Q{index + 1}. {question.text}
                    </p>
                    <p className="mt-2 text-sm text-zinc-500">
                      {question.type} - {question.marks} mark{question.marks !== 1 ? "s" : ""}
                    </p>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-8 text-center">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <CircleQuestionMark className="h-6 w-6" />
                  </div>
                  <p className="text-base font-medium text-zinc-700">No questions yet</p>
                  <p className="mt-1 text-sm text-zinc-500">
                    Start by adding your first question below.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden rounded-[28px] border-white/80 bg-white/90 shadow-[0_18px_60px_-36px_rgba(15,23,42,0.35)] backdrop-blur">
          <CardContent className="space-y-6 p-6 md:p-7">
            <SectionHeader icon={<Plus className="h-5 w-5" />} title="Add Question" />

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="text"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel
                        htmlFor="question-text"
                        className="text-sm font-medium text-zinc-800"
                      >
                        Question Text
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          id="question-text"
                          {...field}
                          placeholder="Write your question here..."
                          className="min-h-[140px] resize-y rounded-2xl border-zinc-200 bg-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-5 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="question_type"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-sm font-medium text-zinc-800">Type</FormLabel>
                        <FormControl>
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger className="h-12 rounded-xl border-zinc-200 bg-white">
                              <SelectValue placeholder="Select question type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="mcq">MCQ</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="marks"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel htmlFor="marks" className="text-sm font-medium text-zinc-800">
                          Marks
                        </FormLabel>
                        <FormControl>
                          <Input
                            id="marks"
                            type="number"
                            min={0}
                            step="0.5"
                            value={field.value}
                            onChange={(event) => field.onChange(Number(event.target.value || 0))}
                            className="h-12 rounded-xl border-zinc-200 bg-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
                  <p className="text-sm font-semibold text-zinc-900">Marks summary</p>
                  <div className="mt-3 space-y-2 text-sm text-zinc-600">
                    <div className="flex items-center justify-between">
                      <span>Total marks</span>
                      <span className="font-medium text-zinc-900">{safeTotalMarks}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Used marks</span>
                      <span className="font-medium text-zinc-900">{usedMarks}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Remaining after save</span>
                      <span
                        className={`font-semibold ${
                          remainingAfterSave < 0 ? "text-red-600" : "text-emerald-600"
                        }`}
                      >
                        {remainingAfterSave}
                      </span>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-zinc-500">
                    This question is {watchedType.toUpperCase()} and will use {watchedMarks} mark
                    {watchedMarks !== 1 ? "s" : ""}.
                  </p>
                  {remainingAfterSave < 0 ? (
                    <p className="mt-2 text-sm font-medium text-red-600">
                      This question is bigger than the remaining marks.
                    </p>
                  ) : null}
                </div>

                <Separator />

                <div className="space-y-4">
                  <div>
                    <h3 className="text-base font-semibold text-zinc-900">
                      Options{" "}
                      <span className="text-sm font-normal text-zinc-500">
                        (choose one correct answer)
                      </span>
                    </h3>
                  </div>

                  <RadioGroup
                    value={String(watchedOptions.findIndex((option) => option.is_correct))}
                    onValueChange={(value) => handleCorrectAnswerChange(Number(value))}
                    className="space-y-4"
                  >
                    {fields.map((option, index) => (
                      <div
                        key={option.id}
                        className="grid gap-3 rounded-2xl border border-zinc-200 p-4 md:grid-cols-[auto_1fr] md:items-start"
                      >
                        <div className="flex items-center pt-3">
                          <RadioGroupItem
                            value={String(index)}
                            id={`option-correct-${option.id}`}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name={`options.${index}.text`}
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel
                                htmlFor={`option-text-${option.id}`}
                                className="text-sm font-medium text-zinc-800"
                              >
                                Option {index + 1}
                              </FormLabel>
                              <FormControl>
                                <Input
                                  id={`option-text-${option.id}`}
                                  {...field}
                                  placeholder={`Enter option ${index + 1}`}
                                  className="h-12 rounded-xl border-zinc-200 bg-white"
                                />
                              </FormControl>
                              <label
                                htmlFor={`option-correct-${option.id}`}
                                className="cursor-pointer text-sm text-zinc-500"
                              >
                                Mark this option as the correct answer
                              </label>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    ))}
                  </RadioGroup>

                  <FormField
                    control={form.control}
                    name="options"
                    render={() => (
                      <FormItem>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {error && (
                  <p className="mt-2 text-sm font-medium text-red-600">
                    {error.message || "Failed to publish questions."}
                  </p>
                )}
                <Button
                  type="submit"
                  className="h-12 rounded-xl bg-blue-600 px-6 text-base font-semibold shadow-lg shadow-blue-600/20 hover:bg-blue-700"
                >
                  Save Question
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card className="sticky top-24 overflow-hidden rounded-[28px] border-white/80 bg-white/90 shadow-[0_18px_60px_-36px_rgba(15,23,42,0.35)] backdrop-blur">
          <CardContent className="space-y-6 p-6 md:p-7">
            <SectionHeader icon={<Rocket className="h-5 w-5" />} title="Publish" />

            <div className="rounded-2xl bg-zinc-50 p-4">
              <p className="text-sm font-semibold text-zinc-900">Before publishing</p>
              <p className="mt-1 text-sm leading-6 text-zinc-500">
                Add all required questions, verify the correct answers, then publish when the exam
                is ready for students.
              </p>
            </div>
            <Button
              disabled={isPending}
              onClick={() => publish()}
              className="h-12 w-full rounded-xl bg-blue-600 text-base font-semibold hover:bg-blue-700"
            >
              Publish
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
