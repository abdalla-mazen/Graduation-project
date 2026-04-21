import { useMutation } from "@tanstack/react-query"
import { CertificateFormValues } from "@/lib/schemas/add-ceritficate.schema"
import { addCertificate } from "../_actions/addCertifivate.actions"
import { useRouter } from "next/navigation"

export function useAddCertificate() {
    const router = useRouter()
    return useMutation({
        mutationFn: (data: CertificateFormValues) => addCertificate(data),
        onSuccess: () => {
            console.log("Certificate added successfully")
                        router.push("/certificates/get-certificate") 
            
        },
        onError: (error) => {
            console.error(error)
        },
    })
}