import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Client } from '../models/clients.model';
import { CreateClient, ReadClient, ReadSelectedClient, UpdateClient, DeleteClient, SetSelectedClient, UpdateClientImage, ReadAppointmentClient, ReadTrainersClients, ReadExpiredClient } from './../actions/client.actions';
import { ClientService } from '../services/clients/registration/client.service';
import {tap} from 'rxjs/operators';

export class ClientStateModel {
    clients: Client[];
    selectedClientInstance: Client[];
    selectedAuthenticatedClientInstance: Client[];
    appointmentClients: Client[];
    trainersClients: Client[];
    expiredClients: Client[];
    selectedClient: Client;
}

@State<ClientStateModel>({
    name: 'clients',
    defaults: {
        clients: [],
        selectedClientInstance: [],
        selectedAuthenticatedClientInstance: [],
        appointmentClients: [],
        trainersClients: [],
        expiredClients: [],
        selectedClient: null,
    },
})

export class ClientState {

    constructor(private clientService: ClientService) { }

    @Selector()
    static getClients(state: ClientStateModel) {
        return state.clients;
    }

    @Selector()
    static getSelectedClient(state: ClientStateModel) {
        return state.selectedClient;
    }

    @Selector()
    static getSelectedClientInstance(state: ClientStateModel) {
        return state.selectedClientInstance;
    }

    @Selector()
    static getAppointmentClientInstance(state: ClientStateModel) {
        return state.appointmentClients;
    }

    @Selector()
    static getExpiredClientInstance(state: ClientStateModel) {
        return state.expiredClients;
    }

    @Selector()
    static getTrainersClients(state: ClientStateModel) {
        return state.trainersClients;
    }

    @Selector()
    static getAuthenticatedClientInstance(state: ClientStateModel) {
        return state.selectedAuthenticatedClientInstance;
    }

    @Action(CreateClient)
    createClient({getState, patchState}: StateContext<ClientStateModel>, { payload }: CreateClient) {
        return this.clientService.create(payload).pipe(tap((result) => {
            const state = getState();
            patchState({
                clients: [...state.clients, result],
            });
        }));

    }

    @Action(ReadClient)
    readClient({getState, setState}: StateContext<ClientStateModel>) {
        return this.clientService.read().pipe(tap((result) => {
            const state = getState();
            setState({
                ...state,
                clients: result,
            });
        }));

    }

    @Action(ReadSelectedClient)
    readSelectedClient({getState, setState}: StateContext<ClientStateModel>, { id }: ReadSelectedClient ) {
        return this.clientService.readSelected(id).pipe(tap((result) => {
            const state = getState();
            setState({
                ...state,
                selectedClientInstance: result,
            });
        }));

    }

    @Action(ReadAppointmentClient)
    readAppointmentClient({getState, setState}: StateContext<ClientStateModel>) {
        return this.clientService.readAppointment().pipe(tap((result) => {
            const state = getState();
            setState({
                ...state,
                appointmentClients: result,
            });
        }));

    }

    @Action(ReadExpiredClient)
    readExpiredClient({getState, setState}: StateContext<ClientStateModel>) {
        return this.clientService.readExpired().pipe(tap((result) => {
            const state = getState();
            setState({
                ...state,
                expiredClients: result,
            });
        }));

    }

    @Action(ReadTrainersClients)
    readTrainersClients({getState, setState}: StateContext<ClientStateModel>) {
        return this.clientService.readTrainersClients().pipe(tap((result) => {
            const state = getState();
            setState({
                ...state,
                trainersClients: result,
            });
        }));

    }

    @Action(UpdateClient)
    updateClient({getState, setState}: StateContext<ClientStateModel>, { payload, id }: UpdateClient) {
        return this.clientService.update(payload, id).pipe(tap((result) => {
            const state = getState();
            const clientList = [...state.clients];
            const clientIndex = clientList.findIndex(item => item.id === id);
            clientList[clientIndex] = result;
            setState({
                ...state,
                clients: clientList,
            });
        }));
    }

    @Action(UpdateClientImage)
    updateClientImage({getState, setState}: StateContext<ClientStateModel>, { payload, id }: UpdateClientImage) {
        return this.clientService.updateClientImage(payload, id).pipe(tap((result) => {
            const state = getState();
            const clientList = [...state.clients];
            const clientIndex = clientList.findIndex(item => item.id === id);
            clientList[clientIndex] = result;
            setState({
                ...state,
                clients: clientList,
            });
        }));
    }

    @Action(DeleteClient)
    deleteClient({getState, setState}: StateContext<ClientStateModel>, { id }: DeleteClient) {
        return this.clientService.delete(id).pipe(tap((result) => {
            const state = getState();
            const clientList = [...state.clients];
            const clientIndex = clientList.findIndex(item => item.id === id);
            clientList[clientIndex] = result;
            setState({
                ...state,
                clients: clientList,
            });
        }));
    }

    @Action(SetSelectedClient)
    setSelectedClientId({getState, setState}: StateContext<ClientStateModel>, {payload}: SetSelectedClient) {
        const state = getState();
        setState({
            ...state,
            selectedClient: payload,
        });
    }

}

