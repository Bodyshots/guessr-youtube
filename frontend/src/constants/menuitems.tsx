import { CalendarIcon, Grid3X3Icon, ThumbsUpIcon, UserRoundIcon, LucideIcon, FileTextIcon, HeartIcon, SettingsIcon, CircleHelpIcon, ImageIcon } from "lucide-react";
import { ReactNode } from "react";
import { IconType } from "react-icons";
import { AuthConstants, AuthType } from "./auth";
import { GameModeConstants } from "./game";
import { FaGithub, FaYoutube } from "react-icons/fa";

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
        Given a random YouTube <b>video</b>, you&apos;ll have to guess whether a video is <b>higher</b> or <b>lower</b> than a certain viewer count.
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
        Given a random YouTube <b>video</b>, you&apos;ll have to guess <b>when</b> the video was <b>publicly uploaded</b> (Month, year).
        More details will be revealed for incorrect answers.
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
        Given a random YouTube <b>video</b>, you&apos;ll have to guess whether has a <b>higher</b> or <b>lower</b> number of likes than a certain number.
      </span>,
    icon: ThumbsUpIcon,
    auth: AuthConstants.UNAUTH
  },
  {
    title: GameModeConstants.CHANNEL,
    url: "/channel",
    description:
      <span>!UNDER CONSTRUCTION! Progressively guess aspects of a YouTube channel, starting from its channel picture</span>,
    tooltipDesc:
      <span>
        Given a random YouTube <b>channel picture</b>, you&apos;ll have to
        guess various aspects about the channel, including viewer and subscriber counts.
      </span>,
    icon: FaYoutube,
    auth: AuthConstants.UNAUTH
  },
  {
    title: GameModeConstants.THUMBNAIL,
    url: "/thumbnail",
    description:
      <span>!UNDER CONSTRUCTION! Guess the thumbnail, based on its video title</span>,
    tooltipDesc:
      <span>
        Given a random YouTube <b>video title</b>, you&apos;ll have to choose the correct YouTube thumbnail from selection of 3 others.
      </span>,
    icon: ImageIcon,
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
    auth: AuthConstants.UNAUTH
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