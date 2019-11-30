import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Appointment } from '../models/appointments.model';
import { CreateAppointment, ReadAppointment, ReadSelectedAppointment, UpdateAppointment, DeleteAppointment, SetSelectedAppointment, UpdateAppointmentImage } from '../actions/appointment.actions';
import { AppointmentService } from '../services/appointments/appointments.service';
import {tap} from 'rxjs/operators';

export class AppointmentStateModel {
    appointments: Appointment[];
    selectedAppointmentInstance: Appointment[];
    selectedAuthenticatedAppointmentInstance: Appointment[];
    selectedAppointment: Appointment;
}

@State<AppointmentStateModel>({
    name: 'appointments',
    defaults: {
        appointments: [],
        selectedAppointmentInstance: [],
        selectedAuthenticatedAppointmentInstance: [],
        selectedAppointment: null,
    },
})

export class AppointmentState {

    constructor(private appointmentService: AppointmentService) { }

    @Selector()
    static getAppointments(state: AppointmentStateModel) {
        return state.appointments;
    }

    @Selector()
    static getSelectedAppointment(state: AppointmentStateModel) {
        return state.selectedAppointment;
    }

    @Selector()
    static getSelectedAppointmentInstance(state: AppointmentStateModel) {
        return state.selectedAppointmentInstance;
    }

    @Selector()
    static getAuthenticatedAppointmentInstance(state: AppointmentStateModel) {
        return state.selectedAuthenticatedAppointmentInstance;
    }

    @Action(CreateAppointment)
    createAppointment({getState, patchState}: StateContext<AppointmentStateModel>, { payload }: CreateAppointment) {
        return this.appointmentService.create(payload).pipe(tap((result) => {
            const state = getState();
            patchState({
                appointments: [...state.appointments, result],
            });
        }));

    }

    @Action(ReadAppointment)
    readAppointment({getState, setState}: StateContext<AppointmentStateModel>) {
        return this.appointmentService.read().pipe(tap((result) => {
            const state = getState();
            setState({
                ...state,
                appointments: result,
            });
        }));

    }

    @Action(ReadSelectedAppointment)
    readSelectedAppointment({getState, setState}: StateContext<AppointmentStateModel>, { id }: ReadSelectedAppointment ) {
        return this.appointmentService.readSelected(id).pipe(tap((result) => {
            const state = getState();
            setState({
                ...state,
                selectedAppointmentInstance: result,
            });
        }));

    }

    @Action(UpdateAppointment)
    updateAppointment({getState, setState}: StateContext<AppointmentStateModel>, { payload, id }: UpdateAppointment) {
        return this.appointmentService.update(payload, id).pipe(tap((result) => {
            const state = getState();
            const appointmentList = [...state.appointments];
            const appointmentIndex = appointmentList.findIndex(item => item.id === id);
            appointmentList[appointmentIndex] = result;
            setState({
                ...state,
                appointments: appointmentList,
            });
        }));
    }

    @Action(DeleteAppointment)
    deleteAppointment({getState, setState}: StateContext<AppointmentStateModel>, { id }: DeleteAppointment) {
        return this.appointmentService.delete(id).pipe(tap((result) => {
            const state = getState();
            const appointmentList = [...state.appointments];
            const appointmentIndex = appointmentList.findIndex(item => item.id === id);
            appointmentList[appointmentIndex] = result;
            setState({
                ...state,
                appointments: appointmentList,
            });
        }));
    }

    @Action(SetSelectedAppointment)
    setSelectedAppointmentId({getState, setState}: StateContext<AppointmentStateModel>, {payload}: SetSelectedAppointment) {
        const state = getState();
        setState({
            ...state,
            selectedAppointment: payload,
        });
    }

}

