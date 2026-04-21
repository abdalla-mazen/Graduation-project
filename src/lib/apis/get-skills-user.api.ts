import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export async function getUserSkills() {
    const session = await getServerSession(authOptions)
    const res = await fetch(`${process.env.API}/skills/track/${session?.user.trackId}`)

    
    if (!res.ok) {
        throw new Error ("Faild Fetching")
    }
    const payload =await res.json()

    return payload
}