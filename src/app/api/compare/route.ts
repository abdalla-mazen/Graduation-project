import { NextRequest, NextResponse } from "next/server";

const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiaGFzc2FuZmFycmFnIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoiaGFzc2FuQGV4YW1wbGUuY29tIiwiZXhwIjoxODAyNDQ5Mzk5LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDoxMjM0LyIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjcyOTUvYXBpIn0.pAFTjHaIPOoT0IDR9sMByI0sWe3MZuGPONmAL7EiKgE";


export async function POST(req: NextRequest) {
  const body = await req.json();

  const response = await fetch(
    "https://nexusporject.runasp.net/LinkedIn/CompareCv",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    }
  );

  if (!response.ok) {
    return NextResponse.json({ error: "Failed to compare" }, { status: response.status });
  }

  const data = await response.json();
  return NextResponse.json(data);
}