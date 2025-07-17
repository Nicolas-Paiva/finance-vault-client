'use client';

import {ThemeToggle} from '@/components/ui/theme-toggle';
import NotificationDropdown from '@/components/ui/notification-dropdown';
import BalanceContainer from '@/components/ui/balance-container';
import ActionsNavbar from '@/components/ui/home-actions-navbar';
import React from 'react';
import {useSummary} from '@/lib/hooks/useSummary';
import {Card, CardTitle} from '@/components/ui/card';
import {formatCurrency} from '@/lib/utils/utils';
import {useRouter} from 'next/navigation';

export default function Dashboard() {
    const {data, isPending, isError} = useSummary();

    const router = useRouter();

    if (isError) {
        router.push('/login');
    }

    if (isPending) {
        return <h1>Loading...</h1>
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
                <p className="text-2xl text-center mt-6">This month&#39;s summary</p>
            <section className="w-full md:w-1/2 flex justify-between gap-y-4 mx-auto mt-4">
                <Card className="w-[48%]">
                    <CardTitle className="text-center">Withdrawals</CardTitle>
                    {data &&
                        <p className="text-xl font-bold text-center text-destructive">{formatCurrency(data?.monthlyWithdrawalsTotal, data?.currency)}</p>}
                </Card>
                <Card className="w-[48%]">
                    <CardTitle className="text-center">Deposits</CardTitle>
                    {data &&
                        <p className="text-xl font-bold text-center text-green-600">{formatCurrency(data?.monthlyDepositsTotal, data?.currency)}</p>}
                </Card>
            </section>
            <ActionsNavbar className="h-[75px] md:w-[50%] md:mx-auto mt-auto mb-2 md:hidden"/>
        </div>
    );
};
