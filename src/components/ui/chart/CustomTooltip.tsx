import {formatCurrency} from '@/lib/utils/utils';
import {ContentType} from 'recharts/types/component/Label';

export default function CustomTooltip({ active, payload, label }: ContentType | undefined) {
    const isVisible = active && payload && payload.length;

    const data = payload[0];
    let amount, createdAt, receiverName;

    if (data) {
        amount = data.payload.amount;
        createdAt = data.payload.createdAt;
        receiverName = data.payload.receiverName;
    } else {
        return ""
    }


    return (
        <div className="bg-muted rounded" style={{ visibility: isVisible ? 'visible' : 'hidden' }}>
            {isVisible && (
                <>
                    <p>Amount: <span className="font-bold">{formatCurrency(amount, "EUR")}</span></p>
                    <p className="intro">Date: <span className="font-bold">{createdAt}</span></p>
                    <p>Receiver: <span className="font-bold">{receiverName}</span></p>
                </>
            )}
        </div>
    );
};
