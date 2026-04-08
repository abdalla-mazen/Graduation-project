// "use server";

// import getToken from "@/lib/utils/get-token";

// interface VisionPayload {
//   exam_id: number;
//   image: string;
// }

// export interface VisionCheckResponse {
//   invalidated: boolean;
//   ok: boolean;
//   inactive?: boolean;
//   error?: string;
//   result?: {
//     eye_contact?: boolean;
//   };
//   strikes?: number;
// }

// export async function sendVisionFrame(
//   payload: VisionPayload,
// ): Promise<VisionCheckResponse | null> {
//   const token = await getToken();

//   try {
//     const res = await fetch(`${process.env.API}/exams/vision-check`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token?.accessToken}`,
//       },
//       body: JSON.stringify(payload),
//     });

//     let payloadData: Partial<VisionCheckResponse> | null = null;

//     try {
//       payloadData = (await res.json()) as Partial<VisionCheckResponse>;
//     } catch {
//       payloadData = null;
//     }

//     const error =
//       typeof payloadData?.error === "string" ? payloadData.error : "Vision check failed";
//     const inactive =
//       payloadData?.inactive === true || error.toLowerCase().includes("inactive");

//     return {
//       ok: res.ok,
//       invalidated: payloadData?.invalidated === true,
//       inactive,
//       error: res.ok ? undefined : error,
//       result: payloadData?.result,
//       strikes: typeof payloadData?.strikes === "number" ? payloadData.strikes : undefined,
//     };
//   } catch (error) {
//     console.error("Vision Error:", error);
//     return null;
//   }
// }


"use server";

import getToken from "@/lib/utils/get-token";

interface VisionPayload {
  exam_id: number;
  image: string;
}

export interface VisionCheckResponse {
  invalidated: boolean;
  ok: boolean;
  inactive?: boolean;
  error?: string;
  result?: {
    eye_contact?: boolean;
  };
  strikes?: number;
}

export async function sendVisionFrame(
  payload: VisionPayload,
): Promise<VisionCheckResponse | null> {
  const token = await getToken();

  try {
    const res = await fetch(`${process.env.API}/exams/vision-check`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.accessToken}`,
      },
      body: JSON.stringify(payload),
    });

    let payloadData: Partial<VisionCheckResponse> | null = null;

    try {
      payloadData = (await res.json()) as Partial<VisionCheckResponse>;
    } catch {
      payloadData = null;
    }

    const error =
      typeof payloadData?.error === "string" ? payloadData.error : "Vision check failed";

    const inactive =
      payloadData?.inactive === true || error.toLowerCase().includes("inactive");

    return {
      ok: res.ok,
      invalidated: payloadData?.invalidated === true,
      inactive,
      error: res.ok ? undefined : error,
      result: payloadData?.result,
      strikes: typeof payloadData?.strikes === "number" ? payloadData.strikes : undefined,
    };
  } catch (error) {
    console.error("Vision Error:", error);
    return null;
  }
}