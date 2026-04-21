import { z } from "zod";

export const addProjectSchema = z.object({
title: z.string().min(1, "Title is required"),
description: z.string().max(4000),
github_url: z.string(),
demo_url: z.string(),
skills: z.array(z.string()).min(1, "At least one skill is required"),
});

export type AddProjectValues = z.infer<typeof addProjectSchema>;