import {LineChart, Line, CartesianGrid, XAxis, YAxis, Legend, ResponsiveContainer, Tooltip} from 'recharts';
import {TransactionView} from '@/lib/types/transaction-types';
import {formatCurrency, formatter} from '@/lib/utils/utils';

const data = [
    {name: 'Page A', uv: 400, pv: 2400, amt: 2400},
    {name: 'Page B', uv: 500, pv: 2000, amt: 2000},
    {name: 'Page C', uv: 600, pv: 2200, amt: 2200},
    {name: 'Page D', uv: 200, pv: 1800, amt: 1400},
    {name: 'Page E', uv: 100, pv: 500, amt: 5400},
];

export type LineChartProps = {
    deposits: TransactionView[],
    withdrawals: TransactionView[]
}

export default function DashboardLineChart({deposits, withdrawals}: LineChartProps) {
    const formattedWithdrawals = withdrawals.map((w) => ({
        ...w,
        createdAt: formatter.format(new Date(w.createdAt))
    }));
    console.log(formattedWithdrawals);

    const formattedDeposits = deposits.map((d) => ({
        ...d,
        createdAt: formatter.format(new Date(d.createdAt))
    }));


    return (
        <Card className="h-full w-full pr-8">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart width={600}
                               height={600}
                               data={formattedWithdrawals}
                               className="mr-8">
                        <Line type="monotone" dataKey="amount" stroke="#e7000b" name="withdrawals"/>
                        <XAxis dataKey="createdAt"/>
                        <YAxis dataKey="amount"/>
                        {/*<Tooltip content={CustomTooltip}/>*/}
                        <Legend/>
                    </LineChart>
                </ResponsiveContainer>
        </Card>
    );
};
