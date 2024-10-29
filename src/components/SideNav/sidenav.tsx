"use client";

import './sidenav.css'
// import SideBarItem from './SideNavItem/sideNavitem';
// import { MdGridOn } from "react-icons/md";
// import { PiGear } from "react-icons/pi";
// import { RxQuestionMarkCircled } from "react-icons/rx";
// import { AiOutlineYoutube } from "react-icons/ai";

import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"
 
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

  const items = [
    {
      title: "Home",
      url: "#",
      icon: Home,
    },
    {
      title: "Inbox",
      url: "#",
      icon: Inbox,
    },
    {
      title: "Calendar",
      url: "#",
      icon: Calendar,
    },
    {
      title: "Search",
      url: "#",
      icon: Search,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
    },
  ]

const SideNav = () => {
    return (
        <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
    // <div className="sideBarContainer">
    //     <Sidebar>
    //         <Sidenav.Body>
    //             <Nav activeKey="1">
    //                 <Nav.Item eventKey="1" 
    //                           icon={<AiOutlineYoutube/>} 
    //                           className="sideBarLink sideBarTitleLogo">
    //                     {/* <b className='sideBarTitle'>Guessr - YouTube Edition</b> */}
    //                     <div className="sideBarLinkContainer">
    //                         <b className="sideBarTitle">
    //                             <div className="sideBarTitleText">
    //                                 Guessr
    //                             </div>
    //                             <span className="sideBarEdition">YouTube Edition</span>
    //                         </b>
    //                     </div>
    //                 </Nav.Item>
    //                 <Nav.Item eventKey="2" icon={<MdGridOn />} className="sideBarLinkContainer">
    //                     <span className="sideBarLinkName">Bingo</span>
    //                 </Nav.Item>
    //                 <Nav.Item eventKey="3" icon={<PiGear />} className="sideBarLinkContainer">
    //                     <span className="sideBarLinkName">Settings</span>
    //                 </Nav.Item>
    //                 <Nav.Item eventKey="4" icon={<RxQuestionMarkCircled />} className="sideBarLinkContainer">
    //                     <span className="sideBarLinkName">About</span>
    //                 </Nav.Item>
    //             </Nav>
    //         </Sidenav.Body>
    //     </Sidebar>
    // </div>
    // <div className="sideBarContainer">
    //     <button className="sideBarLink">
    //         <div className="sideBarLinkContainer">
    //             <b className="sideBarTitle">
    //                 <div className="sideBarTitleTop">
    //                     <AiOutlineYoutube className="sideBarTitleLogo"/>
    //                     <div className="sideBarTitleText">
    //                         Guessr
    //                     </div>
    //                 </div>
    //                 <span className="sideBarEdition">YouTube Edition</span>
    //             </b>
    //         </div>
    //     </button>
    //     <SideBarItem icon={MdGridOn} label={"Bingo"}/>
    //     <SideBarItem icon={PiGear} label={"Settings"}/>
    //     <SideBarItem icon={RxQuestionMarkCircled} label={"About"}/>
    // </div>
    )
}

export default SideNav;