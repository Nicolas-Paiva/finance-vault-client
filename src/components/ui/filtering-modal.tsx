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
import {Button} from '@/components/ui/button';

type FilteringModalProps = {
    onMinChange: (v: number) => void;
    onMaxChange: (v: number) => void;
    onToggleDeposits: (v: boolean) => void;
    onToggleWithdrawals: (v: boolean) => void;
};

export default function FilteringModal({
                                           onMinChange,
                                           onMaxChange,
                                           onToggleDeposits,
                                           onToggleWithdrawals,
                                       }: FilteringModalProps) {

    // Local draft state
    const [draftMin, setDraftMin] = useState(1);
    const [draftMax, setDraftMax] = useState(10);
    const [draftDep, setDraftDep] = useState(true);
    const [draftWith, setDraftWith] = useState(true);

    function setFilteringValues(): void {
        onMinChange(draftMin);
        onMaxChange(draftMax);
        onToggleDeposits(draftDep);
        onToggleWithdrawals(draftWith);
    }

    return (
        <Dialog>
            <div className="flex">
                <DialogTrigger className="hover:cursor-pointer">
                    <IoMdOptions/>
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
                                   value={draftMin}
                                   onChange={(e) => setDraftMin(+e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col gap-y-1">
                            <Label htmlFor="max-amount" className="ml-1">Max amount</Label>
                            <Input type="number"
                                   id="max-amount"
                                   className="h-[20px] w-2/3"
                                   value={draftMax}
                                   onChange={(e) => setDraftMax(+e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-y-4">
                        <div className="flex items-center gap-x-1">
                            <Checkbox id="deposits"
                                      checked={draftDep}
                                      onCheckedChange={() => setDraftDep(!draftDep)}
                            />
                            <Label htmlFor="deposits" className="h-full">Deposits</Label>
                        </div>

                        <div className="flex items-center gap-x-1">
                            <Checkbox id="withdrawals"
                                      checked={draftWith}
                                      onCheckedChange={() => setDraftWith(!draftWith)}
                            />
                            <Label htmlFor="withdrawals" className="h-full">Withdrawals</Label>
                        </div>
                    </div>
                </div>
                <Button onClick={setFilteringValues}>Filter</Button>
            </DialogContent>
        </Dialog>
    );
};
