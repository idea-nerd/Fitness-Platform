import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Sale } from '../models/sales.model';
import { CreateSale, ReadSale, ReadSelectedSale, UpdateSale, DeleteSale, SetSelectedSale } from './../actions/sale.actions';
import { SaleService } from '../services/sales/sales.service';
import {tap} from 'rxjs/operators';

export class SaleStateModel {
    sales: Sale[];
    selectedSaleInstance: Sale[];
    selectedSale: Sale;
}

@State<SaleStateModel>({
    name: 'sales',
    defaults: {
        sales: [],
        selectedSaleInstance: [],
        selectedSale: null,
    },
})

export class SaleState {

    constructor(private saleService: SaleService) { }

    @Selector()
    static getSales(state: SaleStateModel) {
        return state.sales;
    }

    @Selector()
    static getSelectedSale(state: SaleStateModel) {
        return state.selectedSale;
    }

    @Selector()
    static getSelectedSaleInstance(state: SaleStateModel) {
        return state.selectedSaleInstance;
    }

    @Action(CreateSale)
    createSale({getState, patchState}: StateContext<SaleStateModel>, { payload }: CreateSale) {
        return this.saleService.create(payload).pipe(tap((result) => {
            const state = getState();
            patchState({
                sales: [...state.sales, result],
            });
        }));

    }

    @Action(ReadSale)
    readSale({getState, setState}: StateContext<SaleStateModel>) {
        return this.saleService.read().pipe(tap((result) => {
            const state = getState();
            setState({
                ...state,
                sales: result,
            });
        }));

    }

    @Action(ReadSelectedSale)
    readSelectedSale({getState, setState}: StateContext<SaleStateModel>, { id }: ReadSelectedSale ) {
        return this.saleService.readSelected(id).pipe(tap((result) => {
            const state = getState();
            setState({
                ...state,
                selectedSaleInstance: result,
            });
        }));

    }

    @Action(UpdateSale)
    updateSale({getState, setState}: StateContext<SaleStateModel>, { payload, id }: UpdateSale) {
        return this.saleService.update(payload, id).pipe(tap((result) => {
            const state = getState();
            const saleList = [...state.sales];
            const saleIndex = saleList.findIndex(item => item.id === id);
            saleList[saleIndex] = result;
            setState({
                ...state,
                sales: saleList,
            });
        }));
    }

    @Action(DeleteSale)
    deleteSale({getState, setState}: StateContext<SaleStateModel>, { payload, id }: DeleteSale) {
        return this.saleService.delete(payload, id).pipe(tap((result) => {
            const state = getState();
            const saleList = [...state.sales];
            const saleIndex = saleList.findIndex(item => item.id === id);
            saleList[saleIndex] = result;
            setState({
                ...state,
                sales: saleList,
            });
        }));
    }

    @Action(SetSelectedSale)
    setSelectedSaleId({getState, setState}: StateContext<SaleStateModel>, {payload}: SetSelectedSale) {
        const state = getState();
        setState({
            ...state,
            selectedSale: payload,
        });
    }

}

