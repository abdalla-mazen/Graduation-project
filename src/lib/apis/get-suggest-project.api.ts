import type { TrackData } from "../types/get-suggest-project";
import getToken from "../utils/get-token";

export async function getSuggestProject(): Promise<TrackData> {
  const token = await getToken();
  const response = await fetch(`${process.env.API}/projects/suggested`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token?.accessToken}`,
    },
    cache: "no-store",
  });
  const payload = await response.json();
  if (!response.ok) {
    throw new Error("Failed Fetching");
  }
  return payload;
}
