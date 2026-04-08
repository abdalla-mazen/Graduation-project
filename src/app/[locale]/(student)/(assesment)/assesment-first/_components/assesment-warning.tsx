// "use client";

// import React, { useEffect, useState } from "react";
// import useStartExam from "../../assesment/_hooks/use-start-exam";
// import { Button } from "@/components/ui/button";
// import { Link } from "@/i18n/navigation";

// export default function AssesmentWarning() {
//   const [idTrack, setIdTrack] = useState<number | null>(null);
//   const { start } = useStartExam();

//   useEffect(() => {
//     const raw = localStorage.getItem("trackId");
//     console.log("raw track_id from localStorage:", raw);

//     if (!raw) return;
//     const id = Number(raw);
//     if (Number.isNaN(id)) return;
//     setIdTrack(id);
//   }, []);

//   useEffect(() => {
//     if (idTrack === null) return;

//     const run = async () => {
//       try {
//         const response = await start({ track_id: idTrack });
//         console.log("start response:", response);
//         localStorage.setItem("idExam", response.exam.id);
//         console.log("idExam:", localStorage.getItem("idExam"));
//       } catch (err) {
//         console.error("start error:", err);
//       }
//     };

//     run();
//   }, [idTrack, start]);

//   return (
//   <>
//      <Button className="bg-mainColor rounded-lg w-1/2 sm:w-1/3 dark:text-white" >
//      <Link href="/assesment" >
//      Next
//      </Link>
//      </Button>
//   </>

//   );
// }


// "use client";

// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import useStartExam from "../../assesment/_hooks/use-start-exam";
// import { Button } from "@/components/ui/button";
// import { Loader2 } from "lucide-react";

// export default function AssesmentWarning() {
//   const [idTrack, setIdTrack] = useState<number | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const { start } = useStartExam();
//   const router = useRouter();

//   useEffect(() => {
//     const raw = localStorage.getItem("trackId");
//     console.log("raw track_id from localStorage:", raw);

//     if (!raw) return;
//     const id = Number(raw);
//     if (Number.isNaN(id)) return;
//     setIdTrack(id);
//   }, []);

//   const handleNext = async () => {
//     if (idTrack === null) {
//       console.error("No track ID found");
//       return;
//     }

//     setIsLoading(true);
//     try {
//       // نستنى الـ API يخلص الأول
//       const response = await start({ track_id: idTrack });
//       console.log("start response:", response);
      
//       // نحفظ الـ exam ID
//       localStorage.setItem("idExam", String(response.exam.id));
//       console.log("idExam saved:", response.exam.id);
      
//       // بعد كده ننتقل للصفحة التانية
//       router.push("/assesment");
//     } catch (err) {
//       console.error("start error:", err);
//       setIsLoading(false);
//     }
//   };

//   return (
//     <>
//       <Button
//         onClick={handleNext}
//         disabled={isLoading || idTrack === null}
//         className="bg-red-500 rounded-lg w-1/2 sm:w-1/3 dark:text-white"
//       >
//         {isLoading ? (
//           <>
//             <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//             Loading...
//           </>
//         ) : (
//           "Next"
//         )}
//       </Button>
//     </>
//   );
// }


// "use client";

// import React, { useEffect, useState, useRef } from "react";
// import { useRouter } from "next/navigation";
// import useStartExam from "../../assesment/_hooks/use-start-exam";
// import { Button } from "@/components/ui/button";
// import { Loader2 } from "lucide-react";

// export default function AssesmentWarning() {
//   const [idTrack, setIdTrack] = useState<number | null>(null);
//   const [isReady, setIsReady] = useState(false);
//   const [isNavigating, setIsNavigating] = useState(false);
//   const { start } = useStartExam();
//   const router = useRouter();
//   const examIdRef = useRef<string | null>(null);

//   // 1️⃣ نحمل الـ track ID ونبدأ الـ API فوراً في الخلفية
//   useEffect(() => {
//     const raw = localStorage.getItem("trackId");
//     if (!raw) return;
    
//     const id = Number(raw);
//     if (Number.isNaN(id)) return;
    
//     setIdTrack(id);
    
//     // نشوف لو في exam ID محفوظ خلاص
//     const existingExamId = localStorage.getItem("idExam");
//     if (existingExamId) {
//       examIdRef.current = existingExamId;
//       setIsReady(true);
//       return;
//     }
    
//     // لو مفيش، نبدأ API call في الخلفية فوراً
//     const initExam = async () => {
//       try {
//         const response = await start({ track_id: id });
//         examIdRef.current = String(response.exam.id);
//         localStorage.setItem("idExam", examIdRef.current);
//         setIsReady(true);
//       } catch (err) {
//         console.error("start error:", err);
//         setIsReady(true); // حتى لو في error، نخلي الزرار يشتغل
//       }
//     };
    
//     initExam();
//   }, [start]);

//   // 2️⃣ لما المستخدم يضغط Next، ينتقل فوراً
//   const handleNext = () => {
//     setIsNavigating(true);
//     router.push("/assesment");
//   };

//   // 3️⃣ لو لسه بيحمل، نعرض skeleton/placeholder
//   if (!isReady) {
//     return (
//       <div className="flex flex-col items-center gap-4">
//         <div className="h-10 w-1/2 sm:w-1/3 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
//         <p className="text-sm text-gray-500">Preparing your assessment...</p>
//       </div>
//     );
//   }

//   return (
//     <>
//       <Button
//         onClick={handleNext}
//         disabled={isNavigating}
//         className="bg-red-500 rounded-lg w-1/2 sm:w-1/3 dark:text-white"
//       >
//         {isNavigating ? (
//           <>
//             <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//             Loading...
//           </>
//         ) : (
//           "Next"
//         )}
//       </Button>
//     </>
//   );
// }


// "use client";

// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import useStartExam from "../../assesment/_hooks/use-start-exam";
// import { Button } from "@/components/ui/button";

// export default function AssesmentWarning() {
//   const [idTrack, setIdTrack] = useState<number | null>(null);
//   const [isPreparing, setIsPreparing] = useState(true);
//   const { start } = useStartExam();
//   const router = useRouter();

//   useEffect(() => {
//     const prepareExam = async () => {
//       // 1. نجيب الـ track ID
//       const raw = localStorage.getItem("trackId");
//       if (!raw) {
//         setIsPreparing(false);
//         return;
//       }
      
//       const id = Number(raw);
//       if (Number.isNaN(id)) {
//         setIsPreparing(false);
//         return;
//       }
      
//       setIdTrack(id);

//       // 2. نشوف لو الامتحان مبدوء خلاص
//       const existingExamId = localStorage.getItem("idExam");
//       if (existingExamId) {
//         setIsPreparing(false);
//         // Prefetch الصفحة الجاية عشان تفتح بسرعة
//         router.prefetch("/assesment");
//         return;
//       }

//       // 3. نبدأ الامتحان في الخلفية
//       try {
//         const response = await start({ track_id: id });
//         localStorage.setItem("idExam", String(response.exam.id));
        
//         // Prefetch الصفحة الجاية
//         router.prefetch("/assesment");
//       } catch (err) {
//         console.error("Failed to start exam:", err);
//       } finally {
//         setIsPreparing(false);
//       }
//     };

//     prepareExam();
//   }, [start, router]);

//   const handleNext = () => {
//     // الانتقال فوراً لأن كل حاجة جاهزة
//     router.push("/assesment");
//   };

//   return (
//     <>
//       <Button
//         onClick={handleNext}
//         disabled={isPreparing}
//         className="bg-mainColor rounded-lg w-1/2 sm:w-1/3 dark:text-white transition-all"
//       >
//         {isPreparing ? (
//           <span className="flex items-center gap-2">
//             <span className="animate-spin">⏳</span>
//             Preparing...
//           </span>
//         ) : (
//           "Next"
//         )}
//       </Button>
//     </>
//   );
// }


// "use client";

// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";

// interface AssesmentWarningClientProps {
//   examId: string | null;
// }

// export default function AssesmentWarningClient({ examId }: AssesmentWarningClientProps) {
//   const router = useRouter();
//   const [isReady, setIsReady] = useState(false);

//   useEffect(() => {
//     // لو في examId من السيرفر، احفظه في localStorage
//     if (examId) {
//       localStorage.setItem("idExam", String(examId));
//       setIsReady(true);
      
//       // Prefetch الصفحة الجاية
//       router.prefetch("/assesment");
//     } else {
//       // لو مفيش examId، شوف لو في واحد محفوظ
//       const existingExamId = localStorage.getItem("idExam");
//       if (existingExamId) {
//         setIsReady(true);
//         router.prefetch("/assesment");
//       }
//     }
//   }, [examId, router]);

//   const handleNext = () => {
//     router.push("/assesment");
//   };

//   // لو لسه مش جاهز، نعرض loading بسيط
//   if (!isReady) {
//     return (
//       <Button
//         disabled
//         className="bg-mainColor rounded-lg w-1/2 sm:w-1/3 dark:text-white opacity-60"
//       >
//         <span className="flex items-center gap-2">
//           <span className="animate-spin">⏳</span>
//           Preparing...
//         </span>
//       </Button>
//     );
//   }

//   return (
//     <Button
//       onClick={handleNext}
//       className="bg-mainColor rounded-lg w-1/2 sm:w-1/3 dark:text-white transition-all hover:bg-blue-600 hover:scale-105"
//     >
//       Next
//     </Button>
//   );
// }

"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface AssesmentWarningClientProps {
  examId: string | null;
}

export default function AssesmentWarningClient({ examId }: AssesmentWarningClientProps) {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    if (examId) {
      localStorage.setItem("idExam", String(examId));
      setIsReady(true);
      router.prefetch("/assesment");
    } else {
      const existingExamId = localStorage.getItem("idExam");
      if (existingExamId) {
        setIsReady(true);
        router.prefetch("/assesment");
      }
    }
  }, [examId, router]);

  const handleNext = async () => {
    setIsNavigating(true);
    try {
      await router.push("/assesment");
    } finally {
      setIsNavigating(false);
    }
  };

  if (!isReady) {
    return (
      <Button disabled className="bg-mainColor rounded-lg w-1/2 sm:w-1/3 dark:text-white opacity-60">
        <span className="flex items-center gap-2">
          <span className="animate-spin">⏳</span>
          Preparing...
        </span>
      </Button>
    );
  }

  return (
    <Button
      onClick={handleNext}
      disabled={isNavigating}
      className="bg-mainColor rounded-lg w-1/2 sm:w-1/3 dark:text-white transition-all hover:bg-blue-600 hover:scale-105"
    >
      {isNavigating ? "Loading..." : "Next"}
    </Button>
  );
}
