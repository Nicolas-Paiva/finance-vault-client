export function checkEmail(email: string): boolean {
    const regex: RegExp = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    return regex.test(email);
}


export function checkNumber(number: string) {
    const regex: RegExp = /^\+\d[\d\s]{6,}$/;
    return regex.test(number);
}