"use server";

import getToken from "@/lib/utils/get-token";



interface ProctorPayload {
  exam_id: number;
  type:
    | "copy"
    | "paste"
    | "tab_switch"
    | "blur"
    | "devtools"
    | "eye_away"
    | "phone_detected";
  meta?: Record<string, unknown>;
}

export async function  reportProctorEvent(payload: ProctorPayload) {
const token = await getToken();

  try {
    const res = await fetch(`${process.env.API}/exams/proctor`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.accessToken}`, 
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error("Failed to report event");
    }

    return await res.json();
  } catch (error) {
    console.error("Proctor Error:", error);
    return null;
  }
}