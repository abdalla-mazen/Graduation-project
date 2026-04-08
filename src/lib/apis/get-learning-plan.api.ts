import { getSession } from "next-auth/react";
import { JSON_HEADER } from "../constants/shared.constant";
import getToken from "../utils/get-token";

export default async function getLearningPlan() {
  const token = await getToken();
  const session = await getSession();
  console.log("ss", session?.user?.trackId);
  const res = await fetch(`${process.env.API}/learning/advanced_plan`, {
    headers: {
      ...JSON_HEADER,
      Authorization: `Bearer ${token?.accessToken}`,
    },
    body: JSON.stringify({
      track_id: session?.user?.trackId,
    }),
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Error Fetching");
  }
  const payload = await res.json();
  return payload;
}
