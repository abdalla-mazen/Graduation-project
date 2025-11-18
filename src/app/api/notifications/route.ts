import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Constants (from environment variables)
    const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
    const TOKEN = process.env.NOTIFICATIONS_API_TOKEN;

    if (!API_BASE || !TOKEN) {
      return NextResponse.json(
        { error: "Missing API configuration" },
        { status: 500 }
      );
    }

    // 🔹 Fetch notifications from the external API
    const res = await fetch(`${API_BASE}/user`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch notifications" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
