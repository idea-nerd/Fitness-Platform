import { InvoiceDetail } from './../models/invoiceDetail.model';

export class CreateInvoiceDetail {
    static readonly type = '[INVOICEDETAIL] Add';

    constructor(public payload: InvoiceDetail) {}
}

export class ReadInvoiceDetail {
    static readonly type = '[INVOICEDETAIL] Read';
}


export class ReadSelectedInvoiceDetail {
    static readonly type = '[INVOICEDETAIL] Read Selected';

    constructor(public id: number) {}
}

export class UpdateInvoiceDetail {
    static readonly type = '[INVOICEDETAIL] Update';

    constructor(public payload: InvoiceDetail, public id: number) {}
}

export class DeleteInvoiceDetail {
    static readonly type = '[INVOICEDETAIL] Delete';

    constructor(public payload: InvoiceDetail, public id: number) {}
}

export class SetSelectedInvoiceDetail {
    static readonly type = '[INVOICEDETAIL] Set';

    constructor(public payload: InvoiceDetail) {}
}
