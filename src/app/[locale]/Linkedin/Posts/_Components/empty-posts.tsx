import { Bell, Linkedin } from "lucide-react";

export default function LinkedInJobsEmpty() {
  return (
    <div className="min-h-[calc(100vh-76px)] bg-[#f3f6fb] font-sans flex flex-col">
      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="bg-white rounded-2xl shadow-[0_4px_32px_rgba(26,108,246,0.08)] p-10 max-w-xl w-full">
          
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="m-0 text-xl font-bold text-[#1a1a2e]">
                LinkedIn Jobs
              </h2>
              <p className="mt-1 text-[#8898aa] text-xs">
                See personalized job recommendations based on your profile and skills.
              </p>
            </div>
            <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#1a6cf6] text-white font-semibold text-xs cursor-pointer border-none hover:bg-[#1558d6] transition-colors">
              <Linkedin size={16} /> Connect
            </button>
          </div>

          {/* Empty State */}
          <div className="bg-gradient-to-br from-[#eef3ff] to-[#f7f9ff] rounded-2xl p-12 text-center">
            {/* Animated Bell */}
            <div className="w-[90px] h-[90px] rounded-full bg-[rgba(26,108,246,0.08)] flex items-center justify-center mx-auto mb-5 text-[#1a6cf6] [animation:sway_2.5s_ease-in-out_infinite]">
              <Bell size={40} />
            </div>

            <h3 className="m-0 mb-2.5 text-lg font-bold text-[#1a1a2e]">
              No Jobs Available Right Now
            </h3>
            <p className="text-[#6b7a99] text-sm leading-relaxed mb-7 max-w-[360px] mx-auto">
              We haven&apos;t found job listings matching your profile yet.
            </p>

            {/* Divider */}
            <div className="my-7 flex items-center gap-3">
              <div className="flex-1 h-px bg-[#e5eaf2]" />
              <span className="text-[#aab4c8] text-xs">OR</span>
              <div className="flex-1 h-px bg-[#e5eaf2]" />
            </div>

            <p className="m-0 text-xs text-[#8898aa]">
              Try{" "}
              <span className="text-[#1a6cf6] font-semibold cursor-pointer hover:underline">
                updating your LinkedIn profile
              </span>{" "}
              to increase your job opportunities.
            </p>
          </div>

          {/* Last checked */}
          <p className="text-center mt-4 text-xs text-[#c0c9d8]">
            Last checked: 1 minutes ago
          </p>
        </div>
      </main>

      <style>{`
        @keyframes sway {
          0%, 100% { transform: rotate(-10deg); }
          50% { transform: rotate(10deg); }
        }
      `}</style>
    </div>
  );
}