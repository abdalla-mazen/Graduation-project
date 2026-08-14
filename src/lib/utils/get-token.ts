


import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export default async function getToken() {
  const cookieStore = cookies();
  const tokenCookie =
    cookieStore.get("__Secure-next-auth.session-token")?.value ??
    cookieStore.get("next-auth.session-token")?.value ??
    cookieStore.get("__Secure-authjs.session-token")?.value ??
    cookieStore.get("authjs.session-token")?.value;

  if (!tokenCookie) return null;
  if (!process.env.NEXTAUTH_SECRET) {
    console.error("NEXTAUTH_SECRET is missing");
    return null;
  }

  try {
    const jwt = await decode({
      token: tokenCookie,
      secret: process.env.NEXTAUTH_SECRET,
    });

    return jwt;
  } catch (error) {
    console.error("JWT decode error:", error);

    return null;
  }
}
