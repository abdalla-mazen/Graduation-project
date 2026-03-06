import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import https from "https";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const externalForm = new FormData();
    externalForm.append("file", file);

    const response = await axios.post(
      `https://app2.nexxuus.site/api/analyze_cv/`,
      externalForm,
      {
        httpsAgent: new https.Agent({ rejectUnauthorized: false }), 
   
      }
    );

    return NextResponse.json(response.data);

  } catch (err: string | any) {
    console.error("Route handler error:", err?.message);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}