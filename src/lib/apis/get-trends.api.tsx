import { getServerSession } from "next-auth"
import getToken from "../utils/get-token"
import { authOptions } from "@/auth"

export async function getTrends() {
    const token = await getToken()
    const session = await getServerSession(authOptions)
    const res = await fetch(`${process.env.API}/market-trends?track_id=${session?.user.trackId}&limit=10`,{
        headers : {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token?.accessToken}`
        }
    })

    if (!res.ok) {
        throw new Error ("Failed Fetching")
    }
    const payload = res.json()
    return payload
}