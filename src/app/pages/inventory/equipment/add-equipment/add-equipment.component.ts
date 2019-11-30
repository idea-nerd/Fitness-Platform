import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { Equipment } from './../../../../models/equipments.model';
import { Store } from '@ngxs/store';
import { generateCode } from '../../../../helpers/helpers';
import { CreateEquipment, ReadEquipment } from './../../../../actions/equipment.actions';

@Component({
  selector: 'ngx-add-equipment',
  templateUrl: './add-equipment.component.html',
  styleUrls: ['./add-equipment.component.scss'],
})
export class AddEquipmentComponent implements OnInit {

  equipmentsForm: FormGroup;
  validations: any = {
    length: 'Minimum 2 alpha characters',
    email: 'Invalid Email Format',
    phone: 'Invalid Phone Format| XXX-XXX-XXXX',
    required: 'Field Required',
    alphanumeric: 'Invalid Format| Alphanumberic Required',
  };
  constructor(private store: Store, private toastrService: NbToastrService, protected ref: NbDialogRef<AddEquipmentComponent>) { }

  files: File[] = [];

  ngOnInit() {
    this.equipmentsForm = new FormGroup({
      'name': new FormControl(null, [Validators.required, Validators.minLength(2), Validators.pattern(`[a-zA-Z0-9', ]*`)]),
      'description': new FormControl(null, [Validators.required, Validators.pattern(`[a-zA-Z0-9', ]*`)]),
      'category': new FormControl(null, [Validators.required]),
      'costPrice': new FormControl(null, [Validators.required]),
      'quantity': new FormControl(null, [Validators.required]),
    });
  }

  CreateEquipment(payload: any) {
    this.store.dispatch(new CreateEquipment(payload)).subscribe(() => {
      this.store.dispatch(new ReadEquipment());
      this.showToast('top-right', 'success');
      this.dismiss();
    });
  }

  onSubmit = (payload: Equipment): void => {
    const fd = new FormData();
    fd.append('file', this.files[0], this.files[0].name);
    fd.append('name', payload.name);
    fd.append('description', payload.description);
    fd.append('quantity', payload.quantity);
    fd.append('category', payload.category);
    fd.append('costPrice', Number(payload.costPrice).toFixed(2));
    fd.append('status', 'Active');
    fd.append('equipmentCode', generateCode('equip'));
    this.CreateEquipment(fd);
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
     `New Equipment Added`,
     { position, status });
  } else if(status == 'danger') {
   this.toastrService.show(
     status || 'Success',
     `Failure To Add Equipment`,
     { position, status });
  }
 }
}
