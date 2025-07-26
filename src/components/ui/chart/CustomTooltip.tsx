/* eslint-disable */
// @ts-nocheck
import {formatCurrency} from '@/lib/utils/utils';
import {ContentType} from 'recharts/types/component/Label';

type ContentType = {
    title: string;
    description: string;
    active?: boolean;
    payload?: any;
};

export default function CustomTooltip({ active, payload }: ContentType) {
    const isVisible = active && payload && payload.length;

    const data = payload[0];
    let total, startDate;

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
