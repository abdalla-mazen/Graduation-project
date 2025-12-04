"use server";

import getToken from "@/lib/utils/get-token";



export async function 
SubmitAnsewerAssesment(data: any) {
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