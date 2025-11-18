import "server-only";

import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export default async function getToken() {
  const tokenCookie = cookies().get("next-auth.session-token")?.value;

  if (!tokenCookie) return null;

  try {
    const jwt = await decode({
      token: tokenCookie,
      secret: process.env.NEXTAUTH_SECRET!,
    });

    return jwt;
  } catch (error) {
    console.error("JWT decode error:", error);

    return null;
  }
}
