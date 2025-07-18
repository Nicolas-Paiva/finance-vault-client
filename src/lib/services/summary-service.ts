import customFetch from '@/lib/axios/customAxios';
import {redirect} from 'next/navigation';
import {TransactionView} from '@/lib/types/transaction-types';

export type SummaryResponse = {
    name: string;
    email: string;
    balance: number;
    currency: string;
    monthlyDepositsTotal: number;
    monthlyWithdrawalsTotal: number;
    numberOfNotifications: number;
};

export type MonthlyTransactions = {
    deposits: TransactionView[],
    withdrawals: TransactionView[]
}


// Returns the user's summary
export async function getSummary(): Promise<SummaryResponse> {
    let response;
    try {
        response = await customFetch.get('/summary');
        return response.data;
    } catch (error: any) {
        if (error.response?.status === 401) {
            redirect('/login');
        }
        throw error;
    }
}


// Returns the user's monthly transactions
export async function getMonthlyTransactions(): Promise<MonthlyTransactions> {
    const response = await customFetch('/summary/transactions');
    return response.data;
}