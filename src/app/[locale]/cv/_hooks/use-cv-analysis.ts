import { useRouter } from "@/i18n/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function cvFetch(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("/api/cv", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) throw new Error("Failed to upload file");

  const payload = await response.json();

  if ("error" in payload) {
    throw new Error((payload.error as string) || "Something went wrong");
  }

  return payload;
}

export default function useCvAnalysis() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { error, isPending, mutateAsync } = useMutation({
    mutationFn: cvFetch,
    onSuccess: (data) => {
      queryClient.setQueryData(["cv-analysis"], data);
      router.push("/cv-result");
    },
  });

  return { isPending, error, cv: mutateAsync };
}
