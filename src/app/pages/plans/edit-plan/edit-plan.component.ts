import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { Plan } from './../../../models/plans.model';
import { Service } from './../../../models/services.model';
import { ReadService } from './../../../actions/service.actions';
import { ServiceState } from './../../../state/service.state';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs/Observable';
import { UpdatePlan, ReadSelectedPlan, ReadPlan, DeletePlan } from './../../../actions/plan.actions';

@Component({
  selector: 'ngx-edit-plan',
  templateUrl: './edit-plan.component.html',
  styleUrls: ['./edit-plan.component.scss'],
})
export class EditPlanComponent implements OnInit {

  @Select(ServiceState.getServices) services$: Observable<Service>;
  @Input() id: any;
  plan: Plan;
  plansForm: FormGroup;
  validations: any = {
    length: 'Minimum 2 alpha characters',
    email: 'Invalid Email Format',
    phone: 'Invalid Phone Format| XXX-XXX-XXXX',
    required: 'Field Required',
    alphanumeric: 'Invalid Format| Alphanumberic Required',
  };
  message: any = {
    planUpdated: 'Plan Successfully Updated',
    planUpdateFailed: 'Plan Update Failed',
    planDeleted: 'Plan Successfully Deleted',
    planDeleteFailed: 'Plan Delete Failed',
}
  constructor(private store: Store, private toastrService: NbToastrService, protected ref: NbDialogRef<EditPlanComponent>) { }

  ngOnInit() {
    this.store.dispatch(new ReadService());
    this.store.dispatch(new ReadSelectedPlan(this.id)).subscribe((res) => {
      this.plan = res.plans.selectedPlanInstance[0];
      this.plansForm = new FormGroup({
        'serviceCode': new FormControl(this.plan.serviceCode, [Validators.required]),
        'amount': new FormControl(this.plan.amount, [Validators.required]),
        'days': new FormControl(this.plan.days, [Validators.required]),
        'name': new FormControl(this.plan.name, [Validators.required, Validators.minLength(2), Validators.pattern(`[a-zA-Z0-9', ]*`)]),
        'description': new FormControl(this.plan.description, [Validators.required, Validators.minLength(2), Validators.pattern(`[a-zA-Z0-9', ]*`)]),
      });
    });
  }

  UpdatePlan(payload: Plan, id: number) {
    this.store.dispatch(new UpdatePlan(payload, id)).subscribe(() => {
      this.store.dispatch(new ReadPlan());
      this.showToast('top-right', 
                       'success', 
                      this.message.planUpdated);
      this.dismiss();
    });
  }

  onSubmit = (payload: Plan): void => {
    payload.amount = Number(payload.amount).toFixed(2)
    this.UpdatePlan(payload, this.id);
  }

  onArchive() {
    this.store.dispatch(new DeletePlan(this.id)).subscribe(() => {
      this.store.dispatch(new ReadPlan());
      this.showToast('top-right', 
                       'success', 
                       this.message.planDeleted);
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
