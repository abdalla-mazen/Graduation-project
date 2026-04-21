import { authOptions } from "@/auth"
import { getServerSession } from "next-auth"

export default async function getfaculties() {
    const session = await getServerSession(authOptions)
    const res = await fetch(`${process.env.API}/academic/faculties/${session?.user.universityId}`)
    if (!res.ok) {
        throw new Error ("Error Fetching")
    }
    const payload = await res.json()
    return payload
}