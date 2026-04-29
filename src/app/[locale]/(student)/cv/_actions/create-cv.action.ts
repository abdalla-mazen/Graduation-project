"use server";

import { CVData } from "@/lib/types/create-cv";

export default async function createCvAction(payload : CVData) {
 
  const response = await fetch(`https://app2.nexxuus.site/api/generate_cv/`, {
    method: "POST",
     headers: {
    "Content-Type": "application/json",
  },
    body: JSON.stringify(payload),
  
  });

  if (!response.ok) {
    await response.text();
    throw new Error(`API Error: ${response.status}`);
  }

  const arrayBuffer = await response.arrayBuffer();

  const base64 = Buffer.from(arrayBuffer).toString("base64");
  return { base64, contentType: "application/pdf" };
}
