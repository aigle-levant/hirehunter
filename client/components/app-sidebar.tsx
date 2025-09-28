"use client";

import * as React from "react";
import { Bot, GalleryVerticalEnd, SquareTerminal } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { ThemeSwitcher } from "./theme-switcher";
import { type AppSidebarProps } from "@/types/dashboard.types";

export function AppSidebar({ user, ...props }: AppSidebarProps) {
  const data = {
    user: {
      name: user.full_name,
      email: user.email,
    },
    teams: [
      {
        name: "Hirehunter",
        logo: GalleryVerticalEnd,
        plan: "Plus",
      },
    ],
    navMain: [
      {
        title: "Parsers",
        url: "#",
        icon: SquareTerminal,
        isActive: true,
        items: [
          {
            title: "Parse JD",
            url: "/dashboard/jd-parser",
          },
          {
            title: "View JDs",
            url: "/dashboard/jd-database",
          },
          {
            title: "Parse resumes",
            url: "/dashboard/resume-parser",
          },
        ],
      },
      {
        title: "Candidates",
        url: "#",
        icon: Bot,
        items: [
          {
            title: "Rank resumes",
            url: "/dashboard/resume-ranker",
          },
          {
            title: "Feedback",
            url: "/dashboard/feedback",
          },
        ],
      },
    ],
  };
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <ThemeSwitcher />
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
