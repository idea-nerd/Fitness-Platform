import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Equipment } from '../models/equipments.model';
import { CreateEquipment, ReadEquipment, ReadSelectedEquipment, UpdateEquipment, DeleteEquipment, SetSelectedEquipment, UpdateEquipmentImage } from './../actions/equipment.actions';
import { EquipmentService } from '../services/equipments/equipment.service';
import {tap} from 'rxjs/operators';

export class EquipmentStateModel {
    equipments: Equipment[];
    selectedEquipmentInstance: Equipment[];
    selectedAuthenticatedEquipmentInstance: Equipment[];
    selectedEquipment: Equipment;
}

@State<EquipmentStateModel>({
    name: 'equipments',
    defaults: {
        equipments: [],
        selectedEquipmentInstance: [],
        selectedAuthenticatedEquipmentInstance: [],
        selectedEquipment: null,
    },
})

export class EquipmentState {

    constructor(private equipmentService: EquipmentService) { }

    @Selector()
    static getEquipments(state: EquipmentStateModel) {
        return state.equipments;
    }

    @Selector()
    static getSelectedEquipment(state: EquipmentStateModel) {
        return state.selectedEquipment;
    }

    @Selector()
    static getSelectedEquipmentInstance(state: EquipmentStateModel) {
        return state.selectedEquipmentInstance;
    }

    @Selector()
    static getAuthenticatedEquipmentInstance(state: EquipmentStateModel) {
        return state.selectedAuthenticatedEquipmentInstance;
    }

    @Action(CreateEquipment)
    createEquipment({getState, patchState}: StateContext<EquipmentStateModel>, { payload }: CreateEquipment) {
        return this.equipmentService.create(payload).pipe(tap((result) => {
            const state = getState();
            patchState({
                equipments: [...state.equipments, result],
            });
        }));

    }

    @Action(ReadEquipment)
    readEquipment({getState, setState}: StateContext<EquipmentStateModel>) {
        return this.equipmentService.read().pipe(tap((result) => {
            const state = getState();
            setState({
                ...state,
                equipments: result,
            });
        }));

    }

    @Action(ReadSelectedEquipment)
    readSelectedEquipment({getState, setState}: StateContext<EquipmentStateModel>, { id }: ReadSelectedEquipment ) {
        return this.equipmentService.readSelected(id).pipe(tap((result) => {
            const state = getState();
            setState({
                ...state,
                selectedEquipmentInstance: result,
            });
        }));

    }

    @Action(UpdateEquipment)
    updateEquipment({getState, setState}: StateContext<EquipmentStateModel>, { payload, id }: UpdateEquipment) {
        return this.equipmentService.update(payload, id).pipe(tap((result) => {
            const state = getState();
            const equipmentList = [...state.equipments];
            const equipmentIndex = equipmentList.findIndex(item => item.id === id);
            equipmentList[equipmentIndex] = result;
            setState({
                ...state,
                equipments: equipmentList,
            });
        }));
    }

    @Action(UpdateEquipmentImage)
    updateEquipmentImage({getState, setState}: StateContext<EquipmentStateModel>, { payload, id }: UpdateEquipmentImage) {
        return this.equipmentService.updateEquipmentImage(payload, id).pipe(tap((result) => {
            const state = getState();
            const equipmentList = [...state.equipments];
            const equipmentIndex = equipmentList.findIndex(item => item.id === id);
            equipmentList[equipmentIndex] = result;
            setState({
                ...state,
                equipments: equipmentList,
            });
        }));
    }

    @Action(DeleteEquipment)
    deleteEquipment({getState, setState}: StateContext<EquipmentStateModel>, { id }: DeleteEquipment) {
        return this.equipmentService.delete(id).pipe(tap((result) => {
            const state = getState();
            const equipmentList = [...state.equipments];
            const equipmentIndex = equipmentList.findIndex(item => item.id === id);
            equipmentList[equipmentIndex] = result;
            setState({
                ...state,
                equipments: equipmentList,
            });
        }));
    }

    @Action(SetSelectedEquipment)
    setSelectedEquipmentId({getState, setState}: StateContext<EquipmentStateModel>, {payload}: SetSelectedEquipment) {
        const state = getState();
        setState({
            ...state,
            selectedEquipment: payload,
        });
    }

}

