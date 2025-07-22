import {formatCurrency} from '@/lib/utils/utils';
import {ContentType} from 'recharts/types/component/Label';

export default function CustomTooltip({ active, payload, label }: ContentType | undefined) {
    const isVisible = active && payload && payload.length;

    const data = payload[0];
    let total, startDate, endDate;

    console.log(data);

    if (data) {
        total = data.payload.total;
        startDate = data.payload.week;
    } else {
        return ""
    }


    return (
        <div className="bg-muted rounded" style={{ visibility: isVisible ? 'visible' : 'hidden' }}>
            {isVisible && (
                <>
                    <p>Amount: <span className="font-bold">{formatCurrency(total, "EUR")}</span></p>
                    <p>Starting date: <span className="font-bold">{startDate}</span></p>
                </>
            )}
        </div>
    );
};
