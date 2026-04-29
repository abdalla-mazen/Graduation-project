import { NextResponse } from "next/server";

type ChatRequest = {
  message: string;
};

type ChatResponse = {
  response: string;
};

const CHATBOT_API_URL = "https://chat.nexxuus.site/chat";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ChatRequest;

    if (!body.message || body.message.trim() === "") {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 }
      );
    }

    const apiResponse = await fetch(CHATBOT_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: body.message.trim(),
      }),
      cache: "no-store",
    });

    if (!apiResponse.ok) {
      const errorText = await apiResponse.text();

      return NextResponse.json(
        {
          error: "Chatbot API request failed.",
          details: errorText,
        },
        { status: apiResponse.status }
      );
    }

    const data = (await apiResponse.json()) as ChatResponse;

    return NextResponse.json(data);
  } catch (error) {
    console.error("Nexus ChatBot proxy error:", error);

    return NextResponse.json(
      { error: "Failed to connect to chatbot service." },
      { status: 500 }
    );
  }
}
