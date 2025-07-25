import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {IoIosNotificationsOutline} from 'react-icons/io';
import TransactionNotification from '@/components/ui/transaction-notification';
import {ScrollArea} from '@/components/ui/scroll-area';
import {useQuery} from '@tanstack/react-query';
import {getNotifications} from '@/lib/services/notification-service';
import React from 'react';

type NotificationDropdownProps = {
    numberOfNotifications: number
}

export default function NotificationDropdown({numberOfNotifications}: NotificationDropdownProps) {

    const {
        data: notifications = [],
        isPending,
        isError,
        refetch: fetchNotifications
    } = useQuery({
        queryKey: ['notifications'],
        queryFn: getNotifications,
        enabled: false // don't fetch on mount
    });

    if (notifications.length === 0) {
        return <DropdownMenu onOpenChange={(open) => {
            if (open) {
                fetchNotifications();
            }
        }}>
            <DropdownMenuTrigger asChild>
                <div
                    className="relative flex items-center justify-center mr-4 bg-muted rounded-full h-8 w-8 hover:cursor-pointer">
                    <IoIosNotificationsOutline size={24} className="text-primary"/>
                    <span className="absolute text-primary text-xs top-[-2] left-6">
                        {numberOfNotifications > 0 ? `+${numberOfNotifications}` : ''}
                    </span>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom" align="end" className="w-[80vw] md:w-[40vw] mt-2 md:mt-0">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuItem className="flex justify-center">
                    <p className="text-center">No notifications</p>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    }


    return (
        <DropdownMenu onOpenChange={(open) => {
            if (open) {
                fetchNotifications();
            }
        }}>
            <DropdownMenuTrigger asChild>
                <div
                    className="relative flex items-center justify-center mr-4 bg-muted rounded-full h-8 w-8 hover:cursor-pointer">
                    <IoIosNotificationsOutline size={24} className="text-primary"/>
                    <span className="absolute text-primary text-xs top-[-2] left-6">
                        {numberOfNotifications > 0 ? `+${numberOfNotifications}` : ''}
                    </span>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom" align="end" className="w-[75vw] md:w-[40vw] mt-2 md:mt-0">
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
