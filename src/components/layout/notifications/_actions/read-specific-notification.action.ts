"use server"

import getToken from "@/lib/utils/get-token"
import { revalidatePath } from "next/cache"

export async function readSpecificNotification(notif_id : string) {
    const token =await getToken() 
    const res = await fetch(`${process.env.API}/notifications/${notif_id}/read`,{
        method : "PATCH",
         headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token?.accessToken}`,
    },
    })
    const payload = await res.json()
    if (!res.ok) {
        throw new Error ("Failed Fetching")
    }
    revalidatePath("/")
    return payload

}