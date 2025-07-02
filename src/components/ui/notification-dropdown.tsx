import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {IoIosNotificationsOutline} from 'react-icons/io';
import TransactionNotification, {TransactionNotificationProps} from '@/components/ui/transaction-notification';

export default function NotificationDropdown() {
    const notifications: TransactionNotificationProps[] = [
        {sender: 'Maria', amount: 50},
        {sender: 'Carlos', amount: 120},
        {sender: 'João', amount: 75}
    ];


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div
                    className="relative flex items-center justify-center mr-4 bg-muted rounded-full h-8 w-8">
                    <IoIosNotificationsOutline size={24} className="text-primary"/>
                    <span className="absolute text-primary text-xs top-[-2] left-6">+100</span>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom" align="end" className="w-[80vw] md:w-[40vw] mt-2 md:mt-0">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator/>
                {notifications.map((notification, i) => {
                    return (
                            <TransactionNotification key={i} sender={notification.sender} amount={notification.amount}/>
                    );
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
