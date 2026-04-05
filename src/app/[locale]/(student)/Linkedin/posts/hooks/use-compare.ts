// import { useMutation } from "@tanstack/react-query";
// import compareAction from "../_actions/compare.action";
// import { LinkedinPost } from "@/lib/types/posts";

// export default function useCompare() {
//     const { error, isPending, mutate } = useMutation({
//         mutationFn: async (values : LinkedinPost ) => {
//           const response = await compareAction(values);
    
//           if ("error" in response) {
//             throw new Error(response.error);
//           } 
//           return response;
//         },
//       });
    
//       return { isPending, error, compare: mutate };
// }

import { useMutation } from "@tanstack/react-query";
import compareAction from "../_actions/compare.action";
import { LinkedinPost } from "@/lib/types/posts";



type CompareResponse = {
  score: number;
  matched_skills: string[];
  unmatched_skills: string[];
  experience_match: boolean;
  education_match: boolean;
  analysis: string;
  hr_email: string;
};

export default function useCompare(onSuccess?: (data: CompareResponse) => void) {
    const { error, isPending, mutate } = useMutation({
        mutationFn: async (values: LinkedinPost) => {
          const response = await compareAction(values);
          if ("error" in response) {
            throw new Error(response.error);
          } 
          return response;
        },
        onSuccess: (data) => {
          onSuccess?.(data); // ✅ بيبعت الـ data للـ page
        },
    });
    
    return { isPending, error, compare: mutate };
}