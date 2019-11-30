import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Subscription } from '../models/subscriptions.model';
import { CreateSubscription, ReadSubscription, ReadSelectedSubscription, ReadSelectedClientSubscription, UpdateSubscription, DeleteSubscription, SetSelectedSubscription, ArchiveSubscription } from '../actions/subscription.actions';
import { SubscriptionService } from '../services/subscriptions/subscriptions.service';
import {tap} from 'rxjs/operators';

export class SubscriptionStateModel {
    subscriptions: Subscription[];
    selectedSubscriptionInstance: Subscription[];
    selectedClientSubscriptionInstance: Subscription[];
    selectedSubscription: Subscription;
}

@State<SubscriptionStateModel>({
    name: 'subscriptions',
    defaults: {
        subscriptions: [],
        selectedSubscriptionInstance: [],
        selectedClientSubscriptionInstance: [],
        selectedSubscription: null,
    },
})

export class SubscriptionState {

    constructor(private subscriptionService: SubscriptionService) { }

    @Selector()
    static getSubscriptions(state: SubscriptionStateModel) {
        return state.subscriptions;
    }

    @Selector()
    static getSelectedSubscription(state: SubscriptionStateModel) {
        return state.selectedSubscription;
    }

    @Selector()
    static getSelectedSubscriptionInstance(state: SubscriptionStateModel) {
        return state.selectedSubscriptionInstance;
    }

    @Selector()
    static getSelectedClientSubscriptionInstance(state: SubscriptionStateModel) {
        return state.selectedClientSubscriptionInstance;
    }

    @Action(CreateSubscription)
    createSubscription({getState, patchState}: StateContext<SubscriptionStateModel>, { payload }: CreateSubscription) {
        return this.subscriptionService.create(payload).pipe(tap((result) => {
            const state = getState();
            patchState({
                subscriptions: [...state.subscriptions, result],
            });
        }));

    }

    @Action(ReadSubscription)
    readSubscription({getState, setState}: StateContext<SubscriptionStateModel>) {
        return this.subscriptionService.read().pipe(tap((result) => {
            const state = getState();
            setState({
                ...state,
                subscriptions: result,
            });
        }));

    }

    @Action(ReadSelectedSubscription)
    readSelectedSubscription({getState, setState}: StateContext<SubscriptionStateModel>, { id }: ReadSelectedSubscription ) {
        return this.subscriptionService.readSelected(id).pipe(tap((result) => {
            const state = getState();
            setState({
                ...state,
                selectedSubscriptionInstance: result,
            });
        }));

    }

    @Action(ReadSelectedClientSubscription)
    readSelectedClientSubscription({getState, setState}: StateContext<SubscriptionStateModel>, { id }: ReadSelectedClientSubscription ) {
        return this.subscriptionService.readSelectedClientSubscriptions(id).pipe(tap((result) => {
            const state = getState();
            setState({
                ...state,
                selectedClientSubscriptionInstance: result,
            });
        }));

    }

    @Action(UpdateSubscription)
    updateSubscription({getState, setState}: StateContext<SubscriptionStateModel>, { payload, id }: UpdateSubscription) {
        return this.subscriptionService.update(payload, id).pipe(tap((result) => {
            const state = getState();
            const subscriptionList = [...state.subscriptions];
            const subscriptionIndex = subscriptionList.findIndex(item => item.id === id);
            subscriptionList[subscriptionIndex] = result;
            setState({
                ...state,
                subscriptions: subscriptionList,
            });
        }));
    }

    @Action(ArchiveSubscription)
    archiveSubscription({getState, setState}: StateContext<SubscriptionStateModel>, { id }: ArchiveSubscription) {
        return this.subscriptionService.archive(id).pipe(tap((result) => {
            const state = getState();
            const subscriptionList = [...state.subscriptions];
            const subscriptionIndex = subscriptionList.findIndex(item => item.id === id);
            subscriptionList[subscriptionIndex] = result;
            setState({
                ...state,
                subscriptions: subscriptionList,
            });
        }));
    }

    @Action(DeleteSubscription)
    deleteSubscription({getState, setState}: StateContext<SubscriptionStateModel>, { id }: DeleteSubscription) {
        return this.subscriptionService.delete(id).pipe(tap((result) => {
            const state = getState();
            const subscriptionList = [...state.subscriptions];
            const subscriptionIndex = subscriptionList.findIndex(item => item.id === id);
            subscriptionList[subscriptionIndex] = result;
            setState({
                ...state,
                subscriptions: subscriptionList,
            });
        }));
    }

    @Action(SetSelectedSubscription)
    setSelectedSubscriptionId({getState, setState}: StateContext<SubscriptionStateModel>, {payload}: SetSelectedSubscription) {
        const state = getState();
        setState({
            ...state,
            selectedSubscription: payload,
        });
    }

}

