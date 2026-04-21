import { authOptions } from "@/auth"
import { getServerSession } from "next-auth"
import getToken from "../utils/get-token"

export async function getacadCourses() {
    const session = await getServerSession(authOptions)
    const token = await getToken()
    const res = await fetch(`${process.env.API}/academic/courses/semester/${session?.user.currentSemester}`, {
       headers : {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token?.accessToken}`,
    }
    })
    const payload =await res.json()
    if (!res.ok) {
        throw new Error ("Failed Fetched")
    }
    return payload
}