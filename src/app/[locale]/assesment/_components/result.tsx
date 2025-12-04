"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { CircleStar } from "lucide-react";
import React from "react";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

interface ResultProps {
  correct: number;
  length: number;
}
export default function Result({ correct, length }: ResultProps) {
  return (
    <div>
      <div className="w-[90%] md:w-3/4 xl:w-1/2 mx-auto my-5">
        <div className="contain">
          <h1 className="font-bold text-2xl text-center sm:text-4xl dark:text-whiteColor">
            Assessment Results
          </h1>
          <div className="progress shadow-lg rounded-xl flex flex-col items-center my-5 py-3 dark:bg-[#101114]">
            <div className="w-40 h-40 relative my-3">
              <CircularProgressbar
                className="font-bold text-center"
                value={(correct / length) * 100}
                styles={buildStyles({
                  textSize: "18px",
                  pathColor: "#3b82f6",
                  trailColor: "#e5e7eb",
                  textColor: "#3b82f6",
                })}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-bold text-blue-500 text-xl">{(correct / length) * 100}%</span>
                <span className="text-xs text-secondaryColor font-medium dark:text-secondaryColordark">
                  your score
                </span>
              </div>
            </div>
            <span className="font-bold text-2xl">Great Effort!</span>
          </div>
        </div>

        <div className=" flex gap-4">
          <div className=" w-1/2 shadow-lg rounded-xl p-4 text-center dark:bg-[#101114]">
            <p className="font-semibold text-gray-500 my-2 dark:text-white">Wrong Answers</p>
            <span className="font-semibold text-2xl text-blue-500">
              <span className="text-red-500">{length - correct}</span>/<span>{length}</span>
            </span>
          </div>

          <div className=" w-1/2 shadow-lg rounded-xl p-4 text-center dark:bg-[#101114]">
            <p className="font-semibold text-gray-500 my-2 dark:text-white">Correct Answers</p>
            <span className="font-semibold text-2xl text-blue-500">
              <span className="text-green-500">{correct}</span>/<span>{length}</span>
            </span>
          </div>
        </div>

        <div className=" my-5 shadow-lg rounded-xl p-5 dark:bg-[#101114]">
          <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <div className="flex gap-1 text-blue-500">
                  <CircleStar />
                  <span className="font-bold">Feedback & Insights</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                <p className="font-bold text-gray-500 dark:text-gray-300">
                  You are good in Data Structure, but you need to improve your understand of linear
                  algebra and algorithms.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className=" flex items-center justify-center flex-col sm:flex-row gap-5 sm:gap-8 py-5">
          <Button className="bg-white hover:bg-blue-500 hover:text-white text-blue-500 rounded-lg w-3/4 sm:w-1/3 border font-bold dark:bg-[#101114]">
            View Details
          </Button>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg w-3/4 sm:w-1/3 font-bold ">
            Create learning plan
          </Button>
          <Button className="bg-white hover:bg-blue-500 hover:text-white text-blue-500 rounded-lg w-3/4 sm:w-1/3 border  font-bold dark:bg-[#101114]">
            Retake assessment
          </Button>
        </div>
      </div>
    </div>
  );
}

// "use client";
// import React, { useEffect, useRef, useState } from "react";
// import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
// import { Button } from "@/components/ui/button";
// import { ModeToggle } from "@/components/features/toggle-mode";
// import useFinishExam from "../_hooks/use-finish-exam";

// interface ExamResult {
//   success: boolean;
//   score: number;
//   finished_at: string;
//   invalidated: boolean;
// }

// export default function Result() {
//   const { finish, data, isPending, error } = useFinishExam();
//   const initRef = useRef(false);

//   const [examResult, setExamResult] = useState<ExamResult | null>(null);

//   // ✅ Call finish exam only once
//   useEffect(() => {
//     if (initRef.current) return;

//     const examID = localStorage.getItem("idExam");
//     if (!examID) return console.error("No exam ID found in localStorage");

//     initRef.current = true;
//     finish(Number(examID));
//   }, [finish]);

//   // ✅ Update local state when hook provides data
//   useEffect(() => {
//     if (data) setExamResult(data);
//   }, [data]);

//   if (isPending || !examResult) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
//           <p className="text-xl font-bold">Finishing exam, please wait...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="text-center">
//           <p className="text-xl font-bold text-red-500 mb-4">Error: {error.message}</p>
//           <Button
//             onClick={() => window.location.reload()}
//             className="bg-blue-500 hover:bg-blue-600 text-white"
//           >
//             Try Again
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   const score = examResult.score ?? 0;
//   const finishedAt = examResult.finished_at ?? "N/A";

//   return (
//     <div>
//       <ModeToggle />
//       <div className="w-[90%] md:w-3/4 xl:w-1/2 mx-auto my-5">
//         <h1 className="font-bold text-2xl text-center sm:text-4xl">Assessment Results</h1>

//         <div className="progress shadow-lg rounded-xl flex flex-col items-center my-5 py-3">
//           <div className="w-40 h-40 relative my-3">
//             <CircularProgressbar
//               value={score}
//               text={`${score.toFixed(2)}%`}
//               styles={buildStyles({
//                 textSize: "18px",
//                 pathColor: "#3b82f6",
//                 trailColor: "#e5e7eb",
//                 textColor: "#3b82f6",
//               })}
//             />
//             <span className="text-xs font-medium absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-3">
//               your score
//             </span>
//           </div>
//           <span className="font-bold text-2xl">Great Effort!</span>
//         </div>

//         <div className="flex gap-4">
//           <div className="w-1/3 shadow-lg rounded-xl p-4 text-center">
//             <p className="font-semibold text-gray-500 my-2">Finished At</p>
//             <span className="font-semibold text-2xl text-blue-500">{finishedAt}</span>
//           </div>
//         </div>

//         <div className="flex items-center justify-center flex-col sm:flex-row gap-5 sm:gap-8 py-5">
//           <Button
//             onClick={() => {
//               localStorage.removeItem("idExam");
//               window.location.href = "/exam";
//             }}
//             className="bg-white hover:bg-blue-500 hover:text-white text-blue-500 rounded-lg w-3/4 sm:w-1/3 border font-bold"
//           >
//             Retake assessment
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }
