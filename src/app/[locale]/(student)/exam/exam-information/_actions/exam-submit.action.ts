"use server";

import { ExamSubmitPayload } from "@/lib/types/exam-submit";
import getToken from "@/lib/utils/get-token";
import { revalidatePath } from "next/cache";

export async function submitExamAction(
  examId: number,
  payload: ExamSubmitPayload
) {
  const token = await getToken();

  const res = await fetch(`${process.env.API}/academic-exams/${examId}/submit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token?.accessToken}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || "Failed to submit exam");
  }
  revalidatePath("/exam/exam-information")
  return data;
}