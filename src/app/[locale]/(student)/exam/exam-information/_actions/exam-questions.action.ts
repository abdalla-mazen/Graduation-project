"use server";

import getToken from "@/lib/utils/get-token";

export async function getExamQuestions(examId: number) {
  const token = await getToken()
  const res = await fetch(
    `${process.env.API}/academic-exams/${examId}/start`,
    {
      method: "POST",
      headers : {
        "Content-Type": "application/json",
         Authorization: `Bearer ${token?.accessToken}`,
      }
    }

  );
  const payload = await res.json()

  if (!res.ok) {
    throw new Error("Failed to fetch exam questions");
  }

  return payload
}