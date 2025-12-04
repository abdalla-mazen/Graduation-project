import { cookies } from "next/headers";
import getToken from "../utils/get-token";

export async function GetQuestionsAssesment(  ) {
  const token = await getToken();
const track = cookies().get("track")?.value;
  const response = await fetch(`${process.env.API}/assessment/questions/${track}`, {
    headers: {
      Authorization: `Bearer ${token?.accessToken}`,
      "Content-Type": "application/json",
    },
    method: "GET",
     cache: "no-store",
  });
  const payload = await response.json();
  return payload;
}
