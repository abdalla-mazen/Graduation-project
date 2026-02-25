import getToken from "../utils/get-token";

export async function GetAcademicTracks() {
  const token = await getToken();

  const response = await fetch(`${process.env.API}/academic/jobtrack/list`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token?.accessToken}`,
    },
  });
  const payload = await response.json();
  return payload;
}
