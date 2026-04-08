"use server";

import getToken from "@/lib/utils/get-token";

 interface SubmitAnswerRequest {
  exam_id: number;
  question_id: number;
  option_id: number;
}

export async function SubmitAnsewerAssesment(data: SubmitAnswerRequest) {
  const token = await getToken();
  const response = await fetch(`${process.env.API}/exams/answer`, {
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
