import { State, Action, StateContext, Selector } from '@ngxs/store';
import { User } from '../models/users.model';
import { CreateUser, ReadUser, ReadAuthenticatedUser, ReadSelectedUser, UpdateUser, UpdateUserImage, DeleteUser, SetSelectedUser, ReadTrainers } from './../actions/user.actions';
import { UserService } from '../services/users/user.service';
import {tap} from 'rxjs/operators';

export class UserStateModel {
    users: User[];
    trainers: User[];
    selectedUserInstance: User[];
    selectedAuthenticatedUserInstance: User[];
    selectedUser: User;
}

@State<UserStateModel>({
    name: 'users',
    defaults: {
        users: [],
        trainers: [],
        selectedUserInstance: [],
        selectedAuthenticatedUserInstance: [],
        selectedUser: null,
    },
})

export class UserState {

    constructor(private userService: UserService) { }

    @Selector()
    static getUsers(state: UserStateModel) {
        return state.users;
    }

    @Selector()
    static getTrainers(state: UserStateModel) {
        return state.trainers;
    }

    @Selector()
    static getSelectedUser(state: UserStateModel) {
        return state.selectedUser;
    }

    @Selector()
    static getSelectedUserInstance(state: UserStateModel) {
        return state.selectedUserInstance;
    }

    @Selector()
    static getAuthenticatedUserInstance(state: UserStateModel) {
        return state.selectedAuthenticatedUserInstance;
    }

    @Action(CreateUser)
    createUser({getState, patchState}: StateContext<UserStateModel>, { payload }: CreateUser) {
        return this.userService.create(payload).pipe(tap((result) => {
            const state = getState();
            patchState({
                users: [...state.users, result],
            });
        }));

    }

    @Action(ReadUser)
    readUser({getState, setState}: StateContext<UserStateModel>) {
        return this.userService.read().pipe(tap((result) => {
            const state = getState();
            setState({
                ...state,
                users: result,
            });
        }));

    }

    @Action(ReadTrainers)
    readTrainers({getState, setState}: StateContext<UserStateModel>) {
        return this.userService.readTrainers().pipe(tap((result) => {
            const state = getState();
            setState({
                ...state,
                trainers: result,
            });
        }));

    }

    @Action(ReadSelectedUser)
    readSelectedUser({getState, setState}: StateContext<UserStateModel>, { id }: ReadSelectedUser ) {
        return this.userService.readSelected(id).pipe(tap((result) => {
            const state = getState();
            setState({
                ...state,
                selectedUserInstance: result,
            });
        }));

    }

    @Action(ReadAuthenticatedUser)
    ReadAuthenticatedUser({getState, setState}: StateContext<UserStateModel>, { id }: ReadAuthenticatedUser ) {
        return this.userService.readSelected(id).pipe(tap((result) => {
            const state = getState();
            setState({
                ...state,
                selectedAuthenticatedUserInstance: result,
            });
        }));

    }

    @Action(UpdateUser)
    updateUser({getState, setState}: StateContext<UserStateModel>, { payload, id }: UpdateUser) {
        return this.userService.update(payload, id).pipe(tap((result) => {
            const state = getState();
            const userList = [...state.users];
            const userIndex = userList.findIndex(item => item.id === id);
            userList[userIndex] = result;
            setState({
                ...state,
                users: userList,
            });
        }));
    }

    @Action(UpdateUserImage)
    updateUserImage({getState, setState}: StateContext<UserStateModel>, { payload, id }: UpdateUserImage) {
        return this.userService.updateUserImage(payload, id).pipe(tap((result) => {
            const state = getState();
            const userList = [...state.users];
            const userIndex = userList.findIndex(item => item.id === id);
            userList[userIndex] = result;
            setState({
                ...state,
                users: userList,
            });
        }));
    }

    @Action(DeleteUser)
    deleteUser({getState, setState}: StateContext<UserStateModel>, {id }: DeleteUser) {
        return this.userService.delete(id).pipe(tap((result) => {
            const state = getState();
            const userList = [...state.users];
            const userIndex = userList.findIndex(item => item.id === id);
            userList[userIndex] = result;
            setState({
                ...state,
                users: userList,
            });
        }));
    }

    @Action(SetSelectedUser)
    setSelectedUserId({getState, setState}: StateContext<UserStateModel>, {payload}: SetSelectedUser) {
        const state = getState();
        setState({
            ...state,
            selectedUser: payload,
        });
    }

}

