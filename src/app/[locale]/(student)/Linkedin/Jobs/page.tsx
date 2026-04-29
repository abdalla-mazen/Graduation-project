
import { Linkedin, Sparkles } from "lucide-react";
import { JobsSkeleton } from "./_Components/Skeleton";
import { Suspense } from "react";
import GetJobs from "./_Components/GetJobs";
import getJobs from "@/lib/apis/get-jobs-linkedin.api";

export default async function LinkedinPosts() {
  const jobsPromise =  await getJobs();
 

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="w-full max-w-4xl mx-auto px-6 pt-10 pb-16">
        <div className="relative overflow-hidden rounded-3xl bg-white border border-slate-200 shadow-xl shadow-slate-200/60 mb-10">
          <div className="h-1.5 w-full bg-gradient-to-r from-[#0077B5] via-sky-400 to-blue-400" />

          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, #0077B5 1px, transparent 0)",
              backgroundSize: "28px 28px",
            }}
          />

          <div className="absolute -top-16 -right-16 w-72 h-72 bg-sky-100 rounded-full blur-3xl opacity-60 pointer-events-none" />

          <div className="relative z-10 p-8 sm:p-10">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#0077B5] flex items-center justify-center shadow-md shadow-blue-200">
                <Linkedin className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium tracking-widest uppercase">
                  Integration
                </p>
                <p className="text-sm font-bold text-slate-700 leading-tight">
                  LinkedIn Jobs
                </p>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight mb-2">
              Find your next <span className="text-[#0077B5]">dream job</span>
            </h1>
            <p className="text-slate-500 text-base max-w-md mb-7 leading-relaxed">
              Connect your LinkedIn profile and get AI-powered job
              recommendations tailored to your skills and experience.
            </p>

            <p className="text-xs text-slate-400">We never post on your behalf</p>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-5 px-1">
          <Sparkles className="w-4 h-4 text-[#0077B5]" />
          <h2 className="text-sm font-semibold tracking-widest uppercase text-slate-400">
            Recommended for you
          </h2>
        </div>

        <Suspense fallback={<JobsSkeleton />}>
          <GetJobs jobsPromise={jobsPromise} />
        </Suspense>
      </div>
    </div>
  
  );
}
