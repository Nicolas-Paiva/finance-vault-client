'use client';
import {Card, CardTitle} from '@/components/ui/card';
import BalanceContainer from '@/components/ui/balance-container';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Button} from '@/components/ui/button';
import {useSummary} from '@/lib/hooks/useSummary';
import {useRouter} from 'next/navigation';
import {toast} from 'sonner';
import {useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import {makeTransaction} from '@/lib/services/transaction-service';

export default function TransactionsPage() {

    // Data fetching
    const {data, isPending, isError} = useSummary();
    const router = useRouter();

    // Transaction request

    // Transaction input
    const [email, setEmail] = useState<string>('');
    const [amount, setAmount] = useState<number>(0);

    if (isError) {
        toast.error('Please log try again');
        router.push('/');
        return <h1>An error has occurred. Please try again later</h1>;
    }

    return <div>
        {data && <BalanceContainer balance={data?.balance} currency={data?.currency}/>}
        <h1 className="text-xl text-center font-bold mt-4"></h1>
        <Card className="h-[300px] md:w-[50%] mx-auto">
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
                       onChange={(e) => setAmount(+e.target.value)}
                       placeholder="1.00"
                       className="w-full mx-auto"
                />

                <Button className="bg-violet-500 w-full mt-6">Send</Button>
            </div>
        </Card>
    </div>;
};
