import {Currencies} from '@/lib/types/currencies';

export type RegistrationRequest = {
    email: string,
    password: string,
    name: string,
    lastName: string,
    currency: Currencies
};