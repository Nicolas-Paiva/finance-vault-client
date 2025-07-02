'use client'
import {Card, CardTitle} from '@/components/ui/card';
import NotificationDropdown from '@/components/ui/notification-dropdown';
import {useSummary} from '@/lib/hooks/useSummary';
import {formatCurrency} from '@/lib/utils/utils';

export default function Home() {
    const {data, isPending, isError} = useSummary();

    return (
        <>
            <div className="flex items-center justify-between mt-4">
                <h1 className="text-2xl md:text-4xl">Hello, {data?.name}!</h1>
                <NotificationDropdown numberOfNotifications={data?.numberOfNotifications || 0}/>
            </div>
            <Card className="mt-6 px-6"  onClick={() => console.log('??')}>
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle>Total balance</CardTitle>
                        <p className="text-3xl mt-2">{formatCurrency(data?.balance || 0, data?.currency || 'EUR')}</p>
                    </div>
                </div>
            </Card>
        </>
    );
};
