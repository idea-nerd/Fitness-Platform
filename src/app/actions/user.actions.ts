import { User } from './../models/users.model';

export class CreateUser {
    static readonly type = '[USER] Add';

    constructor(public payload: User) {}
}

export class ReadUser {
    static readonly type = '[USER] Read';
}

export class ReadTrainers {
    static readonly type = '[USER] Read Trainers';
}


export class ReadSelectedUser {
    static readonly type = '[USER] Read Selected';

    constructor(public id: number) {}
}

export class ReadAuthenticatedUser {
    static readonly type = '[USER] Read Authenticated';

    constructor(public id: number) {}
}

export class UpdateUser {
    static readonly type = '[USER] Update';

    constructor(public payload: User, public id: number) {}
}

export class UpdateUserImage {
    static readonly type = '[USER] Update Image';

    constructor(public payload: User, public id: number) {}
}

export class DeleteUser {
    static readonly type = '[USER] Delete';

    constructor(public id: number) {}
}

export class SetSelectedUser {
    static readonly type = '[USER] Set';

    constructor(public payload: User) {}
}
