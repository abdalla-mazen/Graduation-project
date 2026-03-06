"use client";

import ErrorFeedback from "@/components/shared/error-feedback";
import { Input } from "@/components/ui/input";
import { cvSchema } from "@/lib/schemas/cv.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Upload } from "lucide-react";
import React, { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import useCvAnalysis from "../_hooks/use-cv-analysis";
import LoadingModal from "@/components/shared/loading-modal";

interface CVFormData {
  file: File;
}

export default function CvForm() {
  //Mutation
  const { cv, isPending } = useCvAnalysis();

  // state
  const [dragging, setDragging] = useState(false);

  // refs
  const fileRef = useRef<HTMLInputElement | null>(null);

  // Form
  const form = useForm({
    defaultValues: {
      file: undefined,
    },
    resolver: zodResolver(cvSchema),
  });

  // handlers
  const handleDrop = (e: React.DragEvent<HTMLDivElement>, onChange: (file: File) => void) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) onChange(f);
  };
  const onSubmit = async (data: CVFormData) => {
    await cv(data.file);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 mb-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Get Instant CV Feedback</h2>
        <p className="text-gray-500 mt-2 text-sm">
          Upload your CV to see how it scores against industry standards.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Controller
          name="file"
          control={form.control}
          render={({ field }) => (
            <div
              onClick={() => fileRef.current?.click()}
              onDragEnter={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => handleDrop(e, field.onChange)}
              className={`border-2 border-dashed rounded-xl p-10 flex flex-col items-center cursor-pointer transition-colors ${
                dragging
                  ? "border-blue-400 bg-blue-50"
                  : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
              }`}
            >
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Upload className="w-6 h-6 text-blue-500" strokeWidth={2} />
              </div>
              <p className="font-semibold text-gray-800 mb-1">
                {field.value ? field.value.name : "Upload your CV"}
              </p>
              <p className="text-sm text-gray-400 mb-4">PDF only, max 10MB</p>
              <button
                type="submit"
                disabled={isPending}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-2.5 rounded-lg transition-colors text-sm"
                onClick={(e) => e.stopPropagation()}
              >
                Upload
              </button>

              {/* Input  */}
              <Input
                type="file"
                accept="application/pdf"
                ref={fileRef}
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) field.onChange(f);
                }}
              />
            </div>
          )}
        />

        {/* Error */}
        {form.formState.errors.file && (
          <ErrorFeedback message={form.formState.errors.file.message as string} />
        )}
      </form>

      {/* Loader screen */}
      {isPending && (
        <LoadingModal
          headline="Analyzing your CV..."
          description="Your CV is currently under analysis."
        />
      )}
    </div>
  );
}
