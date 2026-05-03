import getToken from "../utils/get-token";
import { Projects } from "../types/project";
import { apiFetchJson } from "./api-fetch";

export async function getProjects() {
  const token = await getToken();

  return apiFetchJson<Projects>("/projects", {
    context: "getProjects",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token?.accessToken}`,
    },
    cache: "no-store",
  });
}
