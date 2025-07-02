'use client'
import {useQuery} from '@tanstack/react-query';
import {getSummary} from '@/lib/services/summary-service';


export function useSummary() {
    return useQuery({
        queryKey: ['summary'],
        queryFn: getSummary
    })
}