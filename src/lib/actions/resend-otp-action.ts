"use server";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE!;

type ResendOtpResponse = {
  success: boolean;
  message?: string;
};

export async function resendOtpAction(email: string): Promise<ResendOtpResponse> {
  if (!email) return { success: false, message: "Email is required" };

  try {
    const res = await fetch(`${API_BASE}/auth/forgotPasswords`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data?.message || "Failed to resend OTP",
      };
    }

    return {
      success: true,
      message: data?.message || "New OTP sent successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Something went wrong",
    };
  }
}
