import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { Client } from './../../../models/clients.model';
import { Store, Select } from '@ngxs/store';
import { Plan } from './../../../models/plans.model';
import { PlanState } from './../../../state/plan.state';
import { Service } from './../../../models/services.model';
import { ServiceState } from './../../../state/service.state';
import { Observable } from 'rxjs/Observable';
import { ReadPlan } from './../../../actions/plan.actions';
import { ReadService } from './../../../actions/service.actions';
import { CreateClient, ReadClient } from './../../../actions/client.actions';
import { ReadUser, ReadTrainers } from './../../../actions/user.actions';

import { generateCode } from '../../../helpers/helpers';

@Component({
  selector: 'ngx-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss'],
})
export class CreateClientComponent implements OnInit {
  @Input() data: any;
  @Select(PlanState.getPlans) plans$: Observable<Plan>;
  @Select(ServiceState.getServices) service$: Observable<Service>;
  userDataSource: any;
  clientsForm: FormGroup;
  validations: any = {
    length: 'Minimum 2 alpha characters',
    email: 'Invalid Email Format',
    phone: 'Invalid Phone Format| XXX-XXX-XXXX',
    required: 'Field Required',
    alphanumeric: 'Invalid Format| Alphanumberic Required',
  };
  

  constructor(private store: Store, private toastrService: NbToastrService, protected ref: NbDialogRef<CreateClientComponent>) { }

  files: File[] = [];

  ngOnInit() { console.log('intake data', this.data)
    this.store.dispatch(new ReadPlan());
    this.store.dispatch(new ReadService());
    this.store.dispatch(new ReadTrainers()).subscribe((res) => {
      this.userDataSource = res.users.trainers;
    });
    this.clientsForm = new FormGroup({
      'firstName': new FormControl((this.data.firstName) ? this.data.firstName : null, [Validators.required, Validators.minLength(2), Validators.pattern(`[a-zA-Z ]*`)]),
      'lastName': new FormControl((this.data.lastName) ? this.data.lastName : null, [Validators.required, Validators.minLength(2), Validators.pattern(`[a-zA-Z ]*`)]),
      'phone': new FormControl((this.data.phone) ? this.data.phone : null, [Validators.required, Validators.pattern('[0-9]{3}-?[0-9]{3}-?[0-9]{4}')]),
      'email': new FormControl((this.data.email) ? this.data.email : null, [Validators.required, Validators.email]),
      'address': new FormControl(null, [Validators.required, Validators.pattern(`[a-zA-Z0-9, ]*`)]),
      'district': new FormControl(null, [Validators.required, Validators.pattern(`[a-zA-Z0-9 ]*`)]),
      'dob': new FormControl(null, [Validators.required]),
      'gender': new FormControl((this.data.gender) ? this.data.gender : null, [Validators.required]),
      'contactFName': new FormControl(null, [Validators.required, Validators.minLength(2), Validators.pattern(`[a-zA-Z ]*`)]),
      'contactLName': new FormControl(null, [Validators.required, Validators.minLength(2), Validators.pattern(`[a-zA-Z ]*`)]),
      'contactPhone': new FormControl(null, [Validators.required, Validators.pattern('[0-9]{3}-?[0-9]{3}-?[0-9]{4}')]),
      'city': new FormControl(null, [Validators.minLength(2), Validators.pattern(`[a-zA-Z ]*`)]),
      'town': new FormControl(null, [Validators.minLength(2),  Validators.pattern(`[a-zA-Z ]*`)]),
      'healthIssues': new FormControl(null, [Validators.required, Validators.minLength(2), Validators.pattern(`[a-zA-Z ]*`)]),
      'height': new FormControl(),
      'weight': new FormControl(),
      'aim': new FormControl((this.data.aim) ? this.data.aim : null,),
      'interest': new FormControl((this.data.interestedIn) ? this.data.interestedIn : null),
      'trainer': new FormControl(),
    });
  }

  CreateClient(payload: any) {
    this.store.dispatch(new CreateClient(payload)).subscribe(() => {
      this.store.dispatch(new ReadClient());
      this.showToast('top-right', 'success');
      this.dismiss();
    });
  }

  onSubmit = (payload: Client): void => { console.log(payload.dob)
    const fd = new FormData();
    fd.append('file', this.files[0], this.files[0].name);
    fd.append('firstName', payload.firstName);
    fd.append('lastName', payload.lastName);
    fd.append('phone', payload.phone);
    fd.append('email', payload.email);
    fd.append('address', payload.address);
    fd.append('district', payload.district);
    fd.append('dob', payload.dob);
    fd.append('gender', payload.gender);
    fd.append('contactFName', payload.contactFName);
    fd.append('contactLName', payload.contactLName);
    fd.append('contactPhone', payload.contactPhone);
    fd.append('city', payload.city);
    fd.append('town', payload.town);
    fd.append('healthIssues', payload.healthIssues);
    fd.append('aim', payload.aim);
    fd.append('interest', payload.interest);
    fd.append('height', payload.height);
    fd.append('weight', payload.weight);
    fd.append('trainer', payload.trainer);
    fd.append('clientCode', generateCode('clien'));
    this.CreateClient(fd);
  }

  dismiss() { this.ref.close(); }

  onSelect(event) {
    if (event.addedFiles)
      this.files.push(...event.addedFiles);
  }

  onRemove(event) { this.files.splice(this.files.indexOf(event), 1); }

  showToast(position, status) {
    if(status == 'success') {
      this.toastrService.show(
       status || 'Success',
       `New Client Added`,
       { position, status });
    } else if(status == 'danger') {
     this.toastrService.show(
       status || 'Success',
       `Failure To Add Client`,
       { position, status });
    }
   }
}
