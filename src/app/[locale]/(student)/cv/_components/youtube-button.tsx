import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowRight, FileText } from "lucide-react";

export default function YoutubeButton() {
  return (
    //  YouTube Card
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">See how to create a proper CV here:</h3>
      <div className="flex items-center gap-4 bg-gray-50 rounded-xl p-3">
        {/* Thumbnail */}
        <div className="w-16 h-14 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
          <FileText className="w-6 h-6 text-gray-400" />
        </div>
        <div className="flex flex-col flex-1 items-center justify-center gap-3 sm:flex-row">
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-800 text-sm">CV with ATS way</p>
            <p className="text-xs text-gray-400">YouTube</p>
          </div>

          {/* Button to watch video  */}
          <Dialog>
            <DialogTrigger asChild>
              <button className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-3 py-2 rounded-lg text-sm transition-colors flex-shrink-0">
                Watch Video
                <ArrowRight className="w-4 h-4" />
              </button>
            </DialogTrigger>

            {/* Dialog with video  */}
            <DialogContent className="max-w-3xl p-0 overflow-hidden">
              <DialogHeader className="p-4 pb-0">
                <DialogTitle>How to create an ATS-Friendly CV</DialogTitle>
              </DialogHeader>
              <div className="relative w-full pt-[56.25%]">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/KGr8fXDWeV4?si=An68blK2BKmvb4HO"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

