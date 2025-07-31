import axios from 'axios';


const API_BASE_URL = 'https://finance-vault.onrender.com';
// const API_BASE_URL = 'http://localhost:8080/api';
const PUBLIC_ROUTES: string[] = ['/auth'];


function isPublicRoute(url: string | undefined): boolean {
    if (!url) return false;

    // Strip query params if any
    const pathname = url.split('?')[0];

    return PUBLIC_ROUTES.some(route => pathname === route || pathname.startsWith(route));
}


const customFetch = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: false
});


// Automatically attaches the JWT token from localStorage to all non-public requests
customFetch.interceptors.request.use((config) => {
    const token: string | null = localStorage.getItem('token');

    if (token && !isPublicRoute(config.url)) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});


// Simplifies error handling by returning only the API response data and status code
// Falls back to a generic error object if no response is available
customFetch.interceptors.response.use(
    response => response,

    error => {
        if (error.response) {
            const { data, status } = error.response;
            return Promise.reject({ ...data, status }); // Combine API response and status
        }

        return Promise.reject({ message: 'Unexpected error', status: 500 });
    }
);

export default customFetch;
