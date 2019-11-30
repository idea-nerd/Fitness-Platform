import { Equipment } from './../models/equipments.model';

export class CreateEquipment {
    static readonly type = '[EQUIPMENT] Add';

    constructor(public payload: Equipment) {}
}

export class ReadEquipment {
    static readonly type = '[EQUIPMENT] Read';
}


export class ReadSelectedEquipment {
    static readonly type = '[EQUIPMENT] Read Selected';

    constructor(public id: number) {}
}

export class UpdateEquipment {
    static readonly type = '[EQUIPMENT] Update';

    constructor(public payload: Equipment, public id: number) {}
}

export class UpdateEquipmentImage {
    static readonly type = '[EQUIPMENT] Update Image';

    constructor(public payload: Equipment, public id: number) {}
}

export class DeleteEquipment {
    static readonly type = '[EQUIPMENT] Delete';

    constructor(public id: number) {}
}

export class SetSelectedEquipment {
    static readonly type = '[EQUIPMENT] Set';

    constructor(public payload: Equipment) {}
}
