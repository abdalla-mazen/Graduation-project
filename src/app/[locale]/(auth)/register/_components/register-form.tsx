"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegisterSchema, RegisterValues } from "@/lib/schemas/auth.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import PasswordInput from "@/components/ui/password-input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import useRegister from "../_hooks/use-register";
import { University } from "@/lib/types/univeristy";
import { Track } from "@/lib/types/tracks";
import { RegisterPayload } from "@/lib/types/registerPayload";

type Faculty = { id: number; name: string };
type Department = { id: number; name: string };
type Semester = { label: string; semester: number; year: number };

type Props = {
  payload: University[];
  data: Track[];
};

export default function RegisterForm({ payload, data }: Props) {
  const registerSchema = useRegisterSchema();
  const { register: doRegister, isLoading, error } = useRegister();
  const [step, setStep] = React.useState(1);

  const [faculties, setFaculties] = React.useState<Faculty[]>([]);
  const [facultiesLoading, setFacultiesLoading] = React.useState(false);

  const [departments, setDepartments] = React.useState<Department[]>([]);
  const [departmentsLoading, setDepartmentsLoading] = React.useState(false);

  const [semesters, setSemesters] = React.useState<Semester[]>([]);

  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
    defaultValues: {
      username: "",
      email: "",
      password: "",
      role: "",
      university: "",
      faculty: "",
      department: "",
      semester: "",
      track: "",
      drPassword: "",
    },
  });

  const role = form.watch("role");

  React.useEffect(() => {
    const subscription = form.watch((value) => {
    });
    return () => subscription.unsubscribe();
  }, [form]);

  React.useEffect(() => {
    const fetchSemesters = async () => {
      try {
        const res = await fetch(
          "https://mmm.nexxuus.site/academic/available_semesters/1"
        );
        const data = await res.json();
        setSemesters(data);
      } catch (err) {
        console.error("Failed to fetch semesters", err);
      }
    };
    fetchSemesters();
  }, []);

  const handleUniversityChange = async (universityId: string) => {
    if (!universityId) return;
    form.setValue("university", universityId);
    form.setValue("faculty", "");
    form.setValue("department", "");
    setFaculties([]);
    setDepartments([]);

    try {
      setFacultiesLoading(true);
      const res = await fetch(
        `https://mmm.nexxuus.site/academic/faculties/${universityId}`
      );
      const data = await res.json();
      setFaculties(data);
    } catch (err) {
      console.error("Failed to fetch faculties", err);
    } finally {
      setFacultiesLoading(false);
    }
  };

  const handleFacultyChange = async (facultyId: string) => {
    if (!facultyId) return;
    form.setValue("faculty", facultyId);
    form.setValue("department", "");
    setDepartments([]);

    try {
      setDepartmentsLoading(true);
      const res = await fetch(
        `https://mmm.nexxuus.site/academic/departments/${facultyId}`
      );
      const data = await res.json();
      setDepartments(data);
    } catch (err) {
      console.error("Failed to fetch departments", err);
    } finally {
      setDepartmentsLoading(false);
    }
  };

  const handleNext = async () => {
    const isValid = await form.trigger(["username", "email", "password", "role"]);
    if (!isValid) return;

    const values = form.getValues();
    const key = values.role === "teacher" ? "teacherFormStep1" : "studentFormStep1";
    localStorage.setItem(key, JSON.stringify(values));

    setStep(2);
  };

  const onSubmit: SubmitHandler<RegisterValues> = async (values) => {

    try {
      if (values.role === "teacher" && values.drPassword !== "2468") {
        form.setError("drPassword", { message: "Invalid doctor password" });
        return;
      }

      const key = values.role === "teacher" ? "teacherFormStep1" : "studentFormStep1";
      const oldValues = JSON.parse(localStorage.getItem(key) || "{}");
      const mergedValues = { ...oldValues, ...values };

      const semesterObj = semesters.find((s) => s.label === mergedValues.semester);

      const finalPayload: RegisterPayload = {
        username: mergedValues.username,
        email: mergedValues.email,
        password: mergedValues.password,
        role: mergedValues.role,
        profile_setup: {
          university_id: Number(mergedValues.university),
          faculty_id: Number(mergedValues.faculty),
          department_id: Number(mergedValues.department),
          target_track_id: Number(mergedValues.track),
          path_type: mergedValues.role,
          ...(semesterObj && {
            year: semesterObj.year,
            current_semester: semesterObj.semester,
          }),
        },
      };
      console.log(finalPayload)
      // console.log("Final Payload to send:", finalPayload);

      await doRegister(finalPayload);
    } catch (err) {
      console.error("Registration failed", err);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* STEP 1 */}
        {step === 1 && (
          <>
            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-600">Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="your-name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-600">Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="user@example.com" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-600">Password</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} placeholder="********" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="role"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-600">Register As</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="teacher">Teacher</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        {/* STEP 2 - Teacher */}
        {step === 2 && role === "teacher" && (
          <FormField
            name="drPassword"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-blue-600">Doctor Password</FormLabel>
                <FormControl>
                  <PasswordInput {...field} placeholder="********" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* STEP 2 - Student */}
        {step === 2 && role === "student" && (
          <>
            <FormField
              name="university"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-600">University</FormLabel>
                  <Select onValueChange={handleUniversityChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select University" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {payload.map((uni) => (
                        <SelectItem key={uni.id} value={uni.id.toString()}>
                          {uni.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="faculty"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-600">Faculty</FormLabel>
                  <Select
                    onValueChange={handleFacultyChange}
                    value={field.value}
                    disabled={facultiesLoading || faculties.length === 0}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={facultiesLoading ? "Loading..." : "Select Faculty"} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {faculties.map((fac) => (
                        <SelectItem key={fac.id} value={fac.id.toString()}>
                          {fac.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="department"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-600">Department</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={departmentsLoading || departments.length === 0}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={departmentsLoading ? "Loading..." : "Select Department"} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {departments.map((dep) => (
                        <SelectItem key={dep.id} value={dep.id.toString()}>
                          {dep.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="semester"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-600">Semester</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Semester" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {semesters.map((sem, index) => (
                        <SelectItem key={index} value={sem.label}>
                          {sem.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="track"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-600">Track</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Track" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {data.map((track) => (
                        <SelectItem key={track.id} value={track.id.toString()}>
                          {track.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        {/* Buttons */}
        <div className="flex gap-2">
          {step === 2 && (
            <Button type="button" variant="outline" onClick={() => setStep(1)}>
              Back
            </Button>
          )}

          {step === 1 ? (
            <Button
              type="button"
              className="w-full bg-blue-600 text-white"
              disabled={isLoading}
              onClick={handleNext}
            >
              Next
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full bg-blue-600 text-white"
              disabled={isLoading}
            >
              Register
            </Button>
          )}
        </div>

        {error && !error.message.includes("<!doctype") && (
  <p className="text-red-600">
    {error instanceof Error ? error.message : "Unknown error"}
  </p>
)}
      </form>
    </Form>
  );
}
// sedek
// 11111111