"use server";

export default async function createCvAction() {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiaGFzc2FuZmFycmFnIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoiaGFzc2FuQGV4YW1wbGUuY29tIiwiZXhwIjoxODAyNDQ5Mzk5LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDoxMjM0LyIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjcyOTUvYXBpIn0.pAFTjHaIPOoT0IDR9sMByI0sWe3MZuGPONmAL7EiKgE";

  const response = await fetch(`${process.env.API_URL}/cv/generate-cv`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    await response.text();
    throw new Error(`API Error: ${response.status}`);
  }

  const arrayBuffer = await response.arrayBuffer();

  const base64 = Buffer.from(arrayBuffer).toString("base64");
  return { base64, contentType: "application/pdf" };
}
