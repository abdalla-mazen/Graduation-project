"use client";


import { Timer } from "lucide-react";
import React, { useEffect, useState } from "react";
import Image from "next/image";


export default function HeaderQuestion({totalSeconds}: {totalSeconds: number}) {
  const  [timeLeft, setTimeLeft] = useState(totalSeconds); 

  useEffect(()=>{
    if (timeLeft <= 0) {
      return;
    }
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;


  return (
    <div className="flex  gap-2 items-center bg-white justify-between  py-3 px-2 shadow-md">
    <Image src="/images/logoo.png" alt="Logo" width={50} height={50} />
    <h1 className="text-3xl text-blue-600 font-bold">Nexus</h1>
      <div className="flex gap-2 items-center justify-end  w-full ">
        <div className="flex gap-2 items-center  bg-indigo-900/60 py-2 px-5 rounded-xl text-white">
  
          <Timer />
          <span> {minutes}:{seconds.toString().padStart(2, "0")}</span>
        </div>
      </div>
    </div>
  );
}
