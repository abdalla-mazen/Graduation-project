import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";

export default async function getJobs() {
  const session = await getServerSession(authOptions);

  const res = await fetch(
    `${process.env.API_URL}/get-jobs/${process.env.Agent_ID_JOBS}?track=${session?.user.trackName}`,
    {
      cache: "no-store",
    },
  );
  if (!res.ok) {
    throw new Error("Error Fetching");
  }

  const payload = await res.json();
  console.log("sssss", payload);

  return payload;
}
