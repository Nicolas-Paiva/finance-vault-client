import {DropdownMenuSeparator} from '@/components/ui/dropdown-menu';

export type TransactionNotificationProps = {
    sender: string,
    amount: number
}

export default function TransactionNotification({sender, amount}: TransactionNotificationProps) {
    return (
        <>
            <h3>Transaction of {amount} received from {sender}</h3>
            <DropdownMenuSeparator/>
        </>
    );
};
