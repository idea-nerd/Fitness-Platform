import { State, Action, StateContext, Selector } from '@ngxs/store';
import { ReadClients, ReadRevenue, ReadSubscriptions } from '../actions/report.actions';
import { ReportsService } from '../services/reports/reports.service';
import {tap} from 'rxjs/operators';

export class ReportStateModel {
    clientReport: any[];
    revenueReport: any[];
    subscriptionsReport: any[];
}

@State<ReportStateModel>({
    name: 'reports',
    defaults: {
        clientReport: [],
        revenueReport: [],
        subscriptionsReport: [],
    },
})

export class ReportState {

    constructor(private reportService: ReportsService) { }

    @Selector()
    static getClientReport(state: ReportStateModel) {
        return state.clientReport;
    }

    @Selector()
    static getRevenueReport(state: ReportStateModel) {
        return state.clientReport;
    }

    @Selector()
    static getSubscriptionReport(state: ReportStateModel) {
        return state.clientReport;
    }

    @Action(ReadClients)
    readClientReport({getState, setState}: StateContext<ReportStateModel>) {
        return this.reportService.readClients().pipe(tap((result) => {
            const state = getState();
            setState({
                ...state,
                clientReport: result,
            });
        }));
    }

    @Action(ReadRevenue)
    readRevenueReport({getState, setState}: StateContext<ReportStateModel>) {
        return this.reportService.readRevenue().pipe(tap((result) => {
            const state = getState();
            setState({
                ...state,
                revenueReport: result,
            });
        }));
    }

    @Action(ReadSubscriptions)
    readSubscriptionsReport({getState, setState}: StateContext<ReportStateModel>) {
        return this.reportService.readSubscriptions().pipe(tap((result) => {
            const state = getState();
            setState({
                ...state,
                subscriptionsReport: result,
            });
        }));
    }
}

