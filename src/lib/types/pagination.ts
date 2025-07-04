/**
 *  Represents the paginated response returned by the API
 *  when fetching transactions
 */
export type PaginatedResponse<T> = {
    content: T[],
    pageNumber: number,
    pageSize: number,
    totalElements: number,
    totalPages: number,
    last: boolean
}