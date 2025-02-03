import { Home, CircleHelp, UserRoundPen, LogIn, FileText, Settings, Grid3X3, LucideIcon } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter
} from "@/components/ui/sidebar"
import SiteTitle from "@/components/SiteTitle/sitetitle"
import Link from "next/link"

// Menu items.
const main = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Bingo",
    url: "/bingo",
    icon: Grid3X3,
  },
]

const account = [
  {
    title: "Login",
    url: "/login",
    icon: LogIn,
  },
  {
    title: "Register",
    url: "/register",
    icon: UserRoundPen,
  }
]

const other = [
  {
    title: "Documentation",
    url: "/docs/getting_started/introduction",
    icon: FileText,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
  {
    title: "About",
    url: "/about",
    icon: CircleHelp,
  }
]

interface sidebarItem {
  title: string,
  url: string,
  icon: LucideIcon,
}

interface sidebarProps {
  label: string;
  items: sidebarItem[];
}

const SidebarGroupCustom = ({ label, items }: sidebarProps) => {
  return (
  <SidebarGroup>
    <SidebarGroupLabel className="text-sm font-yt_font">{label}</SidebarGroupLabel>
    <SidebarGroupContent>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild>
              <Link href={item.url}>
                <item.icon />
                <span className="font-yt_font">{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroupContent>
  </SidebarGroup>
  )
}

export function GuestSidebar() {

  return (
    <Sidebar>
      <SidebarContent>
      <SidebarGroupLabel className="text-lg justify-center flex my-2 mt-5"><SiteTitle width={50} height={50} title_style="text-3xl text-black"/></SidebarGroupLabel>
        <SidebarGroupCustom
          label={"Main"}
          items={main}
        />
        <SidebarGroupCustom
          label={"Account"}
          items={account}
        />
        <SidebarGroupCustom
          label={"Other"}
          items={other}
        />
      </SidebarContent>
      <SidebarFooter>
      </SidebarFooter>
    </Sidebar>
  )
}
