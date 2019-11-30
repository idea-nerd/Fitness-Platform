import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Product } from '../models/products.model';
import { CreateProduct, ReadProduct, ReadSelectedProduct, UpdateProduct, DeleteProduct, SetSelectedProduct, UpdateProductImage } from './../actions/product.actions';
import { ProductService } from '../services/products/product.service';
import {tap} from 'rxjs/operators';

export class ProductStateModel {
    products: Product[];
    selectedProductInstance: Product[];
    selectedAuthenticatedProductInstance: Product[];
    selectedProduct: Product;
}

@State<ProductStateModel>({
    name: 'products',
    defaults: {
        products: [],
        selectedProductInstance: [],
        selectedAuthenticatedProductInstance: [],
        selectedProduct: null,
    },
})

export class ProductState {

    constructor(private productService: ProductService) { }

    @Selector()
    static getProducts(state: ProductStateModel) {
        return state.products;
    }

    @Selector()
    static getSelectedProduct(state: ProductStateModel) {
        return state.selectedProduct;
    }

    @Selector()
    static getSelectedProductInstance(state: ProductStateModel) {
        return state.selectedProductInstance;
    }

    @Selector()
    static getAuthenticatedProductInstance(state: ProductStateModel) {
        return state.selectedAuthenticatedProductInstance;
    }


    @Action(CreateProduct)
    createProduct({getState, patchState}: StateContext<ProductStateModel>, { payload }: CreateProduct) {
        return this.productService.create(payload).pipe(tap((result) => {
            console.log('req resul', result);
            const state = getState();
            patchState({
                products: [...state.products, result],
            });
        }));

    }

    @Action(ReadProduct)
    readProduct({getState, setState}: StateContext<ProductStateModel>) {
        return this.productService.read().pipe(tap((result) => {
            const state = getState();
            setState({
                ...state,
                products: result,
            });
        }));

    }

    @Action(ReadSelectedProduct)
    readSelectedProduct({getState, setState}: StateContext<ProductStateModel>, { id }: ReadSelectedProduct ) {
        return this.productService.readSelected(id).pipe(tap((result) => {
            const state = getState();
            setState({
                ...state,
                selectedProductInstance: result,
            });
        }));

    }

    @Action(UpdateProduct)
    updateProduct({getState, setState}: StateContext<ProductStateModel>, { payload, id }: UpdateProduct) {
        return this.productService.update(payload, id).pipe(tap((result) => {
            const state = getState();
            const productList = [...state.products];
            const productIndex = productList.findIndex(item => item.id === id);
            productList[productIndex] = result;
            setState({
                ...state,
                products: productList,
            });
        }));
    }

    @Action(UpdateProductImage)
    updateProductImage({getState, setState}: StateContext<ProductStateModel>, { payload, id }: UpdateProductImage) {
        return this.productService.updateProductImage(payload, id).pipe(tap((result) => {
            const state = getState();
            const productList = [...state.products];
            const productIndex = productList.findIndex(item => item.id === id);
            productList[productIndex] = result;
            setState({
                ...state,
                products: productList,
            });
        }));
    }

    @Action(DeleteProduct)
    deleteProduct({getState, setState}: StateContext<ProductStateModel>, { id }: DeleteProduct) {
        return this.productService.delete(id).pipe(tap((result) => {
            const state = getState();
            const productList = [...state.products];
            const productIndex = productList.findIndex(item => item.id === id);
            productList[productIndex] = result;
            setState({
                ...state,
                products: productList,
            });
        }));
    }

    @Action(SetSelectedProduct)
    setSelectedProductId({getState, setState}: StateContext<ProductStateModel>, {payload}: SetSelectedProduct) {
        const state = getState();
        setState({
            ...state,
            selectedProduct: payload,
        });
    }

}

