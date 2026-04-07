export default async function  getUniversities() {
    const res = await fetch(`${process.env.API}/academic/universities`)
    if (!res.ok) {
        throw new Error ("Error Fetching")
    }
    const payload = await res.json()
    return payload
}