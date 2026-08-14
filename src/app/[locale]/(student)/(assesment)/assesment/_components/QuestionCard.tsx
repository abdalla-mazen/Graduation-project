// "use client";

// import { useCallback, useEffect, useRef, useState } from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { CircleQuestionMark, TriangleAlert } from "lucide-react";
// import { Controller, useForm } from "react-hook-form";
// import { z } from "zod";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Form, FormControl, FormItem } from "@/components/ui/form";
// import { Label } from "@/components/ui/label";
// import { Progress } from "@/components/ui/progress";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { AssessmentResponse } from "@/lib/types/assessment";
// import HeaderQuestion from "./header-question";
// import Result from "./result";
// import CameraMonitor from "./camera-monitor";
// import useAssessment from "../_hooks/use-assessment";
// import useFinishExam, { type FinishExamResult } from "../_hooks/use-finish-exam";
// import { useProctor } from "../_hooks/use-protector";
// import useStartExam from "../_hooks/use-start-exam";

// type Option = { key: string; answer: string };
// type Question = { _id: string; question: string; answers: Option[] };
// type QuestionResultsMap = Record<string, boolean>;

// interface StoredAssessmentProgress {
//   correctCount: number;
//   questionResults: QuestionResultsMap;
// }

// const TOTAL_SECONDS = 20 * 60;
// const ASSESSMENT_PROGRESS_STORAGE_KEY = "assessment-progress";
// const LEGACY_ASSESSMENT_PROGRESS_STORAGE_KEY = "assessment-progress";

// const answerSchema = z.object({
//   answers: z.record(z.string(), z.string().min(1, "Please choose answer")),
// });

// type AnswerValues = z.infer<typeof answerSchema>;

// interface ExamPageProps {
//   dataQuestions: AssessmentResponse;
// }

// export default function ExamPage({ dataQuestions }: ExamPageProps) {
//   const [questions, setQuestions] = useState<Question[]>([]);
//   const [current, setCurrent] = useState(0);
//   const [answers, setAnswers] = useState<Record<string, string>>({});
//   const [questionResults, setQuestionResults] = useState<QuestionResultsMap>({});
//   const [correctCount, setCorrectCount] = useState(0);
//   const [result, setResult] = useState(false);
//   const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
//   const [isVisionMonitorActive, setIsVisionMonitorActive] = useState(true);
//   const [examId, setExamId] = useState(0);
//   const [finalExamResult, setFinalExamResult] = useState<FinishExamResult | null>(null);
//   const questionResultsRef = useRef<QuestionResultsMap>({});

//   const { submit } = useAssessment();
//   const { finish, isPending: isFinishingExam } = useFinishExam();
//   const { start } = useStartExam();

//   const form = useForm<AnswerValues>({
//     resolver: zodResolver(answerSchema),
//     defaultValues: { answers: {} },
//   });

//   const { errors } = form.formState;

//   useEffect(() => {
//     questionResultsRef.current = questionResults;
//   }, [questionResults]);

//   useEffect(() => {
//     const savedExamId = Number(localStorage.getItem("idExam"));

//     if (!Number.isNaN(savedExamId) && savedExamId > 0) {
//       setExamId(savedExamId);
//     }
//   }, []);

//   const handleProctorLimitReach = useCallback(() => {
//     setIsCancelDialogOpen(true);
//   }, []);

//   const handlePauseVisionMonitor = useCallback(() => {
//     setIsVisionMonitorActive(false);
//   }, []);

//   const { warning, strikes, maxStrikes, reportBackendViolation } = useProctor(
//     examId,
//     handleProctorLimitReach,
//   );

//   const handleVisionStrike = useCallback(
//     (
//       message: string,
//       options?: {
//         invalidated?: boolean;
//         strikes?: number;
//       },
//     ) => {
//       reportBackendViolation("eye_away", message, options);
//     },
//     [reportBackendViolation],
//   );

//   useEffect(() => {
//     if (examId <= 0) {
//       return;
//     }

//     setIsVisionMonitorActive(true);
//   }, [examId]);

//   useEffect(() => {
//     if (!dataQuestions?.questions?.length) {
//       return;
//     }

//     const mapped = dataQuestions.questions.map((question) => ({
//       _id: String(question.id),
//       question: question.text,
//       answers: question.options.map((option) => ({
//         key: String(option.id),
//         answer: option.text,
//       })),
//     }));

//     setQuestions(mapped);
//   }, [dataQuestions]);

//   useEffect(() => {
//     if (examId > 0) {
//       return;
//     }

//     const savedExamId = Number(localStorage.getItem("idExam"));
//     if (!Number.isNaN(savedExamId) && savedExamId > 0) {
//       setExamId(savedExamId);
//       return;
//     }

//     const savedTrackId = Number(localStorage.getItem("trackId"));
//     if (Number.isNaN(savedTrackId) || savedTrackId <= 0) {
//       return;
//     }

//     const initializeExam = async () => {
//       try {
//         const response = await start({ track_id: savedTrackId });
//         const nextExamId = Number(response?.exam?.id);

//         if (Number.isNaN(nextExamId) || nextExamId <= 0) {
//           return;
//         }

//         localStorage.setItem("idExam", String(nextExamId));
//         setExamId(nextExamId);
//       } catch (error) {
//         console.error("Failed to initialize exam:", error);
//       }
//     };

//     void initializeExam();
//   }, [examId, start]);

//   const getAssessmentProgressStorageKey = useCallback(
//     (targetExamId: number) => `${ASSESSMENT_PROGRESS_STORAGE_KEY}:${targetExamId}`,
//     [],
//   );

//   const readStoredProgress = useCallback((targetExamId: number): StoredAssessmentProgress | null => {
//     if (!targetExamId) {
//       return null;
//     }

//     const parseStoredProgress = (raw: string | null, source: "scoped" | "legacy") => {
//       if (!raw) {
//         return null;
//       }

//       try {
//         const parsed = JSON.parse(raw) as
//           | Partial<StoredAssessmentProgress>
//           | (Partial<StoredAssessmentProgress> & { examId?: number });

//         if (
//           source === "legacy" &&
//           "examId" in parsed &&
//           typeof parsed.examId === "number" &&
//           parsed.examId !== targetExamId
//         ) {
//           return null;
//         }

//         const storedResults =
//           parsed.questionResults && typeof parsed.questionResults === "object"
//             ? parsed.questionResults
//             : {};

//         return {
//           correctCount: Object.values(storedResults).filter(Boolean).length,
//           questionResults: storedResults,
//         };
//       } catch (error) {
//         console.error(`Failed to read ${source} assessment progress:`, error);
//         return null;
//       }
//     };

//     const scopedProgress = parseStoredProgress(
//       localStorage.getItem(getAssessmentProgressStorageKey(targetExamId)),
//       "scoped",
//     );

//     if (scopedProgress) {
//       return scopedProgress;
//     }

//     return parseStoredProgress(
//       localStorage.getItem(LEGACY_ASSESSMENT_PROGRESS_STORAGE_KEY),
//       "legacy",
//     );
//   }, [getAssessmentProgressStorageKey]);

//   const syncProgressState = useCallback((nextProgress: StoredAssessmentProgress | null) => {
//     const nextResults = nextProgress?.questionResults ?? {};
//     const nextCorrectCount = nextProgress?.correctCount ?? 0;

//     questionResultsRef.current = nextResults;
//     setQuestionResults(nextResults);
//     setCorrectCount(nextCorrectCount);
//   }, []);

//   const restoreStoredProgress = useCallback((targetExamId: number) => {
//     syncProgressState(readStoredProgress(targetExamId));
//   }, [readStoredProgress, syncProgressState]);

//   const persistStoredProgress = useCallback(
//     (targetExamId: number, nextQuestionResults: QuestionResultsMap) => {
//       if (!targetExamId) {
//         return null;
//       }

//       const nextCorrectCount = Object.values(nextQuestionResults).filter(Boolean).length;

//       const nextProgress: StoredAssessmentProgress = {
//         correctCount: nextCorrectCount,
//         questionResults: nextQuestionResults,
//       };

//       localStorage.setItem(
//         getAssessmentProgressStorageKey(targetExamId),
//         JSON.stringify(nextProgress),
//       );

//       return nextProgress;
//     },
//     [getAssessmentProgressStorageKey],
//   );

//   const clearStoredProgress = useCallback(
//     (targetExamId?: number) => {
//       if (targetExamId) {
//         localStorage.removeItem(getAssessmentProgressStorageKey(targetExamId));
//       }

//       localStorage.removeItem(LEGACY_ASSESSMENT_PROGRESS_STORAGE_KEY);
//     },
//     [getAssessmentProgressStorageKey],
//   );

//   useEffect(() => {
//     restoreStoredProgress(examId);
//   }, [examId, restoreStoredProgress]);

//   const extractIsCorrect = useCallback((response: unknown): boolean | null => {
//     const readBoolean = (value: unknown): boolean | null => {
//       if (typeof value === "boolean") {
//         return value;
//       }

//       if (typeof value === "number" && (value === 0 || value === 1)) {
//         return Boolean(value);
//       }

//       if (typeof value === "string") {
//         const normalized = value.trim().toLowerCase();

//         if (normalized === "true" || normalized === "correct") {
//           return true;
//         }

//         if (normalized === "false" || normalized === "wrong" || normalized === "incorrect") {
//           return false;
//         }
//       }

//       return null;
//     };

//     const visit = (value: unknown, depth = 0): boolean | null => {
//       if (depth > 4 || !value || typeof value !== "object") {
//         return readBoolean(value);
//       }

//       const record = value as Record<string, unknown>;

//       for (const key of ["is_correct", "isCorrect", "correct", "is_right", "isRight"]) {
//         const direct = readBoolean(record[key]);

//         if (direct !== null) {
//           return direct;
//         }
//       }

//       for (const nestedKey of ["answer", "data", "result", "payload"]) {
//         if (nestedKey in record) {
//           const nested = visit(record[nestedKey], depth + 1);

//           if (nested !== null) {
//             return nested;
//           }
//         }
//       }

//       for (const nestedValue of Object.values(record)) {
//         const nested = visit(nestedValue, depth + 1);

//         if (nested !== null) {
//           return nested;
//         }
//       }

//       return null;
//     };

//     return visit(response);
//   }, []);

//   const submitQuestionAnswer = useCallback(
//     async (question: Question, selectedAnswer: string) => {
//       const resolvedExamId = examId || Number(localStorage.getItem("idExam"));

//       const safeExamId =
//         resolvedExamId && !Number.isNaN(resolvedExamId) && resolvedExamId > 0 ? resolvedExamId : 0;

//       if (!safeExamId) {
//         return null;
//       }

//       if (!examId) {
//         setExamId(safeExamId);
//       }

//       const response = await submit({
//         exam_id: safeExamId,
//         question_id: Number(question._id),
//         option_id: Number(selectedAnswer),
//       });

//       const isCorrect = extractIsCorrect(response);

//       if (typeof isCorrect === "boolean") {
//         const nextResults = {
//           ...questionResultsRef.current,
//           [question._id]: isCorrect,
//         };
//         const nextProgress = persistStoredProgress(safeExamId, nextResults);

//         syncProgressState(nextProgress);
//       } else {
//         console.warn("Unable to determine correctness from answer response:", response);
//       }

//       return response;
//     },
//     [examId, extractIsCorrect, persistStoredProgress, submit, syncProgressState],
//   );

//   const handleNext = async (values: AnswerValues) => {
//     const currentQuestion = questions[current];
//     const currentAnswer = values.answers[currentQuestion._id];

//     setAnswers((prev) => ({ ...prev, [currentQuestion._id]: currentAnswer }));

//     try {
//       await submitQuestionAnswer(currentQuestion, currentAnswer);
//     } catch (error) {
//       console.error(error);
//     }

//     setCurrent((prev) => prev + 1);

//     const nextQuestion = questions[current + 1];
//     if (nextQuestion) {
//       form.reset({
//         answers: { [nextQuestion._id]: answers[nextQuestion._id] || "" },
//       });
//     }
//   };

//   const handlePrevious = () => {
//     const currentQuestion = questions[current];
//     const currentValues = form.getValues();

//     if (currentValues.answers[currentQuestion._id]) {
//       setAnswers((prev) => ({
//         ...prev,
//         [currentQuestion._id]: currentValues.answers[currentQuestion._id],
//       }));
//     }

//     setCurrent((prev) => prev - 1);

//     const previousQuestion = questions[current - 1];
//     if (previousQuestion) {
//       form.reset({
//         answers: { [previousQuestion._id]: answers[previousQuestion._id] || "" },
//       });
//     }
//   };

//   useEffect(() => {
//     if (!questions.length || !questions[current]) {
//       return;
//     }

//     const currentQuestion = questions[current];
//     form.reset({
//       answers: { [currentQuestion._id]: answers[currentQuestion._id] || "" },
//     });
//   }, [answers, current, form, questions]);

//   const finalizeExam = useCallback(
//     async (values?: AnswerValues, shouldSubmitCurrentAnswer = false) => {
//       const resolvedExamId = examId || Number(localStorage.getItem("idExam"));
//       const safeExamId =
//         resolvedExamId && !Number.isNaN(resolvedExamId) && resolvedExamId > 0 ? resolvedExamId : 0;

//       try {
//         if (shouldSubmitCurrentAnswer && questions[current]) {
//           const activeQuestion = questions[current];
//           const selectedAnswer =
//             values?.answers[activeQuestion._id] || answers[activeQuestion._id];

//           if (selectedAnswer) {
//             setAnswers((prev) => ({
//               ...prev,
//               [activeQuestion._id]: selectedAnswer,
//             }));

//             await submitQuestionAnswer(activeQuestion, selectedAnswer);
//           }
//         }

//         if (safeExamId > 0) {
//           const finishedExam = await finish(safeExamId);
//           setFinalExamResult(finishedExam);
//         }

//         syncProgressState(readStoredProgress(safeExamId));
//       } catch (error) {
//         console.error("Failed to finalize exam:", error);
//       } finally {
//         localStorage.removeItem("idExam");
//         setResult(true);
//       }
//     },
//     [answers, current, examId, finish, questions, readStoredProgress, submitQuestionAnswer, syncProgressState],
//   );

//   const handleSubmitAll = useCallback(
//     async (values: AnswerValues) => {
//       await finalizeExam(values, true);
//     },
//     [finalizeExam],
//   );

//   const handleCancelledExam = useCallback(async () => {
//     setIsCancelDialogOpen(false);
//     await finalizeExam(undefined, false);
//   }, [finalizeExam]);

//   if (!questions.length) {
//     return (
//       <div className="flex min-h-[50vh] items-center justify-center bg-slate-100 px-4">
//         <p className="animate-pulse text-center text-lg font-semibold text-blue-600 sm:text-xl">
//           Loading Exam Questions...
//         </p>
//       </div>
//     );
//   }

//   const currentQuestion = questions[current];
//   const trackName = dataQuestions.track || "Assessment";
//   const progressValue = ((current + 1) / questions.length) * 100;
//   const displayedStrikes = Math.min(strikes, maxStrikes);
//   const strikesLeft = Math.max(maxStrikes - displayedStrikes, 0);
//   const strikeProgress = (displayedStrikes / maxStrikes) * 100;

//   const strikeUi =
//     displayedStrikes >= 2
//       ? {
//           label: "Critical",
//           cardClass:
//             "border-red-200 bg-gradient-to-br from-white via-red-50 to-orange-50 shadow-red-100",
//           badgeClass: "border border-red-200 bg-red-100 text-red-700",
//           iconWrapClass: "bg-red-100 text-red-600",
//           progressClass: "bg-red-100 [&>div]:bg-red-500",
//           countClass: "text-red-600",
//           statusClass: "text-red-600",
//         }
//       : displayedStrikes === 1
//         ? {
//             label: "Warning",
//             cardClass:
//               "border-amber-200 bg-gradient-to-br from-white via-amber-50 to-yellow-50 shadow-amber-100",
//             badgeClass: "border border-amber-200 bg-amber-100 text-amber-700",
//             iconWrapClass: "bg-amber-100 text-amber-600",
//             progressClass: "bg-amber-100 [&>div]:bg-amber-500",
//             countClass: "text-amber-600",
//             statusClass: "text-amber-600",
//           }
//         : {
//             label: "Safe",
//             cardClass:
//               "border-slate-200 bg-gradient-to-br from-white via-slate-50 to-blue-50 shadow-slate-100",
//             badgeClass: "border border-blue-200 bg-blue-100 text-blue-700",
//             iconWrapClass: "bg-blue-100 text-blue-600",
//             progressClass: "bg-blue-100 [&>div]:bg-blue-500",
//             countClass: "text-slate-900",
//             statusClass: "text-blue-600",
//           };

//   return (
//     <div className="flex min-h-screen flex-col bg-slate-100">
//       {examId > 0 && !result && !isCancelDialogOpen && isVisionMonitorActive && (
//         <CameraMonitor
//           examId={examId}
//           currentStrikes={strikes}
//           maxStrikes={maxStrikes}
//           onPauseVisionMonitor={handlePauseVisionMonitor}
//           onVisionStrike={handleVisionStrike}
//         />
//       )}

//       <Dialog open={isCancelDialogOpen}>
//         <DialogContent
//           className="max-w-md overflow-hidden border-0 p-0 shadow-2xl [&>button]:hidden"
//           onEscapeKeyDown={(event) => event.preventDefault()}
//           onInteractOutside={(event) => event.preventDefault()}
//         >
//           <div className="bg-gradient-to-br from-red-600 via-red-500 to-orange-500 p-6 text-white">
//             <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
//               <TriangleAlert className="h-7 w-7" />
//             </div>
//             <DialogHeader className="space-y-2 text-left">
//               <DialogTitle className="text-2xl font-bold text-white">Exam Cancelled</DialogTitle>
//               <DialogDescription className="text-sm leading-6 text-red-50">
//                 Your exam was ended automatically because the allowed violation limit was reached.
//               </DialogDescription>
//             </DialogHeader>
//           </div>

//           <div className="space-y-4 bg-white px-6 py-5">
//             <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
//               Please review the result page for your final exam status.
//             </div>

//             <DialogFooter className="sm:justify-start">
//               <Button
//                 type="button"
//                 onClick={handleCancelledExam}
//                 className="w-full rounded-xl bg-red-600 py-3 text-white hover:bg-red-700"
//               >
//                 View Result
//               </Button>
//             </DialogFooter>
//           </div>
//         </DialogContent>
//       </Dialog>

//       {!result ? (
//         <>
//           {warning && (
//             <div className="fixed inset-x-4 bottom-4 z-50 sm:inset-x-auto sm:right-6 sm:w-80">
//               <Alert variant="destructive">
//                 <AlertDescription>{warning}</AlertDescription>
//               </Alert>
//             </div>
//           )}

//           <HeaderQuestion totalSeconds={TOTAL_SECONDS} />

//           <section className="border-b border-slate-200 bg-white/80">
//             <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
//               <div className="flex flex-col gap-4 rounded-[28px] bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 p-4 text-white shadow-lg sm:flex-row sm:items-center sm:justify-between sm:p-5">
//                 <div className="flex items-start gap-3 sm:items-center">
//                   <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/15 sm:h-14 sm:w-14">
//                     <CircleQuestionMark className="h-6 w-6 sm:h-7 sm:w-7" />
//                   </div>

//                   <div>
//                     <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-100">
//                       Exam In Progress
//                     </p>
//                     <h2 className="mt-1 text-xl font-semibold sm:text-2xl">
//                       {trackName} Questions
//                     </h2>
//                     <p className="mt-1 text-sm text-blue-50 sm:text-base">
//                       Move through the questions calmly and review each answer before continuing.
//                     </p>
//                   </div>
//                 </div>

//                 <div className="self-start rounded-2xl bg-white/15 px-4 py-2 text-sm font-semibold text-white/95">
//                   {current + 1} / {questions.length} answered
//                 </div>
//               </div>
//             </div>
//           </section>

//           <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-5 sm:px-6 lg:px-8">
//             <div className="flex flex-col gap-6 xl:grid xl:grid-cols-[minmax(0,1fr)_320px] xl:items-start">
//               <section className="order-2 rounded-[28px] bg-white p-4 shadow-sm ring-1 ring-slate-200/80 sm:p-6 xl:order-1">
//                 <div className="space-y-6">
//                   <div className="space-y-3">
//                     <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//                       <div>
//                         <p className="text-sm font-semibold text-slate-500">Exam progress</p>
//                         <h3 className="text-lg font-semibold text-slate-900 sm:text-xl">
//                           Question {current + 1} of {questions.length}
//                         </h3>
//                       </div>

//                       <span className="self-start rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
//                         {Math.round(progressValue)}% complete
//                       </span>
//                     </div>

//                     <Progress
//                       value={progressValue}
//                       className="h-2.5 bg-slate-100 [&>div]:bg-blue-600"
//                     />
//                   </div>

//                   <Form {...form}>
//                     <form
//                       onSubmit={form.handleSubmit(
//                         current < questions.length - 1 ? handleNext : handleSubmitAll,
//                       )}
//                       className="flex h-full flex-col gap-6"
//                     >
//                       <section className="space-y-5">
//                         <div className="space-y-3">
//                           <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
//                             Question {current + 1}
//                           </span>
//                           <h2 className="text-xl font-semibold leading-relaxed text-slate-900 sm:text-2xl">
//                             {currentQuestion.question}
//                           </h2>
//                         </div>

//                         <Controller
//                           name={`answers.${currentQuestion._id}`}
//                           control={form.control}
//                           render={({ field }) => (
//                             <FormItem>
//                               <FormControl>
//                                 <RadioGroup
//                                   value={field.value}
//                                   onValueChange={field.onChange}
//                                   className="space-y-3"
//                                 >
//                                   {currentQuestion.answers.map((answer) => {
//                                     const isSelected = field.value === answer.key;

//                                     return (
//                                       <Label key={answer.key} className="block cursor-pointer">
//                                         <div
//                                           className={`flex items-start gap-3 rounded-2xl border p-4 transition-all sm:p-5 ${
//                                             isSelected
//                                               ? "border-blue-500 bg-blue-50 shadow-sm"
//                                               : "border-slate-200 bg-slate-50 hover:border-blue-200 hover:bg-white"
//                                           }`}
//                                         >
//                                           <RadioGroupItem value={answer.key} className="mt-1" />
//                                           <span className="text-sm font-medium leading-6 text-slate-700 sm:text-base">
//                                             {answer.answer}
//                                           </span>
//                                         </div>
//                                       </Label>
//                                     );
//                                   })}
//                                 </RadioGroup>
//                               </FormControl>

//                               {errors.answers?.[currentQuestion._id] && (
//                                 <Alert variant="destructive" className="mt-4">
//                                   <AlertDescription>Please choose answer</AlertDescription>
//                                 </Alert>
//                               )}
//                             </FormItem>
//                           )}
//                         />
//                       </section>

//                       <div className="flex flex-col gap-3 sm:flex-row">
//                         <Button
//                           type="button"
//                           disabled={current === 0}
//                           onClick={handlePrevious}
//                           variant="outline"
//                           className="h-12 w-full rounded-2xl border-slate-200"
//                         >
//                           Previous
//                         </Button>

//                         {current < questions.length - 1 ? (
//                           <Button type="submit" className="h-12 w-full rounded-2xl bg-blue-500 text-white">
//                             Next
//                           </Button>
//                         ) : (
//                           <Button
//                             type="submit"
//                             disabled={isFinishingExam}
//                             className="h-12 w-full rounded-2xl bg-blue-500 text-white"
//                           >
//                             {isFinishingExam ? "Submitting..." : "Submit Exam"}
//                           </Button>
//                         )}
//                       </div>
//                     </form>
//                   </Form>
//                 </div>
//               </section>

//               <aside className="order-1 xl:order-2 xl:sticky xl:top-24">
//                 <div
//                   className={`rounded-[28px] border p-5 shadow-lg backdrop-blur-sm ${strikeUi.cardClass}`}
//                 >
//                   <div className="mb-4 flex items-start justify-between gap-3">
//                     <div className="flex items-center gap-3">
//                       <div
//                         className={`flex h-12 w-12 items-center justify-center rounded-2xl ${strikeUi.iconWrapClass}`}
//                       >
//                         <TriangleAlert className="h-6 w-6" />
//                       </div>

//                       <div>
//                         <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
//                           Exam Monitoring
//                         </p>
//                         <h3 className="text-lg font-semibold text-slate-900">Strike Status</h3>
//                       </div>
//                     </div>

//                     <span
//                       className={`rounded-full px-3 py-1 text-xs font-semibold ${strikeUi.badgeClass}`}
//                     >
//                       {strikeUi.label}
//                     </span>
//                   </div>

//                   <div className="space-y-4">
//                     <div className="rounded-2xl border border-white/70 bg-white/80 p-4">
//                       <p className="text-sm text-slate-500">You have</p>
//                       <div className="mt-1 flex items-end gap-2">
//                         <span className={`text-3xl font-bold ${strikeUi.countClass}`}>
//                           {strikesLeft}
//                         </span>
//                         <span className="pb-1 text-sm font-medium text-slate-500">
//                           strikes left
//                         </span>
//                       </div>
//                     </div>

//                     <div className="space-y-2">
//                       <div className="flex items-center justify-between text-sm">
//                         <span className="font-medium text-slate-600">Current strikes</span>
//                         <span className={`font-bold ${strikeUi.countClass}`}>
//                           {displayedStrikes}/{maxStrikes}
//                         </span>
//                       </div>
//                       <Progress value={strikeProgress} className={strikeUi.progressClass} />
//                     </div>

//                     <div className="flex items-center justify-between rounded-2xl bg-white/70 px-4 py-3">
//                       <span className="text-sm font-medium text-slate-600">Proctoring status</span>
//                       <span className={`text-sm font-semibold ${strikeUi.statusClass}`}>
//                         {strikeUi.label}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </aside>
//             </div>
//           </main>
//         </>
//       ) : (
//         <Result
//           correct={correctCount}
//           length={questions.length}
//           score={finalExamResult?.score}
//           maxScore={finalExamResult?.max_score}
//           totalQuestions={finalExamResult?.total_questions}
//           correctAnswers={finalExamResult?.correct_answers}
//           wrongAnswers={finalExamResult?.wrong_answers}
//           invalidated={finalExamResult?.invalidated}
//           finishedAt={finalExamResult?.finished_at ?? null}
//         />
//       )}
//     </div>
//   );
// }






// "use client";

// import { useCallback, useEffect, useRef, useState } from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { CircleQuestionMark, TriangleAlert } from "lucide-react";
// import { Controller, useForm } from "react-hook-form";
// import { z } from "zod";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Form, FormControl, FormItem } from "@/components/ui/form";
// import { Label } from "@/components/ui/label";
// import { Progress } from "@/components/ui/progress";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { AssessmentResponse } from "@/lib/types/assessment";
// import HeaderQuestion from "./header-question";
// import Result from "./result";
// import CameraMonitor from "./camera-monitor";
// import useAssessment from "../_hooks/use-assessment";
// import useFinishExam, { type FinishExamResult } from "../_hooks/use-finish-exam";
// import { useProctor } from "../_hooks/use-protector";
// import useStartExam from "../_hooks/use-start-exam";

// type Option = { key: string; answer: string };
// type Question = { _id: string; question: string; answers: Option[] };
// type QuestionResultsMap = Record<string, boolean>;

// interface StoredAssessmentProgress {
//   correctCount: number;
//   questionResults: QuestionResultsMap;
// }

// const TOTAL_SECONDS = 20 * 60;
// const ASSESSMENT_PROGRESS_STORAGE_KEY = "assessment-progress";
// const LEGACY_ASSESSMENT_PROGRESS_STORAGE_KEY = "assessment-progress";

// const answerSchema = z.object({
//   answers: z.record(z.string(), z.string().min(1, "Please choose answer")),
// });

// type AnswerValues = z.infer<typeof answerSchema>;

// interface ExamPageProps {
//   dataQuestions: AssessmentResponse;
// }

// export default function ExamPage({ dataQuestions }: ExamPageProps) {
//   const [questions, setQuestions] = useState<Question[]>([]);
//   const [current, setCurrent] = useState(0);
//   const [answers, setAnswers] = useState<Record<string, string>>({});
//   const [questionResults, setQuestionResults] = useState<QuestionResultsMap>({});
//   const [correctCount, setCorrectCount] = useState(0);
//   const [result, setResult] = useState(false);
//   const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
//   const [isVisionMonitorActive, setIsVisionMonitorActive] = useState(true);
//   const [examId, setExamId] = useState(0);
//   const [finalExamResult, setFinalExamResult] = useState<FinishExamResult | null>(null);
//   const questionResultsRef = useRef<QuestionResultsMap>({});

//   const { submit } = useAssessment();
//   const { finish, isPending: isFinishingExam } = useFinishExam();
//   const { start } = useStartExam();

//   const form = useForm<AnswerValues>({
//     resolver: zodResolver(answerSchema),
//     defaultValues: { answers: {} },
//   });

//   const { errors } = form.formState;

//   useEffect(() => {
//     questionResultsRef.current = questionResults;
//   }, [questionResults]);

//   useEffect(() => {
//     const savedExamId = Number(localStorage.getItem("idExam"));

//     if (!Number.isNaN(savedExamId) && savedExamId > 0) {
//       setExamId(savedExamId);
//     }
//   }, []);

//   const handleProctorLimitReach = useCallback(() => {
//     setIsCancelDialogOpen(true);
//   }, []);

//   const handlePauseVisionMonitor = useCallback(() => {
//     setIsVisionMonitorActive(false);
//   }, []);

//   const { warning, strikes, maxStrikes, reportBackendViolation } = useProctor(
//     examId,
//     handleProctorLimitReach,
//   );

//   const handleVisionStrike = useCallback(
//     (
//       message: string,
//       options?: {
//         invalidated?: boolean;
//         strikes?: number;
//       },
//     ) => {
//       if (options?.invalidated) {
//         setIsCancelDialogOpen(true);
//         return;
//       }

//       reportBackendViolation("eye_away", message, options);
//     },
//     [reportBackendViolation],
//   );

//   useEffect(() => {
//     if (examId <= 0) {
//       return;
//     }

//     setIsVisionMonitorActive(true);
//   }, [examId]);

//   useEffect(() => {
//     if (!dataQuestions?.questions?.length) {
//       return;
//     }

//     const mapped = dataQuestions.questions.map((question) => ({
//       _id: String(question.id),
//       question: question.text,
//       answers: question.options.map((option) => ({
//         key: String(option.id),
//         answer: option.text,
//       })),
//     }));

//     setQuestions(mapped);
//   }, [dataQuestions]);

//   useEffect(() => {
//     if (examId > 0) {
//       return;
//     }

//     const savedExamId = Number(localStorage.getItem("idExam"));
//     if (!Number.isNaN(savedExamId) && savedExamId > 0) {
//       setExamId(savedExamId);
//       return;
//     }

//     const savedTrackId = Number(localStorage.getItem("trackId"));
//     if (Number.isNaN(savedTrackId) || savedTrackId <= 0) {
//       return;
//     }

//     const initializeExam = async () => {
//       try {
//         const response = await start({ track_id: savedTrackId });
//         const nextExamId = Number(response?.exam?.id);

//         if (Number.isNaN(nextExamId) || nextExamId <= 0) {
//           return;
//         }

//         localStorage.setItem("idExam", String(nextExamId));
//         setExamId(nextExamId);
//       } catch (error) {
//         console.error("Failed to initialize exam:", error);
//       }
//     };

//     void initializeExam();
//   }, [examId, start]);

//   const getAssessmentProgressStorageKey = useCallback(
//     (targetExamId: number) => `${ASSESSMENT_PROGRESS_STORAGE_KEY}:${targetExamId}`,
//     [],
//   );

//   const readStoredProgress = useCallback((targetExamId: number): StoredAssessmentProgress | null => {
//     if (!targetExamId) {
//       return null;
//     }

//     const parseStoredProgress = (raw: string | null, source: "scoped" | "legacy") => {
//       if (!raw) {
//         return null;
//       }

//       try {
//         const parsed = JSON.parse(raw) as
//           | Partial<StoredAssessmentProgress>
//           | (Partial<StoredAssessmentProgress> & { examId?: number });

//         if (
//           source === "legacy" &&
//           "examId" in parsed &&
//           typeof parsed.examId === "number" &&
//           parsed.examId !== targetExamId
//         ) {
//           return null;
//         }

//         const storedResults =
//           parsed.questionResults && typeof parsed.questionResults === "object"
//             ? parsed.questionResults
//             : {};

//         return {
//           correctCount: Object.values(storedResults).filter(Boolean).length,
//           questionResults: storedResults,
//         };
//       } catch (error) {
//         console.error(`Failed to read ${source} assessment progress:`, error);
//         return null;
//       }
//     };

//     const scopedProgress = parseStoredProgress(
//       localStorage.getItem(getAssessmentProgressStorageKey(targetExamId)),
//       "scoped",
//     );

//     if (scopedProgress) {
//       return scopedProgress;
//     }

//     return parseStoredProgress(
//       localStorage.getItem(LEGACY_ASSESSMENT_PROGRESS_STORAGE_KEY),
//       "legacy",
//     );
//   }, [getAssessmentProgressStorageKey]);

//   const syncProgressState = useCallback((nextProgress: StoredAssessmentProgress | null) => {
//     const nextResults = nextProgress?.questionResults ?? {};
//     const nextCorrectCount = nextProgress?.correctCount ?? 0;

//     questionResultsRef.current = nextResults;
//     setQuestionResults(nextResults);
//     setCorrectCount(nextCorrectCount);
//   }, []);

//   const restoreStoredProgress = useCallback((targetExamId: number) => {
//     syncProgressState(readStoredProgress(targetExamId));
//   }, [readStoredProgress, syncProgressState]);

//   const persistStoredProgress = useCallback(
//     (targetExamId: number, nextQuestionResults: QuestionResultsMap) => {
//       if (!targetExamId) {
//         return null;
//       }

//       const nextCorrectCount = Object.values(nextQuestionResults).filter(Boolean).length;

//       const nextProgress: StoredAssessmentProgress = {
//         correctCount: nextCorrectCount,
//         questionResults: nextQuestionResults,
//       };

//       localStorage.setItem(
//         getAssessmentProgressStorageKey(targetExamId),
//         JSON.stringify(nextProgress),
//       );

//       return nextProgress;
//     },
//     [getAssessmentProgressStorageKey],
//   );

//   const clearStoredProgress = useCallback(
//     (targetExamId?: number) => {
//       if (targetExamId) {
//         localStorage.removeItem(getAssessmentProgressStorageKey(targetExamId));
//       }

//       localStorage.removeItem(LEGACY_ASSESSMENT_PROGRESS_STORAGE_KEY);
//     },
//     [getAssessmentProgressStorageKey],
//   );

//   useEffect(() => {
//     restoreStoredProgress(examId);
//   }, [examId, restoreStoredProgress]);

//   const extractIsCorrect = useCallback((response: unknown): boolean | null => {
//     const readBoolean = (value: unknown): boolean | null => {
//       if (typeof value === "boolean") {
//         return value;
//       }

//       if (typeof value === "number" && (value === 0 || value === 1)) {
//         return Boolean(value);
//       }

//       if (typeof value === "string") {
//         const normalized = value.trim().toLowerCase();

//         if (normalized === "true" || normalized === "correct") {
//           return true;
//         }

//         if (normalized === "false" || normalized === "wrong" || normalized === "incorrect") {
//           return false;
//         }
//       }

//       return null;
//     };

//     const visit = (value: unknown, depth = 0): boolean | null => {
//       if (depth > 4 || !value || typeof value !== "object") {
//         return readBoolean(value);
//       }

//       const record = value as Record<string, unknown>;

//       for (const key of ["is_correct", "isCorrect", "correct", "is_right", "isRight"]) {
//         const direct = readBoolean(record[key]);

//         if (direct !== null) {
//           return direct;
//         }
//       }

//       for (const nestedKey of ["answer", "data", "result", "payload"]) {
//         if (nestedKey in record) {
//           const nested = visit(record[nestedKey], depth + 1);

//           if (nested !== null) {
//             return nested;
//           }
//         }
//       }

//       for (const nestedValue of Object.values(record)) {
//         const nested = visit(nestedValue, depth + 1);

//         if (nested !== null) {
//           return nested;
//         }
//       }

//       return null;
//     };

//     return visit(response);
//   }, []);

//   const submitQuestionAnswer = useCallback(
//     async (question: Question, selectedAnswer: string) => {
//       const resolvedExamId = examId || Number(localStorage.getItem("idExam"));

//       const safeExamId =
//         resolvedExamId && !Number.isNaN(resolvedExamId) && resolvedExamId > 0 ? resolvedExamId : 0;

//       if (!safeExamId) {
//         return null;
//       }

//       if (!examId) {
//         setExamId(safeExamId);
//       }

//       const response = await submit({
//         exam_id: safeExamId,
//         question_id: Number(question._id),
//         option_id: Number(selectedAnswer),
//       });

//       const isCorrect = extractIsCorrect(response);

//       if (typeof isCorrect === "boolean") {
//         const nextResults = {
//           ...questionResultsRef.current,
//           [question._id]: isCorrect,
//         };
//         const nextProgress = persistStoredProgress(safeExamId, nextResults);

//         syncProgressState(nextProgress);
//       } else {
//         console.warn("Unable to determine correctness from answer response:", response);
//       }

//       return response;
//     },
//     [examId, extractIsCorrect, persistStoredProgress, submit, syncProgressState],
//   );

//   const handleNext = async (values: AnswerValues) => {
//     const currentQuestion = questions[current];
//     const currentAnswer = values.answers[currentQuestion._id];

//     setAnswers((prev) => ({ ...prev, [currentQuestion._id]: currentAnswer }));

//     try {
//       await submitQuestionAnswer(currentQuestion, currentAnswer);
//     } catch (error) {
//       console.error(error);
//     }

//     setCurrent((prev) => prev + 1);

//     const nextQuestion = questions[current + 1];
//     if (nextQuestion) {
//       form.reset({
//         answers: { [nextQuestion._id]: answers[nextQuestion._id] || "" },
//       });
//     }
//   };

//   const handlePrevious = () => {
//     const currentQuestion = questions[current];
//     const currentValues = form.getValues();

//     if (currentValues.answers[currentQuestion._id]) {
//       setAnswers((prev) => ({
//         ...prev,
//         [currentQuestion._id]: currentValues.answers[currentQuestion._id],
//       }));
//     }

//     setCurrent((prev) => prev - 1);

//     const previousQuestion = questions[current - 1];
//     if (previousQuestion) {
//       form.reset({
//         answers: { [previousQuestion._id]: answers[previousQuestion._id] || "" },
//       });
//     }
//   };

//   useEffect(() => {
//     if (!questions.length || !questions[current]) {
//       return;
//     }

//     const currentQuestion = questions[current];
//     form.reset({
//       answers: { [currentQuestion._id]: answers[currentQuestion._id] || "" },
//     });
//   }, [answers, current, form, questions]);

//   const finalizeExam = useCallback(
//     async (values?: AnswerValues, shouldSubmitCurrentAnswer = false) => {
//       const resolvedExamId = examId || Number(localStorage.getItem("idExam"));
//       const safeExamId =
//         resolvedExamId && !Number.isNaN(resolvedExamId) && resolvedExamId > 0 ? resolvedExamId : 0;

//       try {
//         if (shouldSubmitCurrentAnswer && questions[current]) {
//           const activeQuestion = questions[current];
//           const selectedAnswer =
//             values?.answers[activeQuestion._id] || answers[activeQuestion._id];

//           if (selectedAnswer) {
//             setAnswers((prev) => ({
//               ...prev,
//               [activeQuestion._id]: selectedAnswer,
//             }));

//             await submitQuestionAnswer(activeQuestion, selectedAnswer);
//           }
//         }

//         if (safeExamId > 0) {
//           const finishedExam = await finish(safeExamId);
//           setFinalExamResult(finishedExam);
//         }

//         syncProgressState(readStoredProgress(safeExamId));
//       } catch (error) {
//         console.error("Failed to finalize exam:", error);
//       } finally {
//         localStorage.removeItem("idExam");
//         setResult(true);
//       }
//     },
//     [answers, current, examId, finish, questions, readStoredProgress, submitQuestionAnswer, syncProgressState],
//   );

//   const handleSubmitAll = useCallback(
//     async (values: AnswerValues) => {
//       await finalizeExam(values, true);
//     },
//     [finalizeExam],
//   );

//   const handleCancelledExam = useCallback(async () => {
//     setIsCancelDialogOpen(false);
//     await finalizeExam(undefined, false);
//   }, [finalizeExam]);

//   if (!questions.length) {
//     return (
//       <div className="flex min-h-[50vh] items-center justify-center bg-slate-100 px-4">
//         <p className="animate-pulse text-center text-lg font-semibold text-blue-600 sm:text-xl">
//           Loading Exam Questions...
//         </p>
//       </div>
//     );
//   }

//   const currentQuestion = questions[current];
//   const trackName = dataQuestions.track || "Assessment";
//   const progressValue = ((current + 1) / questions.length) * 100;
//   const displayedStrikes = Math.min(strikes, maxStrikes);
//   const strikesLeft = Math.max(maxStrikes - displayedStrikes, 0);
//   const strikeProgress = (displayedStrikes / maxStrikes) * 100;

//   const strikeUi =
//     displayedStrikes >= 2
//       ? {
//           label: "Critical",
//           cardClass:
//             "border-red-200 bg-gradient-to-br from-white via-red-50 to-orange-50 shadow-red-100",
//           badgeClass: "border border-red-200 bg-red-100 text-red-700",
//           iconWrapClass: "bg-red-100 text-red-600",
//           progressClass: "bg-red-100 [&>div]:bg-red-500",
//           countClass: "text-red-600",
//           statusClass: "text-red-600",
//         }
//       : displayedStrikes === 1
//         ? {
//             label: "Warning",
//             cardClass:
//               "border-amber-200 bg-gradient-to-br from-white via-amber-50 to-yellow-50 shadow-amber-100",
//             badgeClass: "border border-amber-200 bg-amber-100 text-amber-700",
//             iconWrapClass: "bg-amber-100 text-amber-600",
//             progressClass: "bg-amber-100 [&>div]:bg-amber-500",
//             countClass: "text-amber-600",
//             statusClass: "text-amber-600",
//           }
//         : {
//             label: "Safe",
//             cardClass:
//               "border-slate-200 bg-gradient-to-br from-white via-slate-50 to-blue-50 shadow-slate-100",
//             badgeClass: "border border-blue-200 bg-blue-100 text-blue-700",
//             iconWrapClass: "bg-blue-100 text-blue-600",
//             progressClass: "bg-blue-100 [&>div]:bg-blue-500",
//             countClass: "text-slate-900",
//             statusClass: "text-blue-600",
//           };

//   return (
//     <div className="flex min-h-screen flex-col bg-slate-100">
//       {examId > 0 && !result && !isCancelDialogOpen && isVisionMonitorActive && (
//         <CameraMonitor
//           examId={examId}
//           currentStrikes={strikes}
//           maxStrikes={maxStrikes}
//           onPauseVisionMonitor={handlePauseVisionMonitor}
//           onVisionStrike={handleVisionStrike}
//         />
//       )}

//       <Dialog open={isCancelDialogOpen}>
//         <DialogContent
//           className="max-w-md overflow-hidden border-0 p-0 shadow-2xl [&>button]:hidden"
//           onEscapeKeyDown={(event) => event.preventDefault()}
//           onInteractOutside={(event) => event.preventDefault()}
//         >
//           <div className="bg-gradient-to-br from-red-600 via-red-500 to-orange-500 p-6 text-white">
//             <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
//               <TriangleAlert className="h-7 w-7" />
//             </div>
//             <DialogHeader className="space-y-2 text-left">
//               <DialogTitle className="text-2xl font-bold text-white">Exam Cancelled</DialogTitle>
//               <DialogDescription className="text-sm leading-6 text-red-50">
//                 Your exam was ended automatically because the allowed violation limit was reached.
//               </DialogDescription>
//             </DialogHeader>
//           </div>

//           <div className="space-y-4 bg-white px-6 py-5">
//             <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
//               Please review the result page for your final exam status.
//             </div>

//             <DialogFooter className="sm:justify-start">
//               <Button
//                 type="button"
//                 onClick={handleCancelledExam}
//                 className="w-full rounded-xl bg-red-600 py-3 text-white hover:bg-red-700"
//               >
//                 View Result
//               </Button>
//             </DialogFooter>
//           </div>
//         </DialogContent>
//       </Dialog>

//       {!result ? (
//         <>
//           {warning && (
//             <div className="fixed inset-x-4 bottom-4 z-50 sm:inset-x-auto sm:right-6 sm:w-80">
//               <Alert variant="destructive">
//                 <AlertDescription>{warning}</AlertDescription>
//               </Alert>
//             </div>
//           )}

//           <HeaderQuestion totalSeconds={TOTAL_SECONDS} />

//           <section className="border-b border-slate-200 bg-white/80">
//             <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
//               <div className="flex flex-col gap-4 rounded-[28px] bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 p-4 text-white shadow-lg sm:flex-row sm:items-center sm:justify-between sm:p-5">
//                 <div className="flex items-start gap-3 sm:items-center">
//                   <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/15 sm:h-14 sm:w-14">
//                     <CircleQuestionMark className="h-6 w-6 sm:h-7 sm:w-7" />
//                   </div>

//                   <div>
//                     <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-100">
//                       Exam In Progress
//                     </p>
//                     <h2 className="mt-1 text-xl font-semibold sm:text-2xl">
//                       {trackName} Questions
//                     </h2>
//                     <p className="mt-1 text-sm text-blue-50 sm:text-base">
//                       Move through the questions calmly and review each answer before continuing.
//                     </p>
//                   </div>
//                 </div>

//                 <div className="self-start rounded-2xl bg-white/15 px-4 py-2 text-sm font-semibold text-white/95">
//                   {current + 1} / {questions.length} answered
//                 </div>
//               </div>
//             </div>
//           </section>

//           <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-5 sm:px-6 lg:px-8">
//             <div className="flex flex-col gap-6 xl:grid xl:grid-cols-[minmax(0,1fr)_320px] xl:items-start">
//               <section className="order-2 rounded-[28px] bg-white p-4 shadow-sm ring-1 ring-slate-200/80 sm:p-6 xl:order-1">
//                 <div className="space-y-6">
//                   <div className="space-y-3">
//                     <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//                       <div>
//                         <p className="text-sm font-semibold text-slate-500">Exam progress</p>
//                         <h3 className="text-lg font-semibold text-slate-900 sm:text-xl">
//                           Question {current + 1} of {questions.length}
//                         </h3>
//                       </div>

//                       <span className="self-start rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
//                         {Math.round(progressValue)}% complete
//                       </span>
//                     </div>

//                     <Progress
//                       value={progressValue}
//                       className="h-2.5 bg-slate-100 [&>div]:bg-blue-600"
//                     />
//                   </div>

//                   <Form {...form}>
//                     <form
//                       onSubmit={form.handleSubmit(
//                         current < questions.length - 1 ? handleNext : handleSubmitAll,
//                       )}
//                       className="flex h-full flex-col gap-6"
//                     >
//                       <section className="space-y-5">
//                         <div className="space-y-3">
//                           <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
//                             Question {current + 1}
//                           </span>
//                           <h2 className="text-xl font-semibold leading-relaxed text-slate-900 sm:text-2xl">
//                             {currentQuestion.question}
//                           </h2>
//                         </div>

//                         <Controller
//                           name={`answers.${currentQuestion._id}`}
//                           control={form.control}
//                           render={({ field }) => (
//                             <FormItem>
//                               <FormControl>
//                                 <RadioGroup
//                                   value={field.value}
//                                   onValueChange={field.onChange}
//                                   className="space-y-3"
//                                 >
//                                   {currentQuestion.answers.map((answer) => {
//                                     const isSelected = field.value === answer.key;

//                                     return (
//                                       <Label key={answer.key} className="block cursor-pointer">
//                                         <div
//                                           className={`flex items-start gap-3 rounded-2xl border p-4 transition-all sm:p-5 ${
//                                             isSelected
//                                               ? "border-blue-500 bg-blue-50 shadow-sm"
//                                               : "border-slate-200 bg-slate-50 hover:border-blue-200 hover:bg-white"
//                                           }`}
//                                         >
//                                           <RadioGroupItem value={answer.key} className="mt-1" />
//                                           <span className="text-sm font-medium leading-6 text-slate-700 sm:text-base">
//                                             {answer.answer}
//                                           </span>
//                                         </div>
//                                       </Label>
//                                     );
//                                   })}
//                                 </RadioGroup>
//                               </FormControl>

//                               {errors.answers?.[currentQuestion._id] && (
//                                 <Alert variant="destructive" className="mt-4">
//                                   <AlertDescription>Please choose answer</AlertDescription>
//                                 </Alert>
//                               )}
//                             </FormItem>
//                           )}
//                         />
//                       </section>

//                       <div className="flex flex-col gap-3 sm:flex-row">
//                         <Button
//                           type="button"
//                           disabled={current === 0}
//                           onClick={handlePrevious}
//                           variant="outline"
//                           className="h-12 w-full rounded-2xl border-slate-200"
//                         >
//                           Previous
//                         </Button>

//                         {current < questions.length - 1 ? (
//                           <Button type="submit" className="h-12 w-full rounded-2xl bg-blue-500 text-white">
//                             Next
//                           </Button>
//                         ) : (
//                           <Button
//                             type="submit"
//                             disabled={isFinishingExam}
//                             className="h-12 w-full rounded-2xl bg-blue-500 text-white"
//                           >
//                             {isFinishingExam ? "Submitting..." : "Submit Exam"}
//                           </Button>
//                         )}
//                       </div>
//                     </form>
//                   </Form>
//                 </div>
//               </section>

//               <aside className="order-1 xl:order-2 xl:sticky xl:top-24">
//                 <div
//                   className={`rounded-[28px] border p-5 shadow-lg backdrop-blur-sm ${strikeUi.cardClass}`}
//                 >
//                   <div className="mb-4 flex items-start justify-between gap-3">
//                     <div className="flex items-center gap-3">
//                       <div
//                         className={`flex h-12 w-12 items-center justify-center rounded-2xl ${strikeUi.iconWrapClass}`}
//                       >
//                         <TriangleAlert className="h-6 w-6" />
//                       </div>

//                       <div>
//                         <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
//                           Exam Monitoring
//                         </p>
//                         <h3 className="text-lg font-semibold text-slate-900">Strike Status</h3>
//                       </div>
//                     </div>

//                     <span
//                       className={`rounded-full px-3 py-1 text-xs font-semibold ${strikeUi.badgeClass}`}
//                     >
//                       {strikeUi.label}
//                     </span>
//                   </div>

//                   <div className="space-y-4">
//                     <div className="rounded-2xl border border-white/70 bg-white/80 p-4">
//                       <p className="text-sm text-slate-500">You have</p>
//                       <div className="mt-1 flex items-end gap-2">
//                         <span className={`text-3xl font-bold ${strikeUi.countClass}`}>
//                           {strikesLeft}
//                         </span>
//                         <span className="pb-1 text-sm font-medium text-slate-500">
//                           strikes left
//                         </span>
//                       </div>
//                     </div>

//                     <div className="space-y-2">
//                       <div className="flex items-center justify-between text-sm">
//                         <span className="font-medium text-slate-600">Current strikes</span>
//                         <span className={`font-bold ${strikeUi.countClass}`}>
//                           {displayedStrikes}/{maxStrikes}
//                         </span>
//                       </div>
//                       <Progress value={strikeProgress} className={strikeUi.progressClass} />
//                     </div>

//                     <div className="flex items-center justify-between rounded-2xl bg-white/70 px-4 py-3">
//                       <span className="text-sm font-medium text-slate-600">Proctoring status</span>
//                       <span className={`text-sm font-semibold ${strikeUi.statusClass}`}>
//                         {strikeUi.label}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </aside>
//             </div>
//           </main>
//         </>
//       ) : (
//         <Result
//           correct={correctCount}
//           length={questions.length}
//           score={finalExamResult?.score}
//           maxScore={finalExamResult?.max_score}
//           totalQuestions={finalExamResult?.total_questions}
//           correctAnswers={finalExamResult?.correct_answers}
//           wrongAnswers={finalExamResult?.wrong_answers}
//           invalidated={finalExamResult?.invalidated}
//           finishedAt={finalExamResult?.finished_at ?? null}
//         />
//       )}
//     </div>
//   );
// }


"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleQuestionMark, TriangleAlert } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormControl, FormItem } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AssessmentResponse } from "@/lib/types/assessment";
import HeaderQuestion from "./header-question";
import Result from "./result";
import CameraMonitor from "./camera-monitor";
import useAssessment from "../_hooks/use-assessment";
import useFinishExam, { type FinishExamResult } from "../_hooks/use-finish-exam";
import { useProctor } from "../_hooks/use-protector";
import useStartExam from "../_hooks/use-start-exam";
import { useSession } from "next-auth/react";

type Option = { key: string; answer: string };
type Question = { _id: string; question: string; answers: Option[] };
type QuestionResultsMap = Record<string, boolean>;

interface StoredAssessmentProgress {
  correctCount: number;
  questionResults: QuestionResultsMap;
}

const TOTAL_SECONDS = 20 * 60;
const ASSESSMENT_PROGRESS_STORAGE_KEY = "assessment-progress";
const LEGACY_ASSESSMENT_PROGRESS_STORAGE_KEY = "assessment-progress";

const answerSchema = z.object({
  answers: z.record(z.string(), z.string().min(1, "Please choose answer")),
});

type AnswerValues = z.infer<typeof answerSchema>;

interface ExamPageProps {
  dataQuestions: AssessmentResponse;
}

export default function ExamPage({ dataQuestions }: ExamPageProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [questionResults, setQuestionResults] = useState<QuestionResultsMap>({});
  const [correctCount, setCorrectCount] = useState(0);
  const [result, setResult] = useState(false);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [isVisionMonitorActive, setIsVisionMonitorActive] = useState(true);
  const [examId, setExamId] = useState(0);
  const [finalExamResult, setFinalExamResult] = useState<FinishExamResult | null>(null);
  const questionResultsRef = useRef<QuestionResultsMap>({});

  const { data: session, status } = useSession();
  const trackId = session?.user?.trackId;

  const { submit } = useAssessment();
  const { finish, isPending: isFinishingExam } = useFinishExam();
  const { start } = useStartExam();

  const form = useForm<AnswerValues>({
    resolver: zodResolver(answerSchema),
    defaultValues: { answers: {} },
  });

  const { errors } = form.formState;

  useEffect(() => {
    questionResultsRef.current = questionResults;
  }, [questionResults]);

  useEffect(() => {
    const savedExamId = Number(localStorage.getItem("idExam"));

    if (!Number.isNaN(savedExamId) && savedExamId > 0) {
      setExamId(savedExamId);
    }
  }, []);

  const handleProctorLimitReach = useCallback(() => {
    setIsCancelDialogOpen(true);
  }, []);

  const handlePauseVisionMonitor = useCallback(() => {
    setIsVisionMonitorActive(false);
  }, []);

  const { warning, strikes, maxStrikes, reportBackendViolation } = useProctor(
    examId,
    handleProctorLimitReach,
  );

  const handleVisionStrike = useCallback(
    (
      message: string,
      options?: {
        invalidated?: boolean;
        strikes?: number;
      },
    ) => {
      if (options?.invalidated) {
        setIsCancelDialogOpen(true);
        return;
      }

      reportBackendViolation("eye_away", message, options);
    },
    [reportBackendViolation],
  );

  useEffect(() => {
    if (examId <= 0) {
      return;
    }

    setIsVisionMonitorActive(true);
  }, [examId]);

  useEffect(() => {
    if (!dataQuestions?.questions?.length) {
      return;
    }

    const mapped = dataQuestions.questions.map((question) => ({
      _id: String(question.id),
      question: question.text,
      answers: question.options.map((option) => ({
        key: String(option.id),
        answer: option.text,
      })),
    }));

    setQuestions(mapped);
  }, [dataQuestions]);

  useEffect(() => {
    if (examId > 0) {
      return;
    }

    const savedExamId = Number(localStorage.getItem("idExam"));
    if (!Number.isNaN(savedExamId) && savedExamId > 0) {
      setExamId(savedExamId);
      return;
    }

    if (status === "loading") {
      return;
    }

    if (!trackId || Number(trackId) <= 0) {
      return;
    }

    const initializeExam = async () => {
      try {
        const response = await start({ track_id: Number(trackId) });
        const nextExamId = Number(response?.exam?.id);

        if (Number.isNaN(nextExamId) || nextExamId <= 0) {
          return;
        }

        localStorage.setItem("idExam", String(nextExamId));
        setExamId(nextExamId);
      } catch (error) {
        console.error("Failed to initialize exam:", error);
      }
    };

    void initializeExam();
  }, [examId, start, trackId, status]);

  const getAssessmentProgressStorageKey = useCallback(
    (targetExamId: number) => `${ASSESSMENT_PROGRESS_STORAGE_KEY}:${targetExamId}`,
    [],
  );

  const readStoredProgress = useCallback((targetExamId: number): StoredAssessmentProgress | null => {
    if (!targetExamId) {
      return null;
    }

    const parseStoredProgress = (raw: string | null, source: "scoped" | "legacy") => {
      if (!raw) {
        return null;
      }

      try {
        const parsed = JSON.parse(raw) as
          | Partial<StoredAssessmentProgress>
          | (Partial<StoredAssessmentProgress> & { examId?: number });

        if (
          source === "legacy" &&
          "examId" in parsed &&
          typeof parsed.examId === "number" &&
          parsed.examId !== targetExamId
        ) {
          return null;
        }

        const storedResults =
          parsed.questionResults && typeof parsed.questionResults === "object"
            ? parsed.questionResults
            : {};

        return {
          correctCount: Object.values(storedResults).filter(Boolean).length,
          questionResults: storedResults,
        };
      } catch (error) {
        console.error(`Failed to read ${source} assessment progress:`, error);
        return null;
      }
    };

    const scopedProgress = parseStoredProgress(
      localStorage.getItem(getAssessmentProgressStorageKey(targetExamId)),
      "scoped",
    );

    if (scopedProgress) {
      return scopedProgress;
    }

    return parseStoredProgress(
      localStorage.getItem(LEGACY_ASSESSMENT_PROGRESS_STORAGE_KEY),
      "legacy",
    );
  }, [getAssessmentProgressStorageKey]);

  const syncProgressState = useCallback((nextProgress: StoredAssessmentProgress | null) => {
    const nextResults = nextProgress?.questionResults ?? {};
    const nextCorrectCount = nextProgress?.correctCount ?? 0;

    questionResultsRef.current = nextResults;
    setQuestionResults(nextResults);
    setCorrectCount(nextCorrectCount);
  }, []);

  const restoreStoredProgress = useCallback((targetExamId: number) => {
    syncProgressState(readStoredProgress(targetExamId));
  }, [readStoredProgress, syncProgressState]);

  const persistStoredProgress = useCallback(
    (targetExamId: number, nextQuestionResults: QuestionResultsMap) => {
      if (!targetExamId) {
        return null;
      }

      const nextCorrectCount = Object.values(nextQuestionResults).filter(Boolean).length;

      const nextProgress: StoredAssessmentProgress = {
        correctCount: nextCorrectCount,
        questionResults: nextQuestionResults,
      };

      localStorage.setItem(
        getAssessmentProgressStorageKey(targetExamId),
        JSON.stringify(nextProgress),
      );

      return nextProgress;
    },
    [getAssessmentProgressStorageKey],
  );

  useEffect(() => {
    restoreStoredProgress(examId);
  }, [examId, restoreStoredProgress]);

  const extractIsCorrect = useCallback((response: unknown): boolean | null => {
    const readBoolean = (value: unknown): boolean | null => {
      if (typeof value === "boolean") {
        return value;
      }

      if (typeof value === "number" && (value === 0 || value === 1)) {
        return Boolean(value);
      }

      if (typeof value === "string") {
        const normalized = value.trim().toLowerCase();

        if (normalized === "true" || normalized === "correct") {
          return true;
        }

        if (normalized === "false" || normalized === "wrong" || normalized === "incorrect") {
          return false;
        }
      }

      return null;
    };

    const visit = (value: unknown, depth = 0): boolean | null => {
      if (depth > 4 || !value || typeof value !== "object") {
        return readBoolean(value);
      }

      const record = value as Record<string, unknown>;

      for (const key of ["is_correct", "isCorrect", "correct", "is_right", "isRight"]) {
        const direct = readBoolean(record[key]);

        if (direct !== null) {
          return direct;
        }
      }

      for (const nestedKey of ["answer", "data", "result", "payload"]) {
        if (nestedKey in record) {
          const nested = visit(record[nestedKey], depth + 1);

          if (nested !== null) {
            return nested;
          }
        }
      }

      for (const nestedValue of Object.values(record)) {
        const nested = visit(nestedValue, depth + 1);

        if (nested !== null) {
          return nested;
        }
      }

      return null;
    };

    return visit(response);
  }, []);

  const submitQuestionAnswer = useCallback(
    async (question: Question, selectedAnswer: string) => {
      const resolvedExamId = examId || Number(localStorage.getItem("idExam"));

      const safeExamId =
        resolvedExamId && !Number.isNaN(resolvedExamId) && resolvedExamId > 0 ? resolvedExamId : 0;

      if (!safeExamId) {
        return null;
      }

      if (!examId) {
        setExamId(safeExamId);
      }

      const response = await submit({
        exam_id: safeExamId,
        question_id: Number(question._id),
        option_id: Number(selectedAnswer),
      });

      const isCorrect = extractIsCorrect(response);

      if (typeof isCorrect === "boolean") {
        const nextResults = {
          ...questionResultsRef.current,
          [question._id]: isCorrect,
        };
        const nextProgress = persistStoredProgress(safeExamId, nextResults);

        syncProgressState(nextProgress);
      } else {
        console.warn("Unable to determine correctness from answer response:", response);
      }

      return response;
    },
    [examId, extractIsCorrect, persistStoredProgress, submit, syncProgressState],
  );

  const handleNext = async (values: AnswerValues) => {
    const currentQuestion = questions[current];
    const currentAnswer = values.answers[currentQuestion._id];

    setAnswers((prev) => ({ ...prev, [currentQuestion._id]: currentAnswer }));

    try {
      await submitQuestionAnswer(currentQuestion, currentAnswer);
    } catch (error) {
      console.error(error);
    }

    setCurrent((prev) => prev + 1);

    const nextQuestion = questions[current + 1];
    if (nextQuestion) {
      form.reset({
        answers: { [nextQuestion._id]: answers[nextQuestion._id] || "" },
      });
    }
  };

  const handlePrevious = () => {
    const currentQuestion = questions[current];
    const currentValues = form.getValues();

    if (currentValues.answers[currentQuestion._id]) {
      setAnswers((prev) => ({
        ...prev,
        [currentQuestion._id]: currentValues.answers[currentQuestion._id],
      }));
    }

    setCurrent((prev) => prev - 1);

    const previousQuestion = questions[current - 1];
    if (previousQuestion) {
      form.reset({
        answers: { [previousQuestion._id]: answers[previousQuestion._id] || "" },
      });
    }
  };

  useEffect(() => {
    if (!questions.length || !questions[current]) {
      return;
    }

    const currentQuestion = questions[current];
    form.reset({
      answers: { [currentQuestion._id]: answers[currentQuestion._id] || "" },
    });
  }, [answers, current, form, questions]);

  const finalizeExam = useCallback(
    async (values?: AnswerValues, shouldSubmitCurrentAnswer = false) => {
      const resolvedExamId = examId || Number(localStorage.getItem("idExam"));
      const safeExamId =
        resolvedExamId && !Number.isNaN(resolvedExamId) && resolvedExamId > 0 ? resolvedExamId : 0;

      try {
        if (shouldSubmitCurrentAnswer && questions[current]) {
          const activeQuestion = questions[current];
          const selectedAnswer =
            values?.answers[activeQuestion._id] || answers[activeQuestion._id];

          if (selectedAnswer) {
            setAnswers((prev) => ({
              ...prev,
              [activeQuestion._id]: selectedAnswer,
            }));

            await submitQuestionAnswer(activeQuestion, selectedAnswer);
          }
        }

        if (safeExamId > 0) {
          const finishedExam = await finish(safeExamId);
          setFinalExamResult(finishedExam);
        }

        syncProgressState(readStoredProgress(safeExamId));
      } catch (error) {
        console.error("Failed to finalize exam:", error);
      } finally {
        localStorage.removeItem("idExam");
        setResult(true);
      }
    },
    [answers, current, examId, finish, questions, readStoredProgress, submitQuestionAnswer, syncProgressState],
  );

  const handleSubmitAll = useCallback(
    async (values: AnswerValues) => {
      await finalizeExam(values, true);
    },
    [finalizeExam],
  );

  const handleCancelledExam = useCallback(async () => {
    setIsCancelDialogOpen(false);
    await finalizeExam(undefined, false);
  }, [finalizeExam]);

  if (!questions.length) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center bg-slate-100 px-4">
        <p className="animate-pulse text-center text-lg font-semibold text-blue-600 sm:text-xl">
          Loading Exam Questions...
        </p>
      </div>
    );
  }

  const currentQuestion = questions[current];
  const trackName = dataQuestions.track || "Assessment";
  const progressValue = ((current + 1) / questions.length) * 100;
  const displayedStrikes = Math.min(strikes, maxStrikes);
  const strikesLeft = Math.max(maxStrikes - displayedStrikes, 0);
  const strikeProgress = (displayedStrikes / maxStrikes) * 100;

  const strikeUi =
    displayedStrikes >= 2
      ? {
          label: "Critical",
          cardClass:
            "border-red-200 bg-gradient-to-br from-white via-red-50 to-orange-50 shadow-red-100",
          badgeClass: "border border-red-200 bg-red-100 text-red-700",
          iconWrapClass: "bg-red-100 text-red-600",
          progressClass: "bg-red-100 [&>div]:bg-red-500",
          countClass: "text-red-600",
          statusClass: "text-red-600",
        }
      : displayedStrikes === 1
        ? {
            label: "Warning",
            cardClass:
              "border-amber-200 bg-gradient-to-br from-white via-amber-50 to-yellow-50 shadow-amber-100",
            badgeClass: "border border-amber-200 bg-amber-100 text-amber-700",
            iconWrapClass: "bg-amber-100 text-amber-600",
            progressClass: "bg-amber-100 [&>div]:bg-amber-500",
            countClass: "text-amber-600",
            statusClass: "text-amber-600",
          }
        : {
            label: "Safe",
            cardClass:
              "border-slate-200 bg-gradient-to-br from-white via-slate-50 to-blue-50 shadow-slate-100",
            badgeClass: "border border-blue-200 bg-blue-100 text-blue-700",
            iconWrapClass: "bg-blue-100 text-blue-600",
            progressClass: "bg-blue-100 [&>div]:bg-blue-500",
            countClass: "text-slate-900",
            statusClass: "text-blue-600",
          };

  return (
    <div className="flex min-h-screen flex-col bg-slate-100">
      {examId > 0 && !result && !isCancelDialogOpen && isVisionMonitorActive && (
        <CameraMonitor
          examId={examId}
          currentStrikes={strikes}
          maxStrikes={maxStrikes}
          onPauseVisionMonitor={handlePauseVisionMonitor}
          onVisionStrike={handleVisionStrike}
        />
      )}

      <Dialog open={isCancelDialogOpen}>
        <DialogContent
          className="max-w-md overflow-hidden border-0 p-0 shadow-2xl [&>button]:hidden"
          onEscapeKeyDown={(event) => event.preventDefault()}
          onInteractOutside={(event) => event.preventDefault()}
        >
          <div className="bg-gradient-to-br from-red-600 via-red-500 to-orange-500 p-6 text-white">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
              <TriangleAlert className="h-7 w-7" />
            </div>
            <DialogHeader className="space-y-2 text-left">
              <DialogTitle className="text-2xl font-bold text-white">Exam Cancelled</DialogTitle>
              <DialogDescription className="text-sm leading-6 text-red-50">
                Your exam was ended automatically because the allowed violation limit was reached.
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="space-y-4 bg-white px-6 py-5">
            <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
              Please review the result page for your final exam status.
            </div>

            <DialogFooter className="sm:justify-start">
              <Button
                type="button"
                onClick={handleCancelledExam}
                className="w-full rounded-xl bg-red-600 py-3 text-white hover:bg-red-700"
              >
                View Result
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      {!result ? (
        <>
          {warning && (
            <div className="fixed inset-x-4 bottom-4 z-50 sm:inset-x-auto sm:right-6 sm:w-80">
              <Alert variant="destructive">
                <AlertDescription>{warning}</AlertDescription>
              </Alert>
            </div>
          )}

          <HeaderQuestion totalSeconds={TOTAL_SECONDS} />

          <section className="border-b border-slate-200 bg-white/80">
            <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
              <div className="flex flex-col gap-4 rounded-[28px] bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 p-4 text-white shadow-lg sm:flex-row sm:items-center sm:justify-between sm:p-5">
                <div className="flex items-start gap-3 sm:items-center">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/15 sm:h-14 sm:w-14">
                    <CircleQuestionMark className="h-6 w-6 sm:h-7 sm:w-7" />
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-100">
                      Exam In Progress
                    </p>
                    <h2 className="mt-1 text-xl font-semibold sm:text-2xl">
                      {trackName} Questions
                    </h2>
                    <p className="mt-1 text-sm text-blue-50 sm:text-base">
                      Move through the questions calmly and review each answer before continuing.
                    </p>
                  </div>
                </div>

                <div className="self-start rounded-2xl bg-white/15 px-4 py-2 text-sm font-semibold text-white/95">
                  {current + 1} / {questions.length} answered
                </div>
              </div>
            </div>
          </section>

          <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-5 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6 xl:grid xl:grid-cols-[minmax(0,1fr)_320px] xl:items-start">
              <section className="order-2 rounded-[28px] bg-white p-4 shadow-sm ring-1 ring-slate-200/80 sm:p-6 xl:order-1">
                <div className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm font-semibold text-slate-500">Exam progress</p>
                        <h3 className="text-lg font-semibold text-slate-900 sm:text-xl">
                          Question {current + 1} of {questions.length}
                        </h3>
                      </div>

                      <span className="self-start rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
                        {Math.round(progressValue)}% complete
                      </span>
                    </div>

                    <Progress
                      value={progressValue}
                      className="h-2.5 bg-slate-100 [&>div]:bg-blue-600"
                    />
                  </div>

                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(
                        current < questions.length - 1 ? handleNext : handleSubmitAll,
                      )}
                      className="flex h-full flex-col gap-6"
                    >
                      <section className="space-y-5">
                        <div className="space-y-3">
                          <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
                            Question {current + 1}
                          </span>
                          <h2 className="text-xl font-semibold leading-relaxed text-slate-900 sm:text-2xl">
                            {currentQuestion.question}
                          </h2>
                        </div>

                        <Controller
                          name={`answers.${currentQuestion._id}`}
                          control={form.control}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <RadioGroup
                                  value={field.value}
                                  onValueChange={field.onChange}
                                  className="space-y-3"
                                >
                                  {currentQuestion.answers.map((answer) => {
                                    const isSelected = field.value === answer.key;

                                    return (
                                      <Label key={answer.key} className="block cursor-pointer">
                                        <div
                                          className={`flex items-start gap-3 rounded-2xl border p-4 transition-all sm:p-5 ${
                                            isSelected
                                              ? "border-blue-500 bg-blue-50 shadow-sm"
                                              : "border-slate-200 bg-slate-50 hover:border-blue-200 hover:bg-white"
                                          }`}
                                        >
                                          <RadioGroupItem value={answer.key} className="mt-1" />
                                          <span className="text-sm font-medium leading-6 text-slate-700 sm:text-base">
                                            {answer.answer}
                                          </span>
                                        </div>
                                      </Label>
                                    );
                                  })}
                                </RadioGroup>
                              </FormControl>

                              {errors.answers?.[currentQuestion._id] && (
                                <Alert variant="destructive" className="mt-4">
                                  <AlertDescription>Please choose answer</AlertDescription>
                                </Alert>
                              )}
                            </FormItem>
                          )}
                        />
                      </section>

                      <div className="flex flex-col gap-3 sm:flex-row">
                        <Button
                          type="button"
                          disabled={current === 0}
                          onClick={handlePrevious}
                          variant="outline"
                          className="h-12 w-full rounded-2xl border-slate-200"
                        >
                          Previous
                        </Button>

                        {current < questions.length - 1 ? (
                          <Button type="submit" className="h-12 w-full rounded-2xl bg-blue-500 text-white">
                            Next
                          </Button>
                        ) : (
                          <Button
                            type="submit"
                            disabled={isFinishingExam}
                            className="h-12 w-full rounded-2xl bg-blue-500 text-white"
                          >
                            {isFinishingExam ? "Submitting..." : "Submit Exam"}
                          </Button>
                        )}
                      </div>
                    </form>
                  </Form>
                </div>
              </section>

              <aside className="order-1 xl:order-2 xl:sticky xl:top-24">
                <div
                  className={`rounded-[28px] border p-5 shadow-lg backdrop-blur-sm ${strikeUi.cardClass}`}
                >
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl ${strikeUi.iconWrapClass}`}
                      >
                        <TriangleAlert className="h-6 w-6" />
                      </div>

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                          Exam Monitoring
                        </p>
                        <h3 className="text-lg font-semibold text-slate-900">Strike Status</h3>
                      </div>
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${strikeUi.badgeClass}`}
                    >
                      {strikeUi.label}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-2xl border border-white/70 bg-white/80 p-4">
                      <p className="text-sm text-slate-500">You have</p>
                      <div className="mt-1 flex items-end gap-2">
                        <span className={`text-3xl font-bold ${strikeUi.countClass}`}>
                          {strikesLeft}
                        </span>
                        <span className="pb-1 text-sm font-medium text-slate-500">
                          strikes left
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-slate-600">Current strikes</span>
                        <span className={`font-bold ${strikeUi.countClass}`}>
                          {displayedStrikes}/{maxStrikes}
                        </span>
                      </div>
                      <Progress value={strikeProgress} className={strikeUi.progressClass} />
                    </div>

                    <div className="flex items-center justify-between rounded-2xl bg-white/70 px-4 py-3">
                      <span className="text-sm font-medium text-slate-600">Proctoring status</span>
                      <span className={`text-sm font-semibold ${strikeUi.statusClass}`}>
                        {strikeUi.label}
                      </span>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </main>
        </>
      ) : (
        <Result
          correct={correctCount}
          length={questions.length}
          score={finalExamResult?.score}
          maxScore={finalExamResult?.max_score}
          totalQuestions={finalExamResult?.total_questions}
          correctAnswers={finalExamResult?.correct_answers}
          wrongAnswers={finalExamResult?.wrong_answers}
          invalidated={finalExamResult?.invalidated}
          finishedAt={finalExamResult?.finished_at ?? null}
        />
      )}
    </div>
  );
}
