import customFetch from '@/lib/axios/customAxios';
import {redirect} from 'next/navigation';
import {AxiosError} from 'axios';

export type SummaryResponse = {
    name: string;
    email: string;
    balance: number;
    currency: string;
    monthlyDepositsTotal: number;
    monthlyWithdrawalsTotal: number;
    numberOfNotifications: number;
};

export type WeeklyTransactions = {
    totals: number[],
    dates: string[]
}


// Returns the user's summary
export async function getSummary(): Promise<SummaryResponse> {
    try {
        const response = await customFetch.get('/summary');
        return response.data;
    } catch (error) {
        const err = error as AxiosError;

        if (err.response?.status === 401) {
            redirect('/login');
        }
        throw err;
    }
}


// Returns the user's monthly transactions
export async function getMonthWeeklyTotals(): Promise<WeeklyTransactions> {
    const response = await customFetch('/summary/transactions');
    return response.data;
}