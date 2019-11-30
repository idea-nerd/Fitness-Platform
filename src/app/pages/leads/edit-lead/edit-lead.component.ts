import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs/Observable';
import { Lead } from './../../../models/leads.model';
import { Plan } from './../../../models/plans.model';
import { Service } from './../../../models/services.model';
import { LeadState } from './../../../state/lead.state';
import { PlanState } from './../../../state/plan.state';
import { ServiceState } from './../../../state/service.state';

import { UpdateLead, ReadSelectedLead, ReadLead, DeleteLead } from './../../../actions/lead.actions';
import { ReadPlan } from './../../../actions/plan.actions';
import { ReadService } from './../../../actions/service.actions';

@Component({
  selector: 'ngx-edit-lead',
  templateUrl: './edit-lead.component.html',
  styleUrls: ['./edit-lead.component.scss'],
})
export class EditLeadComponent implements OnInit {

  @Input() id: any;
  @Select(LeadState.getSelectedLeadInstance) lead$: Observable<Lead>;
  @Select(PlanState.getPlans) plans$: Observable<Plan>;
  @Select(ServiceState.getServices) service$: Observable<Service>;
  lead: Lead;
  leadsForm: FormGroup;
  validations: any = {
    length: 'Minimum 2 alpha characters',
    email: 'Invalid Email Format',
    phone: 'Invalid Phone Format| XXX-XXX-XXXX',
    required: 'Field Required',
    alphanumeric: 'Invalid Format| Alphanumberic Required',
  };
  message: any = {
    leadUpdated: 'Lead Successfully Updated',
    leadUpdateFailed: 'Lead Update Failed',
    leadDeleted: 'Lead Successfully Deleted',
    leadDeleteFailed: 'Lead Delete Failed',
  }
  constructor(private store: Store, private toastrService: NbToastrService, protected ref: NbDialogRef<EditLeadComponent>) {}

  ngOnInit() {
    this.store.dispatch(new ReadPlan());
    this.store.dispatch(new ReadService());
    this.store.dispatch(new ReadSelectedLead(this.id)).subscribe((res) => {
      this.lead = res.leads.selectedLeadInstance[0];
      this.leadsForm = new FormGroup({
        'firstName': new FormControl(this.lead.firstName, [Validators.required, Validators.minLength(2), Validators.pattern(`[a-zA-Z ]*`)]),
        'lastName': new FormControl(this.lead.lastName, [Validators.required, Validators.minLength(2), Validators.pattern(`[a-zA-Z ]*`)]),
        'phone': new FormControl(this.lead.phone, [Validators.required, Validators.pattern('[0-9]{3}-?[0-9]{3}-?[0-9]{4}')]),
        'email': new FormControl(this.lead.email, [Validators.required, Validators.email]),
        'gender': new FormControl(this.lead.gender, [Validators.required]),
        'startBy': new FormControl(this.lead.startBy, [Validators.required]),
        'aim': new FormControl(this.lead.aim, [Validators.required]),
        'interestedIn': new FormControl(this.lead.interestedIn, [Validators.required]),
        'status': new FormControl(this.lead.status, [Validators.required]),
      });
    });
  }

  UpdateLead(payload: Lead, id: number) {
    this.store.dispatch(new UpdateLead({ ...payload}, id)).subscribe(() => {
      this.store.dispatch(new ReadLead());
      this.showToast('top-right', 
                       'success', 
                      this.message.leadUpdated);
      this.dismiss();
    });
  }

  onSubmit = (payload: Lead): void => { this.UpdateLead(payload, this.id); };

  onArchive() {
    this.store.dispatch(new DeleteLead(this.id)).subscribe(() => {
      this.store.dispatch(new ReadLead());
      this.showToast('top-right', 
                       'success', 
                       this.message.leadDeleted);
      this.dismiss();
    });
   }

  dismiss() { this.ref.close(); }

  showToast(position, status, message) {
    if(status == 'success') {
      this.toastrService.show(
       status || 'Success',
       `${message}`,
       { position, status });
    } else if(status == 'danger') {
     this.toastrService.show(
       status || 'Success',
       `${message}`,
       { position, status });
    }
   }
}
