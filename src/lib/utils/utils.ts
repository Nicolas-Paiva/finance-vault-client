import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function checkEmail(email: string): boolean {
  const regex: RegExp = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  return regex.test(email);
}


export function checkNumber(number: string) {
  const regex: RegExp = /^\+\d[\d\s]{6,}$/;
  return regex.test(number);
}