import {Card, CardTitle} from '@/components/ui/card';
import {ScrollArea} from '@/components/ui/scroll-area';
import Transaction from '@/components/ui/transaction';
import {FaSortAmountDown} from 'react-icons/fa';
import {useInfiniteQuery} from '@tanstack/react-query';
import {getTransactions} from '@/lib/services/transaction-service';
import {PaginatedResponse} from '@/lib/types/pagination';
import {TransactionView} from '@/lib/types/transaction-types';
import {Skeleton} from '@/components/ui/skeleton';
import {Button} from '@/components/ui/button';
import FilteringModal from '@/components/ui/filtering-modal';

type TransactionContainerProps = {
    currency: string
}

export default function TransactionContainer({currency}: TransactionContainerProps) {

    // Uses infinite query to load the pages
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isPending,
        isFetching,
        isLoading,
        isError,
    } = useInfiniteQuery<PaginatedResponse<TransactionView>, Error>({
        queryKey: ['transactions'],
        queryFn: ({pageParam = 0}) => getTransactions(pageParam),
        getNextPageParam: (lastPage) => {
            return lastPage.last ? undefined : lastPage.pageNumber + 1;
        },
        initialPageParam: 0,
    });

    if (isError) {
        return <Card className="md:w-[50%] h-[100px] md:mx-auto mt-6 py-2">
            <CardTitle>Could not fetch transactions</CardTitle>
        </Card>;
    }

    if (isLoading || isPending) {
        return <Skeleton className="h-[300px] w-full rounded-xl mt-4"></Skeleton>;
    }

    const transactions: TransactionView[] | undefined = data?.pages.flatMap(page => page.content);

    return <Card className="md:w-[50%] md:mx-auto mt-6 py-2">
        <div className="flex items-center justify-between w-[90%] mx-auto">
            <p className="font-bold">Transactions</p>
            <div className="flex gap-x-4 mr-2">
                <FilteringModal/>
                <FaSortAmountDown onClick={() => console.log('Filter')}/>
            </div>
        </div>
        <ScrollArea className="h-[300px] w-[90%] mx-auto">
            {transactions?.length > 0 ? transactions?.map((transaction: TransactionView) => {
                    return <Transaction {...transaction} currency={currency} key={transaction.id}/>;
                }) :

                <p className="text-center mt-6">No transactions found</p>
            }
        </ScrollArea>

        <div className="text-center">
            <Button variant="outline"
                    disabled={isFetching || !hasNextPage}
                    onClick={() => fetchNextPage()}>
                {isFetching ? 'Fetching...' : 'Load more'}
            </Button>
        </div>
    </Card>;
};
