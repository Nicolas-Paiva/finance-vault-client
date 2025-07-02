import customFetch from '@/lib/axios/customAxios';

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
    const response = await customFetch.get('/summary');
    return response.data;
}