"use client"

import { Home, CircleHelp, UserRound, ThumbsUp, Folder, LogIn, LogOut,
         FileText, Settings, Grid3X3, LucideIcon, Gamepad2, Moon, Sun, Heart, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"
import React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarHeader,
  SidebarSeparator,
  SidebarInset
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useSidebar } from "@/components/ui/sidebar"
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { setPrivacyAck } from '@/redux/slices/privacySlice'
import YTicon from "@/components/YTIcon/yticon"
import { ThemeConstants } from "@/constants/theme"
import { GameModeConstants } from "@/constants/gamemode"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { TooltipConstants } from "@/constants/tooltip"
import { signIn, signOut, useSession } from 'next-auth/react'
import { AuthConstants, AuthType } from "@/constants/auth"
import { SidebarConstants } from "@/constants/sidebar"
import { OtherConstants } from "@/constants/other"

// Menu items
const modes = [
  {
    title: GameModeConstants.BINGO,
    url: "/bingo",
    icon: Grid3X3,
    auth: AuthConstants.UNAUTH
  },
  {
    title: GameModeConstants.VIEWERS,
    url: "",
    icon: UserRound,
    auth: AuthConstants.UNAUTH
  },
  {
    title: GameModeConstants.UPLOAD,
    url: "",
    icon: Calendar,
    auth: AuthConstants.UNAUTH
  },
  {
    title: GameModeConstants.LIKES,
    url: "",
    icon: ThumbsUp,
    auth: AuthConstants.UNAUTH
  },
  {
    title: GameModeConstants.GENRE,
    url: "",
    icon: Folder,
    auth: AuthConstants.UNAUTH
  },
]
const other = [
  {
    title: "Documentation",
    url: "/docs/getting_started/introduction",
    icon: FileText,
    auth: AuthConstants.UNAUTH
  },
  {
    title: "Donate",
    url: "https://buy.stripe.com/cN2fZ5aV05jc20U000",
    icon: Heart,
    auth: AuthConstants.UNAUTH
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
    auth: AuthConstants.AUTH
  },
  {
    title: "About",
    url: "/about",
    icon: CircleHelp,
    auth: AuthConstants.UNAUTH
  },
]

interface sidebarItem {
  title: string,
  url: string,
  icon: LucideIcon,
  auth: AuthType
}

interface sidebarGroupCustomProps {
  items: sidebarItem[];
  status: AuthType;
}

interface sidebarCollapseCustomProps {
  label: string;
  labelIcon: LucideIcon;
  items: sidebarItem[];
  status: AuthType;
  redirect_path?: string;
  className?: string;
}

interface ModeToggleProps {
  className?: string;
}

interface LogProps {
  status: AuthType;
  className?: string;
}

interface SidebarBtn {
  item: sidebarItem;
  className?: string;
}

// Helper
function AddSidebarBtn ( { item, className } : SidebarBtn) {

  return (
      <>
        <item.icon/>
        <span className={className}>{item.title}</span>
      </>)
}

// Temp function, replace later w/ better design
function capitalizeFirstLetter(val: string | undefined) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

function ModeToggle({ className }: ModeToggleProps) {
  const { setTheme, theme } = useTheme()
 
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className={cn("justify-start gap-3", className)}>
          {(theme === ThemeConstants.LIGHT ? 
            <Sun />:
            <Moon />
          )}
          <span className="font-yt_font">{capitalizeFirstLetter(theme)}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={cn("font-yt_font", className)}>
        <DropdownMenuItem onClick={() => setTheme(ThemeConstants.LIGHT)}>
          {ThemeConstants.LIGHT_CAP}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme(ThemeConstants.DARK)}>
          {ThemeConstants.DARK_CAP}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme(ThemeConstants.SYSTEM)}>
          {ThemeConstants.SYSTEM_CAP}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function LogBtn({ status, className }: LogProps) {

  return (status === AuthConstants.UNAUTH ?
    <TooltipProvider delayDuration={TooltipConstants.DELAY_DURATION}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            variant="outline"
            onClick={() => {signIn('google')}}
            className={cn("justify-start gap-3", className)}>
              <LogIn />
            <div className="font-yt_font">Log In</div>
          </Button>
        </TooltipTrigger>
        <TooltipContent
          sideOffset={TooltipConstants.HOME_SIDE_OFFSET}
          className="text-center max-w-[250px] p-[10px] text-wrap whitespace-normal font-yt_font">
          Log into your Google account to save your Bingo card and settings.
        </TooltipContent>
      </Tooltip>
    </TooltipProvider> :
    <Button
      variant="outline" 
      onClick={() => {signOut()}}
      className={cn("justify-start gap-3", className)}>
        <LogOut />
      <div className="font-yt_font">Log Out</div>
    </Button>)
}

const SidebarGroupCustom = ({ items, status }: sidebarGroupCustomProps) => {
  return (
    <SidebarGroupContent>
      <SidebarMenu>
        {items.map((item) => (
          (item.auth === AuthConstants.UNAUTH || (item.auth === AuthConstants.AUTH && status === AuthConstants.AUTH)) &&
          <SidebarMenuItem key={item.title} className="py-0.5 cursor-pointer">
            <SidebarMenuButton asChild>
              <Link href={item.url}>
                <AddSidebarBtn item={item} className="font-yt_font text-base"/>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroupContent>
  )
}

const SidebarCollapseCustom = ({ label, labelIcon: LabelIcon, items, status, className }: sidebarCollapseCustomProps) => {
  const sidebar_class = "py-0.5 text-base flex items-center gap-2 overflow-hidden rounded-md p-2 text-left outline-none ring-sidebar-ring transition-[width,height,padding] focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground h-8"
  const sidebarbtn_class = "text-sidebar-foreground/70 font-yt_font"

  return (
    <Collapsible 
    defaultOpen 
    className={cn("font-yt_font outline-none ring-sidebar-ring transition-[margin,opa] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0 group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0 text-base group/collapsible ", className)}>
      <CollapsibleTrigger asChild>
        <SidebarMenuButton className="text-base cursor-pointer">
          <LabelIcon/>
          {label}
          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
        </SidebarMenuButton>
      </CollapsibleTrigger>
      <CollapsibleContent>
      {items.map((item) => (
        (item.auth === AuthConstants.UNAUTH || (item.auth === AuthConstants.AUTH && status === AuthConstants.AUTH)) && 
        <SidebarMenuSub key={item.title}>
          {item.url ?
          <Link href={item.url}>
            <SidebarMenuSubItem className={sidebar_class}>
              <AddSidebarBtn item={item} className={sidebarbtn_class}/>
            </SidebarMenuSubItem>
          </Link>
          :
          <SidebarMenuSubItem className={sidebar_class}>
            <AddSidebarBtn item={item} className={sidebarbtn_class}/>
          </SidebarMenuSubItem>}
        </SidebarMenuSub>
      ))}
      </CollapsibleContent>
    </Collapsible>
  )
}
  

export function AppSidebar() {
  const { isMobile, state } = useSidebar()
  const { data: session, status } = useSession();
  const privacy_ack = useAppSelector((state) => state.privacy_persist.privacy_ack);
  const dispatch = useAppDispatch();

  return (
    <Sidebar variant="inset" collapsible="icon" className="py-0">
      <SidebarInset>
        <SidebarHeader className={`flex flex-row gap-x-3 text-center justify-center title-text font-logo mt-2 `}>
          <Link href={"/"} 
                className="flex flex-row gap-x-3 text-center justify-center title-text font-logo hover:opacity-50 transition-all duration-300">
            <YTicon/>
            <span className={`text-3xl ` + ((state === SidebarConstants.COLLAPSED && !isMobile) ? 'hidden' : "")}>{OtherConstants.SITETITLE}</span>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu >
                <SidebarMenuItem key={"Home"} className="py-0.5">
                  <SidebarMenuButton asChild>
                    <Link href={"/"}>
                      <Home />
                      <span className="font-yt_font text-base">{"Home"}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                {(state !== SidebarConstants.COLLAPSED || isMobile) && <SidebarCollapseCustom
                  label={"Game Modes"}
                  labelIcon={Gamepad2}
                  items={modes}
                  status={status}
                  className="py-0.5"
                />}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarSeparator />
          <SidebarGroup>
            {state !== SidebarConstants.COLLAPSED && (<SidebarGroupLabel className="text-xl font-yt_font pb-2">
              Other
            </SidebarGroupLabel>)}
            <SidebarGroupCustom
              items={other}
              status={status}
            />
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className={`flex flex-col transition-opacity duration-300 overflow-hidden pb-4 ` + 
          (state === SidebarConstants.COLLAPSED ? "opacity-0 pointer-events-none" : "opacity-100")}>
          {status === AuthConstants.AUTH && <span
            className="w-full flex justify-center text-center text-xs pt-1 text-muted-foreground font-yt_font">
            Currently signed in as: {session?.user?.email}
          </span>}
          <div className="flex flex-row gap-2">
            <ModeToggle className="w-1/2"/>
            <LogBtn status={status} className="w-1/2"/>
          </div>
          <span 
            className="w-full flex justify-center text-xs pt-1 hover:cursor-pointer hover:underline text-muted-foreground font-yt_font"
            onClick={() => dispatch(setPrivacyAck(!privacy_ack))}>
            Privacy Policy
          </span>
        </SidebarFooter>
      </SidebarInset>
    </Sidebar>
  )
}