"use client";

import { Button } from "@/components/ui/button";
import { Monitor, X } from "lucide-react";
import { useState } from "react";

export default function ServerErrorState({ onRetry }: { onRetry: () => void }) {
  const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const [retryCount, setRetryCount] = useState(0);
  const [retrying, setRetrying] = useState(false);

  const handleRetry = () => {
    setRetrying(true);
    setRetryCount((c) => c + 1);
    setTimeout(() => {
      setRetrying(false);
      onRetry();
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="flex flex-col items-center text-center max-w-sm w-full gap-0">
        <div className="relative w-[88px] h-[88px] mb-7">
          <div className="w-[88px] h-[88px] rounded-full bg-red-50 flex items-center justify-center">
            <Monitor size={36} className="text-red-500" strokeWidth={1.5} />
          </div>
          <div className="absolute bottom-0.5 right-0.5 w-6 h-6 rounded-full bg-red-500 border-[2.5px] border-white flex items-center justify-center">
            <X size={10} strokeWidth={3} className="text-white" />
          </div>
        </div>

        <p className="text-xl font-semibold text-gray-900 mb-2">Server error</p>
        <p className="text-sm text-gray-500 leading-relaxed mb-7">
          The analysis couldn&apos;t be completed because the server returned an incomplete
          response.
        </p>

        <div className="w-full flex flex-col gap-2 mb-7">
          {[
            "Wait a few seconds, then try again",
            "Check your internet connection",
            "If it keeps failing, the server may be down",
          ].map((text, i) => (
            <div
              key={i}
              className="flex items-center gap-3 bg-white border border-gray-100 rounded-lg px-4 py-2.5"
            >
              <span className="w-[22px] h-[22px] rounded-full bg-red-50 text-red-500 text-[11px] font-medium flex items-center justify-center shrink-0">
                {i + 1}
              </span>
              <p className="text-sm text-gray-500 text-left">{text}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row gap-2.5 w-full mb-5">
          <Button
            onClick={handleRetry}
            disabled={retrying}
            className="flex-1 py-2.5 text-sm font-medium rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors disabled:opacity-60"
          >
            {retrying
              ? "↻ Retrying..."
              : retryCount >= 1
                ? `↻ Try again (${retryCount})`
                : "↻ Try again"}
          </Button>
          <Button
            onClick={() => window.history.back()}
            className="flex-1 py-2.5 text-sm rounded-lg border border-gray-200 bg-blue-600 text-white hover:bg-gray-50 transition-colors"
          >
            ← Go back
          </Button>
        </div>

        <p className="text-xs text-gray-400">Error logged at {time}</p>
      </div>
    </div>
  );
}
