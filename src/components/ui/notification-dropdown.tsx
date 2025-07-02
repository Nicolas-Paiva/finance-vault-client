import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {IoIosNotificationsOutline} from 'react-icons/io';
import TransactionNotification from '@/components/ui/transaction-notification';
import {ScrollArea} from '@/components/ui/scroll-area';
import {useQuery} from '@tanstack/react-query';
import {getNotifications} from '@/lib/services/notification-service';

type NotificationDropdownProps = {
    numberOfNotifications: number
}

export default function NotificationDropdown({numberOfNotifications}: NotificationDropdownProps) {

    const {data: notifications = [], isPending, isError} = useQuery({
        queryKey: ['notifications'],
        queryFn: getNotifications
    })

    function refreshNotifications(): void {

    }

    console.log(notifications);


    return (
        <DropdownMenu >
            <DropdownMenuTrigger asChild>
                <div
                    className="relative flex items-center justify-center mr-4 bg-muted rounded-full h-8 w-8 hover:cursor-pointer">
                    <IoIosNotificationsOutline size={24} className="text-primary" />
                    <span className="absolute text-primary text-xs top-[-2] left-6">+{numberOfNotifications}</span>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom" align="end" className="w-[80vw] md:w-[40vw] mt-2 md:mt-0">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <ScrollArea className="h-[150px]">
                    {notifications.map((notification, i) => {
                        return (
                            <TransactionNotification key={i}  {...notification}/>
                        );
                    })}
                </ScrollArea>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
