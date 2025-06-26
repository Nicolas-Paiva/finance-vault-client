export type Feature = {
    title: string;
    description: string;
    icon: IconStr
}

type IconStr = "money" | "security" | "transaction";

const transactionTracking: Feature = {
    title: "Check your transactions",
    description: "Track your expenses and deposits in real-time!",
    icon: "money"
}

const securePlatform: Feature = {
    title: "Privacy and Security Focus",
    description: "A safe place to trade",
    icon: "security"
}

const userToUserTransaction: Feature = {
    title: "Seamless Transactions",
    description: "Our platform offers simple and secure" +
        " transactions between users by email",
    icon: "transaction"
}


export const features: Feature[] = [
    transactionTracking,
    securePlatform,
    userToUserTransaction
]