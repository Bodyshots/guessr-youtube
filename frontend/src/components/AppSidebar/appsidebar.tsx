"use client"

import {
  HomeIcon, LogInIcon, LogOutIcon,
  LucideIcon, Gamepad2Icon, MoonIcon, SunIcon,
  ChevronRightIcon
} from "lucide-react"
import { capitalizeString, cn } from "@/lib/utils"
import { useEffect, useState } from "react"
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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { TooltipConstants } from "@/constants/tooltip"
import { signIn, signOut, useSession } from 'next-auth/react'
import { AuthConstants, AuthType } from "@/constants/auth"
import { SidebarConstants } from "@/constants/sidebar"
import { OtherConstants } from "@/constants/other"
import { IconType } from "react-icons";
import { GameModeMenuItems, OtherMenuItems } from "@/constants/menuitems";

interface SidebarItem {
  title: string,
  url: string,
  icon: LucideIcon | IconType,
  auth: AuthType
}

interface SidebarGroupCustomProps {
  items: SidebarItem[];
  status: AuthType;
}

interface SidebarCollapseCustomProps {
  label: string;
  labelIcon: LucideIcon | IconType;
  items: SidebarItem[];
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
  item: SidebarItem;
  className?: string;
}

// Helper
function AddSidebarBtn({ item, className }: SidebarBtn) {
  return (
    <>
      <item.icon />
      <span className={className}>{item.title}</span>
    </>)
}

function ModeToggle({ className }: ModeToggleProps) {
  const { setTheme, theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIsMounted(true), 0);
    return () => clearTimeout(t);
  }, [])

  if (!isMounted) return (
    <Button variant="outline" className={cn("justify-start gap-3", className)} disabled={true}>
      <span className="font-yt_font">Loading...</span>
    </Button>
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className={cn("justify-start gap-3", className)}>
          {(theme === ThemeConstants.LIGHT ?
            <SunIcon /> :
            <MoonIcon />
          )}
          <span className="font-yt_font">{capitalizeString(theme ?? '')}</span>
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
            onClick={() => { signIn('google') }}
            className={cn("justify-start gap-3", className)}>
            <LogInIcon />
            <div className="font-yt_font">Log In</div>
          </Button>
        </TooltipTrigger>
        <TooltipContent
          sideOffset={TooltipConstants.HOME_SIDE_OFFSET}
          className="text-center max-w-62.5 p-2.5 text-wrap whitespace-normal font-yt_font">
          Log into your Google account to save your Bingo card and stats.
        </TooltipContent>
      </Tooltip>
    </TooltipProvider> :
    <Button
      variant="outline"
      onClick={() => { signOut() }}
      className={cn("justify-start gap-3", className)}>
      <LogOutIcon />
      <div className="font-yt_font">Log Out</div>
    </Button>
  )
}

const SidebarGroupCustom = ({ items, status }: SidebarGroupCustomProps) => {
  return (
    <SidebarGroupContent>
      <SidebarMenu>
        {items.map((item) => (
          (item.auth === AuthConstants.UNAUTH || (item.auth === AuthConstants.AUTH && status === AuthConstants.AUTH)) &&
          <SidebarMenuItem key={item.title} className="py-0.5 cursor-pointer">
            <SidebarMenuButton asChild>
              <Link href={item.url}>
                <AddSidebarBtn item={item} className="font-yt_font text-base" />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroupContent>
  )
}

const SidebarCollapseCustom = ({ label, labelIcon: LabelIcon, items, status, className }: SidebarCollapseCustomProps) => {
  const sidebar_class = "z-50 py-0.5 text-base flex items-center gap-2 overflow-hidden rounded-md p-2 text-left outline-hidden ring-sidebar-ring transition-[width,height,padding] focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground h-8"
  const sidebarbtn_class = "text-sidebar-foreground/70 font-yt_font z-50"

  return (
    <Collapsible
      defaultOpen
      className={cn("font-yt_font outline-hidden ring-sidebar-ring transition-[margin,opa] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0 group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0 text-base group/collapsible", className)}>
      <CollapsibleTrigger asChild>
        <SidebarMenuButton className="text-base cursor-pointer">
          <LabelIcon />
          {label}
          <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
        </SidebarMenuButton>
      </CollapsibleTrigger>
      <CollapsibleContent>
        {items.map((item) => (
          (item.auth === AuthConstants.UNAUTH || (item.auth === AuthConstants.AUTH && status === AuthConstants.AUTH)) &&
          <SidebarMenuSub key={item.title}>
            {item.url ?
              <Link href={item.url}>
                <SidebarMenuSubItem className={sidebar_class}>
                  <AddSidebarBtn item={item} className={sidebarbtn_class} />
                </SidebarMenuSubItem>
              </Link>
              :
              <SidebarMenuSubItem className={sidebar_class}>
                <AddSidebarBtn item={item} className={sidebarbtn_class} />
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
            className="flex flex-row gap-x-3 text-center justify-center title-text font-logo hover:opacity-50 transition-all duration-150">
            <YTicon />
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
                      <HomeIcon />
                      <span className="font-yt_font text-base">{"Home"}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                {(state !== SidebarConstants.COLLAPSED || isMobile) && <SidebarCollapseCustom
                  label={"Modes"}
                  labelIcon={Gamepad2Icon}
                  items={GameModeMenuItems}
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
              items={OtherMenuItems}
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
          <SidebarSeparator className="my-2" />
          <div className="flex flex-row gap-2">
            <ModeToggle className="w-1/2" />
            <LogBtn status={status} className="w-1/2" />
          </div>
          <span
            className="hover:opacity-50 transition-opacity flex justify-center text-xs pt-1 hover:cursor-pointer text-muted-foreground font-yt_font"
            onClick={() => dispatch(setPrivacyAck(!privacy_ack))}>
            Privacy Policy
          </span>
        </SidebarFooter>
      </SidebarInset>
    </Sidebar>
  )
}