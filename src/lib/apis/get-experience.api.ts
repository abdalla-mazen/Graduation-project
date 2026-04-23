import getToken from "../utils/get-token";
import { Experiences } from "../types/experience";

export async function getExperience(): Promise<Experiences> {
  const token = await getToken();
  const response = await fetch(`${process.env.API}/experience/`, {
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
