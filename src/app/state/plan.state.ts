import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Plan } from '../models/plans.model';
import { CreatePlan, ReadPlan, ReadSelectedPlan, UpdatePlan, DeletePlan, SetSelectedPlan } from './../actions/plan.actions';
import { PlanService } from '../services/plans/plans.service';
import {tap} from 'rxjs/operators';

export class PlanStateModel {
    plans: Plan[];
    selectedPlanInstance: Plan[];
    selectedPlan: Plan;
}

@State<PlanStateModel>({
    name: 'plans',
    defaults: {
        plans: [],
        selectedPlanInstance: [],
        selectedPlan: null,
    },
})

export class PlanState {

    constructor(private planService: PlanService) { }

    @Selector()
    static getPlans(state: PlanStateModel) {
        return state.plans;
    }

    @Selector()
    static getSelectedPlan(state: PlanStateModel) {
        return state.selectedPlan;
    }

    @Selector()
    static getSelectedPlanInstance(state: PlanStateModel) {
        return state.selectedPlanInstance;
    }

    @Action(CreatePlan)
    createPlan({getState, patchState}: StateContext<PlanStateModel>, { payload }: CreatePlan) {
        return this.planService.create(payload).pipe(tap((result) => {
            console.log('req resul', result);
            const state = getState();
            patchState({
                plans: [...state.plans, result],
            });
        }));

    }

    @Action(ReadPlan)
    readPlan({getState, setState}: StateContext<PlanStateModel>) {
        return this.planService.read().pipe(tap((result) => {
            const state = getState();
            setState({
                ...state,
                plans: result,
            });
        }));

    }

    @Action(ReadSelectedPlan)
    readSelectedPlan({getState, setState}: StateContext<PlanStateModel>, { id }: ReadSelectedPlan ) {
        return this.planService.readSelected(id).pipe(tap((result) => {
            const state = getState();
            setState({
                ...state,
                selectedPlanInstance: result,
            });
        }));

    }

    @Action(UpdatePlan)
    updatePlan({getState, setState}: StateContext<PlanStateModel>, { payload, id }: UpdatePlan) {
        return this.planService.update(payload, id).pipe(tap((result) => {
            const state = getState();
            const planList = [...state.plans];
            const planIndex = planList.findIndex(item => item.id === id);
            planList[planIndex] = result;
            setState({
                ...state,
                plans: planList,
            });
        }));
    }

    @Action(DeletePlan)
    deletePlan({getState, setState}: StateContext<PlanStateModel>, { id }: DeletePlan) {
        return this.planService.delete(id).pipe(tap((result) => {
            const state = getState();
            const planList = [...state.plans];
            const planIndex = planList.findIndex(item => item.id === id);
            planList[planIndex] = result;
            setState({
                ...state,
                plans: planList,
            });
        }));
    }

    @Action(SetSelectedPlan)
    setSelectedPlanId({getState, setState}: StateContext<PlanStateModel>, {payload}: SetSelectedPlan) {
        const state = getState();
        setState({
            ...state,
            selectedPlan: payload,
        });
    }

}

