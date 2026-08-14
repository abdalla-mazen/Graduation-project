import { SkillsResponse } from "../types/skills-user";
import { apiFetchJson } from "./api-fetch";

type SkillsPayload = SkillsResponse & {
  skills?: SkillsResponse;
};

export async function getSkills() {
  return apiFetchJson<SkillsPayload>("/skills/", {
    context: "getSkills",
  });
}
