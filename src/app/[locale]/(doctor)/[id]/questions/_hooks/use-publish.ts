import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "@/i18n/navigation";
import { publishQuestions } from "../_actions/publish-questions.action";

export default function usePublish(id: number) {
  const router = useRouter();

  const {
    isPending,
    error,
    mutate: mutation,
  } = useMutation<Awaited<ReturnType<typeof publishQuestions>>, Error>({
    mutationFn: async () => {
      return await publishQuestions(id);
    },
    onSuccess: () => {
      toast.success("Exam published successfully.", {
        description: "Redirecting to past exams.",
      });
      router.push("/past-exams");
    },
    onError: (error) => {
      toast.error("Failed to publish exam.", {
        description: error.message || "Please try again.",
      });
    },
  });

  return {
    isPending,
    error,
    publish: mutation,
  };
}
