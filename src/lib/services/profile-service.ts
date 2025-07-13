import {
    EmailChangeRequest,
    NameChangeRequest,
    PasswordChangeRequest,
    ProfileDataChangeResponse
} from '@/lib/types/profile';
import customFetch from '@/lib/axios/customAxios';


export async function changeUserName(request: NameChangeRequest): Promise<ProfileDataChangeResponse> {
    const response = await customFetch.post('/profile/name', request);
    return response.data;
}


export async function changeUserEmail(request: EmailChangeRequest): Promise<ProfileDataChangeResponse> {
    const response = await customFetch.post('/profile/email', request);
    return response.data;
}


export async function changeUserPassword(request: PasswordChangeRequest): Promise<ProfileDataChangeResponse> {
    const response = await customFetch.post('/profile/password', request);
    return response.data;
}