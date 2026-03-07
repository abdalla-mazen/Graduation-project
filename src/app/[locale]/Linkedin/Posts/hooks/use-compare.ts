import { useMutation } from "@tanstack/react-query";
import compareAction from "../_actions/compare.action";
import { LinkedinPost } from "@/lib/types/posts";

export default function useCompare() {
    const { error, isPending, mutate } = useMutation({
        mutationFn: async (values : LinkedinPost ) => {
          const response = await compareAction(values);
    
          if ("error" in response) {
            throw new Error(response.error);
          } 
          return response;
        },
      });
    
      return { isPending, error, compare: mutate };
}