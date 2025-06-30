import {Currency} from '@/lib/types/currencies';

export type RegistrationRequest = {
    email: string,
    password: string,
    name: string,
    lastName: string,
    currency: Currency
};

export type RegistrationErrorUserAlreadyExists = {
    created: false,
    message: 'Email already exists',
    status: number,
    timeStamp: string
}

export type RegistrationSuccessResponse = {
    created: true,
    timeStamp: string,
    message: string,
    jwtToken: string
}

export type LoginRequest = {
    email: string,
    password: string
}

export type LoginSuccessResponse = {
    success: boolean,
    timeStamp: string,
    jwtToken: string
}