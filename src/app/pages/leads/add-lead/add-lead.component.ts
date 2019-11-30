import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { Lead } from './../../../models/leads.model';
import { Store, Select } from '@ngxs/store';
import { Plan } from './../../../models/plans.model';
import { PlanState } from './../../../state/plan.state';
import { Service } from './../../../models/services.model';
import { ServiceState } from './../../../state/service.state';
import { Observable } from 'rxjs/Observable';
import { CreateLead, ReadLead } from './../../../actions/lead.actions';
import { ReadPlan } from './../../../actions/plan.actions';
import { ReadService } from './../../../actions/service.actions';
@Component({
  selector: 'ngx-add-lead',
  templateUrl: './add-lead.component.html',
  styleUrls: ['./add-lead.component.scss'],
})
export class AddLeadComponent implements OnInit {

  @Select(PlanState.getPlans) plans$: Observable<Plan>;
  @Select(ServiceState.getServices) service$: Observable<Service>;

  leadsForm: FormGroup;
  validations: any = {
    length: 'Minimum 2 alpha characters',
    email: 'Invalid Email Format',
    phone: 'Invalid Phone Format| XXX-XXX-XXXX',
    required: 'Field Required',
    alphanumeric: 'Invalid Format| Alphanumberic Required',
  };

  constructor(private store: Store, private toastrService: NbToastrService, protected ref: NbDialogRef<AddLeadComponent>) {}

   ngOnInit() {
    this.store.dispatch(new ReadPlan());
    this.store.dispatch(new ReadService());
    this.leadsForm = new FormGroup({
      'firstName': new FormControl(null, [Validators.required, Validators.minLength(2), Validators.pattern(`[a-zA-Z ]*`)]),
      'lastName': new FormControl(null, [Validators.required, Validators.minLength(2), Validators.pattern(`[a-zA-Z ]*`)]),
      'phone': new FormControl(null, [Validators.required, Validators.pattern('[0-9]{3}-?[0-9]{3}-?[0-9]{4}')]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'gender': new FormControl(null, [Validators.required]),
      'startBy': new FormControl(),
      'aim': new FormControl(),
      'interestedIn': new FormControl(),
    });
  }

  CreateLead(payload: Lead) {
    this.store.dispatch(new CreateLead({ ...payload})).subscribe(() => {
      this.store.dispatch(new ReadLead());
      this.showToast('top-right', 'success');
      this.dismiss();
    });
  }
  onSubmit = (payload: Lead): void => {
    payload.status = 'Pending';
    payload.source = 'Gym';
    this.CreateLead(payload);
  }

  dismiss() {
   this.ref.close();
  }

  showToast(position, status) {
    if(status == 'success') {
      this.toastrService.show(
       status || 'Success',
       `New Lead Added`,
       { position, status });
    } else if(status == 'danger') {
     this.toastrService.show(
       status || 'Success',
       `Failure To Add Lead`,
       { position, status });
    }
   }

}
