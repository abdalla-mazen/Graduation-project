import Link from "next/link";
import {House,Contact,CircleAlert,CirclePlay,} from "lucide-react";

import NotificationsServer from "../notifications/notifications-server";
import MobileMenuButton from "./iconNavbar";


export default function Navbar() {
  const links = [
    { name: "Home", icon: <House />, href: "/" },
    { name: "Courses", icon: <CirclePlay />, href: "/courses" },
    { name: "About", icon: <CircleAlert />, href: "/about" },
    { name: "Contact", icon: <Contact />, href: "/contact" },
  ];

  return (
    <nav className="relative top-0 left-0 w-full bg-white dark:bg-black shadow-md z-50">
      <div className="w-[90%] mx-auto flex items-center justify-between py-4">

        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-mainColor">
          Nexus
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="flex flex-col items-center text-xs gap-1 text-gray-600 hover:text-black"
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          ))}

          <NotificationsServer />
        </div>

        {/* Right side */}
        <div className="hidden md:flex gap-3">
          <Link className="px-4 py-2 bg-mainColor text-white rounded-lg" href="/login">
            Login
          </Link>
        </div>

        {/* 🔥 Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-3">
          <NotificationsServer />
          <MobileMenuButton links={links} />
        </div>

      </div>
    </nav>
  );
}