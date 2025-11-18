"use server";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE!;

type VerifyOtpResponse = {
  success: boolean;
  message?: string;
  data?: any;
};

export async function verifyOtpAction({
  otp,
  email,
}: {
  otp: string;
  email: string;
}): Promise<VerifyOtpResponse> {
  if (!otp || !email)
    return { success: false, message: "OTP and email are required" };

  try {
    const res = await fetch(`${API_BASE}/auth/verify-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ otp, email }),
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data?.message || "OTP verification failed",
      };
    }

    return {
      success: true,
      data,
      message: data?.message || "OTP verified successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Something went wrong",
    };
  }
}
