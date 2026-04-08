// import { cookies } from "next/headers";
// import getToken from "../utils/get-token";

// export async function GetQuestionsAssesment(  ) {
//   const token = await getToken();
// const track = cookies().get("track")?.value;
//   const response = await fetch(`${process.env.API}/assessment/questions/${track}`, {
//     headers: {
//       Authorization: `Bearer ${token?.accessToken}`,
//       "Content-Type": "application/json",
//     },
//     method: "GET",
//      cache: "no-store",
//   });
//   const payload = await response.json();
//   return payload;
// }


import getToken from "../utils/get-token";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export async function GetQuestionsAssesment() {
  const token = await getToken();
  const session = await getServerSession(authOptions);

  const track = session?.user?.trackName;

  if (!track) {
    throw new Error("trackId not found in session");
  }

  if (!token?.accessToken) {
    throw new Error("accessToken not found");
  }


  const response = await fetch(
    `${process.env.API}/assessment/questions/${track}`,
    {
      method: "GET",
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch questions: ${response.status}`);
  }

  return await response.json();
}