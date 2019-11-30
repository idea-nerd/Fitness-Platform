import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { Plan } from './../../../models/plans.model';
import { Service } from './../../../models/services.model';
import { generateCode } from '../../../helpers/helpers';
import { CreatePlan, ReadPlan } from './../../../actions/plan.actions';
import { ReadService } from './../../../actions/service.actions';
import { ServiceState } from './../../../state/service.state';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'ngx-add-plan',
  templateUrl: './add-plan.component.html',
  styleUrls: ['./add-plan.component.scss'],
})
export class AddPlanComponent implements OnInit {

  @Select(ServiceState.getServices) services$: Observable<Service>;

  plansForm: FormGroup;
  validations: any = {
    length: 'Minimum 2 alpha characters',
    email: 'Invalid Email Format',
    phone: 'Invalid Phone Format| XXX-XXX-XXXX',
    required: 'Field Required',
    alphanumeric: 'Invalid Format| Alphanumberic Required',
  };
  constructor(private store: Store, private toastrService: NbToastrService, protected ref: NbDialogRef<AddPlanComponent>) { }

  ngOnInit() {
    this.store.dispatch(new ReadService());
    this.plansForm = new FormGroup({
        'serviceCode': new FormControl(null, [Validators.required]),
        'amount': new FormControl(null, [Validators.required]),
        'days': new FormControl(null, [Validators.required]),
        'name': new FormControl(null, [Validators.required, Validators.minLength(2), Validators.pattern(`[a-zA-Z0-9', ]*`)]),
        'description': new FormControl(null, [Validators.required, Validators.minLength(2), Validators.pattern(`[a-zA-Z0-9', ]*`)]),
      });
  }

  CreatePlan(payload: Plan) {
     payload.planCode = generateCode('plan');
     this.store.dispatch(new CreatePlan({ ...payload})).subscribe(() => {
     this.store.dispatch(new ReadPlan());
     this.showToast('top-right', 'success');
     this.dismiss();
    });
  }

  onSubmit = (payload: Plan): void => {
    payload.amount = Number(payload.amount).toFixed(2)
    this.CreatePlan(payload);
  }

  dismiss() { this.ref.close(); }

  showToast(position, status) {
    if(status == 'success') {
      this.toastrService.show(
       status || 'Success',
       `New Plan Added`,
       { position, status });
    } else if(status == 'danger') {
     this.toastrService.show(
       status || 'Success',
       `Failure To Add Plan`,
       { position, status });
    }
   }
}
