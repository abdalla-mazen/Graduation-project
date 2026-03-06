import React from "react";

type Props = {
  headline?: string;
  description?: string;
};

export default function LoadingModal({ headline, description }: Props) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 w-[350px] text-center shadow-xl animate-in fade-in zoom-in-95">
        <div className="w-16 h-16 mx-auto mb-4 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{headline}</h3>
        <p className="text-sm text-gray-500">
          {description}
          <br />
          This may take a few seconds.
        </p>
      </div>
    </div>
  );
}
