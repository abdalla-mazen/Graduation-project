import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { addProjectAction } from "../_actions/add-project.action";
import { AddProjectValues } from "@/lib/schemas/add-project.schema";

export default function useAddProject() {
  const { error, isPending, mutateAsync } = useMutation<
    Awaited<ReturnType<typeof addProjectAction>>,
    Error,
    AddProjectValues
  >({
    mutationFn: async (values) => {
      const payload: AddProjectValues = {
        title: values.title,
        description: values.description,
        github_url: values.github_url,
        demo_url: values.demo_url,
        skills: [...values.skills],
      };

      return addProjectAction(payload);
    },
    onSuccess: () => {
      toast.success("Project added successfully.", {
        description: "Your new project has been saved to the portfolio.",
      });
    },
    onError: (error) => {
      toast.error("Failed to add project.", {
        description: error.message || "Please try again.",
      });
    },
  });

  return { isPending, error, addProject: mutateAsync };
}
