import React, {useState} from 'react';
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';
import {Button} from '@/components/ui/button';
import {FaSortAmountDown} from 'react-icons/fa';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';

type SortingModalProps = {
    propertyChange: (v: string) => void;
    orderChange: (v: string) => void;
    isSorted: boolean,
    setIsSorted: (v: boolean) => void,
    restoreDefault: () => void;
};

export default function SortingModal({
                                         propertyChange,
                                         orderChange,
                                         isSorted,
                                         setIsSorted,
                                         restoreDefault
                                     }: SortingModalProps) {

    // Local draft state
    const [draftProperty, setDraftProperty] = useState('createdAt');
    const [draftOrder, setDraftOrder] = useState('desc');


    function setSortingValues(): void {
        setIsSorted(true);
        propertyChange(draftProperty);
        orderChange(draftOrder);
    }


    return (
        <Dialog>
            <div className="flex">
                <DialogTrigger className="hover:cursor-pointer">
                    <FaSortAmountDown className={`${isSorted ? 'text-green-500' : ''}`}/>
                </DialogTrigger>
            </div>
            <DialogContent className="fixed md:top-[30vh]">
                <DialogHeader>
                    <DialogTitle>Sorting</DialogTitle>
                    <DialogDescription>
                        Decide how to sort your transactions
                    </DialogDescription>
                </DialogHeader>

                <div className="w-full flex flex-row gap-x-4">
                    <Select onValueChange={(value) => setDraftProperty(value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a property"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="createdAt">Created At</SelectItem>
                                <SelectItem value="amount">Amount</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    <Select onValueChange={(value) => setDraftOrder(value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select the order"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="asc">Ascending</SelectItem>
                                <SelectItem value="desc">Descending</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <DialogClose asChild>
                    <Button onClick={() => {
                        setSortingValues();
                    }}>Sort</Button>
                </DialogClose>

                <DialogClose asChild>
                    <Button type="button" variant="outline" onClick={() => {
                        setIsSorted(false);
                        restoreDefault();
                    }}>Reset</Button>
                </DialogClose>
            </DialogContent>
        </Dialog>
    );
};
