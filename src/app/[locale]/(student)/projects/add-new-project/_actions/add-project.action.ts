"use server";

import { AddProjectValues } from "@/lib/schemas/add-project.schema";
import getToken from "@/lib/utils/get-token";
import { revalidatePath } from "next/cache";

export async function addProjectAction(data: AddProjectValues) {
  const token = await getToken();

  const response = await fetch(`${process.env.API}/projects/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token?.accessToken}`,
    },
    body: JSON.stringify(data),
  });
  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      payload?.message ?? payload?.error ?? "Failed to add project."
    );
  }

  revalidatePath("/projects");

  return payload;
}
