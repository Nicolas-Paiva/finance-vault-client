import {Currency} from '@/lib/types/currencies';

export type RegistrationRequest = {
    email: string,
    password: string,
    name: string,
    lastName: string,
    currency: Currency
};

export type RegistrationError = {
    created: boolean,
    message: 'Email already exists',
    status: number,
    timeStamp: string
}