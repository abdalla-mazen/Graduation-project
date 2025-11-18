import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  try {
    // TODO: Enable token-based authentication once user login flow is complete
    // const token = cookies().get("token")?.value;

    // if (!token) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    // Constants (from environment variables)
    const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
    const TOKEN = process.env.NOTIFICATIONS_API_TOKEN;

    if (!API_BASE || !TOKEN) {
      return NextResponse.json(
        { error: "Missing API configuration" },
        { status: 500 }
      );
    }

    // Fetch unread notifications count from the backend API
    const res = await fetch(`${API_BASE}/unread-count`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch unread count" },
        { status: res.status }
      );
    }

    const data = await res.json();

    // Return the fetched data to the client
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching unread count:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
