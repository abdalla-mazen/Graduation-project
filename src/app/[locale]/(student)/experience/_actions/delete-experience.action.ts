"use server";

import { DeleteExperienceResponse } from "@/lib/types/experience";
import getToken from "@/lib/utils/get-token";
import { revalidatePath } from "next/cache";

export async function deleteExperienceAction(
  id: number
): Promise<DeleteExperienceResponse> {
  const token = await getToken();
  const response = await fetch(`${process.env.API}/experience/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token?.accessToken}`,
    },
  });
  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      payload?.message ?? payload?.error ?? "Failed to delete experience."
    );
  }

  revalidatePath("/experience");

  return payload;
}
