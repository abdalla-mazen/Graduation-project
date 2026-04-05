"use client";

import { Sparkles } from "lucide-react";
import useCvGeneration from "../_hooks/use-cv-generation";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import LoadingModal from "@/components/shared/loading-modal";

export default function CreateCvButton() {
// Mutation
  const { cvCreation, isPending, pdfUrl } = useCvGeneration();

  return (
    <>
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-blue-500" />
          <h3 className="text-lg font-bold text-gray-900">AI CV Maker</h3>
        </div>
        <p className="text-sm text-gray-500 mb-6">
          If you want AI to help you create a professional CV using ATS simply click on Create.
        </p>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Create CV with ATS way</span>
          <button
            onClick={() => cvCreation()}
            disabled={isPending}
            className="bg-blue-500 hover:bg-blue-600 disabled:opacity-60 text-white font-semibold px-5 py-2 rounded-lg text-sm transition-colors"
          >
            {isPending ? "Generating..." : "Create"}
          </button>
        </div>
      </div>

      {/* PDF Modal */}
      {pdfUrl && (
        <Dialog
          open={!!pdfUrl}
          onOpenChange={(open) => {
            if (!open) window.location.reload();
          }}
        >
          <DialogContent className="max-w-[90vw] w-[90vw] h-[90vh] flex flex-col p-0 gap-0">
            {/* Header */}
            <DialogHeader className="flex flex-row items-center justify-between px-6 py-4 border-b shrink-0">
              <DialogTitle className="text-lg font-bold text-gray-900">Your CV</DialogTitle>
              <a
                href={pdfUrl}
                download="my-cv.pdf"
                className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-4 py-2  mr-4 rounded-lg transition-colors"
              >
                Download
              </a>
            </DialogHeader>

            {/* PDF Viewer */}
            <iframe src={pdfUrl} className="flex-1 w-full rounded-b-2xl" title="CV Preview" />
          </DialogContent>
        </Dialog>
      )}

      {/* Loading Modal */}
      {isPending && (
        <LoadingModal
          headline="Generating your CV..."
          description="Your CV is currently genration by AI."
        />
      )}
    </>
  );
}
