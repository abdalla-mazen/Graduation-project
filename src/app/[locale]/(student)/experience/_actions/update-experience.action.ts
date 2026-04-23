"use server";

import { UpdateExperiencePayload } from "@/lib/schemas/add-experience.schema";
import { Experience } from "@/lib/types/experience";
import getToken from "@/lib/utils/get-token";
import { revalidatePath } from "next/cache";

export async function updateExperienceAction(
  id: number,
  data: UpdateExperiencePayload
): Promise<Experience> {
  const token = await getToken();

  const response = await fetch(`${process.env.API}/experience/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token?.accessToken}`,
    },
    body: JSON.stringify(data),
  });
  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      payload?.message ?? payload?.error ?? "Failed to update experience."
    );
  }

  revalidatePath("/experience");

  return payload;
}
