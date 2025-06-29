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
    const regex: RegExp = /^(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/
    return regex.test(password);
}


export function isNameValid(name: string): boolean {
    return name.length !== 0;
}


export function isLastNameValid(lastName: string): boolean {
    return lastName.length !== 0;
}

export function checkNamesAndEmail(name: string, lastName: string,
                                   password: string): boolean {
    return isNameValid(name) &&
        isLastNameValid(lastName) &&
        isPasswordValid(password);
}


export function checkNumber(number: string) {
    const regex: RegExp = /^\+\d[\d\s]{6,}$/;
    return regex.test(number);
}