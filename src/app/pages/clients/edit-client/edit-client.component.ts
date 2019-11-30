import { Component, OnInit, Input } from '@angular/core';
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
import { ReadClient, ReadSelectedClient, UpdateClient, DeleteClient, UpdateClientImage } from './../../../actions/client.actions';
import { ReadUser } from '../../../actions/user.actions';


@Component({
  selector: 'ngx-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss'],
})
export class EditClientComponent implements OnInit {

  @Input() id: any;
  @Select(PlanState.getPlans) plans$: Observable<Plan>;
  @Select(ServiceState.getServices) service$: Observable<Service>;
  client: Client;
  clientsForm: FormGroup;
  userDataSource: any;
  validations: any = {
    length: 'Minimum 2 alpha characters',
    email: 'Invalid Email Format',
    phone: 'Invalid Phone Format| XXX-XXX-XXXX',
    required: 'Field Required',
    alphanumeric: 'Invalid Format| Alphanumberic Required',
  };
  message: any = {
    clientUpdated: 'Client Successfully Updated',
    clientUpdateFailed: 'Client Update Failed',
    clientDeleted: 'Client Successfully Deleted',
    clientDeleteFailed: 'Client Delete Failed',
}
  constructor(private store: Store, private toastrService: NbToastrService, protected ref: NbDialogRef<EditClientComponent>) {}

   files: File[] = [];

   ngOnInit() {
    this.store.dispatch(new ReadPlan());
    this.store.dispatch(new ReadService());
    this.store.dispatch(new ReadUser()).subscribe((res) => {
      this.userDataSource = res.users.users;
    });
    this.store.dispatch(new ReadSelectedClient(this.id)).subscribe((res) => {
      this.client = res.clients.selectedClientInstance[0];
      this.client.dob = new Date(this.client.dob)
      this.clientsForm = new FormGroup({
        'firstName': new FormControl(this.client.firstName, [Validators.required, Validators.minLength(2), Validators.pattern(`[a-zA-Z ]*`)]),
        'lastName': new FormControl(this.client.lastName, [Validators.required, Validators.minLength(2), Validators.pattern(`[a-zA-Z ]*`)]),
        'phone': new FormControl(this.client.phone, [Validators.required, Validators.pattern('[0-9]{3}-?[0-9]{3}-?[0-9]{4}')]),
        'email': new FormControl(this.client.email, [Validators.required, Validators.email]),
        'address': new FormControl(this.client.address, [Validators.required, Validators.pattern(`[a-zA-Z0-9, ]*`)]),
        'district': new FormControl(this.client.district, [Validators.required, Validators.pattern(`[a-zA-Z0-9 ]*`)]),
        'dob': new FormControl(this.client.dob, [Validators.required]),
        'gender': new FormControl(this.client.gender, [Validators.required]),
        'contactFName': new FormControl(this.client.contactFName, [Validators.required, Validators.minLength(2), Validators.pattern(`[a-zA-Z ]*`)]),
        'contactLName': new FormControl(this.client.contactLName, [Validators.required, Validators.minLength(2), Validators.pattern(`[a-zA-Z ]*`)]),
        'contactPhone': new FormControl(this.client.contactPhone, [Validators.required, Validators.pattern('[0-9]{3}-?[0-9]{3}-?[0-9]{4}')]),
        'city': new FormControl(this.client.city, [Validators.minLength(2), Validators.maxLength(12), Validators.pattern(`[a-zA-Z ]*`)]),
        'town': new FormControl(this.client.town, [Validators.minLength(2), Validators.maxLength(12), Validators.pattern(`[a-zA-Z ]*`)]),
        'healthIssues': new FormControl(this.client.healthIssues, [Validators.required, Validators.minLength(2), Validators.pattern(`[a-zA-Z ]*`)]),
        'height': new FormControl(this.client.height),
        'weight': new FormControl(this.client.weight),
        'aim': new FormControl(this.client.aim),
        'interest': new FormControl(this.client.interest),
        'trainer': new FormControl(this.client.trainer),
      });
    });
  }

  UpdateClient(payload: any, id: number) {
    if (this.files.length > 0) {
      this.store.dispatch(new UpdateClientImage(payload, id)).subscribe(() => {
        this.store.dispatch(new ReadClient());
        this.showToast('top-right', 
                       'success', 
                       this.message.clientUpdated);
        this.dismiss();
      });
    } else {
      this.store.dispatch(new UpdateClient({...payload}, id)).subscribe(() => {
        this.store.dispatch(new ReadClient());
        this.showToast('top-right', 
                       'success', 
                       this.message.clientUpdated);
        this.dismiss();
      });
    }

   }

   onSubmit = (payload: Client): void => {
    const fd = new FormData();
    if (this.files.length > 0) {
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
      fd.append('role', 'Client');
      fd.append('trainer', payload.trainer);
      this.UpdateClient(fd, this.id);
    } else {
      this.UpdateClient(payload, this.id);
    }

   }

   onArchive() {
    this.store.dispatch(new DeleteClient(this.id)).subscribe(() => {
      this.store.dispatch(new ReadClient());
      this.showToast('top-right', 
                       'success', 
                       this.message.clientDeleted);
      this.dismiss();
    });
   }

   dismiss() { this.ref.close(); }

   onSelect(event) {
    if (event.addedFiles)
      this.files.push(...event.addedFiles);
  }

  onRemove(event) { this.files.splice(this.files.indexOf(event), 1); }

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
