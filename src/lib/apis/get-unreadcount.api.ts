import getToken from "../utils/get-token";

export async function getUnReadCount() {
    const token = await getToken()
    const res = await fetch(`${process.env.API}/notifications/unread-count`,{
        cache : "no-store" ,
        method : "GET" ,
        headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token?.accessToken}`,
    },
    })
    const payload =await res.json()
    if (!res.ok) {
        throw new Error ("Failed Fetching")
    }
    return payload

}