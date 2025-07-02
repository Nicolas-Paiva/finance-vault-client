import {clsx, type ClassValue} from 'clsx';
import {twMerge} from 'tailwind-merge';


export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}


export function isEmailValid(email: string): boolean {
    const regex: RegExp = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    return regex.test(email);
}


export function isPasswordValid(password: string): boolean {
    return passwordContainsSpecialCharacter(password)
        && passwordContainsUppercase(password);
}


export function passwordContainsSpecialCharacter(password: string): boolean {
    // This regex checks for any non-alphanumeric character
    const specialCharRegex = /[^a-zA-Z0-9]/;
    return specialCharRegex.test(password);
}


export function passwordContainsUppercase(password: string): boolean {
    const uppercaseRegex = /[A-Z]/;
    return uppercaseRegex.test(password);
}


export function checkNumber(number: string) {
    const regex: RegExp = /^\+\d[\d\s]{6,}$/;
    return regex.test(number);
}


export function formatCurrency(amount: number, currency: string): string {
    return new Intl.NumberFormat('pt-PT', {
        style: 'currency',
        currency
    }).format(amount);
}