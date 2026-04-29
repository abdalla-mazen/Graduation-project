"use client";

import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { cn } from "@/lib/utils";

type CircleProgressProps = {
  value?: number;
  className?: string;
};

export default function CircleProgress({
  value = 75,
  className,
}: CircleProgressProps) {
  return (
    <div className={cn("relative w-32 sm:w-36", className)}>
      <CircularProgressbar
        value={value}
        styles={buildStyles({
          textSize: "18px",
          pathColor: "#0ea5e9",
          trailColor: "#e5e7eb",
          textColor: "#0ea5e9",
        })}
      />
      <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-blue-600">
        {value}%
      </div>
    </div>
  );
}
