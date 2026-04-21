"use server"

import getToken from "@/lib/utils/get-token"
import { StudentPathPayload } from "../_componnents/form"

export async function changeProfile(payload: StudentPathPayload) {
    const token = await getToken()
    const res = await fetch(`${process.env.API}/profiles/setup`,
        {
            method : "POST" ,
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token?.accessToken}`,
            } ,
            
            body: JSON.stringify(payload)
        }

    )
    const data = await res.json()
    if (!res.ok) {
            throw new Error ("Failed Fetching")
        }
        return data

}