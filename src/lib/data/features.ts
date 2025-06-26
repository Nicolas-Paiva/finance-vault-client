export type Feature = {
    title: string;
    description: string;
    icon: IconStr
}

type IconStr = 'money' | 'security' | 'transaction' | 'chart' | 'notification';

const transactionTracking: Feature = {
    title: 'Check your transactions',
    description: 'Track your expenses and deposits in real-time!',
    icon: 'money'
};

const securePlatform: Feature = {
    title: 'Privacy and Security',
    description: 'A safe place to trade',
    icon: 'security'
};

const userToUserTransaction: Feature = {
    title: 'Seamless Transactions',
    description: 'Our platform offers simple and secure' +
        ' transactions between users by email',
    icon: 'transaction'
};

const visualiseData: Feature = {
    title: 'Manage your finances',
    description: 'Visualise your monthly summary at a glance',
    icon: 'chart'
};

const receiveNotifications: Feature = {
    title: 'Remain updated!',
    description: 'Receive notifications of financial activity while offline',
    icon: 'notification'
}

export const features: Feature[] = [
    transactionTracking,
    securePlatform,
    userToUserTransaction,
    visualiseData,
    receiveNotifications
];