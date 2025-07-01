import {Card, CardTitle} from '@/components/ui/card';
import {IoIosNotificationsOutline} from 'react-icons/io';

export default function Home() {
    return (
        <>
            <h1 className="mt-4 text-4xl">Hello, User!</h1>
            <Card className="mt-6 px-6">
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle>Total balance</CardTitle>
                        <p className="text-3xl mt-2">1.250€</p>
                    </div>
                        <div className="relative flex items-center justify-center mr-4 bg-muted rounded-full h-8 w-8">
                            <IoIosNotificationsOutline size={24} className="text-primary" />
                        <span className="absolute text-primary text-xs top-[-2] left-6">+100</span>
                        </div>
                </div>
            </Card>
        </>
    );
};
