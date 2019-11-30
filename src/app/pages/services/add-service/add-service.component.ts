import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { Service } from './../../../models/services.model';
import { Store } from '@ngxs/store';
import { generateCode } from '../../../helpers/helpers';
import { CreateService, ReadService } from './../../../actions/service.actions';

@Component({
  selector: 'ngx-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.scss'],
})
export class AddServiceComponent implements OnInit {

  servicesForm: FormGroup;
  validations: any = {
    length: 'Minimum 2 alpha characters',
    email: 'Invalid Email Format',
    phone: 'Invalid Phone Format| XXX-XXX-XXXX',
    required: 'Field Required',
    alphanumeric: 'Invalid Format| Alphanumberic Required',
  };
  constructor(private store: Store, private toastrService: NbToastrService, protected ref: NbDialogRef<AddServiceComponent>) { }

  ngOnInit() {
    this.servicesForm = new FormGroup({
      'name': new FormControl(null, [Validators.required, Validators.minLength(2), Validators.pattern(`[a-zA-Z', ]*`)]),
      'description': new FormControl(null, [Validators.required, Validators.pattern(`[a-zA-Z0-9', ]*`)]),
    });
  }

  CreateService(payload: any) {
    this.store.dispatch(new CreateService(payload)).subscribe(() => {
      this.store.dispatch(new ReadService());
      this.showToast('top-right', 'success');
      this.dismiss();
    });
  }

  onSubmit = (payload: Service): void => {
    payload.serviceCode = generateCode('serv');
    this.CreateService(payload);
  }

  dismiss() { this.ref.close(); }

  showToast(position, status) {
    if(status == 'success') {
      this.toastrService.show(
       status || 'Success',
       `New Service Added`,
       { position, status });
    } else if(status == 'danger') {
     this.toastrService.show(
       status || 'Success',
       `Failure To Add Service`,
       { position, status });
    }
   }

}
