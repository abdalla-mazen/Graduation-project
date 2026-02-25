// "use server"

// import getToken from "@/lib/utils/get-token";


// export async function finishExamAPI(exam_id: number) {
//     const token = await getToken();
//   const res = await fetch(`${process.env.API}/exams/finish`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify({ exam_id }),
//   });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.error || "Failed to finish exam");
//   return data;
// }
"use server"

import getToken from "@/lib/utils/get-token";

export async function finishExamAPI(exam_session_id: number) {
  try {
    const token = await getToken();
    
    if (!token) {
      return { error: "Authentication required" };
    }

    if (!exam_session_id || isNaN(exam_session_id)) {
      return { error: "Invalid exam session ID" };
    }

    console.log('Finishing exam session:', exam_session_id);

    const res = await fetch(`${process.env.API}/exams/finish`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.accessToken}`,
      },
      body: JSON.stringify({ exam_id: exam_session_id }), // الـ key لازم يكون exam_id
    });

    if (!res.ok) {
      const data = await res.json();
      console.error('API Error:', data);
      return { error: data.error || "Failed to finish exam" };
    }

    const data = await res.json();
    console.log('Exam finished:', data);

    return { 
      success: true, 
      score: data.score,
      invalidated: data.invalidated,
      finished_at: data.finished_at
    };
    
  } catch (error) {
    console.error("Error in finishExamAPI:", error);
    return { 
      error: error instanceof Error ? error.message : "An unexpected error occurred" 
    };
  }
}