export default async function getPosts(){
    const res = await fetch(`https://nexusporject.runasp.net/LinkedIn/GetJobs`,
        {
            headers : {
                Token : process.env.API_TOKEN as string
            } ,
            cache : "no-store"
        } 
    )
    if (!res.ok) {
        throw new Error("Error fetching")
    }
    const payload = await res.json() 
    return payload
}