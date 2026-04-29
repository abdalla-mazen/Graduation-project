"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import {
  Check,
  ChevronsUpDown,
  Lock,
  MapPin,
  Phone,
  Linkedin,
  Github,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { UniversitiesResponse } from "@/lib/types/univeristy";
import { SkillsResponse } from "@/lib/types/skills-user";
import { useSession } from "next-auth/react";
import { CVschema, FormValues } from "@/lib/schemas/add-cv.schema";
import useCvGeneration from "../../_hooks/use-cv-generation";
import { CVData } from "@/lib/types/create-cv";

type Props = {
  University: UniversitiesResponse;
  Skill: SkillsResponse;
};

/* ---------------- PROGRESS HELPER ---------------- */

function calcProgress(values: Partial<FormValues>): number {
  const fields: (keyof FormValues)[] = [
    "job_title",
    "phone",
    "address",
    "linkedin",
    "github",
    "experience",
    "courses",
    "languages",
  ];

  const filled = fields.filter((f) => {
    const v = values[f];
    if (Array.isArray(v)) return v.length > 0;
    return typeof v === "string" && v.trim() !== "";
  }).length;

  const hasSkills = (values.skills?.length ?? 0) > 0 ? 1 : 0;

  return Math.round(((filled + hasSkills) / (fields.length + 1)) * 100);
}

/* ---------------- SUB-COMPONENTS ---------------- */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-semibold tracking-[1.5px] uppercase text-slate-500 mt-7 mb-3 pb-2 border-b border-sky-100 first:mt-0">
      {children}
    </p>
  );
}

function DisabledField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[11.5px] font-medium text-slate-500">
        {label}
      </label>

      <div className="h-[42px] rounded-[10px] border border-sky-100 bg-sky-50/70 px-3.5 flex items-center text-[13.5px] text-slate-500">
        <span className="truncate flex-1">{value}</span>
        <Lock className="w-3 h-3 opacity-40 ml-2 shrink-0" />
      </div>
    </div>
  );
}

function SkillTag({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 bg-sky-50 text-sky-700 border border-sky-200 text-[11.5px] font-medium px-2.5 py-1 rounded-full">
      {label}

      <button
        type="button"
        onClick={onRemove}
        className="text-sky-400 hover:text-sky-700 text-sm leading-none transition-colors"
      >
        ×
      </button>
    </span>
  );
}

/* ---------------- MAIN COMPONENT ---------------- */

export default function CVForm({ University, Skill }: Props) {
  const [openSkills, setOpenSkills] = React.useState(false);
  const [openLanguages, setOpenLanguages] = React.useState(false);

  const { data: session } = useSession();

  const skillsOptions = Skill?.map((s) => s.name) || [];
  const languagesOptions = ["English", "Italian", "French", "German"];

  const universityName =
    University.find((u) => u.id === session?.user?.universityId)?.name || "";

  const sessionName = session?.user?.name || "";
  const sessionEmail = session?.user?.email || "";

  const initials = sessionName
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  const { cvCreation, isPending, pdfUrl } = useCvGeneration();

  const form = useForm<FormValues>({
    resolver: zodResolver(CVschema),
    defaultValues: {
      name: "",
      job_title: "",
      email: "",
      phone: "",
      address: "",
      linkedin: "",
      github: "",
      skills: [],
      experience: "",
      courses: "",
      education: [],
      languages: "",
    },
  });

  React.useEffect(() => {
    if (sessionName) form.setValue("name", sessionName);
    if (sessionEmail) form.setValue("email", sessionEmail);
    if (universityName) form.setValue("education", [universityName]);
  }, [sessionName, sessionEmail, universityName, form]);

  const watchedValues = form.watch();
  const progress = calcProgress(watchedValues);

  const onSubmit = (data: FormValues) => {
    const payload: CVData = {
      name: data.name,
      job_title: data.job_title,
      email: data.email,
      phone: data.phone,
      address: data.address,
      linkedin: data.linkedin,
      github: data.github,
      skills: data.skills,
      experience: data.experience
        .split(",")
        .map((x) => x.trim())
        .filter(Boolean),
      courses: data.courses
        .split(",")
        .map((x) => x.trim())
        .filter(Boolean),
      education: data.education,
      languages: data.languages,
    };

    cvCreation(payload);
  };

  return (
    <div className="min-h-screen flex items-start justify-center px-4 py-10 bg-sky-50">
      <div className="w-full max-w-2xl rounded-3xl overflow-hidden border border-sky-100 shadow-xl bg-white">
        {/* Header */}
        <div className="px-8 pt-8 pb-6 bg-gradient-to-br from-sky-500 via-blue-500 to-indigo-500">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-2xl shrink-0">
              📄
            </div>

            <div>
              <h1 className="text-white text-xl font-semibold tracking-tight">
                Build Your CV
              </h1>

              <p className="text-white/80 text-[13px] mt-0.5">
                Complete all sections to generate your resume
              </p>
            </div>
          </div>

          {/* Progress */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-1.5 bg-white/25 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${progress}%`,
                  background: "linear-gradient(90deg,#ffffff,#dbeafe)",
                }}
              />
            </div>

            <span className="text-white/85 text-[12px] font-medium min-w-[36px] text-right">
              {progress}%
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="px-8 py-8">
          {/* Avatar Row */}
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-sky-50 border border-sky-100 mb-6">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-[15px] shrink-0"
              style={{
                background: "linear-gradient(135deg,#38bdf8,#2563eb)",
              }}
            >
              {initials || "CV"}
            </div>

            <div>
              <p className="text-[14px] font-medium text-slate-900">
                {sessionName || "Your Name"}
              </p>

              <p className="text-[12px] text-slate-500">
                {sessionEmail || "your@email.com"}
              </p>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Personal Info */}
              <SectionLabel>Personal information</SectionLabel>

              <div className="grid grid-cols-2 gap-3 mb-3 items-end">
                <DisabledField label="Full name" value={sessionName || "—"} />

                <FormField
                  control={form.control}
                  name="job_title"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-[11.5px] font-medium text-slate-500">
                        Job title
                      </FormLabel>

                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Software Engineer"
                          className="h-[42px] rounded-[10px] text-[13.5px] border-sky-100 focus-visible:ring-sky-400"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3 items-end">
                <DisabledField label="Email" value={sessionEmail || "—"} />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-[11.5px] font-medium text-slate-500">
                        Phone
                      </FormLabel>

                      <FormControl>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />

                          <Input
                            {...field}
                            placeholder="+20 100 000 0000"
                            className="h-[42px] rounded-[10px] text-[13.5px] pl-8 border-sky-100 focus-visible:ring-sky-400"
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="mb-3">
                    <FormLabel className="text-[11.5px] font-medium text-slate-500">
                      Address
                    </FormLabel>

                    <FormControl>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />

                        <Input
                          {...field}
                          placeholder="Cairo, Egypt"
                          className="h-[42px] rounded-[10px] text-[13.5px] pl-8 border-sky-100 focus-visible:ring-sky-400"
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Online Presence */}
              <SectionLabel>Online presence</SectionLabel>

              <div className="grid grid-cols-2 gap-3 mb-3 items-end">
                <FormField
                  control={form.control}
                  name="linkedin"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-[11.5px] font-medium text-slate-500">
                        LinkedIn
                      </FormLabel>

                      <FormControl>
                        <div className="relative">
                          <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />

                          <Input
                            {...field}
                            placeholder="linkedin.com/in/..."
                            className="h-[42px] rounded-[10px] text-[13.5px] pl-8 border-sky-100 focus-visible:ring-sky-400"
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="github"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-[11.5px] font-medium text-slate-500">
                        GitHub
                      </FormLabel>

                      <FormControl>
                        <div className="relative">
                          <Github className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />

                          <Input
                            {...field}
                            placeholder="github.com/..."
                            className="h-[42px] rounded-[10px] text-[13.5px] pl-8 border-sky-100 focus-visible:ring-sky-400"
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {/* Skills */}
              <SectionLabel>Skills & expertise</SectionLabel>

              <FormField
                control={form.control}
                name="skills"
                render={({ field }) => (
                  <FormItem className="mb-3">
                    <FormLabel className="text-[11.5px] font-medium text-slate-500">
                      Skills
                    </FormLabel>

                    <Popover open={openSkills} onOpenChange={setOpenSkills}>
                      <PopoverTrigger asChild>
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full h-[42px] rounded-[10px] justify-between text-[13px] font-normal border-sky-100 hover:bg-sky-50"
                        >
                          {field.value.length ? (
                            `${field.value.length} skill${
                              field.value.length > 1 ? "s" : ""
                            } selected`
                          ) : (
                            <span className="text-slate-400">
                              Select your skills
                            </span>
                          )}

                          <ChevronsUpDown className="h-3.5 w-3.5 opacity-50" />
                        </Button>
                      </PopoverTrigger>

                      <PopoverContent className="w-full p-0 rounded-xl border-sky-100">
                        <Command>
                          <CommandInput placeholder="Search skills..." />

                          <CommandList>
                            <CommandEmpty>No skills found</CommandEmpty>

                            <CommandGroup>
                              {skillsOptions.map((skill) => {
                                const selected = field.value.includes(skill);

                                return (
                                  <CommandItem
                                    key={skill}
                                    onSelect={() => {
                                      field.onChange(
                                        selected
                                          ? field.value.filter(
                                              (s) => s !== skill,
                                            )
                                          : [...field.value, skill],
                                      );
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        selected
                                          ? "opacity-100 text-sky-500"
                                          : "opacity-0",
                                      )}
                                    />

                                    {skill}
                                  </CommandItem>
                                );
                              })}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>

                    {field.value.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {field.value.map((skill) => (
                          <SkillTag
                            key={skill}
                            label={skill}
                            onRemove={() =>
                              field.onChange(
                                field.value.filter((s) => s !== skill),
                              )
                            }
                          />
                        ))}
                      </div>
                    )}
                  </FormItem>
                )}
              />

              {/* Experience & Education */}
              <SectionLabel>Experience & education</SectionLabel>

              <FormField
                control={form.control}
                name="experience"
                render={({ field }) => (
                  <FormItem className="mb-3">
                    <FormLabel className="text-[11.5px] font-medium text-slate-500">
                      Previous companies{" "}
                      <span className="font-normal text-slate-400">
                        (comma separated)
                      </span>
                    </FormLabel>

                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Google, Amazon, Microsoft"
                        className="h-[42px] rounded-[10px] text-[13.5px] border-sky-100 focus-visible:ring-sky-400"
                      />
                    </FormControl>

                    {field.value && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {field.value
                          .split(",")
                          .map((x) => x.trim())
                          .filter(Boolean)
                          .map((company, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center bg-sky-50 text-sky-700 border border-sky-200 text-[11.5px] font-medium px-2.5 py-1 rounded-full"
                            >
                              {company}
                            </span>
                          ))}
                      </div>
                    )}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="courses"
                render={({ field }) => (
                  <FormItem className="mb-3">
                    <FormLabel className="text-[11.5px] font-medium text-slate-500">
                      Courses{" "}
                      <span className="font-normal text-slate-400">
                        (comma separated)
                      </span>
                    </FormLabel>

                    <FormControl>
                      <Input
                        {...field}
                        placeholder="React, Node.js, System Design"
                        className="h-[42px] rounded-[10px] text-[13.5px] border-sky-100 focus-visible:ring-sky-400"
                      />
                    </FormControl>

                    {field.value && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {field.value
                          .split(",")
                          .map((x) => x.trim())
                          .filter(Boolean)
                          .map((course, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center bg-indigo-50 text-indigo-700 border border-indigo-200 text-[11.5px] font-medium px-2.5 py-1 rounded-full"
                            >
                              {course}
                            </span>
                          ))}
                      </div>
                    )}
                  </FormItem>
                )}
              />

              <DisabledField label="Education" value={universityName || "—"} />

              {/* Language */}
              <SectionLabel>Language</SectionLabel>

              <FormField
                control={form.control}
                name="languages"
                render={({ field }) => (
                  <FormItem className="mb-6">
                    <FormLabel className="text-[11.5px] font-medium text-slate-500">
                      Preferred language
                    </FormLabel>

                    <Popover
                      open={openLanguages}
                      onOpenChange={setOpenLanguages}
                    >
                      <PopoverTrigger asChild>
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full h-[42px] rounded-[10px] justify-between text-[13px] font-normal border-sky-100 hover:bg-sky-50"
                        >
                          {field.value || (
                            <span className="text-slate-400">
                              Select language
                            </span>
                          )}

                          <ChevronsUpDown className="h-3.5 w-3.5 opacity-50" />
                        </Button>
                      </PopoverTrigger>

                      <PopoverContent className="w-full p-0 rounded-xl border-sky-100">
                        <Command>
                          <CommandList>
                            <CommandGroup>
                              {languagesOptions.map((lang) => (
                                <CommandItem
                                  key={lang}
                                  onSelect={() => {
                                    field.onChange(lang);
                                    setOpenLanguages(false);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      field.value === lang
                                        ? "opacity-100 text-sky-500"
                                        : "opacity-0",
                                    )}
                                  />

                                  {lang}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />

              {/* Submit */}
              <Button
                disabled={isPending}
                type="submit"
                className="w-full h-12 rounded-[14px] text-white text-[14px] font-semibold tracking-wide flex items-center justify-center gap-2 transition-all hover:opacity-95 active:scale-[0.99] whitespace-nowrap bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20"
              >
                {isPending ? "Generating..." : "Generate my CV"}
                <span className="text-base">→</span>
              </Button>

              {pdfUrl && (
                <div className="mt-4">
                  <a
                    href={pdfUrl}
                    download="cv.pdf"
                    className="block w-full text-center h-12 leading-[48px] rounded-[14px] bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-500/20"
                  >
                    Download CV
                  </a>
                </div>
              )}
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

