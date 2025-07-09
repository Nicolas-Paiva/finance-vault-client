'use client';
import {Card, CardTitle} from '@/components/ui/card';
import BalanceContainer from '@/components/ui/balance-container';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Button} from '@/components/ui/button';
import {useSummary} from '@/lib/hooks/useSummary';
import {useRouter} from 'next/navigation';
import {toast} from 'sonner';
import React, {useState} from 'react';
import {useMutation} from '@tanstack/react-query';
import {makeTransaction} from '@/lib/services/transaction-service';
import {Transaction} from '@/lib/types/transaction-types';
import ActionsNavbar from '@/components/ui/home-actions-navbar';
import {MdError} from 'react-icons/md';
import {ThemeToggle} from '@/components/ui/theme-toggle';
import NotificationDropdown from '@/components/ui/notification-dropdown';

export default function TransactionsPage() {

    // Data fetching
    const {data, isPending, isError} = useSummary();
    const router = useRouter();

    // Transaction input
    const [email, setEmail] = useState<string>('');
    const [amount, setAmount] = useState<number>(1);


    const [transactionError, setTransactionError] = useState('');


    function handleTransaction(): void {
        const transaction: Transaction = {receiverEmail: email, amount: amount};
        transactionMutation.mutate(transaction);
    }


    // Transaction request
    const transactionMutation = useMutation({
        mutationFn: makeTransaction,

        onSuccess: () => {
            toast.success('Transaction successful!');
        },

        onError: (error: Error) => {
            setTransactionError(error.message);
        }
    });

    if (isError) {
        toast.error('Please log in to try again');
        router.push('/');
        return <h1>An error has occurred. Please try again later</h1>;
    }

    return <div className="flex flex-col h-[100vh] md:h-auto">
        <div className="flex gap-x-4">
            <ThemeToggle/>
            <NotificationDropdown numberOfNotifications={data?.numberOfNotifications || 0}/>
        </div>
        {data && <BalanceContainer balance={data?.balance} currency={data?.currency}/>}
        <ActionsNavbar className="h-[75px] md:w-[50%] md:mx-auto mt-6 hidden md:block"/>
        {transactionError && <Card className="h-[10px] w-full mt-6 flex justify-center bg-destructive border-none">
            <div className="flex items-center gap-x-2 pl-2 text-background">
                <MdError size={20}/>
                <p className="mb-1">{transactionError}</p>
            </div>
        </Card>}
        <Card className="h-[300px] w-full md:w-[50%] mx-auto mt-2">
            <CardTitle className="text-center">Send Money</CardTitle>
            <div className="w-[90%] mx-auto">
                <Label htmlFor="email" className="mb-1 ml-1">Email</Label>
                <Input type="email"
                       id="email"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       placeholder="email@email.com"
                       className="w-full mx-auto"
                />

                <Label htmlFor="amount" className="mb-1 ml-1 mt-4">Amount</Label>
                <Input type="number"
                       id="amount"
                       value={amount}
                       min={1}
                       onChange={(e) => setAmount(+e.target.value)}
                       placeholder="1.00"
                       className="w-full mx-auto"
                />

                <Button className="bg-violet-500 w-full mt-6"
                        onClick={handleTransaction}>
                    Send</Button>
            </div>
        </Card>
        <ActionsNavbar className="h-[75px] md:w-[50%] md:mx-auto mt-auto mb-2 md:hidden"/>
    </div>;
};
