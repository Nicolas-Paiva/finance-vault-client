import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Feature} from '@/lib/data/features';
import {RiMoneyEuroCircleLine} from 'react-icons/ri';
import {MdOutlineSecurity} from 'react-icons/md';
import {GrTransaction} from 'react-icons/gr';
import { FaRegChartBar } from "react-icons/fa";
import { IoIosNotificationsOutline } from "react-icons/io";

export default function FeatureCard({title, description, icon}: Feature) {
    return (
        <Card className="mb-4">
            <CardHeader>
                <div className="flex items-center gap-x-4">
                    <CardTitle className="text-center text-xl">{title}</CardTitle>
                    {
                        icon === 'money' ? <RiMoneyEuroCircleLine size={20} className="mt-2"/> : ''
                    }
                    {
                        icon === 'security' ? <MdOutlineSecurity size={20} className="mt-2"/> : ''
                    }
                    {
                        icon === 'transaction' ? <GrTransaction size={20} className="mt-2"/> : ''
                    }
                    {
                        icon === 'chart' ? <FaRegChartBar size={20} className="mt-2"/> : ''
                    }
                    {
                        icon === 'notification' ? <IoIosNotificationsOutline size={20} className="mt-2"/> : ''
                    }
                </div>
            </CardHeader>
            <CardContent>
                <p>{description}</p>
            </CardContent>
        </Card>
    );
};
