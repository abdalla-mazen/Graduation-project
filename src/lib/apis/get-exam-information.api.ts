import getToken from "../utils/get-token"

export async function getExamInformation() {
    const token = await getToken()
    const res = await fetch(`${process.env.API}/academic-exams/available`,{
        headers : {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token?.accessToken}`
        }, cache : "no-store"
        
    }) 
    const payload = await res.json()
    if (!res.ok) {
        throw new Error ("Failed Fetching")
    }
    return payload

}