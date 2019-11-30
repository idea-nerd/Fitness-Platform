import { Expense } from './../models/expenses.model';

export class CreateExpense {
    static readonly type = '[EXPENSE] Add';

    constructor(public payload: Expense) {}
}

export class ReadExpense {
    static readonly type = '[EXPENSE] Read';
}


export class ReadSelectedExpense {
    static readonly type = '[EXPENSE] Read Selected';

    constructor(public id: number) {}
}

export class UpdateExpense {
    static readonly type = '[EXPENSE] Update';

    constructor(public payload: Expense, public id: number) {}
}

export class DeleteExpense {
    static readonly type = '[EXPENSE] Delete';

    constructor(public id: number) {}
}

export class SetSelectedExpense {
    static readonly type = '[EXPENSE] Set';

    constructor(public payload: Expense) {}
}
