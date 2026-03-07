import React from "react";
import { AppSidebar } from "../Appsidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Sidebar() {
  return (
    <div className="absolute top-0 left-0 bottom-0 z-10 rounded-lg  ">
      <SidebarProvider className="flex items-center ">
        <AppSidebar />
        <SidebarTrigger />
      </SidebarProvider>
    </div>
  );
}
