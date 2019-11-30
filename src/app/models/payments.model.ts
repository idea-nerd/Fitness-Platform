export interface Registration {
    id: number;
    clientCode: string;
    firstName: string;
    lastName: string;
    date: string;
    amount: string;
    note: string;
    status: string;
}

export interface Subscription {
    id: number;
    subscriptionCode: string;
    name: string;
    amount: string;
    discountPercent: string;
    notes: string;
    status: string;
}

export interface Store {
    id: number;
    name: string;
    quantity: string;
    amount: string;
    discountPercent: string;
    notes: string;
    status: string;
}
