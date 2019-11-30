import { Subscription } from './../models/subscriptions.model';

export class CreateSubscription {
    static readonly type = '[SUBSCRIPTION] Add';

    constructor(public payload: Subscription) {}
}

export class ReadSubscription {
    static readonly type = '[SUBSCRIPTION] Read';
}


export class ReadSelectedSubscription {
    static readonly type = '[SUBSCRIPTION] Read Selected';

    constructor(public id: number) {}
}

export class ReadSelectedClientSubscription {
    static readonly type = '[SUBSCRIPTION] Read Selected Client Subscription';

    constructor(public id: number) {}
}

export class UpdateSubscription {
    static readonly type = '[SUBSCRIPTION] Update';

    constructor(public payload: Subscription, public id: any) {}
}

export class ArchiveSubscription {
    static readonly type = '[SUBSCRIPTION] Archive';

    constructor(public id: any) {}
}

export class DeleteSubscription {
    static readonly type = '[SUBSCRIPTION] Delete';

    constructor(public id: any) {}
}

export class SetSelectedSubscription {
    static readonly type = '[SUBSCRIPTION] Set';

    constructor(public payload: Subscription) {}
}
