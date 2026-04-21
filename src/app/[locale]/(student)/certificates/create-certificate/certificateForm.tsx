"use client"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {Form,FormControl,FormField,FormItem,FormLabel,FormMessage,} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue,} from "@/components/ui/select";
import { CertificateFormValues, certificateSchema } from "@/lib/schemas/add-ceritficate.schema";
import { SkillsResponse } from "@/lib/types/skills-user";
import { useAddCertificate } from "./_hooks/useaddCertificate";

type Props = {
  skills: SkillsResponse;
};

export default function CertificateForm({ skills }: Props) {
  const technicalSkills = skills.filter(
  (s) => s.type === "TECHNICAL");
  const form = useForm<CertificateFormValues>({
    resolver: zodResolver(certificateSchema),
    defaultValues: {
      title: "",
      provider: "",
      credential_url: "",
      skill_id: 0,
      issue_date: "",
    },
  });
  const { mutate } = useAddCertificate()
  const onSubmit = (data: CertificateFormValues) => {
     mutate(data)
  };

  return (
    <div className="w-full flex justify-center my-5">
      <div className="w-1/2 rounded-xl border bg-white p-6 shadow-sm">
        
        <h2 className="text-lg font-semibold mb-4">
          Add Certificate
        </h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Title</FormLabel>
                  <FormControl>
                    <Input placeholder="React - Complete Guide" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

              <FormField
                control={form.control}
                name="provider"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">Provider</FormLabel>
                    <FormControl>
                      <Input placeholder="Udemy" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="skill_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">Skill</FormLabel>
                    <Select
                      onValueChange={(val) => field.onChange(Number(val))}
                      defaultValue={field.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder = "choose skill" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {technicalSkills.map((s) => (
                          <SelectItem key={s.id} value={s.id.toString()}>
                            {s.name}
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
              name="credential_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Credential URL</FormLabel>
                  <FormControl>
                    <Input type="url" placeholder="https://..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="issue_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Issue Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />


              <Button className="flex-1 bg-mainColor" type="submit">
                Submit
              </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
