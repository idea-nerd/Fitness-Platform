import { Roles } from './../models/roles.model';

export class CreateRole {
    static readonly type = '[ROLE] Add';

    constructor(public payload: Roles) {}
}

export class ReadRole {
    static readonly type = '[ROLE] Read';
}


export class ReadSelectedRole {
    static readonly type = '[ROLE] Read Selected';

    constructor(public id: number) {}
}

export class UpdateRole {
    static readonly type = '[ROLE] Update';

    constructor(public payload: Roles, public id: number) {}
}

export class DeleteRole {
    static readonly type = '[ROLE] Delete';

    constructor(public payload: Roles, public id: number) {}
}

export class SetSelectedRole {
    static readonly type = '[ROLE] Set';

    constructor(public payload: Roles) {}
}
