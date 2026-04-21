import {  Sparkles, FolderKanban } from "lucide-react";
import MyProjects from "./_components/my-projects";
import { getProjects } from "@/lib/apis/get-projects.api";
import { Projects } from "@/lib/types/project";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export default async function Page() {
  const data: Projects = await getProjects();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-white px-4 py-8 md:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-3 py-1 text-xs font-medium text-blue-700 shadow-sm">
              <FolderKanban className="h-3.5 w-3.5" />
              Project Space
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              My Projects
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 md:text-base">
              Keep all your projects in one place. View, download, share, or get smart
              recommendations for your next project.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
            asChild
              type="button"
              className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-sky-500  text-sm font-semibold text-white shadow-md shadow-blue-200 transition-all duration-300 hover:-translate-y-0.5 hover:from-blue-700 hover:to-sky-600 hover:shadow-lg"
            >
              <Link className="w-full flex items-center flex-1 justify-center px-5 py-3 gap-2 " href="/projects/suggest">
              <Sparkles className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                Suggest Projects
              </Link>
            </Button>
          </div>
        </div>
        <MyProjects projects={data} />
      </div>
    </div>
  );
}
