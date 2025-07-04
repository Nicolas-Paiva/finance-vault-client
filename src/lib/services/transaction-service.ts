import customFetch from '@/lib/axios/customAxios';
import {PaginatedResponse} from '@/lib/types/pagination';
import {TransactionView} from '@/lib/types/transaction-types';


/**
 * Gets all the user's transactions
 */
export async function getTransactions(page: number = 0)  {
    const response = await
        customFetch<PaginatedResponse<TransactionView>>(`/transactions?page=${page}`)
    return response.data;
}