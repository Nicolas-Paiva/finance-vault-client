'use client'
import {Card, CardTitle} from '@/components/ui/card';
import {formatCurrency} from '@/lib/utils/utils';
import React from 'react';

type BalanceContainerProps = {
    balance: number,
    currency: string
}

export default function BalanceContainer({balance, currency}: BalanceContainerProps) {
    return <Card className="mt-6 px-6 md:w-[50%] md:mx-auto" onClick={() => console.log('??')}>
        <div className="flex justify-between items-center">
            <div>
                <CardTitle>Total balance</CardTitle>
                <p className="text-3xl mt-2 font-bold">{formatCurrency(balance || 0, currency || 'EUR')}</p>
            </div>
        </div>
    </Card>;
};
