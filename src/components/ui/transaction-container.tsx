import {Card} from '@/components/ui/card';
import {ScrollArea} from '@/components/ui/scroll-area';
import Transaction from '@/components/ui/transaction';
import {IoMdOptions} from 'react-icons/io';
import {FaSortAmountDown} from 'react-icons/fa';
import {useInfiniteQuery} from '@tanstack/react-query';
import {getTransactions} from '@/lib/services/transaction-service';
import {PaginatedResponse} from '@/lib/types/pagination';
import {TransactionView} from '@/lib/types/transaction-types';

type TransactionContainerProps = {
    currency: string
}

export default function TransactionContainer({currency}: TransactionContainerProps) {

    // Uses infinite query to load the pages
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isError,
    } = useInfiniteQuery<PaginatedResponse<TransactionView>, Error>({
        queryKey: ['transactions'],
        queryFn: ({ pageParam = 0 }) => getTransactions(pageParam),
        getNextPageParam: (lastPage) => {
            return lastPage.last ? undefined : lastPage.pageNumber + 1;
        },
        initialPageParam: 0,
    });

    const transactions: TransactionView[] | undefined = data?.pages.flatMap(page => page.content)

    console.log(currency);

    return <Card className="md:w-[50%] md:mx-auto mt-6 py-2">
        <div className="flex items-center justify-between w-[90%] mx-auto">
            <p className="font-bold">Transactions</p>
            <div className="flex gap-x-4 mr-2">
                <IoMdOptions onClick={() => console.log('Options')}/>
                <FaSortAmountDown onClick={() => console.log('FIlter')}/>
            </div>
        </div>
        <ScrollArea className="h-[300px] w-[90%] mx-auto">
            {transactions?.map((transaction: TransactionView) => {
                return <Transaction {...transaction} currency={currency} key={transaction.id}/>
            })}
        </ScrollArea>
    </Card>;
};
