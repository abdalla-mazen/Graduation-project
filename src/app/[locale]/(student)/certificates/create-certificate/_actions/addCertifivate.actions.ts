// "use server"

// import getToken from "@/lib/utils/get-token"

// export async function addCerfificate(data) {
//     const token = await getToken()
//     const res = await fetch(`${process.env.API}/certificates/add`,{
//         method : "POST" ,
//          headers: {
//          "Content-Type": "application/json",
//          Authorization: `Bearer ${token?.accessToken}`,
//     },
    
//     })
    
// }

"use server"

import getToken from "@/lib/utils/get-token"
import { CertificateFormValues } from "@/lib/schemas/add-ceritficate.schema"

export async function addCertificate(data: CertificateFormValues) {
    const token = await getToken()
    const res = await fetch(`${process.env.API}/certificates/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token?.accessToken}`,
        },
        body: JSON.stringify({
            title: data.title,
            provider: data.provider,
            credential_url: data.credential_url,
            skill_id: data.skill_id,
            issue_date: data.issue_date,
        }),
    })
      const payload = await res.json()
    if (!res.ok) {
    throw new Error("Failed to add certificate")
}

return payload
}