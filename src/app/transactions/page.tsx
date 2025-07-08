import {Card} from '@/components/ui/card';
import BalanceContainer from '@/components/ui/balance-container';

export default function TransactionsPage() {


    return <div>
        <BalanceContainer balance={1000} currency={'EUR'}/>
        <h1 className="text-xl text-center font-bold mt-4">Send Money</h1>
        <Card className="h-[300px] md:w-[50%] mx-auto">
        </Card>
    </div>;
};
