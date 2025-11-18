import Link from "next/link";
import React from "react";

type Props = {
  message: string;
  linkHref: string;
  linkText: string;
};

export default function AuthBottomLink({ message, linkHref, linkText }: Props) {
  return (
    <p className="mt-1 pt-2 border-t border-t-zinc-300 dark:border-t-zinc-700 text-zinc-800 dark:text-zinc-50">
      {message}{" "}
      <Link href={linkHref} className="text-maroon-700 dark:text-softPink-300">
        {linkText}
      </Link>
    </p>
  );
}
