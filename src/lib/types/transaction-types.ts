export type TransactionView = {
    id: number,
    amount: number,
    createdAt: string,
    senderName: string,
    receiverName: string
}

export type Transaction = {
    receiverEmail: string,
    amount: number
}