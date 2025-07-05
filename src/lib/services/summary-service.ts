import customFetch from '@/lib/axios/customAxios';
import {redirect} from 'next/navigation';

export type SummaryResponse = {
    name: string;
    balance: number;
    currency: string;
    monthlyDeposits: number;
    monthlyWithdrawals: number;
    numberOfNotifications: number;
};


// Returns the user's summary
export async function getSummary(): Promise<SummaryResponse> {
    let response;
    try {
        response = await customFetch.get('/summary');
        return response.data;
    } catch (error: any) {
        if (error.response?.status === 401) {
            redirect('/login')
        }
        throw error;
    }
}