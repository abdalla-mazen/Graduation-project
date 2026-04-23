"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { updateExperienceAction } from "../_actions/update-experience.action";
import {
  AddExperienceValues,
  toExperiencePayload,
} from "@/lib/schemas/add-experience.schema";

type UpdateExperienceInput = {
  id: number;
  values: AddExperienceValues;
};

export default function useUpdateExperience() {
  const { error, isPending, mutateAsync } = useMutation<
    Awaited<ReturnType<typeof updateExperienceAction>>,
    Error,
    UpdateExperienceInput
  >({
    mutationFn: async ({ id, values }) => {
      return updateExperienceAction(id, toExperiencePayload(values));
    },
    onSuccess: () => {
      toast.success("Experience updated successfully.", {
        description: "Your experience has been updated.",
      });
    },
    onError: (error) => {
      toast.error("Failed to update experience.", {
        description: error.message || "Please try again.",
      });
    },
  });

  return { isPending, error, updateExperience: mutateAsync };
}
