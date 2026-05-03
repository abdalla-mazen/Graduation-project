import getToken from "../utils/get-token";
import { Experiences } from "../types/experience";
import { apiFetchJson } from "./api-fetch";

export async function getExperience(): Promise<Experiences> {
  const token = await getToken();

  return apiFetchJson<Experiences>("/experience/", {
    context: "getExperience",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token?.accessToken}`,
    },
    cache: "no-store",
  });
}
