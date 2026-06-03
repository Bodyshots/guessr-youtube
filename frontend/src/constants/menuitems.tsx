import { CalendarIcon, FolderIcon, Grid3X3Icon, ThumbsUpIcon, UserRoundIcon, LucideIcon, FileTextIcon, HeartIcon, SettingsIcon, CircleHelpIcon } from "lucide-react";
import { ReactNode } from "react";
import { IconType } from "react-icons";
import { AuthConstants, AuthType } from "./auth";
import { GameModeConstants } from "./gamemode";
import { FaGithub } from "react-icons/fa";

interface MenuItem {
  title: string,
  url: string,
  description: ReactNode,
  tooltipDesc: ReactNode,
  icon: LucideIcon | IconType,
  auth: AuthType,
}

export const GameModeMenuItems: MenuItem[] = [
  {
    title: GameModeConstants.BINGO,
    url: "/bingo",
    description:
      <span>!UNDER CONSTRUCTION! Fill up a bingo card of any size and see if you can score bingo by watching a series of YouTube videos.</span>,
    tooltipDesc:
      <span>See if you&apos;ll score bingo throughout a series of YouTube videos!</span>,
    icon: Grid3X3Icon,
    auth: AuthConstants.UNAUTH
  },
  {
    title: GameModeConstants.VIEWERS,
    url: "/viewers",
    description:
      <span>Guess how many viewers a YouTube video has</span>,
    tooltipDesc:
      <span>
        Given a random YouTube video, you&apos;ll have to guess whether a video is <b>higher</b> or <b>lower</b> than a certain viewer count.
      </span>,
    icon: UserRoundIcon,
    auth: AuthConstants.UNAUTH
  },
  {
    title: GameModeConstants.UPLOAD,
    url: "/date",
    description:
      <span>!UNDER CONSTRUCTION! Guess when a YouTube video was uploaded</span>,
    tooltipDesc:
      <span>
        A random YouTube video will be shown and you will have to guess <b>when</b> the video was <b>publicly uploaded</b>.
        The closer you are to the actual upload date, the more points you&apos;ll earn.
      </span>,
    icon: CalendarIcon,
    auth: AuthConstants.UNAUTH
  },
  {
    title: GameModeConstants.LIKES,
    url: "/like",
    description:
      <span>!UNDER CONSTRUCTION! Guess how the number of likes a YouTube video has</span>,
    tooltipDesc:
      <span>
        A random YouTube video will be shown and you will have to guess how many <b>likes</b> it has.
        The closer you are to the target <b>like</b> count the more points you&apos;ll earn.
      </span>,
    icon: ThumbsUpIcon,
    auth: AuthConstants.UNAUTH
  },
  {
    title: GameModeConstants.GENRE,
    url: "/genre",
    description:
      <span>!UNDER CONSTRUCTION! Guess the YouTube genre of a YouTube video</span>,
    tooltipDesc:
      <span>
        A random YouTube video will be shown and you will have to guess what <b>genre</b> the YouTube video is under.
      </span>,
    icon: FolderIcon,
    auth: AuthConstants.UNAUTH
  },
];

export const OtherMenuItems: MenuItem[] = [
  {
    title: "Documentation",
    url: "/docs",
    description: null,
    tooltipDesc: null,
    icon: FileTextIcon,
    auth: AuthConstants.UNAUTH
  },
  {
    title: "Donate",
    url: "https://ko-fi.com/macgabriel100",
    description: null,
    tooltipDesc: null,
    icon: HeartIcon,
    auth: AuthConstants.UNAUTH
  },
  {
    title: "Contribute",
    url: "https://github.com/Bodyshots/guessr-youtube",
    description: null,
    tooltipDesc: null,
    icon: FaGithub,
    auth: AuthConstants.UNAUTH
  },
  {
    title: "Settings",
    url: "/settings",
    description: null,
    tooltipDesc: null,
    icon: SettingsIcon,
    auth: AuthConstants.AUTH
  },
  {
    title: "About",
    url: "/about",
    description: null,
    tooltipDesc: null,
    icon: CircleHelpIcon,
    auth: AuthConstants.UNAUTH
  },
];

export const MenuItems: MenuItem[] = [...GameModeMenuItems, ...OtherMenuItems]