"use server";

import getToken from "@/lib/utils/get-token";
import { revalidatePath } from "next/cache";

export async function submitGradeAction(id: number, score: number, feedback: string) {
  const token = await getToken();

  const response = await fetch(`${process.env.API}/academic-exams/answer/${id}/grade`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token?.accessToken}`,
    },
    body: JSON.stringify({
      score,
      feedback,
    }),
  });

  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload.error || "Failed to submit grade");
  }
  revalidatePath(`/${id}/results`);
  return payload;
}
