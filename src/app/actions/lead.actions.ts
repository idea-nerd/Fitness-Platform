import { Lead } from './../models/leads.model';

export class CreateLead {
    static readonly type = '[LEAD] Add';

    constructor(public payload: Lead) {}
}

export class ReadLead {
    static readonly type = '[LEAD] Read';
}

export class ReadAppointmentLead {
    static readonly type = '[LEAD] Read Appointments';
}


export class ReadSelectedLead {
    static readonly type = '[LEAD] Read Selected';

    constructor(public id: number) {}
}

export class ReadTrainerLead {
    static readonly type = '[LEAD] Read Trainer Client';
}

export class UpdateLead {
    static readonly type = '[LEAD] Update';

    constructor(public payload: Lead, public id: number) {}
}

export class UpdateLeadImage {
    static readonly type = '[LEAD] Update Image';

    constructor(public payload: Lead, public id: number) {}
}

export class DeleteLead {
    static readonly type = '[LEAD] Delete';

    constructor(public id: number) {}
}

export class SetSelectedLead {
    static readonly type = '[LEAD] Set';

    constructor(public payload: Lead) {}
}
