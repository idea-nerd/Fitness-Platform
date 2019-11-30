import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { User } from './../../../models/users.model';
import { Store, Select } from '@ngxs/store';
import { CreateUser, ReadUser } from './../../../actions/user.actions';
import { ReadRole } from '../../../actions/role.actions';
import { Roles } from '../../../models/roles.model';
import { RoleState } from '../../../state/roles.state';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'ngx-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class CreateUserComponent implements OnInit {
  
  @Select(RoleState.getRoles) roles$: Observable<Roles>;

  usersForm: FormGroup;
  validations: any = {
    length: 'Minimum 2 alpha characters',
    email: 'Invalid Email Format',
    phone: 'Invalid Phone Format| XXX-XXX-XXXX',
    required: 'Field Required',
    alphanumeric: 'Invalid Format| Alphanumberic Required',
  };

  constructor(private store: Store, private toastrService: NbToastrService, protected ref: NbDialogRef<CreateUserComponent>) { }

  files: File[] = [];

  ngOnInit() {
    this.store.dispatch(new ReadRole())
    this.usersForm = new FormGroup({
      'firstName': new FormControl(null, [Validators.required, Validators.minLength(2), Validators.pattern(`[a-zA-Z ]*`)]),
      'lastName': new FormControl(null, [Validators.required, Validators.minLength(2), Validators.pattern(`[a-zA-Z ]*`)]),
      'phone': new FormControl(null, [Validators.required, Validators.pattern('[0-9]{3}-?[0-9]{3}-?[0-9]{4}')]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'address': new FormControl(null, [Validators.required, Validators.pattern(`[a-zA-Z0-9,' ]*`)]),
      'district': new FormControl(null, [Validators.required, Validators.pattern(`[a-zA-Z0-9,' ]*`)]),
      'dob': new FormControl(null, [Validators.required]),
      'gender': new FormControl(null, [Validators.required]),
      'contactFName': new FormControl(null, [Validators.required, Validators.minLength(2), Validators.pattern(`[a-zA-Z ]*`)]),
      'contactLName': new FormControl(null, [Validators.required, Validators.minLength(2), Validators.pattern(`[a-zA-Z ]*`)]),
      'contactPhone': new FormControl(null, [Validators.required, Validators.pattern('[0-9]{3}-?[0-9]{3}-?[0-9]{4}')]),
      'city': new FormControl(),
      'town': new FormControl(),
      'role': new FormControl(),
    });
  }

  CreateUser(payload: any) {
    this.store.dispatch(new CreateUser(payload)).subscribe(() => {
      this.store.dispatch(new ReadUser());
      this.showToast('top-right', 'success');
      this.dismiss();
    });
  }

  onSubmit = (payload: User): void => {
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
    fd.append('role', payload.role);
    this.CreateUser(fd);
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
       `New User Added`,
       { position, status });
    } else if(status == 'danger') {
     this.toastrService.show(
       status || 'Success',
       `Failure To Add User`,
       { position, status });
    }
   }
}
