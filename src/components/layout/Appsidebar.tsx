"use client";

import {
  CircleUserRound,
  Settings,
  SquarePen,
  University,
  CalendarCheck,
  LogOut,
  House,
  FileUser,
  Album,
  Folder,
  BriefcaseBusiness,
  Linkedin,
  PencilRuler,
  Award,
  MessageCircleQuestionMark,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "@/i18n/navigation";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: House,
  },
  {
    title: "Learning Plan",
    url: "/learning-plan",
    icon: CalendarCheck,
  },
  {
    title: "Academic Courses",
    url: "/acad-courses",
    icon: University,
  },
  {
    title: "CV Coach",
    url: "/cv",
    icon: FileUser,
  },
  {
    title: "Certificates",
    url: "/certificates/get-certificate",
    icon: Award,
  },
  {
    title: "Projects",
    url: "/projects",
    icon: Folder,
  },
  {
    title: "Experience",
    url: "/experience",
    icon: BriefcaseBusiness,
  },
  {
    title: "Job Description",
    url: "/Linkedin/posts",
    icon: BriefcaseBusiness,
  },
  {
    title: "LindedIn jobs",
    url: "/Linkedin/Jobs",
    icon: Linkedin,
  },
  {
    title: "Industry Request",
    url: "/trends",
    icon: PencilRuler,
  },
  {
    title: "Settings",
    url: "/profile",
    icon: Settings,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const hiddenRoutes = ["/assesment", "/assesment-access", "/assesment-first"];
  const session = useSession();
  const shouldHide = hiddenRoutes.some((route) => pathname.includes(route));

  if (shouldHide) return null;

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <div className="mt-20 flex justify-between items-center bg-sidebarBackground px-3 py-3 rounded-lg dark:bg-sidebarBackgroundDark">
              <div className="left flex items-center gap-3">
                <CircleUserRound />
                <div className="info">
                  <p className="font-bold">Name : {session.data?.user.name}</p>
                  <p className="text-xs text-secondaryColor dark:text-secondaryColordark">
                    Email : {session.data?.user.email}
                  </p>
                </div>
              </div>
              <Link href={"/profile"}>
                <div className="rigrt cursor-pointer">
                  <SquarePen />
                </div>
              </Link>
            </div>
            <SidebarMenu className="bg-sidebarBackground my-2 rounded-lg font-bold dark:bg-sidebarBackgroundDark">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            <div className="bg-sidebarBackground my-2 rounded-lg py-3 flex flex-col gap-2 font-bold dark:bg-sidebarBackgroundDark">
            
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="box-three flex gap-3 items-center py-1 px-3 rounded-lg hover:bg-[#f4f4f5] cursor-pointer dark:hover:bg-[#27272a]"
              >
                <LogOut className="mr-2" />
                <span className="capitalize">Logout</span>
              </button>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
