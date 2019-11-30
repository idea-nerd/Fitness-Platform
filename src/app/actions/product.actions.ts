import { Product } from './../models/products.model';

export class CreateProduct {
    static readonly type = '[PRODUCT] Add';

    constructor(public payload: Product) {}
}

export class ReadProduct {
    static readonly type = '[PRODUCT] Read';
}


export class ReadSelectedProduct {
    static readonly type = '[PRODUCT] Read Selected';

    constructor(public id: number) {}
}

export class UpdateProduct {
    static readonly type = '[PRODUCT] Update';

    constructor(public payload: Product, public id: number) {}
}

export class UpdateProductImage {
    static readonly type = '[PRODUCT] Update Image';

    constructor(public payload: Product, public id: number) {}
}

export class DeleteProduct {
    static readonly type = '[PRODUCT] Delete';

    constructor(public id: number) {}
}

export class SetSelectedProduct {
    static readonly type = '[PRODUCT] Set';

    constructor(public payload: Product) {}
}
