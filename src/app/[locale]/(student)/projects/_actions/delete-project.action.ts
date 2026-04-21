"use server"

import getToken from "@/lib/utils/get-token";
import { revalidatePath } from "next/cache";

export async function deleteProjectAction(id: number) {
    const token = await getToken();
    const res = await fetch(`${process.env.API}/projects/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token?.accessToken}`,
        },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to delete project");
    revalidatePath("/projects");
    return data;
}