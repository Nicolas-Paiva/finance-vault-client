import {RegistrationRequest} from '@/lib/types/auth';
import customFetch from '@/lib/axios/customAxios';


export async function register(request: RegistrationRequest) {
    const response = await customFetch.post('/auth/register', request);
    return response.data;
}