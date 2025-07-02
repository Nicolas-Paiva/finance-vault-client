import {Card, CardTitle} from '@/components/ui/card';
import NotificationDropdown from '@/components/ui/notification-dropdown';

export default function Home() {
    return (
        <>
            <div className="flex items-center justify-between mt-4">
                <h1 className="text-4xl">Hello, User!</h1>
                <NotificationDropdown/>
            </div>
            <Card className="mt-6 px-6">
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle>Total balance</CardTitle>
                        <p className="text-3xl mt-2">1.250€</p>
                    </div>
                    {/*<div className="relative flex items-center justify-center mr-4 bg-muted rounded-full h-8 w-8">*/}
                    {/*    <IoIosNotificationsOutline size={24} className="text-primary"/>*/}
                    {/*    <span className="absolute text-primary text-xs top-[-2] left-6">+100</span>*/}
                    {/*</div>*/}
                </div>
            </Card>
        </>
    );
};
