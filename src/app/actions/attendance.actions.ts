import { Attendance } from './../models/attendance.model';

export class CreateAttendance {
    static readonly type = '[ATTENDANCE] Add';

    constructor(public payload: any) {}
}

export class ReadAttendance {
    static readonly type = '[ATTENDANCE] Read';
}


export class ReadSelectedAttendance {
    static readonly type = '[ATTENDANCE] Read Selected';

    constructor(public id: number) {}
}

export class UpdateAttendance {
    static readonly type = '[ATTENDANCE] Update';

    constructor(public payload: Attendance, public id: number) {}
}

export class DeleteAttendance {
    static readonly type = '[ATTENDANCE] Delete';

    constructor(public id: number) {}
}

export class SetSelectedAttendance {
    static readonly type = '[ATTENDANCE] Set';

    constructor(public payload: Attendance) {}
}
