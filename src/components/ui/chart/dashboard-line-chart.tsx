import {LineChart, Line, XAxis, YAxis, Legend, ResponsiveContainer, Tooltip} from 'recharts';
import {formatter} from '@/lib/utils/utils';
import {Card} from '@/components/ui/card';
import {WeeklyTransactions} from '@/lib/services/summary-service';
import CustomTooltip from '@/components/ui/chart/CustomTooltip';

export type LineChartProps = {
    weeklyTransactions: WeeklyTransactions
}


export default function DashboardLineChart({weeklyTransactions}: LineChartProps) {

    // Converting the API response to rechart format
    const chartData = weeklyTransactions.totals.map((total, i) => {
        return {
            week: formatter.format(new Date(weeklyTransactions.dates.at(i) || new Date())),
            total: total
        }
    })


    return (
        <Card className="h-full w-full">
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                width={500}
                height={300}
                data={chartData}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <XAxis dataKey="week" className="text-xs md:text-sm" />
                <YAxis className="text-xs md:text-sm" />
                <Legend />
                <Line type="monotone" dataKey="total" stroke="#8884d8" />
                <Tooltip content={CustomTooltip} />
            </LineChart>
        </ResponsiveContainer>
         </Card>
    );
};
