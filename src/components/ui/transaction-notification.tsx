import {DropdownMenuItem, DropdownMenuSeparator} from '@/components/ui/dropdown-menu';
import {GrTransaction} from 'react-icons/gr';
import {Notification} from '@/lib/services/notification-service';
import {useQuery} from '@tanstack/react-query';
import {getSummary} from '@/lib/services/summary-service';
import {formatCurrency} from '@/lib/utils/utils';

export default function TransactionNotification({message, amount, createdAt, seen}: Notification) {
    const {data} = useQuery({
        queryKey: ['summary'],
        queryFn: getSummary
    })

    const currency = data?.currency ?? '€';

    return (
        <>
            <DropdownMenuItem className={`${!seen && 'bg-muted'} mb-2`}> <GrTransaction className="text-green-500"/>
                <div className="flex-col">
                    <p>{message}</p>
                    <p>{formatCurrency(amount, currency)}</p>
                </div>
            </DropdownMenuItem>
        </>
    );
};
