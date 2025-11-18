import { CircleAlert, CircleX } from "lucide-react";
import React from "react";

type ErrorProps = {
  message: string;
};

export default function ErrorFeedback({ message }: ErrorProps) {
  return (
    <div className="relative bg-red-50 mt-9 p-3 border border-red-600 text-sm">
      <div className="-top-3 left-1/2 absolute px-2 -translate-x-1/2">
        <CircleAlert className="fill-current rounded-full text-white">
          <CircleX className="text-red-600" />
        </CircleAlert>
      </div>

      <p className="text-red-600 text-center">{message}</p>
    </div>
  );
}
