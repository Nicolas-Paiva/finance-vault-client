import customFetch from '@/lib/axios/customAxios';


export async function initialise(): Promise<string> {
    const response = await customFetch.get("/initialise");
    return response.data;

}