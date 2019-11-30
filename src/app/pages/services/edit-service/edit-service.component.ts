import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { Service } from './../../../models/services.model';
import { Store } from '@ngxs/store';
import { UpdateService, ReadSelectedService, ReadService, DeleteService } from './../../../actions/service.actions';

@Component({
  selector: 'ngx-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.scss'],
})
export class EditServiceComponent implements OnInit {

  @Input() id: any;
  service: Service;
  servicesForm: FormGroup;
  validations: any = {
    length: 'Minimum 2 alpha characters',
    email: 'Invalid Email Format',
    phone: 'Invalid Phone Format| XXX-XXX-XXXX',
    required: 'Field Required',
    alphanumeric: 'Invalid Format| Alphanumberic Required',
  };
  message: any = {
    serviceUpdated: 'Service Successfully Updated',
    serviceUpdateFailed: 'Service Update Failed',
    serviceDeleted: 'Service Successfully Deleted',
    serviceDeleteFailed: 'Service Delete Failed',
}
  constructor(private store: Store, private toastrService: NbToastrService, protected ref: NbDialogRef<EditServiceComponent>) { }

  files: File[] = [];

  ngOnInit() {
    this.store.dispatch(new ReadSelectedService(this.id)).subscribe((res) => {
      this.service = res.services.selectedServiceInstance[0];
      this.servicesForm = new FormGroup({
        'name': new FormControl(this.service.name, [Validators.required, Validators.minLength(2), Validators.maxLength(22), Validators.pattern(`[a-zA-Z', ]*`)]),
        'description': new FormControl(this.service.description, [Validators.required, Validators.pattern(`[a-zA-Z0-9', ]*`)]),
      });
    });
  }

  UpdateService(payload: any, id: number) {
    this.store.dispatch(new UpdateService(payload, id)).subscribe(() => {
      this.store.dispatch(new ReadService());
      this.showToast('top-right', 
                       'success', 
                      this.message.serviceUpdated);
      this.dismiss();
    });
  }

  onSubmit = (payload: Service): void => {
    this.UpdateService(payload, this.id);
  }

  onArchive() {
    this.store.dispatch(new DeleteService(this.id)).subscribe(() => {
      this.store.dispatch(new ReadService());
      this.showToast('top-right', 
                       'success', 
                       this.message.serviceDeleted);
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
