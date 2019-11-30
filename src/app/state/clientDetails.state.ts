import { State, Action, StateContext, Selector } from '@ngxs/store';
import { ClientDetails } from '../models/clientDetails.model';
import { CreateClientDetails, ReadClientDetails, ReadSelectedClientDetails, UpdateClientDetails, DeleteClientDetails, SetSelectedClientDetails, ReadSelectedDetails } from '../actions/clientDetails.actions';
import { ClientDetailsService } from '../services/clients/measurementDetails/client-details.service';
import {tap} from 'rxjs/operators';

export class ClientDetailStateModel {
    clientDetails: ClientDetails[];
    selectedClientDetailInstance: ClientDetails[];
    selectedClientDetails: ClientDetails[];
}

@State<ClientDetailStateModel>({
    name: 'clientDetails',
    defaults: {
        clientDetails: [],
        selectedClientDetailInstance: [],
        selectedClientDetails: [],
    },
})

export class ClientDetailState {

    constructor(private clientDetailSerivce: ClientDetailsService) { }

    @Selector()
    static getClientDetails(state: ClientDetailStateModel) {
        return state.clientDetails;
    }

    @Selector()
    static getSelectedClientDetails(state: ClientDetailStateModel) {
        return state.selectedClientDetails;
    }

    @Selector()
    static getSelectedClientDetailInstance(state: ClientDetailStateModel) {
        return state.selectedClientDetailInstance;
    }

    @Action(CreateClientDetails)
    createClientDetail({getState, patchState}: StateContext<ClientDetailStateModel>, { payload }: CreateClientDetails) {
        return this.clientDetailSerivce.create(payload).pipe(tap((result) => {
            console.log('req resul', result);
            const state = getState();
            patchState({
                clientDetails: [...state.clientDetails, result],
            });
        }));

    }

    @Action(ReadClientDetails)
    readClientDetail({getState, setState}: StateContext<ClientDetailStateModel>) {
        return this.clientDetailSerivce.read().pipe(tap((result) => {
            const state = getState();
            setState({
                ...state,
                clientDetails: result,
            });
        }));

    }

    @Action(ReadSelectedClientDetails)
    readSelectedClientDetail({getState, setState}: StateContext<ClientDetailStateModel>, { id }: ReadSelectedClientDetails ) {
        return this.clientDetailSerivce.readSelected(id).pipe(tap((result) => {
            const state = getState();
            setState({
                ...state,
                selectedClientDetails: result,
            });
        }));
    }

    @Action(ReadSelectedDetails)
    readSelectedDetail({getState, setState}: StateContext<ClientDetailStateModel>, { id }: ReadSelectedDetails ) {
        return this.clientDetailSerivce.readSelectedDetails(id).pipe(tap((result) => {
            const state = getState();
            setState({
                ...state,
                selectedClientDetailInstance: result,
            });
        }));
    }

    @Action(UpdateClientDetails)
    updateClientDetail({getState, setState}: StateContext<ClientDetailStateModel>, { payload, id }: UpdateClientDetails) {
        return this.clientDetailSerivce.update(payload, id).pipe(tap((result) => {
            const state = getState();
            const clientDetailList = [...state.clientDetails];
            const clientDetailIndex = clientDetailList.findIndex(item => item.id === id);
            clientDetailList[clientDetailIndex] = result;
            setState({
                ...state,
                clientDetails: clientDetailList,
            });
        }));
    }

    @Action(DeleteClientDetails)
    deleteClientDetail({getState, setState}: StateContext<ClientDetailStateModel>, { id }: DeleteClientDetails) {
        return this.clientDetailSerivce.delete(id).pipe(tap((result) => {
            const state = getState();
            const clientDetailList = [...state.clientDetails];
            const clientDetailIndex = clientDetailList.findIndex(item => item.id === id);
            clientDetailList[clientDetailIndex] = result;
            setState({
                ...state,
                clientDetails: clientDetailList,
            });
        }));
    }

}

