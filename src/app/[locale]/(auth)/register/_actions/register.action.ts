"use server";

import { JSON_HEADER } from "@/lib/constants/shared.constant";
import { RegisterValues } from "@/lib/schemas/auth.schema";

export async function registerAction(data: RegisterValues) {
  try {
    const response = await fetch(`${process.env.API}/auth/signup`, {
      method: "POST",
      headers: JSON_HEADER,
      body: JSON.stringify(data),
    });

    const payload: ApiResponse<UserData> = await response.json();

    return payload;
  } catch (error) {
    console.error("Registration error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unexpected error",
    };
  }
}
