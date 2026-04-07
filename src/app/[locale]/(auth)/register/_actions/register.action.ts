"use server";
import { JSON_HEADER } from "@/lib/constants/shared.constant";
import { ApiResponse } from "@/lib/types/register";
import { RegisterPayload } from "@/lib/types/registerPayload";

export async function registerAction(data: RegisterPayload) {
  console.log(process.env.API);
  try {
    const response = await fetch(`${process.env.API}/auth/register`, {
      method: "POST",
      headers: JSON_HEADER,
      body: JSON.stringify(data),
    });

    const payload = await response.json();

    if (!response.ok) {
      return {
        ok: false,
        error: payload.error ?? "Registration failed",
      };
    }

    return { ...payload, ok: true } as ApiResponse;
  } catch (error) {
    console.error("Registration error:", error);
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Unexpected error",
    };
  }
}
