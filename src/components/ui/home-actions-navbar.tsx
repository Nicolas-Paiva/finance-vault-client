import {Card} from '@/components/ui/card';
import {FaChartPie, FaHome} from 'react-icons/fa';
import {GrTransaction} from 'react-icons/gr';
import {CiCirclePlus} from 'react-icons/ci';
import {CgProfile} from 'react-icons/cg';
import Link from 'next/link';

type ActionNavbarProps = {
    className: string
}

export default function ActionsNavbar({className}: ActionNavbarProps) {
    return <Card className={className}>
        <div className="flex h-full justify-around items-center w-full ">
            <Link href="/home" className="flex flex-col items-center p-2 rounded hover:bg-muted hover:cursor-pointer">
                <FaHome size="20px"/>
            </Link>

            <Link href="/transactions" className="flex flex-col items-center p-2 rounded hover:bg-muted hover:cursor-pointer">
                <GrTransaction size="20px"/>
            </Link>

            <Link href="/add" className="flex flex-col items-center p-2 rounded hover:bg-muted hover:cursor-pointer">
                <CiCirclePlus size="40px"/>
            </Link>

            <Link href="/dashboard" className="flex flex-col items-center p-2 rounded hover:bg-muted hover:cursor-pointer">
                <FaChartPie size="20px"/>
            </Link>

            <Link href="/profile" className="flex flex-col items-center p-2 rounded hover:bg-muted hover:cursor-pointer">
                <CgProfile size="20px"/>
            </Link>
        </div>
    </Card>;
};
