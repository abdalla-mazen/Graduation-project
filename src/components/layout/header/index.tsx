import React from "react";
import Image from "next/image";
import {
  Bell,
  ClipboardList,
  Gift,
  Headset,
  Heart,
  House,
  Info,
  PartyPopper,
  ShoppingCart,
  User,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

import InputSearch from "@/components/ui/search-input";
import { ModeToggle } from "@/components/features/toggle-mode";
import { NavLink } from "@/components/shared/nav-link";
import ToggleLocale from "./toggel-locale";

export default function Header() {
  // translations
  const t = useTranslations();

  // icons and links
  const icons = [
    { href: "/wishlist", icon: <Heart size={24} /> },
    { href: "/cart", icon: <ShoppingCart size={24} /> },
    { href: "/wishlist", icon: <Bell size={24} /> },
  ];
  const links = [
    { href: "/", label: t("home"), icon: <House size={20} /> },
    { href: "/products", label: t("products"), icon: <Gift size={20} /> },
    {
      href: "/categories",
      label: t("categories"),
      icon: <ClipboardList size={20} />,
    },
    {
      href: "/occasions",
      label: t("occasions"),
      icon: <PartyPopper size={20} />,
    },
    { href: "/contact", label: t("contact"), icon: <Headset size={20} /> },
    { href: "/about", label: t("about"), icon: <Info size={20} /> },
  ];

  return (
    <>
      {/* Top header section */}
      <div className="flex items-center flex-grow dark:bg-zinc-800 dark:text-zinc-50">
        <Image
          src="/assets/images/logo.png"
          width={85}
          height={80}
          alt="logo of the website"
          className="ms-9 mt-1 me-4 "
        />
        <div className=" items-center flex-1">
          <InputSearch
            className=" h-12 me-4 "
            id="search"
            name="search"
            placeholder={t("searchPlaceholder")}
          />
        </div>

        {/* User actions */}
        <div className="flex items-center gap-3">
          <Link href="/login" className="flex items-center  px-4 py-4">
            <User size={20} /> {t("login")}
          </Link>
          <ul className="flex gap-3 px-4 border-x border-zinc-200 py-3.5 items-center">
            {icons.map((item, index) => (
              <li key={index}>
                <Link href={item.href}>{item.icon}</Link>
              </li>
            ))}
            <ModeToggle />
          </ul>
           <ToggleLocale />
        </div>
      </div>

      {/* Bottom navigation bar */}
      <div className="dark:bg-softPink-200">
        <ul className="flex items-center justify-center gap-3 px-4 border-x bg-maroon-700 dark:bg-softPink-200 text-zinc-50 border-zinc-200 py-3.5">
          {links.map((item, index) => (
            <li key={index} className="mx-2">
              <NavLink href={item.href} className="flex items-center gap-2">
                {item.icon}
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
