import { Suspense } from "react";
import { BriefcaseBusiness, ChevronLeft, Sparkles } from "lucide-react";

import AddProjectFormSkeleton from "@/components/skeletons/add-project-form.skeleton";
import { Link } from "@/i18n/navigation";
import { getSkills } from "@/lib/apis/get-skills.api";

import AddExperience from "../_components/add-experience";

async function AddExperienceContent() {
  const skills = await getSkills();

  return <AddExperience skills={skills.skills ?? skills} />;
}

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-white px-4 py-8 md:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 space-y-5">
          <Link
            href="/experience"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-600"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to experience
          </Link>

          <div className="flex flex-col gap-5 rounded-[32px] border border-white/70 bg-white/75 p-6 shadow-sm backdrop-blur sm:p-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-3 py-1 text-xs font-medium text-blue-700 shadow-sm">
                <BriefcaseBusiness className="h-3.5 w-3.5" />
                Experience Builder
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                Add a New Experience
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 md:text-base">
                Highlight your role, company, timeline, and impact so your
                profile tells a stronger professional story.
              </p>
            </div>

            <div className="rounded-3xl border border-blue-100 bg-gradient-to-r from-blue-50 to-sky-50 p-4 shadow-sm lg:max-w-sm">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md shadow-blue-200">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Make it recruiter-ready
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Use clear dates, a focused description, and the main skills
                    that defined your contribution.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Suspense fallback={<AddProjectFormSkeleton />}>
          <AddExperienceContent />
        </Suspense>
      </div>
    </div>
  );
}
