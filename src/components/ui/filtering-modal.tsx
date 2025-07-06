import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';
import {Label} from '@/components/ui/label';
import React, {useState} from 'react';
import {IoMdOptions} from 'react-icons/io';
import {Input} from '@/components/ui/input';
import {Checkbox} from '@/components/ui/checkbox';
import {getFilteredTransactions} from '@/lib/services/transaction-service';
import {Button} from '@/components/ui/button';

export default function FilteringModal() {
    const [deposits, setDeposits] = useState(true);
    const [withdrawals, setWithdrawals] = useState(true);
    const [minAmount, setMinAmount] = useState(0);
    const [maxAmount, setMaxAmount] = useState(9999);

    function filterTransactions(): void {
        getFilteredTransactions(0, String(minAmount), String(maxAmount), deposits, withdrawals)
    }


    return (
        <Dialog>
            <div className="flex">
                <DialogTrigger className="hover:cursor-pointer">
                    <IoMdOptions onClick={() => console.log('Options')}/>
                </DialogTrigger>
            </div>
            <DialogContent className="fixed md:top-[30vh]">
                <DialogHeader>
                    <DialogTitle>Filtering</DialogTitle>
                    <DialogDescription>
                        Filter your transactions based on some criteria
                    </DialogDescription>
                </DialogHeader>

                <div className="w-full flex flex-col gap-y-4">
                    <div className="flex justify-between">
                        <div className="flex flex-col gap-y-1">
                            <Label htmlFor="min-amount" className="ml-1">Min amount</Label>
                            <Input type="number"
                                   id="min-amount"
                                   className="h-[20px] w-2/3"
                                   value={minAmount}
                                   onChange={(e) => setMinAmount(+e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col gap-y-1">
                            <Label htmlFor="max-amount" className="ml-1">Max amount</Label>
                            <Input type="number"
                                   id="max-amount"
                                   className="h-[20px] w-2/3"
                                   value={maxAmount}
                                   onChange={(e) => setMaxAmount(+e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-y-4">
                        <div className="flex items-center gap-x-1">
                            <Checkbox id="deposits"
                                      checked={deposits}
                                      onCheckedChange={() => setDeposits(!deposits)}
                            />
                            <Label htmlFor="deposits" className="h-full">Deposits</Label>
                        </div>

                        <div className="flex items-center gap-x-1">
                            <Checkbox id="withdrawals"
                                      defaultChecked={true}
                                      onCheckedChange={() => setWithdrawals(!withdrawals)}
                            />
                            <Label htmlFor="withdrawals" className="h-full">Withdrawals</Label>
                        </div>
                    </div>
                </div>
                <Button onClick={filterTransactions}>Filter</Button>
            </DialogContent>
        </Dialog>
    );
};
