import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatStatsTime = (ms: number): string => {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  return `${minutes}m ${seconds}s`;
};

export const getTimeUntilTheme = () => {
  const now = new Date()
  const targetTime = new Date()

  targetTime.setHours(2, 55, 0, 0) // Resets 2:55AM (EST) every day

  if (now >= targetTime) { // If past 2:55AM alr, target next day
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