"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import Image from "next/image"

// import { Menu, X , House , CirclePlay , Bell , BriefcaseBusiness , CircleUserRound } from "lucide-react"
// import Link from "next/link"

export default function Navbar() {
  // const [open, setOpen] = React.useState(false)
  // const [active, setActive] = React.useState("Home")

  // const links = [
  //   { name: "Home", icon: <House />, href: "/Home" },
  //   { name: "Courses", icon: <CirclePlay />, href: "/" },
  //   { name: "Job Description", icon: <BriefcaseBusiness />, href: "/" },
  //   { name: "Notifications", icon: <Bell />, href: "/" },
  //   { name: "My profile", icon: <CircleUserRound />, href: "/" },
  // ]

  return (
    <nav className="relative top-0 left-0 w-full bg-white dark:bg-black shadow-md z-50">
      <div className=" w-[90%] mx-auto flex items-center justify-between py-4">
        
        {/* Logo */}
        <div className="flex">
 <Image src="/images/logoo.png" alt="Logo" width={50} height={50} />
    <h1 className="text-3xl text-blue-600 font-bold">Nexus</h1>
        </div>

        {/* Mobile Menu Button */}
        {/* <div className="md:hidden">
          <button 
            className="p-2"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div> */}

        {/* Desktop Links */}
        {/* <div className="hidden md:w-[70%] md:flex justify-center gap-10 font-light">
          {links.map(link => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setActive(link.name)}
              className={`text-xs flex flex-col items-center gap-1  ${active === link.name ? "font-semibold " : ""}`}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          ))}
        </div> */}

        {/* Desktop Search */}
        <div className="mx-4 w-1/2 sm:w-1/4">
          <Input placeholder="Search..." className="w-full" />
        </div>
      </div>

      {/* Mobile Menu */}
      {/* {open && (
        <div className="md:hidden w-full bg-white dark:bg-black border-t shadow-md p-4 flex flex-col gap-4">
          <Input placeholder="Search..." className="w-full" />
          {links.map(link => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setActive(link.name)}
              className={`text-xs flex flex-col items-center gap-1 ${active === link.name ? "font-bold" : ""}`}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          ))}
        </div>
      )} */}
    </nav>
  )
}
