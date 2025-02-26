"use client"

import * as React from "react"
import {
  Palette,
  Atom,
  CircleDot,
  Grid,
  Layers,
  Settings2,
  Command,
  GalleryVerticalEnd,
  Cloud,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavResources } from "@/components/nav-resources"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// Main navigation data
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "CIEDEN",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Good Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Playground",
      url: "/playground",
      icon: Command,
      isActive: false,
      items: [
        {
          title: "Page 1",
          url: "/playground/page1",
        },
        {
          title: "Page 2",
          url: "/playground/page2",
        },
        {
          title: "Weather Widget",
          url: "/playground/weather-widget",
        }
      ],
    },
    {
      title: "Weather",
      url: "/weather",
      icon: Cloud,
      isActive: false,
      items: [],
    },
    {
      title: "Theme Editor",
      url: "/theme",
      icon: Palette,
      isActive: true,
      items: [
        {
          title: "Base Colors",
          url: "/theme?tab=base",
        },
        {
          title: "Primary Colors",
          url: "/theme?tab=primary",
        },
        {
          title: "Semantic Colors",
          url: "/theme?tab=semantic",
        },
        {
          title: "Radius & Effects",
          url: "/theme?tab=effects",
        },
      ],
    },
    {
      title: "Subatomic",
      url: "/subatomic",
      icon: CircleDot,
      items: [
        {
          title: "Border Radius",
          url: "/subatomic/radius",
        },
        {
          title: "Shadows",
          url: "/subatomic/shadows",
        },
        {
          title: "Icons",
          url: "/subatomic/icons",
        },
        {
          title: "Animations",
          url: "/subatomic/animations",
        },
      ],
    },
    {
      title: "Atoms",
      url: "/atoms",
      icon: Atom,
      items: [
        {
          title: "Buttons",
          url: "/atoms/buttons",
        },
        {
          title: "Inputs",
          url: "/atoms/inputs",
        },
        {
          title: "Typography",
          url: "/atoms/typography",
        },
        {
          title: "Icons",
          url: "/atoms/icons",
        },
      ],
    },
    {
      title: "Molecules",
      url: "/molecules",
      icon: Grid,
      items: [
        {
          title: "Forms",
          url: "/molecules/forms",
        },
        {
          title: "Cards",
          url: "/molecules/cards",
        },
        {
          title: "Navigation",
          url: "/molecules/navigation",
        },
        {
          title: "Dialogs",
          url: "/molecules/dialogs",
        },
      ],
    },
    {
      title: "Organisms",
      url: "/organisms",
      icon: Layers,
      items: [
        {
          title: "Headers",
          url: "/organisms/headers",
        },
        {
          title: "Layouts",
          url: "/organisms/layouts",
        },
        {
          title: "Tables",
          url: "/organisms/tables",
        },
        {
          title: "Dashboards",
          url: "/organisms/dashboards",
        },
      ],
    },
    {
      title: "Storybook",
      url: "/storybook",
      icon: GalleryVerticalEnd,
      isActive: false,
      items: [
        {
          title: "About Storybook",
          url: "/storybook/about",
        },
        {
          title: "Installation Guide",
          url: "https://storybook.js.org/docs/get-started/install",
          external: true,
        }
      ],
    },
  ],
  resources: [
    {
      name: "UI Libraries",
      url: "/resources/ui-libraries",
      icon: Settings2,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavResources projects={data.resources} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
