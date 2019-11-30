import { Service } from './../models/services.model';

export class CreateService {
    static readonly type = '[SERVICE] Add';

    constructor(public payload: Service) {}
}

export class ReadService {
    static readonly type = '[SERVICE] Read';
}


export class ReadSelectedService {
    static readonly type = '[SERVICE] Read Selected';

    constructor(public id: number) {}
}

export class UpdateService {
    static readonly type = '[SERVICE] Update';

    constructor(public payload: Service, public id: number) {}
}

export class DeleteService {
    static readonly type = '[SERVICE] Delete';

    constructor(public id: number) {}
}

export class SetSelectedService {
    static readonly type = '[SERVICE] Set';

    constructor(public payload: Service) {}
}
