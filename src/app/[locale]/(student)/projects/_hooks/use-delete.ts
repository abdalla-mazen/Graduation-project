"use client";

// import { useMutation } from "@tanstack/react-query";
// import { toast } from "sonner";

// import { AddProjectValues } from "@/lib/schemas/add-project.schema";

// export default function useAddProject() {
//   const { error, isPending, mutateAsync } = useMutation<
//     Awaited<ReturnType<typeof addProjectAction>>,
//     Error,
//     AddProjectValues
//   >({
//     mutationFn: async (values) => {
//       const payload:  = {
//         title: values.title,
//         description: values.description,
//         github_url: values.github_url,
//         demo_url: values.demo_url,
//         skills: [...values.skills],
//       };

//       return deleteProjectAction(payload);
//     },
//     onSuccess: () => {
//       toast.success("Project added successfully.", {
//         description: "Your new project has been saved to the portfolio.",
//       });
//     },
//     onError: (error) => {
//       toast.error("Failed to add project.", {
//         description: error.message || "Please try again.",
//       });
//     },
//   });

//   return { isPending, error, addProject: mutateAsync };
// }

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { deleteProjectAction } from "@/app/[locale]/(student)/projects/_actions/delete-project.action";

export default function useDeleteProject() {
  const { error, isPending, mutateAsync } = useMutation<
    Awaited<ReturnType<typeof deleteProjectAction>>,
    Error,
    number
  >({
    mutationFn: async (projectId: number) => {
      return deleteProjectAction(projectId);
    },
    onSuccess: () => {
      toast.success("Project deleted successfully.", {
        description: "The project has been removed from the portfolio.",
      });
    },
    onError: (error) => {
      toast.error("Failed to delete project.", {
        description: error.message || "Please try again.",
      });
    },
  });

  return { isPending, error, deleteProject: mutateAsync };
}
