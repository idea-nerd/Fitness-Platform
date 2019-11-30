import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Invoice } from '../models/invoices.model';
import { CreateInvoice, ReadInvoice, ReadSelectedInvoice, UpdateInvoice, DeleteInvoice, SetSelectedInvoice } from '../actions/invoice.actions';
import { InvoiceService } from '../services/invoices/invoice.service';
import {tap} from 'rxjs/operators';

export class InvoiceStateModel {
    invoices: Invoice[];
    selectedInvoiceInstance: Invoice[];
    selectedInvoice: Invoice;
}

@State<InvoiceStateModel>({
    name: 'invoices',
    defaults: {
        invoices: [],
        selectedInvoiceInstance: [],
        selectedInvoice: null,
    },
})

export class InvoiceState {

    constructor(private invoiceService: InvoiceService) { }

    @Selector()
    static getInvoices(state: InvoiceStateModel) {
        return state.invoices;
    }

    @Selector()
    static getSelectedInvoice(state: InvoiceStateModel) {
        return state.selectedInvoice;
    }

    @Selector()
    static getSelectedInvoiceInstance(state: InvoiceStateModel) {
        return state.selectedInvoiceInstance;
    }

    @Action(CreateInvoice)
    createInvoice({getState, patchState}: StateContext<InvoiceStateModel>, { payload }: CreateInvoice) {
        return this.invoiceService.create(payload).pipe(tap((result) => {
            const state = getState();
            patchState({
                invoices: [...state.invoices, result],
            });
        }));

    }

    @Action(ReadInvoice)
    readInvoice({getState, setState}: StateContext<InvoiceStateModel>) {
        return this.invoiceService.read().pipe(tap((result) => {
            const state = getState();
            setState({
                ...state,
                invoices: result,
            });
        }));

    }

    @Action(ReadSelectedInvoice)
    readSelectedInvoice({getState, setState}: StateContext<InvoiceStateModel>, { id }: ReadSelectedInvoice ) {
        return this.invoiceService.readSelected(id).pipe(tap((result) => {
            const state = getState();
            setState({
                ...state,
                selectedInvoiceInstance: result,
            });
        }));

    }

    @Action(UpdateInvoice)
    updateInvoice({getState, setState}: StateContext<InvoiceStateModel>, { payload, id }: UpdateInvoice) {
        return this.invoiceService.update(payload, id).pipe(tap((result) => {
            const state = getState();
            const invoiceList = [...state.invoices];
            const invoiceIndex = invoiceList.findIndex(item => item.id === id);
            invoiceList[invoiceIndex] = result;
            setState({
                ...state,
                invoices: invoiceList,
            });
        }));
    }

    @Action(DeleteInvoice)
    deleteInvoice({getState, setState}: StateContext<InvoiceStateModel>, { payload, id }: DeleteInvoice) {
        return this.invoiceService.delete(payload, id).pipe(tap((result) => {
            const state = getState();
            const invoiceList = [...state.invoices];
            const invoiceIndex = invoiceList.findIndex(item => item.id === id);
            invoiceList[invoiceIndex] = result;
            setState({
                ...state,
                invoices: invoiceList,
            });
        }));
    }

    @Action(SetSelectedInvoice)
    setSelectedInvoiceId({getState, setState}: StateContext<InvoiceStateModel>, {payload}: SetSelectedInvoice) {
        const state = getState();
        setState({
            ...state,
            selectedInvoice: payload,
        });
    }

}

