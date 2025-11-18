import AuthToggleLocale from "@/components/shared/auth/auth-toggle-locale";
import React from "react";
import { LayoutProps } from "../../../../.next/types/app/layout";
import Image from "next/image";
export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-[#0095FF] relative  overflow-hidden flex  items-center justify-center p-4">
      {/* Circles background */}
      <div className="absolute w-[724px] h-[724px] left-[-196px] top-[355px] rounded-full bg-[#0071DA]" />
      <div className="absolute w-[572px] h-[572px] left-[-120px] top-[431px] rounded-full bg-[#005EB5]" />
      <div className="absolute w-[438px] h-[438px] left-[-53px] top-[498px] rounded-full bg-[#0071DA]" />
      <div className="absolute w-[721.5px] h-[721.5px] right-[-200px] top-[-4px] rounded-full bg-[#0071DA]" />

      {/* Main Content  */}
      <div className="relative z-10 bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl max-w-5xl w-full overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Left side: Auth Content */}
          <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center dark:bg-zinc-800 bg-white text-maroon-700 dark:text-softPink-300">
            <div className="w-full max-w-[406px] mx-auto">
              {/* Locale toggle button */}
              <div className="mb-6">
                <AuthToggleLocale />
              </div>
              {children}
            </div>
          </div>

          {/* Right side: Books Image */}
          <div className="lg:w-1/2 bg-gradient-to-br from-cyan-100 to-blue-100 flex items-center justify-center relative">
            <div className="relative w-full h-full">
              <Image src="/images/books-auth.jpg" alt="Auth book" className="object-cover" fill />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
