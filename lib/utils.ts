import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (inputDate: string) => {
  const date = new Date(inputDate);

  const formatted = date.toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return formatted;
};
