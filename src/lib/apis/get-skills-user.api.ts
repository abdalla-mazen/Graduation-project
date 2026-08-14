import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { SkillsResponse } from "../types/skills-user";
import { apiFetchJson } from "./api-fetch";

export async function getUserSkills() {
  const session = await getServerSession(authOptions);
  const trackId = session?.user.trackId;

  if (!trackId) {
    throw new Error("[getUserSkills] Missing user track id.");
  }

  return apiFetchJson<SkillsResponse>(`/skills/track/${trackId}`, {
    context: "getUserSkills",
  });
}
