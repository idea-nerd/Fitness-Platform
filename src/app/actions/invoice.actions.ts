import { Invoice } from './../models/invoices.model';

export class CreateInvoice {
    static readonly type = '[INVOICE] Add';

    constructor(public payload: Invoice) {}
}

export class ReadInvoice {
    static readonly type = '[INVOICE] Read';
}


export class ReadSelectedInvoice {
    static readonly type = '[INVOICE] Read Selected';

    constructor(public id: number) {}
}

export class UpdateInvoice {
    static readonly type = '[INVOICE] Update';

    constructor(public payload: Invoice, public id: number) {}
}

export class DeleteInvoice {
    static readonly type = '[INVOICE] Delete';

    constructor(public payload: Invoice, public id: number) {}
}

export class SetSelectedInvoice {
    static readonly type = '[INVOICE] Set';

    constructor(public payload: Invoice) {}
}
