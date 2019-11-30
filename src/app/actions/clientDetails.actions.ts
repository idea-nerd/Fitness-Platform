import {  ClientDetails } from './../models/clientDetails.model';

export class CreateClientDetails {
    static readonly type = '[CLIENTDETAILS] Add';

    constructor(public payload:  ClientDetails) {}
}

export class ReadClientDetails {
    static readonly type = '[CLIENTDETAILS] Read';
}

export class ReadSelectedDetails {
    static readonly type = '[CLIENTDETAILS] Read Detail Selected';

    constructor(public id: number) {}
}


export class ReadSelectedClientDetails {
    static readonly type = '[CLIENTDETAILS] Read Selected';

    constructor(public id: number) {}
}

export class UpdateClientDetails {
    static readonly type = '[CLIENTDETAILS] Update';

    constructor(public payload:  ClientDetails, public id: number) {}
}

export class DeleteClientDetails {
    static readonly type = '[CLIENTDETAILS] Delete';

    constructor(public id: number) {}
}

export class SetSelectedClientDetails {
    static readonly type = '[CLIENTDETAILS] Set';

    constructor(public payload:  ClientDetails) {}
}
