import {Card} from '@/components/ui/card';
import {FaArrowUp} from 'react-icons/fa';
import {BiMoneyWithdraw} from 'react-icons/bi';
import {GrTransaction} from 'react-icons/gr';

export default function HomeActionBar() {
    return <Card className="h-[75px] md:w-[50%] md:mx-auto mt-4 ">
        <div className="flex h-full justify-around items-center w-full ">
            <div className="flex flex-col items-center p-2 rounded hover:bg-muted hover:cursor-pointer">
                <FaArrowUp/>
                <p className="text-xs">Deposit</p>
            </div>

            <div className="flex flex-col items-center p-2 rounded hover:bg-muted hover:cursor-pointer">
                <BiMoneyWithdraw/>
                <p className="text-xs">Withdraw</p>
            </div>

            <div className="flex flex-col items-center p-2 rounded hover:bg-muted hover:cursor-pointer">
                <GrTransaction/>
                <p className="text-xs">Transfer</p>
            </div>

        </div>
    </Card>;
};
