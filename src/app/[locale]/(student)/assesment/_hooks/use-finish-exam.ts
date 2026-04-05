// import { useMutation } from "@tanstack/react-query";
// import { finishExamAPI } from "../_actions/finish-exam.action";



// export default function useFinishExam() {
//   const { error, isPending, mutate } = useMutation({
//     mutationFn: async (values: number) => {
//       const response = await finishExamAPI(values);

//       if ("error" in response) {
//         throw new Error(response.error);
//       }

//       console.log(response);
//       return response;
//     },
//   });
//   return { isPending, error, finish: mutate };
// }

// use-finish-exam.ts
// import { useMutation } from "@tanstack/react-query";
// import { finishExamAPI } from "../_actions/finish-exam.action";

// export default function useFinishExam() {
//   const { error, isPending, mutate, data } = useMutation({
//     mutationFn: async (values: number) => {
//       const response = await finishExamAPI(values);

//       if ("error" in response) {
//         throw new Error(response.error);
//       }

//       console.log(response);
//       return response;
//     },
//     // حط الـ callbacks هنا مش في mutate
//     onSuccess: (data) => {
//       console.log("Exam finished successfully:", data);
//     },
//     onError: (err) => {
//       console.error("Error finishing exam:", err);
//     },
//   });
  
//   return { isPending, error, finish: mutate, data };
// }


import { useMutation } from "@tanstack/react-query";
import { finishExamAPI } from "../_actions/finish-exam.action";
import { useRouter } from "next/navigation";

export default function useFinishExam() {
  const router = useRouter();

  const { error, isPending, mutate, data } = useMutation({
    mutationFn: async (examSessionId: number) => {
      const response = await finishExamAPI(examSessionId);

      if (response && "error" in response) {
        throw new Error(response.error);
      }

      return response;
    },
    onSuccess: (data) => {
      console.log("Exam finished successfully:", data);
      
      // عرض النتيجة أو الـ redirect
      if (data.invalidated) {
        console.warn("Exam was invalidated");
      }
      
      // مثال: redirect لصفحة النتايج
      // router.push(`/results?score=${data.score}`);
    },
    onError: (err) => {
      console.error("Error finishing exam:", err);
      // عرض toast أو error message
    },
  });
  
  return { isPending, error, finish: mutate, data };
}


// "use client";
// import { useState } from "react";

// interface ExamResult {
//   success: boolean;
//   score: number;
//   finished_at: string;
//   invalidated: boolean;
// }

// interface UseFinishExamReturn {
//   finish: (examId: number) => Promise<void>;
//   data: ExamResult | null;
//   isPending: boolean;
//   isSuccess: boolean;
//   error: Error | null;
// }

// export default function useFinishExam(): UseFinishExamReturn {
//   const [data, setData] = useState<ExamResult | null>(null);
//   const [isPending, setIsPending] = useState(false);
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [error, setError] = useState<Error | null>(null);

//   const finish = async (examId: number) => {
//     try {
//       setIsPending(true);
//       setError(null);

//       // Replace with your real API call
//       const res = await fetch(`/api/finish-exam/${examId}`);
//       if (!res.ok) throw new Error("Failed to finish exam");

//       const result: ExamResult = await res.json();
//       setData(result);       // ✅ store API result in state
//       setIsSuccess(true);
//     } catch (err: any) {
//       setError(err);
//     } finally {
//       setIsPending(false);
//     }
//   };

//   return { finish, data, isPending, isSuccess, error };
// }
