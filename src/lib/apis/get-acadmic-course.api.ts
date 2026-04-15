import getToken from "../utils/get-token";

export default async function getAcadmicCourse() {
  const token = await getToken();
  const response = await fetch(`${process.env.API}/academic/courses/all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token?.accessToken}`,
    },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch questions: ${response.status}`);
  }
  const payload = await response.json();
  return payload;
}
