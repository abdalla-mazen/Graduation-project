import { authOptions } from "@/auth"
import { getServerSession } from "next-auth"
import getToken from '@/lib/utils/get-token';
export async function  getCourses() {
    const session = await getServerSession(authOptions)
    console.log(session)
    const Token = await getToken() 
    console.log(Token?.accessToken)
    const res = await fetch (`${process.env.API}/academic/semester_courses?track_id=${session?.user.trackId}&department_id=1&semester=${session?.user.currentSemester}`,{
        headers :{
        Authorization: `Bearer ${Token?.accessToken}`
        }})
        const payload = await res.json()
        if (!res.ok) {
            throw new Error ("Failed to fetch courses")
        }
       return payload

}