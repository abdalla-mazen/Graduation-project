"use client";

import {
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Code2,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";

import { Link } from "@/i18n/navigation";
import { Experiences } from "@/lib/types/experience";

import useDeleteExperience from "../_hooks/use-delete-experience";

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

function formatRange(startDate: string, endDate: string | null) {
  return `${formatDate(startDate)} - ${
    endDate ? formatDate(endDate) : "Present"
  }`;
}

export default function MyExperience({
  experiences,
}: {
  experiences: Experiences;
}) {
  const { deleteExperience, isPending } = useDeleteExperience();

  return (
    <>
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3 text-sm text-slate-500">
          <span className="rounded-full bg-white px-3 py-1.5 shadow-sm">
            {experiences.length} Experiences
          </span>
          <span className="rounded-full bg-white px-3 py-1.5 shadow-sm">
            Career timeline
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {experiences.map((experience) => (
          <div
            key={experience.id}
            className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="relative h-40 bg-gradient-to-br from-blue-100 via-blue-50 to-white">
              <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-blue-700 shadow-sm">
                Experience
              </div>

              <div className="absolute right-4 top-4 flex items-center gap-2">
                <Link
                  href={`/experience/${experience.id}/edit`}
                  className="inline-flex rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-blue-700 shadow-sm transition hover:bg-blue-100 hover:text-blue-800"
                >
                  <Pencil className="h-5 w-5" />
                </Link>

                <button
                  type="button"
                  onClick={() => deleteExperience(experience.id)}
                  disabled={isPending}
                  className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-blue-700 shadow-sm transition hover:bg-blue-100 hover:text-blue-800 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>

              <div className="flex h-full items-center justify-center">
                <div className="rounded-2xl bg-white p-4 shadow-md">
                  <BriefcaseBusiness className="h-10 w-10 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="flex-1 p-5">
              <h3 className="line-clamp-2 text-lg font-semibold leading-6 text-slate-900">
                {experience.title}
              </h3>

              <div className="mt-3 flex items-center gap-2 text-sm font-medium text-slate-600">
                <Building2 className="h-4 w-4 text-blue-600" />
                <span className="line-clamp-1">{experience.company_name}</span>
              </div>

              <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                <CalendarDays className="h-4 w-4 text-blue-600" />
                <span>{formatRange(experience.start_date, experience.end_date)}</span>
              </div>

              <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">
                {experience.description}
              </p>

              {experience.skills?.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {experience.skills.map((skill, index) => (
                    <span
                      key={`${experience.id}-${skill}-${index}`}
                      className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                    >
                      <Code2 className="h-3.5 w-3.5" />
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        <button className="group flex h-full min-h-[320px] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-blue-300 bg-white/80 p-6 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-500 hover:bg-blue-50 hover:shadow-xl">
          <Link
            className="group flex w-full flex-col items-center"
            href="/experience/add-new-experience"
          >
            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-200 transition group-hover:scale-105">
              <Plus className="h-10 w-10" />
            </div>

            <h3 className="text-xl font-semibold text-blue-700">
              Add New Experience
            </h3>

            <p className="mt-2 max-w-xs text-sm leading-6 text-slate-500">
              Add internships, part-time roles, or full-time positions to build
              a stronger career timeline.
            </p>
          </Link>
        </button>
      </div>
    </>
  );
}
