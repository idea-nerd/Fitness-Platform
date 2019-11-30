export interface Invoice {
    id: number;
    memberId: number;
    invoiceNumber: number;
    total: number;
    pendingAmount: number;
    note: string;
    status: string;
    discountNote: string;
    discountPercent: string;
    discountAmount: number;
    tax: string;
    additionalFees: number;
    frozen: number;
    archived: number;
    created_at: string;
    created_by: number;
    update_at: string;
    updated_by: number;
}
