import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';

import { cn } from "@/lib/utils/utils"

export default function CurrencySelect({className}: {className: string}) {
    return (
        <Select>
            <SelectTrigger className={cn('w-[280px]', className)}>
                <SelectValue placeholder="Select your currency" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                   <SelectItem value="EUR">EUR - Euro</SelectItem>
                   <SelectItem value="USD">USD - United States Dollar</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};
