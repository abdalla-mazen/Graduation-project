"use client";

import { Info } from "lucide-react";
import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Main() {
  const pathname = usePathname();
const hiddenRoutes = [
  "/assesment",
  "/assesment-access",
  "/assesment-first",
];

const shouldHide = hiddenRoutes.some((route) =>
  pathname.includes(route)
);

if (shouldHide) return null;

  return (
    <>
      <div className="flex  gap-2 items-center bg-white justify-between  py-3 px-2 shadow-md">
        <Image src="/images/logoo.png" alt="Logo" width={50} height={50} />
        <h1 className="text-3xl text-blue-600 font-bold">Nexus</h1>
        <div className="flex gap-2 items-center justify-end  w-full ">
          <div className="flex gap-2 items-center  bg-indigo-900/60 py-2 px-5 rounded-xl text-white">
            <Info className="dark:text-whiteColor " />
            <span className="dark:text-whiteColor -translate-y-0.5">Help</span>
          </div>
        </div>
      </div>
    </>
  );
}
