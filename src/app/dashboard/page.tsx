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
import DashboardLineChart from '@/components/ui/chart/dashboard-line-chart';
import {useQuery} from '@tanstack/react-query';
import {getMonthWeeklyTotals} from '@/lib/services/summary-service';
import {Skeleton} from '@/components/ui/skeleton';

export default function Dashboard() {
    const {data, isPending, isError} = useSummary();

    const {data: totals, isPending: isChartDataPending, isError: isChartDataError} = useQuery({
        queryKey: ['weeklyTotals'],

        queryFn: getMonthWeeklyTotals
    });

    const router = useRouter();

    if (isError) {
        router.push('/login');
    }

    if (isPending) {
        return (
            <>
                <Skeleton className="h-[30px] w-full rounded-xl mt-8"/>
                <div className="md:w-1/2 mx-auto">
                    <div className="flex flex-col">
                        <Skeleton className="h-[125px] w-full rounded-xl mt-4"/>
                        <Skeleton className="md:block h-[85px] w-full rounded-xl mt-4"/>
                        <Skeleton className="h-[300px] md:h-[500px] w-full rounded-xl mt-4"/>
                    </div>
                </div>
            </>
        );
    }

    return (
        <div className="flex flex-col h-[100vh]">
            <div className="flex items-center justify-between mt-4 px-4">
                <h1 className="text-lg md:text-2xl">Hello, {data?.name}!</h1>
                <div className="flex gap-x-4">
                    <ThemeToggle/>
                    <NotificationDropdown numberOfNotifications={data?.numberOfNotifications || 0}/>
                </div>
            </div>
            {data && <BalanceContainer balance={data.balance} currency={data.currency}/>}
            <ActionsNavbar className="h-[75px] md:w-[50%] md:mx-auto mt-6 hidden md:block"/>
            <section className="w-full md:w-1/2 flex justify-between gap-y-4 mx-auto mt-6">
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
            <div className="w-full md:w-[50%] h-[350px] md:h-[400px] mt-6 mx-auto">
                <h1 className="text-center font-bold">Weekly Expenses</h1>
                {totals &&
                    <DashboardLineChart weeklyTransactions={totals}/>}
            </div>
            <ActionsNavbar className="h-[75px] md:w-[50%] md:mx-auto mt-auto mb-2 md:hidden"/>
        </div>
    );
};
