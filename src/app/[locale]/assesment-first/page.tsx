import React from "react";
import { CircleQuestionMark, Clock, Files, TriangleAlert } from "lucide-react";
// import Main from "@/components/layout/header";
import AssesmentWarning from "./_components/assesment-warning";
import { startExamAction } from "../assesment/_actions/exam-start.action";
import { cookies } from "next/headers";

export default async function Page() {

let examId = null;
  
  // جيب الـ trackId من cookies أو localStorage (لازم تحفظه في cookies)
  const cookieStore = await cookies();
  const trackIdCookie = cookieStore.get("trackId");
  
  if (trackIdCookie?.value) {
    const trackId = Number(trackIdCookie.value);
    
    if (!Number.isNaN(trackId)) {
      try {
        const response = await startExamAction({ track_id: trackId });
        examId = response.exam?.id;
      } catch (err) {
        console.error("Failed to start exam on server:", err);
      }
    }
  }




  return (
    <div>
      {/* <Main /> */}
      <div className="my-5 ">
        <div className=" w-[90%] md:w-3/4 xl:w-1/2 shadow-lg mx-auto rounded-md py-5">
          <div className="contain w-[90%] mx-auto dark:bg-[#101114]">
            <div className="text py-5">
              <h1 className="font-bold text-mainColor text-3xl my-3 text-center sm:text-left dark:text-white">
                Assessment
              </h1>
              <p className="text-secondaryColor font-medium leading-5 text-center sm:text-left dark:text-secondaryColordark">
                Welcome! Are you ready to take the test and determine your level? Please read the
                instructions carefully before you begin.{" "}
              </p>
            </div>

            <div className="line bg-secondaryColor h-0.5 opacity-50 my-5"></div>

            <div className="icons">
              <div className="line-one flex my-3 gap-3">
                <div className="icon-one px-3 py-2 rounded-md w-fit bg-tertiaryColor flex items-center dark:bg-tertiaryColorDark">
                  <Clock className="text-mainColor dark:text-mainColorDark" />
                </div>
                <div className="paragraph-one">
                  <span className="font-bold">Estimated Time</span>
                  <p className="text-secondaryColor text-xs font-bold dark:text-secondaryColordark">
                    Plan for about 20 minutes to complete the assessment
                  </p>
                </div>
              </div>

              <div className="line-two flex my-3 gap-3">
                <div className="icon-two px-3 py-2 rounded-md w-fit bg-tertiaryColor flex items-center dark:bg-tertiaryColorDark">
                  <CircleQuestionMark className="text-mainColor dark:text-mainColorDark" />
                </div>
                <div className="paragraph-two">
                  <span className="font-bold">Number of questions</span>
                  <p className="text-secondaryColor font-medium text-xs leading-5 dark:text-secondaryColordark">
                    There are 20 multiple-choice questions in total
                  </p>
                </div>
              </div>

              <div className="line-three flex my-3 gap-3">
                <div className="icon-three px-3 py-2 rounded-md w-fit bg-tertiaryColor flex items-center dark:bg-tertiaryColorDark">
                  <Files className="text-mainColor dark:text-mainColorDark" />
                </div>
                <div className="paragraph-three">
                  <span className="font-bold">Question format</span>
                  <p className="text-secondaryColor font-medium text-xs leading-5 dark:text-secondaryColordark">
                    All questions are in a multiple-choice format
                  </p>
                </div>
              </div>
            </div>

            <div className="line bg-secondaryColor h-0.5 opacity-50 my-5"></div>

            <div className="instructions">
              <h2 className="font-bold text-2xl my-3">Instructions & Rules</h2>
              <div className="rules">
                <ul className="list-disc w-[95%] mx-auto text-secondaryColor leading-6 md:leading-8 font-bold text-xs md:text-base dark:text-secondaryColordark">
                  <li>Answer honestly based on your true preferences and abilities.</li>
                  <li>Complete the assessment in a single, uninterrupted session.</li>
                  <li>Please refrain from using any external resources or assistance.</li>
                  <li>Your results will be available immediately upon completion.</li>
                </ul>
              </div>
            </div>

            <div className="warning bg-tertiaryColor rounded-xl flex items-center gap-3 my-5 p-4 dark:bg-tertiaryColorDark">
              <div className="left">
                <TriangleAlert className="text-mainColor dark:text-mainColorDark" />
              </div>
              <div className="right">
                <span className="font-bold">Important</span>
                <p className="text-xs text-secondaryColor font-medium dark:text-white">
                  This exam is monitored automatically. Any detected cheating may result in your
                  session being canceled and disciplinary action being taken. If you encounter a
                  technical problem, report it to support immediately.
                </p>
              </div>
            </div>
          </div>
          <div className="line bg-secondaryColor h-0.5 opacity-50 my-10"></div>
          <div className="next flex justify-end mx-auto w-[90%]">
            <AssesmentWarning  examId={examId}/>
          </div>
        </div>
      </div>
    </div>
  
  );
}
