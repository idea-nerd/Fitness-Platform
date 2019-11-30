import { Sale } from './../models/sales.model';

export class CreateSale {
    static readonly type = '[SALE] Add';

    constructor(public payload: Sale) {}
}

export class ReadSale {
    static readonly type = '[SALE] Read';
}


export class ReadSelectedSale {
    static readonly type = '[SALE] Read Selected';

    constructor(public id: number) {}
}

export class UpdateSale {
    static readonly type = '[SALE] Update';

    constructor(public payload: Sale, public id: number) {}
}

export class DeleteSale {
    static readonly type = '[SALE] Delete';

    constructor(public payload: Sale, public id: number) {}
}

export class SetSelectedSale {
    static readonly type = '[SALE] Set';

    constructor(public payload: Sale) {}
}
