import { Appointment } from '../models/appointments.model';

export class CreateAppointment {
    static readonly type = '[APPOINTMENT] Add';

    constructor(public payload: Appointment) {}
}

export class ReadAppointment {
    static readonly type = '[APPOINTMENT] Read';
}


export class ReadSelectedAppointment {
    static readonly type = '[APPOINTMENT] Read Selected';

    constructor(public id: number) {}
}

export class UpdateAppointment {
    static readonly type = '[APPOINTMENT] Update';

    constructor(public payload: Appointment, public id: number) {}
}

export class UpdateAppointmentImage {
    static readonly type = '[APPOINTMENT] Update Image';

    constructor(public payload: Appointment, public id: number) {}
}

export class DeleteAppointment {
    static readonly type = '[APPOINTMENT] Delete';

    constructor(public id: number) {}
}

export class SetSelectedAppointment {
    static readonly type = '[APPOINTMENT] Set';

    constructor(public payload: Appointment) {}
}
