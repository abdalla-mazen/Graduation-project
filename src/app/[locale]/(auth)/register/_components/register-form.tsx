"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRegisterSchema, RegisterValues } from "@/lib/schemas/auth.schema";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PhoneInput } from "@/components/ui/phone-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";
import PasswordInput from "@/components/ui/password-input";

export default function RegisterForm() {
  const t = useTranslations();
  const registerSchema = useRegisterSchema();
  const [step, setStep] = useState<number>(1);

  const form = useForm<RegisterValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
      registerAs: "student",
      track: "",
      faculty: "",
      year: "",
      term: "",
    },
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
  });

  const registerAs = form.watch("registerAs");

  // Next button: validate only step 1 fields
  const handleNext = async () => {
    // Trigger validation only for the fields in step 1
    const valid = await form.trigger([
      "firstName",
      "email",
      "phone",
      "password",
      "rePassword",
      "registerAs",
    ]);

    if (valid) {
      setStep(2);
    } else {
      // errors will be shown by <FormMessage /> on those fields
      // you can also scroll to first error here if you want
      console.log("Step 1 validation failed");
    }
  };

  const onSubmit: SubmitHandler<RegisterValues> = async (values) => {
    // Final submission (for students we should already be on step 2)
    // Here you can call your API
    console.log("FINAL SUBMIT", values);

    // Example: try { await api.register(values) } catch(e) { form.setError(...)}
  };

  const goBackToStep1 = () => setStep(1);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="text-zinc-600 text-start">
        {step === 1 && (
          <>
            {/* First name */}
            <FormField
              name="firstName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-600 capitalize">{t("name")}</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder={t("your-name")} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-600 capitalize">{t("email")}</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="user@example.com" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone */}
            <FormField
              name="phone"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-600 capitalize">{t("phone")}</FormLabel>
                  <FormControl>
                    <PhoneInput {...field} placeholder="01005493046" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-600 capitalize">{t("password")}</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} placeholder="********" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Re password */}
            <FormField
              name="rePassword"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-600 capitalize">
                    {t("confirm-password")}
                  </FormLabel>
                  <FormControl>
                    <PasswordInput {...field} placeholder="********" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Register As */}
            <FormField
              name="registerAs"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-600">{t("register-as")}</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Register as" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="graduated">{t("graduated")}</SelectItem>
                        <SelectItem value="student">{t("student")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

           {/* Track appear only for graduated */}
            {registerAs === "graduated" && (
              <FormField
                name="track"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-blue-600">{"track"}</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder={"select-track"} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="frontend">Frontend Developer</SelectItem>
                          <SelectItem value="backend">Backend Developer</SelectItem>
                          <SelectItem value="fullstack">Full Stack Developer</SelectItem>
                          <SelectItem value="mobile">Mobile Developer</SelectItem>
                          <SelectItem value="data">Data Science</SelectItem>
                          <SelectItem value="devops">DevOps</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

       {/* Button next or create account */}
            <Button
              type="button"
              onClick={() => {
                if (registerAs === "graduated") {
                  // for graduated: validate whole form and submit
                  form.handleSubmit(onSubmit)();
                } else {
                  // for students: go to step 2 after validating step1 fields
                  handleNext();
                }
              }}
              className="bg-blue-600 my-5 hover:bg-blue-700 w-full text-white capitalize"
            >
              {registerAs === "student" ? t("next") : t("create-account")}
            </Button>
          </>
        )}

       {/* Step 2 for student only */}
        {step === 2 && registerAs === "student" && (
          <>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-blue-600 mb-2">
                {t("academic-information")}
              </h3>
            </div>

            {/* Faculty */}
            <FormField
              name="faculty"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-600">{t("college")}</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={t("select-college")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="engineering"> {t("faculty-engineering")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Department */}
            <FormField
              name="year"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-600">{t("department")}</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={t("select-department")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1"> {t("computer-engineering")} </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Academic Year */}
            <FormField
              name="year"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-600">{t("academic-year")}</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={t("current-year")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1"> {t("first-year")} </SelectItem>
                        <SelectItem value="2"> {t("second-year")}</SelectItem>
                        <SelectItem value="3"> {t("third-year")} </SelectItem>
                        <SelectItem value="4"> {t("fourth-year")}</SelectItem>
                        <SelectItem value="5"> {t("fifth-year")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Term */}
            <FormField
              name="term"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-600">{t("term")}</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={t("select-semester")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fall"> {t("first-semester")}</SelectItem>
                        <SelectItem value="spring"> {t("second-semester")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

         {/* Track */}
            <FormField
              name="track"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-600">{"track"}</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={"select-track"} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="frontend">Frontend Developer</SelectItem>
                        <SelectItem value="backend">Backend Developer</SelectItem>
                        <SelectItem value="fullstack">Full Stack Developer</SelectItem>
                        <SelectItem value="mobile">Mobile Developer</SelectItem>
                        <SelectItem value="data">Data Science</SelectItem>
                        <SelectItem value="devops">DevOps</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Buttons */}
            <div className="flex gap-3 mt-5">
              <Button type="button" onClick={goBackToStep1}  className="flex-1 ring-blue-600 bg-transparent border border-blue-600 hover:bg-blue-600 text-white">
                {t("back")}
              </Button>

              <Button type="submit" className="bg-blue-600 hover:bg-blue-700   text-white flex-1 capitalize">
                {t("create-account")}
              </Button>
            </div>
          </>
        )}
      </form>
    </Form>
  );
}
