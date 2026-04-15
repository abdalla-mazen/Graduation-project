import getToken from "../utils/get-token";

export default async function getDoctorExams() {
  const token = await getToken();
  const res = await fetch(`${process.env.API}/academic-exams/my-exams`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token?.accessToken}`,
    },
    cache: "no-store",
  });

  const payload = await res.json();
  return payload;
}
