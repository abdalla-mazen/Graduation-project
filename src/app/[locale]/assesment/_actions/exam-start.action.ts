"use server";

import getToken from "@/lib/utils/get-token";

export async function startExamAction(data: Record<string, number>) {
  const token = await getToken();

  const response = await fetch(`${process.env.API}/exams/start`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token?.accessToken}`,
    },
    body: JSON.stringify(data),
  });
  const payload = await response.json();
  console.log(payload);
  return payload;
}
