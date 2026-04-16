"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function MobileMenuButton({ links }: any) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setOpen(!open)} className="p-2">
        {open ? <X /> : <Menu />}
      </button>
       
      {open && (
        <div className="absolute top-16 left-0 w-full bg-white border-t shadow-md flex flex-col gap-4 p-4">
          {links.map((link: any) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 text-sm"
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}