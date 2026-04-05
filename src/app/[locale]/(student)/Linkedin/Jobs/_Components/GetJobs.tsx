// import React from "react";
// import getJobs from "@/lib/apis/get-posts-linkedin.api";
// import { LinkedInJobs } from "@/lib/types/jobs";
// import Link from "next/link";
// export default async function GetPosts() {
//   const Jobs: LinkedInJobs = await getJobs();
//   return (
//     <>
//       {Jobs.map((job, index) => (
//         <div key={index} className="shadow-xl p-4 rounded-lg my-2 ">
//           <p className="font-bold text-xl">Jop Title : {job.job_title}</p>
//           <p>Company Name : {job.company_name}</p>
//           <Link href={job.company_url}>
//             {" "}
//             Contact with compant :{" "}
//             <span className="text-mainColor truncate block w-full md:inline md:w-auto md:truncate-0">
//               {job.company_url}
//             </span>
//           </Link>
//           <div className="flex gap-3">
//             <p className="px-2 my-2 bg-mainColor text-white rounded-lg">
//               {job.is_remote ? "Remote" : "On-site"}
//             </p>
//             <p className="px-2 my-2 bg-secondaryColor text-white rounded-lg">
//               {index % 2 == 0 ? "Full Time" : "Part Time"}
//             </p>
//           </div>
//         </div>
//       ))}
//     </>
//   );
// }

import React from "react";
import getJobs from "@/lib/apis/get-posts-linkedin.api";
import { LinkedInJobs } from "@/lib/types/jobs";
import Link from "next/link";
import { Building2, ExternalLink, MapPin, Clock } from "lucide-react";

export default async function GetPosts() {
  const Jobs: LinkedInJobs = await getJobs();

  return (
    <div className="flex flex-col gap-3">
      {Jobs?.map((job, index) => (
        <div
          key={index}
          className="group bg-white border border-slate-200 hover:border-[#0077B5]/40 rounded-2xl p-5 shadow-sm hover:shadow-md hover:shadow-blue-100/50 transition-all duration-250"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1 min-w-0">

              {/* Job Title */}
              <h3 className="text-base font-bold text-slate-900 group-hover:text-[#0077B5] transition-colors duration-200 mb-1 leading-snug">
                {job.job_title}
              </h3>

              {/* Company Name */}
              <div className="flex items-center gap-1.5 text-slate-500 mb-2">
                <Building2 className="w-3.5 h-3.5 shrink-0" />
                <span className="text-sm">{job.company_name}</span>
              </div>

              {/* Company URL */}
              <Link
                href={job.company_url}
                target="_blank"
                className="inline-flex items-center gap-1.5 text-[#0077B5] hover:text-sky-600 text-xs transition-colors duration-150"
              >
                <ExternalLink className="w-3 h-3 shrink-0" />
                <span className="truncate max-w-[260px]">{job.company_url}</span>
              </Link>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap sm:flex-col gap-2 sm:items-end shrink-0">
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

              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
                  index % 2 === 0
                    ? "bg-blue-50 text-[#0077B5] border-blue-200"
                    : "bg-violet-50 text-violet-600 border-violet-200"
                }`}
              >
                <Clock className="w-3 h-3" />
                {index % 2 === 0 ? "Full Time" : "Part Time"}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}