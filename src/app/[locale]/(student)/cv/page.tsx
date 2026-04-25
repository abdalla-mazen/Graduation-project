// import CreateCvButton from "./_components/create-cv-button";
import CvForm from "./_components/cv-form";
import YoutubeButton from "./_components/youtube-button";

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
          {/* <CreateCvButton /> */}

          {/* YouTube Card */}
          {/* <YoutubeButton /> */}
        </div>
      </div>
    </div>
  );
}
