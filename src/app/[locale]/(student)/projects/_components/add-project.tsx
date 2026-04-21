"use client";

import React from "react";
import {
  Check,
  ChevronRight,
  ChevronsUpDown,
  Code2,
  FileText,
  Github,
  Globe,
  Sparkles,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { AddProjectProps, Skill } from "@/lib/types/skills";
import { cn } from "@/lib/utils";
import { addProjectSchema, AddProjectValues } from "@/lib/schemas/add-project.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import useAddProject from "../add-new-project/_hooks/use-add-project";

export default function AddProject({ skills }: { skills: AddProjectProps | Skill[] }) {
  const [isSkillsOpen, setIsSkillsOpen] = React.useState(false);
  const availableSkills = Array.isArray(skills) ? skills : skills.skills;
  const getSelectedSkills = (selectedNames: string[]) =>
    availableSkills.filter((skill) => selectedNames.includes(skill.name));
  const form = useForm<AddProjectValues>({
    defaultValues: {
      title: "",
      description: "",
      github_url: "",
      demo_url: "",
      skills: [],
    },
    resolver: zodResolver(addProjectSchema),
  });

  const { isPending, addProject } = useAddProject();

  const onSubmit = async (values: AddProjectValues) => {
    try {
      await addProject(values);
      form.reset();
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
          <Code2 className="h-3.5 w-3.5" />
          Project Details
        </div>

        <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Build a polished project entry
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
              Add the essentials once, then let your portfolio speak clearly with strong links, a
              concise summary, and the right stack tags.
            </p>
          </div>

          <div className="rounded-3xl border border-blue-100 bg-gradient-to-r from-blue-50 to-sky-50 px-4 py-3 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md shadow-blue-200">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {availableSkills.length} skills ready
                </p>
                <p className="text-xs leading-5 text-slate-500">
                  Pick the stack that best represents this project.
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
                      <FileText className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <FormLabel className="text-sm font-semibold text-slate-900">
                        Project Title
                      </FormLabel>
                      <FormDescription className="mt-1 text-sm leading-6 text-slate-500">
                        Use a clear, memorable name that makes the project easy to recognize.
                      </FormDescription>
                      <FormControl>
                        <Input
                          placeholder="AI Resume Analyzer"
                          className="mt-3 h-12 rounded-2xl border-slate-200 bg-white shadow-none focus:border-blue-500"
                          {...field}
                        />
                      </FormControl>
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
                  : "Select project skills";

                return (
                  <FormItem className="rounded-3xl border border-slate-200 bg-slate-50/80 p-4 shadow-sm transition duration-200 focus-within:border-blue-200 focus-within:bg-white focus-within:shadow-md">
                    <div className="flex gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-sm">
                        <Code2 className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <FormLabel className="text-sm font-semibold text-slate-900">
                          Skills & Stack
                        </FormLabel>
                        <FormDescription className="mt-1 text-sm leading-6 text-slate-500">
                          Search and select the technologies that were actually used in this
                          project.
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
                                  !field.value.length && "text-slate-400",
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
                                  {availableSkills.map((skill) => {
                                    const isSelected = field.value.includes(skill.name);

                                    return (
                                      <CommandItem
                                        key={skill.id}
                                        value={skill.name}
                                        onSelect={() => {
                                          field.onChange(
                                            isSelected
                                              ? field.value.filter((name) => name !== skill.name)
                                              : [...field.value, skill.name],
                                          );
                                        }}
                                      >
                                        <Check
                                          className={cn(
                                            "mr-2 size-4",
                                            isSelected ? "opacity-100" : "opacity-0",
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
                        Summarize the problem, what you built, and the impact in a few strong lines.
                      </FormDescription>
                      <FormControl>
                        <Textarea
                          placeholder="Built a platform that helps students analyze resumes, compare skills with job posts, and discover personalized learning paths."
                          className="mt-3 min-h-40 rounded-2xl border-slate-200 bg-white px-4 py-3 shadow-none focus:border-blue-500"
                          {...field}
                        />
                      </FormControl>
                    </div>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="github_url"
              render={({ field }) => (
                <FormItem className="rounded-3xl border border-slate-200 bg-slate-50/80 p-4 shadow-sm transition duration-200 focus-within:border-blue-200 focus-within:bg-white focus-within:shadow-md">
                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-sm">
                      <Github className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <FormLabel className="text-sm font-semibold text-slate-900">
                        GitHub URL
                      </FormLabel>
                      <FormDescription className="mt-1 text-sm leading-6 text-slate-500">
                        Link to the source code so reviewers can explore the implementation.
                      </FormDescription>
                      <FormControl>
                        <Input
                          placeholder="https://github.com/username/project"
                          className="mt-3 h-12 rounded-2xl border-slate-200 bg-white shadow-none focus:border-blue-500"
                          {...field}
                        />
                      </FormControl>
                    </div>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="demo_url"
              render={({ field }) => (
                <FormItem className="rounded-3xl border border-slate-200 bg-slate-50/80 p-4 shadow-sm transition duration-200 focus-within:border-blue-200 focus-within:bg-white focus-within:shadow-md">
                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-sm">
                      <Globe className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <FormLabel className="text-sm font-semibold text-slate-900">
                        Demo URL
                      </FormLabel>
                      <FormDescription className="mt-1 text-sm leading-6 text-slate-500">
                        Add a live preview, deployed app, or presentation link if one is available.
                      </FormDescription>
                      <FormControl>
                        <Input
                          placeholder="https://your-project-demo.com"
                          className="mt-3 h-12 rounded-2xl border-slate-200 bg-white shadow-none focus:border-blue-500"
                          {...field}
                        />
                      </FormControl>
                    </div>
                  </div>
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-4 rounded-3xl border border-blue-100 bg-gradient-to-r from-blue-50 to-sky-50 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Ready to add this project to your portfolio?
              </p>
              <p className="mt-1 text-sm leading-6 text-slate-500">
                A complete title, strong summary, and relevant stack tags make the project easier to
                evaluate.
              </p>
            </div>
            <Button
              disabled={!form.formState.isValid || isPending}
              type="submit"
              className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-sky-500 px-6 text-white shadow-lg shadow-blue-200 transition-all duration-300 hover:-translate-y-0.5 hover:from-blue-700 hover:to-sky-600 sm:w-auto"
            >
              {isPending ? "Adding..." : "Add Project"}
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
