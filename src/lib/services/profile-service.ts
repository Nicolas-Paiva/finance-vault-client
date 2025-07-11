import {EmailChangeRequest, NameChangeRequest, PasswordChangeRequest} from '@/lib/types/profile';
import customFetch from '@/lib/axios/customAxios';


export async function changeUserName(request: NameChangeRequest) {
    const response = await customFetch.post('/profile/name', request);
    return response.data;
}


export async function changeUserEmail(request: EmailChangeRequest) {
    const response = await customFetch.post('/profile/email', request);
    return response.data;
}


export async function changeUserPassword(request: PasswordChangeRequest) {
    const response = await customFetch.post('/profile/password', request);
    return response.data;
}