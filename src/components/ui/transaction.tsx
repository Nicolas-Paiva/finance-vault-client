import {GrTransaction} from 'react-icons/gr';
import {TransactionView} from '@/lib/types/transaction-types';
import {formatCurrency, formatter} from '@/lib/utils/utils';

type TransactionProps = TransactionView & {
    currency: string
}

export default function Transaction({id, amount, createdAt, senderName, receiverName, currency}: TransactionProps) {


    return <div className="flex items-center mb-3">
        <GrTransaction className={`mr-4 ${senderName ? 'text-green-500' : 'text-destructive'}`}/>
        <div className="flex justify-between w-full mx-auto items-center">
            <div className="flex flex-col">
                {/* One will be undefined */}
                <p>{senderName || receiverName}</p>
                <span className="text-xs text-slate-500">{formatter.format(new Date(createdAt))}</span>
            </div>
            <p className="font-bold">{formatCurrency(amount, currency)}</p>
        </div>
    </div>;
};
