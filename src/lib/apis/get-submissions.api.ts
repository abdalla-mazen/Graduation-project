import getToken from "../utils/get-token";

export async function getSubmissions(id: number) {
  const token = await getToken();

  const response = await fetch(`${process.env.API}/academic-exams/${id}/submissions`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token?.accessToken}`,
    },
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch questions: ${response.status}`);
  }

  const payload = await response.json();
  return payload;
}
