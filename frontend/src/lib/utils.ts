import { OtherConstants } from "@/constants/other";
import { ProgressCircle, ProgressConstants } from "@/constants/progresscircle";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

interface roundNearestXProps {
  num: number;
  x: number;
}


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatStatsTime = (ms: number | null): string => {
  if (!ms || ms <= 0) return "0m 0s";

  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  return `${minutes}m ${seconds}s`;
};

export const getTimeUntilTheme = () => {
  const now = new Date()
  const targetTime = new Date()

  targetTime.setHours(0, 0, 0, 0) // Resets 12:00AM (EST) every day

  if (now >= targetTime) { // If past 12:00AM alr, target next day
    targetTime.setDate(targetTime.getDate() + 1)
  }

  const diff = targetTime.getTime() - now.getTime()
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)
  return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

export function capitalizeString(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const getGuessResults = (progressCircles: ProgressCircle[]) => {
  return [progressCircles.reduce(
    (total, item) =>
      (item.status === ProgressConstants.CORRECT)
        ? total + 1
        : total,
    0), progressCircles.length]
}

export const wholeFloorX = ({ num, x }: roundNearestXProps) => {
  return (x <= num) ? num - (num % x) : x
}

export const getCategory = (id: number | null): string => {
  switch (id) {
    case 1:
      return "Film & Animation";
    case 2:
      return "Autos & Vehicles";
    case 10:
      return "Music";
    case 15:
      return "Pets & Animals";
    case 17:
      return "Sports";
    case 18:
      return "Short Movies";
    case 19:
      return "Travel & Events";
    case 20:
      return "Gaming";
    case 21:
      return "Videoblogging";
    case 22:
      return "People & Blogs";
    case 23:
      return "Comedy";
    case 24:
      return "Entertainment";
    case 25:
      return "News & Politics";
    case 26:
      return "Howto & Style";
    case 27:
      return "Education";
    case 28:
      return "Science & Technology";
    case 29:
      return "Nonprofits & Activism";
    case 30:
      return "Movies";
    case 31:
      return "Anime/Animation";
    case 32:
      return "Action/Adventure";
    case 33:
      return "Classics";
    case 34:
      return "Comedy";
    case 35:
      return "Documentary";
    case 36:
      return "Drama";
    case 37:
      return "Family";
    case 38:
      return "Foreign";
    case 39:
      return "Horror";
    case 40:
      return "Sci-Fi/Fantasy";
    case 41:
      return "Thriller";
    case 42:
      return "Shorts";
    case 43:
      return "Shows";
    case 44:
      return "Trailers";
    default:
      return "Unknown";
  }
};

export const formatDate = (date: string | undefined) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString(OtherConstants.LOCALE, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  })
}