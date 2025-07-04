'use client';
import {Card, CardTitle} from '@/components/ui/card';
import NotificationDropdown from '@/components/ui/notification-dropdown';
import {useSummary} from '@/lib/hooks/useSummary';
import {formatCurrency} from '@/lib/utils/utils';
import {Skeleton} from '@/components/ui/skeleton';
import React from 'react';
import HomeActionBar from '@/components/ui/home-action-bar';
import TransactionContainer from '@/components/ui/transaction-container';

export default function Home() {
    const {data, isPending, isError} = useSummary();

    if (isPending) {
        return (
            <>
                <Skeleton className="h-[30px] w-full rounded-xl mt-4"/>
                <div className="flex flex-col space-y-3">
                    <Skeleton className="h-[125px] w-full rounded-xl mt-4"/>
                </div>
            </>
        );
    }


    return (
        <>
            <div className="flex items-center justify-between mt-4 px-4">
                <h1 className="text-lg md:text-2xl">Hello, {data?.name}!</h1>
                <NotificationDropdown numberOfNotifications={data?.numberOfNotifications || 0}/>
            </div>
            <Card className="mt-6 px-6 md:w-[50%] md:mx-auto" onClick={() => console.log('??')}>
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle>Total balance</CardTitle>
                        <p className="text-3xl mt-2 font-bold">{formatCurrency(data?.balance || 0, data?.currency || 'EUR')}</p>
                    </div>
                </div>
            </Card>
            <HomeActionBar/>
            {data?.currency && <TransactionContainer currency={data.currency} />}
        </>
    );
};
