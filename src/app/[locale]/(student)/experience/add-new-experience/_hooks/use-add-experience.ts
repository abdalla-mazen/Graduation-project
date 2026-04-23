"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { addExperienceAction } from "../_actions/add-experience.action";
import {
  AddExperienceValues,
  toExperiencePayload,
} from "@/lib/schemas/add-experience.schema";

export default function useAddExperience() {
  const { error, isPending, mutateAsync } = useMutation<
    Awaited<ReturnType<typeof addExperienceAction>>,
    Error,
    AddExperienceValues
  >({
    mutationFn: async (values) => {
      return addExperienceAction(toExperiencePayload(values));
    },
    onSuccess: () => {
      toast.success("Experience added successfully.", {
        description: "Your new experience has been saved to your profile.",
      });
    },
    onError: (error) => {
      toast.error("Failed to add experience.", {
        description: error.message || "Please try again.",
      });
    },
  });

  return { isPending, error, addExperience: mutateAsync };
}
