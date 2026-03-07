"use client";
import * as React from "react";
import { Menu, X, House, Contact, CircleAlert, CirclePlay } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
export default function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState("Home");

  const links = [
    { name: "Home", icon: <House />, href: "/" },
    { name: "Courses", icon: <CirclePlay />, href: "/" },
    { name: "About", icon: <CircleAlert />, href: "/" },
    { name: "Contact ", icon: <Contact />, href: "/" },
  ];

  return (
    <nav className="relative top-0 left-0 w-full bg-white dark:bg-black shadow-md z-50">
      <div className=" w-[90%] mx-auto flex items-center justify-between py-4">
        {/* Logo */}
        <div className="flex">
          <h1 className="text-3xl text-blue-600 font-bold">Nexus</h1>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button className="p-2" onClick={() => setOpen(!open)}>
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex justify-center gap-16 font-light">
          {links.map((link) => (
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
        </div>

        {/* Buttons */}
        <div className="hidden  md:flex gap-3">
          <Button className="bg-mainColor">Login</Button>
          <Button className="bg-mainColor">Register</Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden w-full bg-white dark:bg-black border-t shadow-md p-4 flex flex-col gap-4">
          {links.map((link) => (
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
          <div className="flex flex-col gap-3">
            <Button className="bg-mainColor">Login</Button>
            <Button className="bg-mainColor">Register</Button>
          </div>
        </div>
      )}
    </nav>
  );
}
