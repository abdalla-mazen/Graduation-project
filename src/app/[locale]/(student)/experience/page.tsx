import { BriefcaseBusiness, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { getExperience } from "@/lib/apis/get-experience.api";
import { Experiences } from "@/lib/types/experience";

import MyExperience from "./_components/my-experience";

export default async function Page() {
  const data: Experiences = await getExperience();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-white px-4 py-8 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-3 py-1 text-xs font-medium text-blue-700 shadow-sm">
              <BriefcaseBusiness className="h-3.5 w-3.5" />
              Experience Space
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              My Experience
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 md:text-base">
              Keep your internships, part-time roles, and professional work in
              one organized timeline that is easy to update and review.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              asChild
              type="button"
              className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-sky-500 text-sm font-semibold text-white shadow-md shadow-blue-200 transition-all duration-300 hover:-translate-y-0.5 hover:from-blue-700 hover:to-sky-600 hover:shadow-lg"
            >
              <Link
                className="flex w-full flex-1 items-center justify-center gap-2 px-5 py-3"
                href="/experience/add-new-experience"
              >
                <Sparkles className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                Add Experience
              </Link>
            </Button>
          </div>
        </div>

        <MyExperience experiences={data} />
      </div>
    </div>
  );
}
