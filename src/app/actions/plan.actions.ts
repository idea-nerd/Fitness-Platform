import { Plan } from './../models/plans.model';

export class CreatePlan {
    static readonly type = '[PLAN] Add';

    constructor(public payload: Plan) {}
}

export class ReadPlan {
    static readonly type = '[PLAN] Read';
}


export class ReadSelectedPlan {
    static readonly type = '[PLAN] Read Selected';

    constructor(public id: number) {}
}

export class UpdatePlan {
    static readonly type = '[PLAN] Update';

    constructor(public payload: Plan, public id: number) {}
}

export class DeletePlan {
    static readonly type = '[PLAN] Delete';

    constructor(public id: number) {}
}

export class SetSelectedPlan {
    static readonly type = '[PLAN] Set';

    constructor(public payload: Plan) {}
}
