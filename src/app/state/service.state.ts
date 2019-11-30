import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Service } from '../models/services.model';
import { CreateService, ReadService, ReadSelectedService, UpdateService, DeleteService, SetSelectedService } from './../actions/service.actions';
import { ServicesService } from '../services/services/services.service';
import {tap} from 'rxjs/operators';

export class ServiceStateModel {
    services: Service[];
    selectedServiceInstance: Service[];
    selectedService: Service;
}

@State<ServiceStateModel>({
    name: 'services',
    defaults: {
        services: [],
        selectedServiceInstance: [],
        selectedService: null,
    },
})

export class ServiceState {

    constructor(private serviceService: ServicesService) { }

    @Selector()
    static getServices(state: ServiceStateModel) {
        return state.services;
    }

    @Selector()
    static getSelectedService(state: ServiceStateModel) {
        return state.selectedService;
    }

    @Selector()
    static getSelectedServiceInstance(state: ServiceStateModel) {
        return state.selectedServiceInstance;
    }

    @Action(CreateService)
    createService({getState, patchState}: StateContext<ServiceStateModel>, { payload }: CreateService) {
        return this.serviceService.create(payload).pipe(tap((result) => {
            console.log('req resul', result);
            const state = getState();
            patchState({
                services: [...state.services, result],
            });
        }));

    }

    @Action(ReadService)
    readService({getState, setState}: StateContext<ServiceStateModel>) {
        return this.serviceService.read().pipe(tap((result) => {
            const state = getState();
            setState({
                ...state,
                services: result,
            });
        }));

    }

    @Action(ReadSelectedService)
    readSelectedService({getState, setState}: StateContext<ServiceStateModel>, { id }: ReadSelectedService ) {
        return this.serviceService.readSelected(id).pipe(tap((result) => {
            const state = getState();
            setState({
                ...state,
                selectedServiceInstance: result,
            });
        }));

    }

    @Action(UpdateService)
    updateService({getState, setState}: StateContext<ServiceStateModel>, { payload, id }: UpdateService) {
        return this.serviceService.update(payload, id).pipe(tap((result) => {
            const state = getState();
            const serviceList = [...state.services];
            const serviceIndex = serviceList.findIndex(item => item.id === id);
            serviceList[serviceIndex] = result;
            setState({
                ...state,
                services: serviceList,
            });
        }));
    }

    @Action(DeleteService)
    deleteService({getState, setState}: StateContext<ServiceStateModel>, { id }: DeleteService) {
        return this.serviceService.delete(id).pipe(tap((result) => {
            const state = getState();
            const serviceList = [...state.services];
            const serviceIndex = serviceList.findIndex(item => item.id === id);
            serviceList[serviceIndex] = result;
            setState({
                ...state,
                services: serviceList,
            });
        }));
    }

    @Action(SetSelectedService)
    setSelectedServiceId({getState, setState}: StateContext<ServiceStateModel>, {payload}: SetSelectedService) {
        const state = getState();
        setState({
            ...state,
            selectedService: payload,
        });
    }

}

