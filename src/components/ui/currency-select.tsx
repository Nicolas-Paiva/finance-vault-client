import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';

import {cn} from '@/lib/utils/utils';
import Image from 'next/image';

type CurrencySelectProps = {
    className?: string,
    id: string,
    value: string,
    onValueChange: (value: string) => void
}

export default function CurrencySelect({className, onValueChange}: CurrencySelectProps) {
    return (
        <Select onValueChange={onValueChange} defaultValue="EUR">
            <SelectTrigger className={cn('w-[280px]', className)}>
                <SelectValue placeholder="Select your currency"/>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value="EUR">
                        <Image src="/images/currencies/eur.svg"
                               alt="Euro" width={22} height={20}/>
                        EUR - Euro
                    </SelectItem>

                    <SelectItem value="GBP">
                        <Image src="/images/currencies/gbp.svg"
                               alt="British Pound" width={20} height={20}/>
                        GBP - British Pound Sterling
                    </SelectItem>

                    <SelectItem value="CHF">
                        <Image src="/images/currencies/chf.svg"
                               alt="Swiss Franc" width={20} height={20}/>
                        CHF - Swiss Franc
                    </SelectItem>

                    <SelectItem value="USD">
                        <Image src="/images/currencies/usd.svg"
                               alt="American Dollar" width={20} height={20}/>
                        USD - American Dollar
                    </SelectItem>

                    <SelectItem value="CAD">
                        <Image src="/images/currencies/cad.svg"
                               alt="Canadian Dollar" width={20} height={20}/>
                        CAD - Canadian Dollar
                    </SelectItem>

                    <SelectItem value="AUD">
                        <Image src="/images/currencies/aud.svg"
                               alt="Australian Dollar" width={20} height={20}/>
                        AUD - Australian Dollar
                    </SelectItem>

                    <SelectItem value="JPY">
                        <Image src="/images/currencies/jpy.svg"
                               alt="Japanese Yen" width={20} height={20}/>
                        JPY - Japanese Yen
                    </SelectItem>

                </SelectGroup>
            </SelectContent>
        </Select>
    );
};
