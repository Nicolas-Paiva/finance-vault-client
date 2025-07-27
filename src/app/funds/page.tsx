'use client';

import {ThemeToggle} from '@/components/ui/theme-toggle';
import NotificationDropdown from '@/components/ui/notification-dropdown';
import ActionsNavbar from '@/components/ui/home-actions-navbar';
import {Card, CardTitle} from '@/components/ui/card';
import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import React, {useState} from 'react';
import {useSummary} from '@/lib/hooks/useSummary';
import BalanceContainer from '@/components/ui/balance-container';
import {useMutation} from '@tanstack/react-query';
import {addFunds} from '@/lib/services/funds-service';
import {toast} from 'sonner';
import SignOut from '@/components/ui/sign-out';

export default function Funds() {
    const {data, isPending, isError, refetch} = useSummary();

    const [amount, setAmount] = useState(1);

    const addFundsMutation = useMutation({
        mutationFn: addFunds,

        onSuccess: () => {
            toast.success('Funds added');
            refetch();
        },

        onError: () => {
            toast.error('Failed to add funds');
        }
    });


    function handleAddFunds(): void {
        const request = {amount};
        addFundsMutation.mutate(request);
    }


    if (isError) {
        return <h1>Something went wrong...</h1>;
    }

    if (isPending) {
        return <h1>Loading...</h1>;
    }

    return (
        <div className="flex flex-col h-[100vh] md:h-auto">
            <div className="flex justify-end gap-x-4 mt-4 px-4">
                <ThemeToggle/>
                <NotificationDropdown numberOfNotifications={data.numberOfNotifications || 0}/>
                <SignOut/>
            </div>
            <BalanceContainer balance={data?.balance} currency={data?.currency}/>
            <ActionsNavbar className="h-[75px] md:w-[50%] md:mx-auto mt-6 md:block"/>
            <Card className={`h-[300px] w-full md:w-[50%] mx-auto mt-6`}>
                <CardTitle className="text-center">Request Funds</CardTitle>
                <div className="w-[90%] mx-auto">
                    <Label htmlFor="amount" className="mb-1 ml-1 mt-4">Amount</Label>
                    <Input type="number"
                           id="amount"
                           value={amount}
                           onChange={(e) => setAmount(+e.target.value)}
                           min={1}
                           placeholder="1.00"
                           className="w-full mx-auto"
                    />

                    <Button
                        className="w-full mt-6"
                        onClick={handleAddFunds}>
                        Request
                    </Button>
                </div>
            </Card>
            {/*<ActionsNavbar className="h-[75px] md:w-[50%] md:mx-auto mt-auto mb-2 md:hidden"/>*/}
        </div>
    );
};
