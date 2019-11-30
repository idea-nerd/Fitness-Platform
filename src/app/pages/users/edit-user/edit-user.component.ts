import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { Store, Select } from '@ngxs/store';
import { User } from './../../../models/users.model';
import { UpdateUser, UpdateUserImage, ReadSelectedUser, ReadUser, DeleteUser } from './../../../actions/user.actions';
import { ReadPlan } from './../../../actions/plan.actions';
import { ReadService } from './../../../actions/service.actions';
import { Observable } from 'rxjs/Observable';
import { RoleState } from '../../../state/roles.state';
import { Roles } from '../../../models/roles.model';
import { ReadRole } from '../../../actions/role.actions';

@Component({
  selector: 'ngx-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  @Select(RoleState.getRoles) roles$: Observable<Roles>;
  @Input() id: any;
  user: User;
  usersForm: FormGroup;
  validations: any = {
    length: 'Minimum 2 alpha characters',
    email: 'Invalid Email Format',
    phone: 'Invalid Phone Format| XXX-XXX-XXXX',
    required: 'Field Required',
    alphanumeric: 'Invalid Format| Alphanumberic Required',
  };
  message: any = {
    userUpdated: 'User Successfully Updated',
    userUpdateFailed: 'User Update Failed',
    userDeleted: 'User Successfully Deleted',
    userDeleteFailed: 'User Delete Failed',
}
  constructor(private store: Store, private toastrService: NbToastrService, protected ref: NbDialogRef<EditUserComponent>) {}

   files: File[] = [];

   ngOnInit() {
    this.store.dispatch(new ReadRole());
    this.store.dispatch(new ReadPlan());
    this.store.dispatch(new ReadService());
    this.store.dispatch(new ReadSelectedUser(this.id)).subscribe((res) => {
      this.user = res.users.selectedUserInstance[0]; console.log('tre', this.user)
      this.usersForm = new FormGroup({
        'firstName': new FormControl(this.user.firstName, [Validators.required, Validators.minLength(2), Validators.pattern(`[a-zA-Z ]*`)]),
        'lastName': new FormControl(this.user.lastName, [Validators.required, Validators.minLength(2), Validators.pattern(`[a-zA-Z ]*`)]),
        'phone': new FormControl(this.user.phone, [Validators.required, Validators.pattern('[0-9]{3}-?[0-9]{3}-?[0-9]{4}')]),
        'email': new FormControl(this.user.email, [Validators.required, Validators.email]),
        'address': new FormControl(this.user.address, [Validators.required, Validators.pattern(`[a-zA-Z0-9,' ]*`)]),
        'district': new FormControl(this.user.district, [Validators.required, Validators.pattern(`[a-zA-Z0-9,' ]*`)]),
        'dob': new FormControl(this.user.dob, [Validators.required]),
        'gender': new FormControl(this.user.gender, [Validators.required]),
        'contactFName': new FormControl(this.user.contactFName, [Validators.required, Validators.minLength(2), Validators.pattern(`[a-zA-Z ]*`)]),
        'contactLName': new FormControl(this.user.contactLName, [Validators.required, Validators.minLength(2), Validators.pattern(`[a-zA-Z ]*`)]),
        'contactPhone': new FormControl(this.user.contactPhone, [Validators.required, Validators.pattern('[0-9]{3}-?[0-9]{3}-?[0-9]{4}')]),
        'city': new FormControl(this.user.city),
        'town': new FormControl(this.user.town),
        'role': new FormControl(this.user.role),
      });
    });
  }

  UpdateUser(payload: any, id: number) {
    if (this.files.length > 0) {
      this.store.dispatch(new UpdateUserImage(payload, id)).subscribe(() => {
        this.store.dispatch(new ReadUser());
        this.showToast('top-right', 
                       'success', 
                      this.message.userUpdated);
        this.dismiss();
      });
    } else {
      this.store.dispatch(new UpdateUser({...payload}, id)).subscribe(() => {
        this.store.dispatch(new ReadUser());
        this.showToast('top-right', 
                       'success', 
                      this.message.userUpdated);
        this.dismiss();
      });
    }
   }

   onSubmit = (payload: User): void => {
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
      fd.append('role', payload.role);
      this.UpdateUser(fd, this.id);
    } else {
      this.UpdateUser(payload, this.id);
    }

   }

   onArchive() {
    this.store.dispatch(new DeleteUser(this.id)).subscribe(() => {
      this.store.dispatch(new ReadUser());
      this.showToast('top-right', 
                       'success', 
                       this.message.userDeleted);
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
