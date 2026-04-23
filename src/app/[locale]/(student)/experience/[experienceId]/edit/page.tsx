import { Suspense } from "react";
import { BriefcaseBusiness, ChevronLeft, Sparkles } from "lucide-react";
import { notFound } from "next/navigation";

import AddProjectFormSkeleton from "@/components/skeletons/add-project-form.skeleton";
import { Link } from "@/i18n/navigation";
import { getExperience } from "@/lib/apis/get-experience.api";
import { getSkills } from "@/lib/apis/get-skills.api";

import AddExperience from "../../_components/add-experience";

type PageProps = {
  params: {
    experienceId: string;
  };
};

async function EditExperienceContent({ experienceId }: { experienceId: number }) {
  const [skillsResponse, experiences] = await Promise.all([
    getSkills(),
    getExperience(),
  ]);

  const experience = experiences.find((item) => item.id === experienceId);

  if (!experience) {
    notFound();
  }

  return (
    <AddExperience
      skills={skillsResponse.skills ?? skillsResponse}
      experience={experience}
      mode="edit"
    />
  );
}

export default function Page({ params }: PageProps) {
  const experienceId = Number(params.experienceId);

  if (Number.isNaN(experienceId)) {
    notFound();
  }

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
                Update Experience
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 md:text-base">
                Edit your company, role, timeline, and impact details to keep
                your profile accurate and polished.
              </p>
            </div>

            <div className="rounded-3xl border border-blue-100 bg-gradient-to-r from-blue-50 to-sky-50 p-4 shadow-sm lg:max-w-sm">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md shadow-blue-200">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Keep it up to date
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Refresh the timeline, update your description, and keep the
                    most relevant skills on display.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Suspense fallback={<AddProjectFormSkeleton />}>
          <EditExperienceContent experienceId={experienceId} />
        </Suspense>
      </div>
    </div>
  );
}
