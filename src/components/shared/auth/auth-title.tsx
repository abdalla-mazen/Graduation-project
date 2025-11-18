import React from "react";

export default function AuthTitle({ title }: { title: string }) {
  return (
    <h1 className="mb-1 pb-2 border-b border-b-zinc-300 dark:border-b-zinc-700 font-edwardian text-5xl">
      {title}
    </h1>
  );
}
