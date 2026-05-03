import getToken from "../utils/get-token";
import { CertificatesResponse } from "../types/certificate-user";
import { apiFetchJson } from "./api-fetch";

export async function getCertificates() {
  const token = await getToken();

  return apiFetchJson<CertificatesResponse>("/certificates", {
    context: "getCertificates",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token?.accessToken}`,
    },
  });
}
