"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Lock, GraduationCap, CheckCircle2, Info, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { UniversitiesResponse } from "@/lib/types/univeristy";
import { FacultiesResponse } from "@/lib/types/faculties";
import { DepartmentsResponse } from "@/lib/types/department";
import { YearSemestersResponse } from "@/lib/types/semester";
import { Tracks } from "@/lib/types/tracks";
import { useChangeProfile } from "../_hooks/use-progile";

// ---------- types ----------
export type StudentPathFormValues = {
  path_type: string;
  university_id: number;
  faculty_id: number;
  department_id: number;
  year: string;
  current_semester: string;
  target_track_id: string;
};

export type StudentPathPayload = {
  path_type: string;
  university_id: number;
  faculty_id: number;
  department_id: number;
  year: number;
  current_semester: number;
  target_track_id: number;
};

// ---------- helpers ----------
const LockedBadge = () => (
  <Badge className="ml-2 gap-1 px-1.5 py-0 text-[10px] font-medium text-white bg-mainColor">
    <Lock className="h-2.5 w-2.5" />
    Locked
  </Badge>
);

const ActiveBadge = () => (
  <Badge className="ml-2 gap-1 px-1.5 py-0 text-[10px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-50 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800">
    <CheckCircle2 className="h-2.5 w-2.5" />
    Editable
  </Badge>
);

// ---------- props ----------
type Props = {
  University: UniversitiesResponse;
  Faculties: FacultiesResponse;
  Department: DepartmentsResponse;
  Semester: YearSemestersResponse;
  Track: Tracks;
};

// ---------- component ----------
export default function StudentPathForm({
  University,
  Faculties,
  Department,
  Semester,
  Track,
}: Props) {
  const { data: session, status } = useSession();
  const { mutate: changeProfile, isPending, isError, isSuccess, error } = useChangeProfile();

  const uniqueYears = Array.from(
    new Map(Semester.map((s) => [s.year, s])).values()
  );

  const form = useForm<StudentPathFormValues>({
    defaultValues: {
      path_type: "student",
      university_id: 0,
      faculty_id: 0,
      department_id: 0,
      year: "",
      current_semester: "",
      target_track_id: "",
    },
  });

  // ---------- watch year لفلترة الـ semesters ----------
  const selectedYear = form.watch("year");

  const filteredSemesters = Semester.filter(
    (sem) => String(sem.year) === selectedYear
  );

  // ---------- hooks كلها فوق الـ early return ----------
  useEffect(() => {
    if (session?.user) {
      form.reset({
        path_type: session.user.role ?? "student",
        university_id: session.user.universityId ?? 0,
        faculty_id: session.user.facultyId ?? 0,
        department_id: session.user.departmentId ?? 0,
        year: String(session.user.year ?? ""),
        current_semester: String(session.user.currentSemester ?? ""),
        target_track_id: String(session.user.trackId ?? ""),
      });
    }
  }, [form, session]);

  // ---------- لما الـ year تتغير، reset الـ semester ----------
  useEffect(() => {
    form.setValue("current_semester", "");
  }, [form, selectedYear]);

  useEffect(() => {
    console.log("session now:", session);
  }, [session]);

  // ---------- early return بعد كل الـ hooks ----------
  if (status === "loading") return null;

  // ---------- derived display values ----------
  const universityName =
    University?.find((uni) => uni.id === session?.user.universityId)?.name ??
    "Unknown University";

  const facultyName =
    Faculties?.find(
      (fac) => String(fac.id) === String(session?.user.facultyId)
    )?.name ?? "Unknown Faculty";

  const departmentName =
    Department?.find(
      (dep) => String(dep.id) === String(session?.user.departmentId)
    )?.name ?? "Unknown Department";

  // ---------- submit ----------
  function onSubmit(values: StudentPathFormValues) {
    const payload: StudentPathPayload = {
      path_type: session?.user?.role?.toLowerCase() ?? values.path_type,
      university_id: session?.user.universityId ?? values.university_id,
      faculty_id: session?.user.facultyId ?? values.faculty_id,
      department_id: session?.user.departmentId ?? values.department_id,
      year: parseInt(values.year),
      current_semester: parseInt(values.current_semester),
      target_track_id: parseInt(values.target_track_id),
    };

    changeProfile(payload);
  }

  return (
    <div className="min-h-screen bg-background flex items-start justify-center p-6 pt-12">
      <div className="w-full max-w-lg">
        <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-3 px-6 py-5 border-b border-border">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-muted">
              <GraduationCap className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <h2 className="text-sm font-medium text-foreground leading-tight">
                Student Academic Path
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                path_type:{" "}
                <code className="font-mono">{session?.user.role ?? "student"}</code>
              </p>
            </div>
          </div>

          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="px-6 py-5 space-y-5">
                {/* Student name */}
                <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                  Name: {session?.user.name}
                </p>

                {/* University + Faculty */}
                <div className="grid grid-cols-2 gap-3">
                  <FormField
                    control={form.control}
                    name="university_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-medium text-muted-foreground flex items-center">
                          University
                          <LockedBadge />
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              value={universityName}
                              disabled
                              className={cn(
                                "pr-8 text-sm h-9 bg-muted/50 cursor-not-allowed opacity-60"
                              )}
                            />
                            <Lock className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground/50" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="faculty_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-medium text-muted-foreground flex items-center">
                          Faculty
                          <LockedBadge />
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              value={facultyName}
                              disabled
                              className="pr-8 text-sm h-9 bg-muted/50 cursor-not-allowed opacity-60"
                            />
                            <Lock className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground/50" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Department */}
                <FormField
                  control={form.control}
                  name="department_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-medium text-muted-foreground flex items-center">
                        Department
                        <LockedBadge />
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            value={departmentName}
                            disabled
                            className="pr-8 text-sm h-9 bg-muted/50 cursor-not-allowed opacity-60"
                          />
                          <Lock className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground/50" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Path Type */}
                <FormField
                  control={form.control}
                  name="path_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-medium text-muted-foreground flex items-center">
                        Path Type
                        <LockedBadge />
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            value={session?.user.role ?? field.value}
                            disabled
                            className="pr-8 text-sm h-9 bg-muted/50 cursor-not-allowed opacity-60 font-mono"
                          />
                          <Lock className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground/50" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Separator />

                <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                  Editable Fields
                </p>

                {/* Year + Semester */}
                <div className="grid grid-cols-2 gap-3">
                  <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-medium text-foreground flex items-center">
                          Academic Year
                          <ActiveBadge />
                        </FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-9 text-sm">
                              <SelectValue placeholder="Select year" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {uniqueYears.map((sem) => (
                              <SelectItem
                                key={sem.year}
                                value={String(sem.year)}
                                className="text-sm"
                              >
                                Year {sem.year}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="current_semester"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-medium text-foreground flex items-center">
                          Current Semester
                          <ActiveBadge />
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          disabled={!selectedYear}
                        >
                          <FormControl>
                            <SelectTrigger className="h-9 text-sm">
                              <SelectValue
                                placeholder={
                                  selectedYear
                                    ? "Select semester"
                                    : "Select year first"
                                }
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {filteredSemesters.map((sem, index) => (
                              <SelectItem
                                key={index}
                                value={String(sem.semester)}
                                className="text-sm"
                              >
                                Semester {sem.semester}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Target Track */}
                <FormField
                  control={form.control}
                  name="target_track_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-medium text-foreground flex items-center">
                        Target Track
                        <ActiveBadge />
                      </FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-9 text-sm">
                            <SelectValue placeholder="Select a track" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Track?.map((tra) => (
                            <SelectItem key={tra.id} value={String(tra.id)}>
                              {tra.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Error / Success messages */}
                {isError && (
                  <p className="text-xs text-destructive flex items-center gap-1.5">
                    <Info className="h-3.5 w-3.5 shrink-0" />
                    {error?.message ?? "Something went wrong"}
                  </p>
                )}
                {isSuccess && (
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                    Changes saved successfully!
                  </p>
                )}
              </div>

              {/* Footer */}
              <div className="flex flex-col gap-3 items-center justify-between px-6 py-4 border-t border-border bg-muted/30">
                <p className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <Info className="h-3.5 w-3.5 shrink-0" />
                  Locked fields cannot be modified
                </p>
                <Button
                  type="submit"
                  size="sm"
                  disabled={isPending}
                  className="h-8 px-4 text-xs font-medium gap-1.5 bg-mainColor"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

