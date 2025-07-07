import customFetch from '@/lib/axios/customAxios';
import {PaginatedResponse} from '@/lib/types/pagination';
import {TransactionView} from '@/lib/types/transaction-types';


/**
 * Creates the query string based on the filters
 * selected by the user and sends the request to the API
 */
export async function getTransactions(page: number = 0,
                                              minAmount: string = '',
                                              maxAmount: string = '',
                                              deposits: boolean = false,
                                              withdrawals: boolean = false) {

    let queryString = `/transactions?page=${page}`;

    // If both are true, none is included in the query string
    if (deposits && !withdrawals) {
        queryString += `&type=deposit`;
    } else if (!deposits && withdrawals) {
        queryString += `&type=withdrawal`;
    }


    queryString = queryString
        .concat(`&minValue=${minAmount}`)
        .concat(`&maxValue=${maxAmount}`)

    console.log(queryString);
    const response = await customFetch(queryString);
    console.log(response.data);
    return response.data;
}