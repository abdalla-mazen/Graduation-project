import getToken from "../utils/get-token";

export async function getNotifications() {
  if (!process.env.API) {
    return { notifications: [] };
  }

  const token = await getToken();
  if (!token?.accessToken) {
    return { notifications: [] };
  }

  const res = await fetch(`${process.env.API}/notifications`, {
    cache: "no-store",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token?.accessToken}`,
    },
  });
  const payload = await res.json();

  if (!res.ok) {
    return { notifications: [] };
  }
  return payload;
}
