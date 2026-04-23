"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { deleteExperienceAction } from "@/app/[locale]/(student)/experience/_actions/delete-experience.action";

export default function useDeleteExperience() {
  const { error, isPending, mutateAsync } = useMutation<
    Awaited<ReturnType<typeof deleteExperienceAction>>,
    Error,
    number
  >({
    mutationFn: async (experienceId: number) => {
      return deleteExperienceAction(experienceId);
    },
    onSuccess: () => {
      toast.success("Experience deleted successfully.", {
        description: "The experience has been removed from your profile.",
      });
    },
    onError: (error) => {
      toast.error("Failed to delete experience.", {
        description: error.message || "Please try again.",
      });
    },
  });

  return { isPending, error, deleteExperience: mutateAsync };
}
