'use client';
import {Card, CardTitle} from '@/components/ui/card';
import NotificationDropdown from '@/components/ui/notification-dropdown';
import {useSummary} from '@/lib/hooks/useSummary';
import {formatCurrency} from '@/lib/utils/utils';
import {Skeleton} from '@/components/ui/skeleton';
import React from 'react';
import HomeActionBar from '@/components/ui/home-actions-navbar';
import TransactionContainer from '@/components/ui/transaction-container';
import {ThemeToggle} from '@/components/ui/theme-toggle';
import ActionsNavbar from '@/components/ui/home-actions-navbar';
import BalanceContainer from '@/components/ui/balance-container';

/**
 * Represents the home page, displaying relevant user data.
 * Also receives information about the currency, which is
 * passed down to other components as props
 * @constructor
 */
export default function Home() {
    const {data, isPending, isError} = useSummary();

    if (isError) {
        return (
            <h1>Error loading data. Please try again later.</h1>
        );
    }

    if (isPending) {
        return (
            <>
                <Skeleton className="h-[30px] w-full rounded-xl mt-8"/>
                <div className="md:w-[500px] mx-auto">
                    <div className="flex flex-col">
                        <Skeleton className="h-[125px] w-full rounded-xl mt-4"/>
                        <Skeleton className="h-[85px] w-full rounded-xl mt-4"/>
                    </div>
                    <Skeleton className="h-[300px] w-full rounded-xl mt-4"></Skeleton>
                </div>
            </>
        );
    }


    return (

        <div className="flex flex-col h-[100vh] md:h-auto">
            <div className="flex items-center justify-between mt-4 px-4">
                <h1 className="text-lg md:text-2xl">Hello, {data?.name}!</h1>
                <div className="flex gap-x-4">
                    <ThemeToggle/>
                    <NotificationDropdown numberOfNotifications={data?.numberOfNotifications || 0}/>
                </div>
            </div>
            <BalanceContainer balance={data?.balance} currency={data?.currency}/>
            <ActionsNavbar className="h-[75px] md:w-[50%] md:mx-auto mt-6 hidden md:block"/>
            {data?.currency && <TransactionContainer currency={data.currency}/>}
            <ActionsNavbar className="h-[75px] md:w-[50%] md:mx-auto mt-auto mb-2 md:hidden"/>
        </div>
    );
};
