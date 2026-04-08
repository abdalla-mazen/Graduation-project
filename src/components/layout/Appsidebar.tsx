"use client";

import { CircleUserRound , Settings, SquarePen , ClipboardList , University , CalendarCheck , LogOut , House ,
   FileUser , Album , Folder , BriefcaseBusiness , Linkedin  , PencilRuler  , Award , MessageCircleQuestionMark , Moon , 
  } from "lucide-react"


import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Switch } from "../ui/switch"
import { Link } from "@/i18n/navigation"
import { usePathname } from "next/navigation";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: House ,
  },
  {
    title: "Assessments",
    url: "/assessment/rules",
    icon: ClipboardList ,
  },
  {
    title: "Learning Plan",
    url: "#",
    icon: CalendarCheck ,
  },
  {
    title: "Academic Courses",
    url: "#",
    icon: University,
  },
  {
    title: "Courses",
    url: "#",
    icon: Album,
  },
   {
    title: "CV Coach",
    url: "/cv",
    icon: FileUser,
  },
   {
    title: "Certificates",
    url: "#",
    icon: Award  ,
  },
   {
    title: "Projects",
    url: "#",
    icon: Folder,
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
    url: "#",
    icon: PencilRuler,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]

export function AppSidebar() {
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
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
              <div className=" flex justify-between items-center bg-sidebarBackground px-3 py-3 rounded-lg dark:bg-sidebarBackgroundDark">
                  <div className="left flex items-center gap-3">
                    <CircleUserRound />
                    <div className="info">
                      <p className="font-bold">Ali Mohamed Ahmed</p>
                      <p className="text-xs text-secondaryColor dark:text-secondaryColordark">Alimohamed1233@gmail.com</p>
                    </div>
                  </div>
                  <div className="rigrt">
                    <SquarePen />
                  </div>
              </div>
            <SidebarMenu className="bg-sidebarBackground my-2 rounded-lg   font-bold dark:bg-sidebarBackgroundDark">
              {items.map((item) =>(
                <SidebarMenuItem key={item.title} >
                  <SidebarMenuButton  asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            <div className="bg-sidebarBackground my-2 rounded-lg py-3 flex flex-col gap-2 font-bold dark:bg-sidebarBackgroundDark">
             <div className="box-one flex gap-3 items-center py-1 px-3 rounded-lg hover:bg-[#f4f4f5] hover:cursor-pointer dark:hover:bg-[#27272a]">
              <MessageCircleQuestionMark />
              <span>Help</span>
             </div>
             <div className="box-two flex justify-between py-1 px-3 rounded-lg hover:bg-[#f4f4f5] hover:cursor-pointer dark:hover:bg-[#27272a]">
              <div className="flex gap-3 items-center">
              <Moon />
              <span>Dark Mode</span>
              </div>
              <Switch/>
             </div>
             <div className="box-three flex gap-3 items-center py-1 px-3 rounded-lg hover:bg-[#f4f4f5] hover:cursor-pointer dark:hover:bg-[#27272a]">
              <LogOut />
              <span>Logout</span>
             </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
