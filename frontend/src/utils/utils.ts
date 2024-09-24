import { clsx, ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function formatDate(input: Date): string {
  const year = input.getFullYear();
  const month = String(input.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(input.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Calculate weekNumber
export function getWeekNumber(date: Date) {
  const yearStart = new Date(date.getFullYear(), 0, 1);
  const weekNumber = Math.ceil(
    ((date.getTime() - yearStart.getTime()) / 86400000 +
      yearStart.getDay() +
      1) /
      7
  );
  return weekNumber;
}
