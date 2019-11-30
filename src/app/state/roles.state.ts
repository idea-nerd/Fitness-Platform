import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Roles } from '../models/roles.model';
import { CreateRole, ReadRole, ReadSelectedRole, UpdateRole, DeleteRole, SetSelectedRole } from './../actions/role.actions';
import { RolesService } from '../services/roles/roles.service';
import {tap} from 'rxjs/operators';

export class RoleStateModel {
    roles: Roles[];
    selectedRoleInstance: Roles[];
    selectedRole: Roles;
}

@State<RoleStateModel>({
    name: 'roles',
    defaults: {
        roles: [],
        selectedRoleInstance: [],
        selectedRole: null,
    },
})

export class RoleState {

    constructor(private roleService: RolesService) { }

    @Selector()
    static getRoles(state: RoleStateModel) {
        return state.roles;
    }

    @Selector()
    static getSelectedRole(state: RoleStateModel) {
        return state.selectedRole;
    }

    @Selector()
    static getSelectedRoleInstance(state: RoleStateModel) {
        return state.selectedRoleInstance;
    }

    @Action(CreateRole)
    createRole({getState, patchState}: StateContext<RoleStateModel>, { payload }: CreateRole) {
        return this.roleService.create(payload).pipe(tap((result) => {
            const state = getState();
            patchState({
                roles: [...state.roles, result],
            });
        }));

    }

    @Action(ReadRole)
    readRole({getState, setState}: StateContext<RoleStateModel>) {
        return this.roleService.read().pipe(tap((result) => {
            const state = getState();
            setState({
                ...state,
                roles: result,
            });
        }));

    }

    @Action(ReadSelectedRole)
    readSelectedRole({getState, setState}: StateContext<RoleStateModel>, { id }: ReadSelectedRole ) {
        return this.roleService.readSelected(id).pipe(tap((result) => {
            const state = getState();
            setState({
                ...state,
                selectedRoleInstance: result,
            });
        }));

    }

    @Action(UpdateRole)
    updateRole({getState, setState}: StateContext<RoleStateModel>, { payload, id }: UpdateRole) {
        return this.roleService.update(payload, id).pipe(tap((result) => {
            const state = getState();
            const roleList = [...state.roles];
            const roleIndex = roleList.findIndex(item => item.id === id);
            roleList[roleIndex] = result;
            setState({
                ...state,
                roles: roleList,
            });
        }));
    }

    @Action(DeleteRole)
    deleteRole({getState, setState}: StateContext<RoleStateModel>, { payload, id }: DeleteRole) {
        return this.roleService.delete(payload, id).pipe(tap((result) => {
            const state = getState();
            const roleList = [...state.roles];
            const roleIndex = roleList.findIndex(item => item.id === id);
            roleList[roleIndex] = result;
            setState({
                ...state,
                roles: roleList,
            });
        }));
    }

    @Action(SetSelectedRole)
    setSelectedRoleId({getState, setState}: StateContext<RoleStateModel>, {payload}: SetSelectedRole) {
        const state = getState();
        setState({
            ...state,
            selectedRole: payload,
        });
    }

}

