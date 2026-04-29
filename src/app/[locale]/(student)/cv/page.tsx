// import CreateCvButton from "./_components/create-cv-button";
import Link from "next/link";
import CvForm from "./_components/cv-form";
import YoutubeButton from "./_components/youtube-button";
import { ArrowRight, FileText } from "lucide-react";

export default function Page() {
  return (
    <div className=" bg-gray-50 font-sans w-full mx-auto">
      {/* Header */}
      <div className="px-8 pt-8 pb-4">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">CV Coach</h1>
        <p className="text-gray-500 mt-1 text-sm">Create a professional CV now to apply for jobs</p>
      </div>

      <div className="px-8 pb-12 ">
        <CvForm />

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-gray-400 text-sm font-medium tracking-widest">OR</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* AI CV Maker */}
         <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">
        Create your CV easily with AI:
      </h3>

      <div className="flex items-center gap-4 bg-gray-50 rounded-xl p-3">
        {/* Thumbnail */}
        <div className="w-16 h-14 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
          <FileText className="w-6 h-6 text-gray-400" />
        </div>

        <div className="flex flex-col flex-1 items-center justify-center gap-3 sm:flex-row">
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-800 text-sm">
              AI CV Generator
            </p>
            <p className="text-xs text-gray-400">Smart & Fast</p>
          </div>

          {/* Button */}
          <Link
            href="/cv/cvForm"
            className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-3 py-2 rounded-lg text-sm transition-colors flex-shrink-0"
          >
            Create CV
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>

          
       
          {/* YouTube Card */}
          <YoutubeButton />
        </div>
      </div>
    </div>
  );
}
