
import { useMutation } from "@tanstack/react-query";
import { changeProfile } from "../_actions/profile.action";
import { StudentPathPayload } from "../_componnents/form";
import { useRouter } from "next/navigation";

export const useChangeProfile = () => {
const router = useRouter()
  return useMutation({
    mutationFn: (payload: StudentPathPayload) => changeProfile(payload),

    onSuccess: async (data) => {
      
    router.replace("/login")
     
    },

    onError: (error) => {
      console.error("Error:", error);
    },
  });
};
