export  async function  getSkills() {
    const resposne = await fetch(`${process.env.API}/skills/`)
    const payload = await resposne.json()
if (!resposne.ok) {
    throw new Error ("Failed Fetching")
}
    return payload
}