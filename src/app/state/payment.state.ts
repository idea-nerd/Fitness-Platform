import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Registration, Subscription, Store } from '../models/payments.model';
import { ReadRegistration, ReadSubscription, ReadStore } from '../actions/payment.actions';
import { PaymentService } from '../services/payments/payment.service';
import {tap} from 'rxjs/operators';

export class PaymentStateModel {
    registrations: Registration[];
    subscriptions: Subscription[];
    store: Store[];
}

@State<PaymentStateModel>({
    name: 'payments',
    defaults: {
        registrations: [],
        subscriptions: [],
        store: [],
    },
})

export class PaymentState {

    constructor(private paymentService: PaymentService) { }

    @Selector()
    static getRegistrations(state: PaymentStateModel) {
        return state.registrations;
    }

    @Selector()
    static getSubscriptions(state: PaymentStateModel) {
        return state.subscriptions;
    }

    @Selector()
    static getStore(state: PaymentStateModel) {
        return state.store;
    }


    @Action(ReadRegistration)
    readRegistration({getState, setState}: StateContext<PaymentStateModel>) {
        return this.paymentService.readRegistration().pipe(tap((result) => {
            const state = getState();
            setState({
                ...state,
                registrations: result,
            });
        }));

    }

    @Action(ReadSubscription)
    readSubscription({getState, setState}: StateContext<PaymentStateModel>) {
        return this.paymentService.readSubscription().pipe(tap((result) => {
            const state = getState();
            setState({
                ...state,
                subscriptions: result,
            });
        }));

    }

    @Action(ReadStore)
    readStore({getState, setState}: StateContext<PaymentStateModel>) {
        return this.paymentService.readStore().pipe(tap((result) => {
            const state = getState();
            setState({
                ...state,
                store: result,
            });
        }));

    }

}

