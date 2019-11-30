export interface Subscription {
    id: number;
    subscriptionCode: string;
    planId: string;
    planCode: string;
    clientCode: string;
    notes: string;
    amount: string;
    discountPercent: string;
    discountAmount: string;
    discountNote: string;
    tax: string;
    additionalFees: string;
    plans: any;
    frozen: string;
    extendedBy: string;
    startDate: string;
    endDate: string;
    status: string;
}
