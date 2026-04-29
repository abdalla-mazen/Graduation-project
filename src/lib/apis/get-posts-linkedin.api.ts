import { authOptions } from "@/auth"
import { getServerSession } from "next-auth"

export default async function getPostsLinkedIn(){
    const session = await getServerSession(authOptions)
    const res = await fetch(`${process.env.API_URL}/get-posts/${process.env.Agent_ID_Posts}?track=${session?.user.trackName}`)
    if (!res.ok) {
        throw new Error("Error fetching")
    }
    const payload = await res.json() 
    return payload
}