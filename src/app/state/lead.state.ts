import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Lead } from '../models/leads.model';
import { CreateLead, ReadLead, ReadSelectedLead, UpdateLead, DeleteLead, SetSelectedLead, UpdateLeadImage, ReadAppointmentLead, ReadTrainerLead } from './../actions/lead.actions';
import { LeadService } from '../services/leads/lead.service';
import {tap} from 'rxjs/operators';

export class LeadStateModel {
    leads: Lead[];
    selectedLeadInstance: Lead[];
    selectedAuthenticatedLeadInstance: Lead[];
    appointmentLeads: Lead[];
    trainerLeads: Lead[];
    selectedLead: Lead;
}

@State<LeadStateModel>({
    name: 'leads',
    defaults: {
        leads: [],
        selectedLeadInstance: [],
        selectedAuthenticatedLeadInstance: [],
        appointmentLeads: [],
        trainerLeads: [],
        selectedLead: null,
    },
})

export class LeadState {

    constructor(private leadService: LeadService) { }

    @Selector()
    static getLeads(state: LeadStateModel) {
        return state.leads;
    }

    @Selector()
    static getSelectedLead(state: LeadStateModel) {
        return state.selectedLead;
    }

    @Selector()
    static getSelectedLeadInstance(state: LeadStateModel) {
        return state.selectedLeadInstance;
    }

    @Selector()
    static getAppointmentLeadInstance(state: LeadStateModel) {
        return state.appointmentLeads;
    }

    @Selector()
    static getTrainerLeadInstance(state: LeadStateModel) {
        return state.trainerLeads;
    }

    @Selector()
    static getAuthenticatedLeadInstance(state: LeadStateModel) {
        return state.selectedAuthenticatedLeadInstance;
    }

    @Action(CreateLead)
    createLead({getState, patchState}: StateContext<LeadStateModel>, { payload }: CreateLead) {
        return this.leadService.create(payload).pipe(tap((result) => {
            const state = getState();
            patchState({
                leads: [...state.leads, result],
            });
        }));

    }

    @Action(ReadLead)
    readLead({getState, setState}: StateContext<LeadStateModel>) {
        return this.leadService.read().pipe(tap((result) => {
            const state = getState();
            setState({
                ...state,
                leads: result,
            });
        }));

    }

    @Action(ReadSelectedLead)
    readSelectedLead({getState, setState}: StateContext<LeadStateModel>, { id }: ReadSelectedLead ) {
        return this.leadService.readSelected(id).pipe(tap((result) => {
            const state = getState();
            setState({
                ...state,
                selectedLeadInstance: result,
            });
        }));

    }

    @Action(ReadTrainerLead)
    readTrainerLead({getState, setState}: StateContext<LeadStateModel>) {
        return this.leadService.readTrainer().pipe(tap((result) => {
            const state = getState();
            setState({
                ...state,
                trainerLeads: result,
            });
        }));

    }

    @Action(ReadAppointmentLead)
    readAppointmentLead({getState, setState}: StateContext<LeadStateModel>) {
        return this.leadService.readAppointment().pipe(tap((result) => {
            const state = getState();
            setState({
                ...state,
                appointmentLeads: result,
            });
        }));

    }

    @Action(UpdateLead)
    updateLead({getState, setState}: StateContext<LeadStateModel>, { payload, id }: UpdateLead) {
        return this.leadService.update(payload, id).pipe(tap((result) => {
            const state = getState();
            const leadList = [...state.leads];
            const leadIndex = leadList.findIndex(item => item.id === id);
            leadList[leadIndex] = result;
            setState({
                ...state,
                leads: leadList,
            });
        }));
    }

    @Action(UpdateLeadImage)
    updateLeadImage({getState, setState}: StateContext<LeadStateModel>, { payload, id }: UpdateLeadImage) {
        return this.leadService.updateLeadImage(payload, id).pipe(tap((result) => {
            const state = getState();
            const leadList = [...state.leads];
            const leadIndex = leadList.findIndex(item => item.id === id);
            leadList[leadIndex] = result;
            setState({
                ...state,
                leads: leadList,
            });
        }));
    }

    @Action(DeleteLead)
    deleteLead({getState, setState}: StateContext<LeadStateModel>, { id }: DeleteLead) {
        return this.leadService.delete(id).pipe(tap((result) => {
            const state = getState();
            const leadList = [...state.leads];
            const leadIndex = leadList.findIndex(item => item.id === id);
            leadList[leadIndex] = result;
            setState({
                ...state,
                leads: leadList,
            });
        }));
    }

    @Action(SetSelectedLead)
    setSelectedLeadId({getState, setState}: StateContext<LeadStateModel>, {payload}: SetSelectedLead) {
        const state = getState();
        setState({
            ...state,
            selectedLead: payload,
        });
    }

}

