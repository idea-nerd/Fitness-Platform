import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Attendance } from '../models/attendance.model';
import { CreateAttendance, ReadAttendance, ReadSelectedAttendance, UpdateAttendance, DeleteAttendance, SetSelectedAttendance } from './../actions/attendance.actions';
import { AttendanceService } from '../services/attendance/attendance.service';
import {tap} from 'rxjs/operators';

export class AttendanceStateModel {
    attendance: Attendance[];
    selectedAttendanceInstance: Attendance[];
    selectedAttendance: Attendance;
}

@State<AttendanceStateModel>({
    name: 'attendance',
    defaults: {
        attendance: [],
        selectedAttendanceInstance: [],
        selectedAttendance: null,
    },
})

export class AttendanceState {

    constructor(private attendanceService: AttendanceService) { }

    @Selector()
    static getAttendances(state: AttendanceStateModel) {
        return state.attendance;
    }

    @Selector()
    static getSelectedAttendance(state: AttendanceStateModel) {
        return state.selectedAttendance;
    }

    @Selector()
    static getSelectedAttendanceInstance(state: AttendanceStateModel) {
        return state.selectedAttendanceInstance;
    }

    @Action(CreateAttendance)
    createAttendance({getState, patchState}: StateContext<AttendanceStateModel>, { payload }: CreateAttendance) {
        return this.attendanceService.create(payload).pipe(tap((result) => {
            console.log('req resul', result);
            const state = getState();
            patchState({
                attendance: [...state.attendance, result],
            });
        }));

    }

    @Action(ReadAttendance)
    readAttendance({getState, setState}: StateContext<AttendanceStateModel>) {
        return this.attendanceService.read().pipe(tap((result) => {
            const state = getState();
            setState({
                ...state,
                attendance: result,
            });
        }));

    }

    @Action(ReadSelectedAttendance)
    readSelectedAttendance({getState, setState}: StateContext<AttendanceStateModel>, { id }: ReadSelectedAttendance ) {
        return this.attendanceService.readSelected(id).pipe(tap((result) => {
            const state = getState();
            setState({
                ...state,
                selectedAttendanceInstance: result,
            });
        }));

    }

    @Action(UpdateAttendance)
    updateAttendance({getState, setState}: StateContext<AttendanceStateModel>, { payload, id }: UpdateAttendance) {
        return this.attendanceService.update(payload, id).pipe(tap((result) => {
            const state = getState();
            const expenseList = [...state.attendance];
            const expenseIndex = expenseList.findIndex(item => item.id === id);
            expenseList[expenseIndex] = result;
            setState({
                ...state,
                attendance: expenseList,
            });
        }));
    }

    @Action(DeleteAttendance)
    deleteAttendance({getState, setState}: StateContext<AttendanceStateModel>, { id }: DeleteAttendance) {
        return this.attendanceService.delete(id).pipe(tap((result) => {
            const state = getState();
            const expenseList = [...state.attendance];
            const expenseIndex = expenseList.findIndex(item => item.id === id);
            expenseList[expenseIndex] = result;
            setState({
                ...state,
                attendance: expenseList,
            });
        }));
    }

    @Action(SetSelectedAttendance)
    setSelectedAttendanceId({getState, setState}: StateContext<AttendanceStateModel>, {payload}: SetSelectedAttendance) {
        const state = getState();
        setState({
            ...state,
            selectedAttendance: payload,
        });
    }

}

