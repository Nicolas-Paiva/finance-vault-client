/* eslint-disable */
// @ts-nocheck

import {Card, CardTitle} from '@/components/ui/card';
import {ScrollArea} from '@/components/ui/scroll-area';
import Transaction from '@/components/ui/transaction';
import {useInfiniteQuery} from '@tanstack/react-query';
import {getTransactions} from '@/lib/services/transaction-service';
import {PaginatedResponse} from '@/lib/types/pagination';
import {TransactionView} from '@/lib/types/transaction-types';
import {Skeleton} from '@/components/ui/skeleton';
import {Button} from '@/components/ui/button';
import FilteringModal from '@/components/ui/filtering-modal';
import {useState} from 'react';
import SortingModal from '@/components/ui/sorting-modal';

type TransactionContainerProps = {
    currency: string
}

export default function TransactionContainer({currency}: TransactionContainerProps) {

    // Filter criteria
    const [minAmount, setMinAmount] = useState<number>(1);
    const [maxAmount, setMaxAmount] = useState<number>(Number.MAX_SAFE_INTEGER);
    const [showDeposits, setShowDeposits] = useState(true);
    const [showWithdrawals, setShowWithdrawals] = useState(true);
    const [isFiltered, setIsFiltered] = useState<boolean>(false);

    // Sorting
    const [sortBy, setSortBy] = useState<string>('createdAt');
    const [sortByOrder, setSortByOrder] = useState<string>('desc');
    const [isSorted, setIsSorted] = useState<boolean>(false);


    function restoreDefaultFilters(): void {
        setIsFiltered(false);
        setMinAmount(1);
        setMaxAmount(Number.MAX_SAFE_INTEGER);
        setShowDeposits(true);
        setShowWithdrawals(true);
    }


    function restoreDefaultSorting(): void {
        setSortBy('createdAt');
        setSortByOrder('desc');
    }


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
        queryKey: ['transactions', {minAmount, maxAmount, showDeposits, showWithdrawals, sortBy, sortByOrder}],
        queryFn: ({pageParam = 0}) =>
            getTransactions(pageParam,
                String(minAmount),
                String(maxAmount),
                showDeposits,
                showWithdrawals,
                sortBy,
                sortByOrder),
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
        return <Skeleton className="h-[300px] w-full md:w-[50%] rounded-xl mt-4"></Skeleton>;
    }

    const transactions: TransactionView[] | undefined = data?.pages.flatMap(page => page.content);

    return <Card className="md:w-[50%] md:mx-auto mt-6 py-2 h-full md:h-[30vh] mb-4">
        <div className="flex items-center justify-between w-[90%] mx-auto">
            <p className="font-bold">Transactions</p>
            <div className="flex gap-x-4 mr-2">
                <FilteringModal
                    onMinChange={setMinAmount}
                    onMaxChange={setMaxAmount}
                    onToggleDeposits={setShowDeposits}
                    onToggleWithdrawals={setShowWithdrawals}
                    filtered={isFiltered}
                    setIsFiltered={setIsFiltered}
                    restoreDefault={restoreDefaultFilters}
                />
                <SortingModal
                    propertyChange={setSortBy}
                    orderChange={setSortByOrder}
                    isSorted={isSorted}
                    setIsSorted={setIsSorted}
                    restoreDefault={restoreDefaultSorting}
                />
            </div>
        </div>
        <ScrollArea className="h-[350px] overflow-hidden w-[90%] mx-auto">
            {transactions?.length > 0 ? transactions?.map((transaction: TransactionView) => {
                    return <Transaction {...transaction} currency={currency} key={transaction.id}/>;
                }) :

                <p className="text-center mt-6">No transactions found</p>
            }
        </ScrollArea>

        <div className="text-center">
            {transactions?.length > 0 ?
                <Button variant="outline"
                        disabled={isFetching || !hasNextPage}
                        onClick={() => fetchNextPage()}>
                    {isFetching ? 'Fetching...' : 'Load more'}
                </Button>
                :
                ''
            }
        </div>
    </Card>;
};
