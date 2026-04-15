"use server";

import getToken from "@/lib/utils/get-token";
import { revalidatePath } from "next/cache";

export async function publishQuestions(id: number) {
  const token = await getToken();
  const res = await fetch(`${process.env.API}/academic-exams/${id}/publish`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token?.accessToken}`,
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to publish questions");
  revalidatePath(`/past-exams`);
  return data;
}
