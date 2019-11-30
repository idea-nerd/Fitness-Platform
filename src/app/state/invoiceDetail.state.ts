import { State, Action, StateContext, Selector } from '@ngxs/store';
import { InvoiceDetail } from '../models/invoiceDetail.model';
import { CreateInvoiceDetail, ReadInvoiceDetail, ReadSelectedInvoiceDetail, UpdateInvoiceDetail, DeleteInvoiceDetail, SetSelectedInvoiceDetail } from '../actions/invoiceDetail.actions';
import { InvoiceDetailService } from '../services/invoiceDetails/invoice-detail.service';
import {tap} from 'rxjs/operators';

export class InvoiceDetailStateModel {
    invoiceDetails: InvoiceDetail[];
    selectedInvoiceDetailInstance: InvoiceDetail[];
    selectedInvoiceDetail: InvoiceDetail;
}

@State<InvoiceDetailStateModel>({
    name: 'invoiceDetails',
    defaults: {
        invoiceDetails: [],
        selectedInvoiceDetailInstance: [],
        selectedInvoiceDetail: null,
    },
})

export class InvoiceDetailState {

    constructor(private invoiceDetailService: InvoiceDetailService) { }

    @Selector()
    static getInvoiceDetails(state: InvoiceDetailStateModel) {
        return state.invoiceDetails;
    }

    @Selector()
    static getSelectedInvoiceDetail(state: InvoiceDetailStateModel) {
        return state.selectedInvoiceDetail;
    }

    @Selector()
    static getSelectedInvoiceDetailInstance(state: InvoiceDetailStateModel) {
        return state.selectedInvoiceDetailInstance;
    }

    @Action(CreateInvoiceDetail)
    createInvoiceDetail({getState, patchState}: StateContext<InvoiceDetailStateModel>, { payload }: CreateInvoiceDetail) {
        return this.invoiceDetailService.create(payload).pipe(tap((result) => {
            const state = getState();
            patchState({
                invoiceDetails: [...state.invoiceDetails, result],
            });
        }));

    }

    @Action(ReadInvoiceDetail)
    readInvoiceDetail({getState, setState}: StateContext<InvoiceDetailStateModel>) {
        return this.invoiceDetailService.read().pipe(tap((result) => {
            const state = getState();
            setState({
                ...state,
                invoiceDetails: result,
            });
        }));

    }

    @Action(ReadSelectedInvoiceDetail)
    readSelectedInvoiceDetail({getState, setState}: StateContext<InvoiceDetailStateModel>, { id }: ReadSelectedInvoiceDetail ) {
        return this.invoiceDetailService.readSelected(id).pipe(tap((result) => {
            const state = getState();
            setState({
                ...state,
                selectedInvoiceDetailInstance: result,
            });
        }));

    }

    @Action(UpdateInvoiceDetail)
    updateInvoiceDetail({getState, setState}: StateContext<InvoiceDetailStateModel>, { payload, id }: UpdateInvoiceDetail) {
        return this.invoiceDetailService.update(payload, id).pipe(tap((result) => {
            const state = getState();
            const invoiceDetailList = [...state.invoiceDetails];
            const invoiceDetailIndex = invoiceDetailList.findIndex(item => item.id === id);
            invoiceDetailList[invoiceDetailIndex] = result;
            setState({
                ...state,
                invoiceDetails: invoiceDetailList,
            });
        }));
    }

    @Action(DeleteInvoiceDetail)
    deleteInvoiceDetail({getState, setState}: StateContext<InvoiceDetailStateModel>, { payload, id }: DeleteInvoiceDetail) {
        return this.invoiceDetailService.delete(payload, id).pipe(tap((result) => {
            const state = getState();
            const invoiceDetailList = [...state.invoiceDetails];
            const invoiceDetailIndex = invoiceDetailList.findIndex(item => item.id === id);
            invoiceDetailList[invoiceDetailIndex] = result;
            setState({
                ...state,
                invoiceDetails: invoiceDetailList,
            });
        }));
    }

    @Action(SetSelectedInvoiceDetail)
    setSelectedInvoiceDetailId({getState, setState}: StateContext<InvoiceDetailStateModel>, {payload}: SetSelectedInvoiceDetail) {
        const state = getState();
        setState({
            ...state,
            selectedInvoiceDetail: payload,
        });
    }

}

