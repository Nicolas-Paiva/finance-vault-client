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

export async function getFilteredTransactions(page: number = 0,
                                              minAmount: string = '',
                                              maxAmount: string = '',
                                              deposits: boolean = false,
                                              withdrawals: boolean = false) {
    console.log(minAmount);
    console.log(maxAmount);
    console.log(deposits);
    console.log(withdrawals);

    let queryString = `/transactions?page=${page}`;

    if (deposits) {
        queryString = queryString.concat(`&type=deposit`);
    }

    if (withdrawals) {
        queryString = queryString.concat(`&type=withdrawal`);
    }

    queryString = queryString
        .concat(`&minAmount=${minAmount}`)
        .concat(`&maxAmount=${maxAmount}`)

    console.log(queryString);
    const response = await customFetch(queryString);
    console.log(response.data);
    return response.data;
}