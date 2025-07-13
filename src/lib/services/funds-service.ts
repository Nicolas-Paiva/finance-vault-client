import {FundsRequest} from '@/lib/types/funds';
import customFetch from '@/lib/axios/customAxios';


export async function addFunds(request: FundsRequest) {
    const response = await customFetch.post('/transactions/add', request);
    return response.data;
}