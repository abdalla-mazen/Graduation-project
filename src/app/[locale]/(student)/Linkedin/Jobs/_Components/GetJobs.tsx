import React from "react";

import Link from "next/link";
import { Building2, ExternalLink, MapPin, SearchX } from "lucide-react";

type Job = {
  job_url: string;
  job_title: string;
  company_url: string;
  company_name: string;
  location: string;
  is_remote: boolean;
};

type LinkedInJobs = Job[];

type GetJobsProps = {
  jobsPromise: LinkedInJobs;
};

export default function GetJobs({ jobsPromise }: GetJobsProps) {
  if (!jobsPromise?.length) {
    return (
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 shadow-lg shadow-slate-200/60">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(14,165,233,0.14),_transparent_34%),radial-gradient(circle_at_bottom_left,_rgba(2,132,199,0.08),_transparent_30%)]" />
        <div className="absolute -top-12 right-0 h-32 w-32 rounded-full bg-sky-100 blur-3xl opacity-80" />
        <div className="absolute bottom-0 left-0 h-24 w-24 rounded-full bg-blue-50 blur-2xl opacity-80" />

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0077B5] shadow-lg shadow-blue-200/70">
            <SearchX className="h-8 w-8 text-white" />
          </div>

          <h3 className="mb-2 text-2xl font-bold text-slate-900">
            No jobs found right now
          </h3>
          <p className="max-w-lg text-sm leading-6 text-slate-500 sm:text-base">
            We could not find LinkedIn jobs for the current search yet. Try
            again in a moment after refreshing your data or updating your
            profile details.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <span className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-semibold text-[#0077B5]">
              LinkedIn sync ready
            </span>
            <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-500">
              Waiting for results
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {jobsPromise?.map((job) => (
        <div
          key={job.job_url}
          className="group bg-white border border-slate-200 hover:border-[#0077B5]/40 rounded-2xl p-5 shadow-sm hover:shadow-md hover:shadow-blue-100/50 transition-all duration-250"
        >
          <div className="flex flex-col gap-4">
            <div className="flex-1 min-w-0">
              <Link
                href={job.job_url}
                target="_blank"
                className="inline-flex max-w-full"
              >
                <h3 className="text-base font-bold text-slate-900 group-hover:text-[#0077B5] transition-colors duration-200 mb-1 leading-snug">
                  {job.job_title}
                </h3>
              </Link>

              <div className="flex items-center gap-1.5 text-slate-500 mb-2">
                <Building2 className="w-3.5 h-3.5 shrink-0" />
                <span className="text-sm">{job.company_name}</span>
              </div>

              <div className="flex items-center gap-1.5 text-slate-500 mb-3">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span className="text-sm">{job.location}</span>
              </div>

              <div className="flex flex-wrap gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
                    job.is_remote
                      ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                      : "bg-amber-50 text-amber-600 border-amber-200"
                  }`}
                >
                  <MapPin className="w-3 h-3" />
                  {job.is_remote ? "Remote" : "On-site"}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2 text-xs sm:text-sm">
              <Link
                href={job.job_url}
                target="_blank"
                className="inline-flex items-center gap-1.5 text-[#0077B5] hover:text-sky-600 transition-colors duration-150"
              >
                <ExternalLink className="w-3 h-3 shrink-0" />
                <span className="font-medium">Job URL:</span>
                <span className="truncate">{job.job_url}</span>
              </Link>

              <Link
                href={job.company_url}
                target="_blank"
                className="inline-flex items-center gap-1.5 text-[#0077B5] hover:text-sky-600 transition-colors duration-150"
              >
                <ExternalLink className="w-3 h-3 shrink-0" />
                <span className="font-medium">Company URL:</span>
                <span className="truncate">{job.company_url}</span>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
