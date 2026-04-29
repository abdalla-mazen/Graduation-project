export async function getResources(id: string) {


    const res = await fetch(`${process.env.API}/academic/courses/${id}/resources`)
    if (!res.ok) {
        throw new Error ("Failed Fetching")  
    }
    const payload = await res.json()
    return payload
}