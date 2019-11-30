import { Client } from './../models/clients.model';

export class CreateClient {
    static readonly type = '[CLIENT] Add';

    constructor(public payload: Client) {}
}

export class ReadClient {
    static readonly type = '[CLIENT] Read';
}

export class ReadExpiredClient {
    static readonly type = '[CLIENT] Read Expired';
}

export class ReadAppointmentClient {
    static readonly type = '[CLIENT] Read Appointments';
}


export class ReadSelectedClient {
    static readonly type = '[CLIENT] Read Selected';

    constructor(public id: number) {}
}

export class ReadTrainersClients {
    static readonly type = '[CLIENT] Read Trainer Clients';
}

export class UpdateClient {
    static readonly type = '[CLIENT] Update';

    constructor(public payload: Client, public id: number) {}
}

export class UpdateClientImage {
    static readonly type = '[CLIENT] Update Image';

    constructor(public payload: Client, public id: number) {}
}

export class DeleteClient {
    static readonly type = '[CLIENT] Delete';

    constructor(public id: number) {}
}

export class SetSelectedClient {
    static readonly type = '[CLIENT] Set';

    constructor(public payload: Client) {}
}
