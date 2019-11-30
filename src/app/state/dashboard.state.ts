import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Read } from '../actions/dashboard.actions';
import { DashboardService } from '../services/dashboard/dashboard.service';
import {tap} from 'rxjs/operators';

export class DashboardStateModel {
    dashboard: any[];
}

@State<DashboardStateModel>({
    name: 'dashboards',
    defaults: {
        dashboard: [],
    },
})

export class DashboardState {

    constructor(private dashboardService: DashboardService) { }

    @Selector()
    static getDashboard(state: DashboardStateModel) {
        return state.dashboard;
    }

    @Action(Read)
    readDashboard({getState, setState}: StateContext<DashboardStateModel>) {
        return this.dashboardService.read().pipe(tap((result) => {
            const state = getState();
            setState({
                ...state,
                dashboard: result,
            });
        }));
    }
}

