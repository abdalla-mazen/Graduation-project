"use client";

import React from "react";
import {
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Check,
  ChevronRight,
  ChevronsUpDown,
  Code2,
  FileText,
  Sparkles,
} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "@/i18n/navigation";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { Skill } from "@/lib/types/skills";
import {
  AddExperienceValues,
  addExperienceSchema,
} from "@/lib/schemas/add-experience.schema";
import { Experience } from "@/lib/types/experience";
import { cn } from "@/lib/utils";

import useAddExperience from "../add-new-experience/_hooks/use-add-experience";
import useUpdateExperience from "../_hooks/use-update-experience";

type AddExperienceProps = {
  skills: Skill[];
  experience?: Experience;
  mode?: "create" | "edit";
};

function toFormValues(experience?: Experience): AddExperienceValues {
  if (!experience) {
    return {
      title: "",
      company_name: "",
      start_date: "",
      end_date: "",
      description: "",
      skills: [],
      is_current_role: false,
    };
  }

  return {
    title: experience.title,
    company_name: experience.company_name,
    start_date: experience.start_date,
    end_date: experience.end_date,
    description: experience.description,
    skills: experience.skills,
    is_current_role: experience.end_date === null,
  };
}

export default function AddExperience({
  skills,
  experience,
  mode = "create",
}: AddExperienceProps) {
  const [isSkillsOpen, setIsSkillsOpen] = React.useState(false);
  const router = useRouter();
  const form = useForm<AddExperienceValues>({
    mode: "onChange",
    defaultValues: toFormValues(experience),
    resolver: zodResolver(addExperienceSchema),
  });

  const { isPending, addExperience } = useAddExperience();
  const { isPending: isUpdating, updateExperience } = useUpdateExperience();
  const isCurrentRole = form.watch("is_current_role");
  const isSubmitting = isPending || isUpdating;

  React.useEffect(() => {
    form.reset(toFormValues(experience));
  }, [experience, form]);

  React.useEffect(() => {
    if (isCurrentRole) {
      form.setValue("end_date", null, {
        shouldDirty: true,
        shouldValidate: true,
      });
    } else if (form.getValues("end_date") === null) {
      form.setValue("end_date", "", {
        shouldDirty: false,
        shouldValidate: false,
      });
    }
  }, [form, isCurrentRole]);

  const getSelectedSkills = (selectedNames: string[]) =>
    skills.filter((skill) => selectedNames.includes(skill.name));

  const onSubmit = async (values: AddExperienceValues) => {
    try {
      if (mode === "edit" && experience) {
        await updateExperience({ id: experience.id, values });
        router.push("/experience");
        router.refresh();
        return;
      }

      await addExperience(values);
      form.reset(toFormValues());
      setIsSkillsOpen(false);
    } catch {
      return;
    }
  };

  return (
    <div className="relative overflow-hidden rounded-[32px] border border-white/70 bg-white/90 shadow-[0_24px_80px_-32px_rgba(37,99,235,0.45)] backdrop-blur">
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-r from-blue-600/10 via-sky-500/10 to-cyan-400/10" />

      <div className="relative border-b border-slate-100 px-6 py-6 sm:px-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-3 py-1 text-xs font-medium text-blue-700 shadow-sm">
          <BriefcaseBusiness className="h-3.5 w-3.5" />
          Experience Details
        </div>

        <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              {mode === "edit"
                ? "Update this experience entry"
                : "Add a polished experience entry"}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
              {mode === "edit"
                ? "Refine the role details, timeline, and impact so your profile stays current and accurate."
                : "Capture your role, timeline, and impact clearly so recruiters can scan your experience quickly."}
            </p>
          </div>

          <div className="rounded-3xl border border-blue-100 bg-gradient-to-r from-blue-50 to-sky-50 px-4 py-3 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md shadow-blue-200">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {skills.length} skills ready
                </p>
                <p className="text-xs leading-5 text-slate-500">
                  Add the main technologies or strengths used in this role.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="relative space-y-6 px-6 py-6 sm:px-8 sm:py-8"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="rounded-3xl border border-slate-200 bg-slate-50/80 p-4 shadow-sm transition duration-200 focus-within:border-blue-200 focus-within:bg-white focus-within:shadow-md">
                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-sm">
                      <BriefcaseBusiness className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <FormLabel className="text-sm font-semibold text-slate-900">
                        Job Title
                      </FormLabel>
                      <FormDescription className="mt-1 text-sm leading-6 text-slate-500">
                        Use the exact role name that best represents your work.
                      </FormDescription>
                      <FormControl>
                        <Input
                          placeholder="Backend Engineer Intern"
                          className="mt-3 h-12 rounded-2xl border-slate-200 bg-white shadow-none focus:border-blue-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="company_name"
              render={({ field }) => (
                <FormItem className="rounded-3xl border border-slate-200 bg-slate-50/80 p-4 shadow-sm transition duration-200 focus-within:border-blue-200 focus-within:bg-white focus-within:shadow-md">
                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-sm">
                      <Building2 className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <FormLabel className="text-sm font-semibold text-slate-900">
                        Company Name
                      </FormLabel>
                      <FormDescription className="mt-1 text-sm leading-6 text-slate-500">
                        Mention the company, startup, or organization where you
                        gained this experience.
                      </FormDescription>
                      <FormControl>
                        <Input
                          placeholder="Google"
                          className="mt-3 h-12 rounded-2xl border-slate-200 bg-white shadow-none focus:border-blue-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="start_date"
              render={({ field }) => (
                <FormItem className="rounded-3xl border border-slate-200 bg-slate-50/80 p-4 shadow-sm transition duration-200 focus-within:border-blue-200 focus-within:bg-white focus-within:shadow-md">
                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-sm">
                      <CalendarDays className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <FormLabel className="text-sm font-semibold text-slate-900">
                        Start Date
                      </FormLabel>
                      <FormDescription className="mt-1 text-sm leading-6 text-slate-500">
                        Select when this role started.
                      </FormDescription>
                      <FormControl>
                        <Input
                          type="date"
                          className="mt-3 h-12 rounded-2xl border-slate-200 bg-white shadow-none focus:border-blue-500"
                          {...field}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="end_date"
              render={({ field }) => (
                <FormItem className="rounded-3xl border border-slate-200 bg-slate-50/80 p-4 shadow-sm transition duration-200 focus-within:border-blue-200 focus-within:bg-white focus-within:shadow-md">
                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-sm">
                      <CalendarDays className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <FormLabel className="text-sm font-semibold text-slate-900">
                        End Date
                      </FormLabel>
                      <FormDescription className="mt-1 text-sm leading-6 text-slate-500">
                        Leave this empty only if this is your current role.
                      </FormDescription>
                      <FormControl>
                        <Input
                          type="date"
                          disabled={isCurrentRole}
                          className="mt-3 h-12 rounded-2xl border-slate-200 bg-white shadow-none focus:border-blue-500"
                          {...field}
                          value={field.value ?? ""}
                          onChange={(event) => field.onChange(event.target.value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="is_current_role"
              render={({ field }) => (
                <FormItem className="rounded-3xl border border-slate-200 bg-slate-50/80 p-4 shadow-sm transition duration-200 focus-within:border-blue-200 focus-within:bg-white focus-within:shadow-md">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-sm">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <FormLabel className="text-sm font-semibold text-slate-900">
                        Current Role
                      </FormLabel>
                      <FormDescription className="mt-1 text-sm leading-6 text-slate-500">
                        Enable this if you are still working in this role. The
                        end date will be sent as <span className="font-medium">null</span>.
                      </FormDescription>

                      <div className="mt-4 flex items-center gap-3 rounded-2xl border border-blue-100 bg-white px-4 py-3">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={(checked) => field.onChange(Boolean(checked))}
                            className="h-5 w-5 rounded-md border-blue-300 data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600"
                          />
                        </FormControl>
                        <span className="text-sm font-medium text-slate-700">
                          I currently work in this role
                        </span>
                      </div>
                      <FormMessage />
                    </div>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="skills"
              render={({ field }) => {
                const selectedSkills = getSelectedSkills(field.value);
                const selectedSkillsPreview = selectedSkills.length
                  ? selectedSkills.length <= 3
                    ? selectedSkills.map((skill) => skill.name).join(", ")
                    : `${selectedSkills
                        .slice(0, 3)
                        .map((skill) => skill.name)
                        .join(", ")} +${selectedSkills.length - 3} more`
                  : "Select experience skills";

                return (
                  <FormItem className="rounded-3xl border border-slate-200 bg-slate-50/80 p-4 shadow-sm transition duration-200 focus-within:border-blue-200 focus-within:bg-white focus-within:shadow-md">
                    <div className="flex gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-sm">
                        <Code2 className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <FormLabel className="text-sm font-semibold text-slate-900">
                          Skills & Strengths
                        </FormLabel>
                        <FormDescription className="mt-1 text-sm leading-6 text-slate-500">
                          Tag the technologies and strengths that best describe
                          this experience.
                        </FormDescription>

                        <Popover open={isSkillsOpen} onOpenChange={setIsSkillsOpen}>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                type="button"
                                variant="outline"
                                role="combobox"
                                className={cn(
                                  "mt-3 h-12 justify-between rounded-2xl border-slate-200 bg-white px-4 text-left font-normal text-slate-700 shadow-none hover:bg-white hover:text-slate-700 [&>span]:w-full",
                                  !field.value.length && "text-slate-400"
                                )}
                              >
                                <span className="min-w-0 flex-1 truncate">
                                  {selectedSkillsPreview}
                                </span>
                                <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>

                          <PopoverContent
                            align="start"
                            className="w-[var(--radix-popover-trigger-width)] rounded-3xl border-slate-200 p-0 shadow-xl"
                          >
                            <Command>
                              <CommandInput placeholder="Search skills..." />
                              <CommandList>
                                <CommandEmpty>No skills found.</CommandEmpty>
                                <CommandGroup>
                                  {skills.map((skill) => {
                                    const isSelected = field.value.includes(skill.name);

                                    return (
                                      <CommandItem
                                        key={skill.id}
                                        value={skill.name}
                                        onSelect={() => {
                                          field.onChange(
                                            isSelected
                                              ? field.value.filter((name) => name !== skill.name)
                                              : [...field.value, skill.name]
                                          );
                                        }}
                                      >
                                        <Check
                                          className={cn(
                                            "mr-2 size-4",
                                            isSelected ? "opacity-100" : "opacity-0"
                                          )}
                                        />
                                        {skill.name}
                                      </CommandItem>
                                    );
                                  })}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>

                        {field.value.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {selectedSkills.map((skill) => (
                              <Badge
                                key={skill.id}
                                className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 hover:bg-blue-100"
                              >
                                {skill.name}
                              </Badge>
                            ))}
                          </div>
                        )}
                        <FormMessage />
                      </div>
                    </div>
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="rounded-3xl border border-slate-200 bg-slate-50/80 p-4 shadow-sm transition duration-200 focus-within:border-blue-200 focus-within:bg-white focus-within:shadow-md md:col-span-2">
                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-sm">
                      <FileText className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <FormLabel className="text-sm font-semibold text-slate-900">
                        Description
                      </FormLabel>
                      <FormDescription className="mt-1 text-sm leading-6 text-slate-500">
                        Summarize what you delivered, contributed, or improved
                        during this role.
                      </FormDescription>
                      <FormControl>
                        <Textarea
                          placeholder="Built backend APIs, collaborated with the frontend team, and improved database performance for student-facing services."
                          className="mt-3 min-h-40 rounded-2xl border-slate-200 bg-white px-4 py-3 shadow-none focus:border-blue-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </div>
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-4 rounded-3xl border border-blue-100 bg-gradient-to-r from-blue-50 to-sky-50 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Ready to add this experience to your profile?
              </p>
              <p className="mt-1 text-sm leading-6 text-slate-500">
                Clear dates, strong impact notes, and the right skills make
                each experience easier to evaluate.
              </p>
            </div>
            <Button
              disabled={!form.formState.isValid || isSubmitting}
              type="submit"
              className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-sky-500 px-6 text-white shadow-lg shadow-blue-200 transition-all duration-300 hover:-translate-y-0.5 hover:from-blue-700 hover:to-sky-600 sm:w-auto"
            >
              {isSubmitting
                ? mode === "edit"
                  ? "Updating..."
                  : "Adding..."
                : mode === "edit"
                  ? "Update Experience"
                  : "Add Experience"}
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
