import getToken from "../utils/get-token";

export async function getProjects() {
  const token = await getToken();
  const response = await fetch(`${process.env.API}/projects`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token?.accessToken}`,
    },
    cache: "no-store",
  });
  const payload = await response.json();
  if (!response.ok) {
    throw new Error("Failed Fetching");
  }
  return payload;
}
