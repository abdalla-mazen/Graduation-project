import getToken from "../utils/get-token";

export async function getUnReadCount() {
  if (!process.env.API) {
    return { unread_count: 0 };
  }

  const token = await getToken();
  if (!token?.accessToken) {
    return { unread_count: 0 };
  }

  const res = await fetch(`${process.env.API}/notifications/unread-count`, {
    cache: "no-store",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token?.accessToken}`,
    },
  });
  const payload = await res.json();
  if (!res.ok) {
    return { unread_count: 0 };
  }
  return payload;
}
