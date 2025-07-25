export type TransactionView = {
    id: number,
    amount: number,
    createdAt: string,
    senderName: string,
    receiverName: string,
    senderEmail: string,
    receiverEmail: string,
    transactionEmail: string
}

export type Transaction = {
    receiverEmail: string,
    amount: number
}