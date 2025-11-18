"use server";

export async function newPassword(data: Record<string, FormDataEntryValue>) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API}/auth/resetPassword`,
    {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const payload = await response.json();
  return payload;
}
