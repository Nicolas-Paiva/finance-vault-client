import customFetch from '@/lib/axios/customAxios';

export type Notification = {
    message: string,
    amount: number,
    createdAt: string,
    seen: boolean
}

export async function getNotifications(): Promise<Notification[]> {
    const response = await customFetch.get('/notifications');
    return response.data;
}