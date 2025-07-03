import {Card, CardTitle} from '@/components/ui/card';
import {ScrollArea} from '@/components/ui/scroll-area';
import Transaction from '@/components/ui/transaction';
import {IoMdOptions} from 'react-icons/io';
import {FaSortAmountDown} from 'react-icons/fa';


export default function TransactionContainer() {
    return <Card className="md:w-[50%] md:mx-auto mt-6 py-2">
        <div className="flex items-center justify-between w-[90%] mx-auto">
            <p className="font-bold">Transactions</p>
            <div className="flex gap-x-4 mr-2">
                <IoMdOptions onClick={() => console.log('Options')}/>
                <FaSortAmountDown onClick={() => console.log('FIlter')}/>
            </div>
        </div>
        <ScrollArea className="h-[300px] w-[90%] mx-auto">
            <Transaction/>
            <Transaction/>
            <Transaction/>
            <Transaction/>
            <Transaction/>
            <Transaction/>
            <Transaction/>
            <Transaction/>
            <Transaction/>
        </ScrollArea>
    </Card>;
};
