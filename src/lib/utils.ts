import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type EventStatus = "upcoming" | "ongoing" | "past" | "cancelled";

export function getEventStatus(date: Date): EventStatus {
  const now = new Date();
  const eventDate = new Date(date);
  const twoHoursAfter = new Date(eventDate.getTime() + 2 * 60 * 60 * 1000);

  if (eventDate > now) {
    return "upcoming";
  } else if (now >= eventDate && now <= twoHoursAfter) {
    return "ongoing";
  } else {
    return "past";
  }
}
