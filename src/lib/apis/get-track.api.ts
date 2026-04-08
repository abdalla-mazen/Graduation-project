export default async function getTracks() {
    const res = await fetch(`${process.env.API}/academic/jobtrack/list`)

    if (res.ok) {
        const payload = await res.json()
        return payload
    }
    else {
        throw new Error ("error Fetching")
    }
    
}