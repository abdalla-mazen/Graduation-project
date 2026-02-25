"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "@/i18n/navigation";
import { ChooseTrackValues, useChooseTrackSchema } from "@/lib/schemas/choose-track.schema";
import { TracksList } from "@/lib/types/academic-course";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type TrackValues = {
  track?: string;
  level?: string;
};

export default function ChooseTrackForm({ data }: { data: TracksList }) {
  const router = useRouter();
  
  const trackSchema = useChooseTrackSchema();
  const form = useForm<ChooseTrackValues>({
    resolver: zodResolver(trackSchema),
    mode: "onTouched",
    defaultValues: {
      track: "",
      level: "",
    },
  });

  const onSubmit: SubmitHandler<TrackValues> = async (values) => {
    console.log("SUBMIT", values);
    document.cookie = `track=${values.track}; path=/; max-age=31536000`; // year
    document.cookie = `level=${values.level}; path=/; max-age=31536000`;
    document.cookie = `trackId=${data.find((track) => track.name === values.track)?.id}; path=/; max-age=31536000`;
    localStorage.setItem("trackId", `${data.find((track) => track.name === values.track)?.id}`);
    // window.location.href = "/assessment-first";
    router.push("/assesment-first");
  };

  // console.log("tracks prop:", data);

  if (!Array.isArray(data)) {
    return (
      <div>
        <h1>loading...</h1>
      </div>
    );
  }

  const isSubmitting = form.formState.isSubmitting;
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4  ">
          {/*  */}
          <FormField
            name="track"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-blue-600 capitalize">Choose Track </FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose Track" />
                    </SelectTrigger>
                    <SelectContent>
                      {data.map((track) => (
                        <SelectItem key={track.id} value={track.name}>
                          {track.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
          {/*  */}
          <FormField
            name="level"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-blue-600 capitalize">Choose Level </FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Basic </SelectItem>
                      <SelectItem value="intermediate"> Intermediate</SelectItem>
                      <SelectItem value="advanced"> Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white capitalize mt-12"
          >
            {isSubmitting ? <LoaderCircle className="animate-spin" /> : "   choose track"}
          </Button>
        </form>
      </Form>
    </>
  );
}
