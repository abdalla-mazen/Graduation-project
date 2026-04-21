export default async function getSemester() {
    const res = await fetch(`${process.env.API}/academic/available_semesters/1`)
    if (!res.ok) {
        throw new Error ("Error Fetching")
    }
    const payload = await res.json()
    return payload
}