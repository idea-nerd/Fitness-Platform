import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { Equipment } from './../../../../models/equipments.model';
import { Store } from '@ngxs/store';
import { UpdateEquipment, ReadSelectedEquipment, ReadEquipment, DeleteEquipment, UpdateEquipmentImage } from './../../../../actions/equipment.actions';

@Component({
  selector: 'ngx-edit-equipment',
  templateUrl: './edit-equipment.component.html',
  styleUrls: ['./edit-equipment.component.scss'],
})
export class EditEquipmentComponent implements OnInit {

  @Input() id: any;
  equipment: Equipment;
  equipmentsForm: FormGroup;
  validations: any = {
    length: 'Minimum 2 alpha characters',
    email: 'Invalid Email Format',
    phone: 'Invalid Phone Format| XXX-XXX-XXXX',
    required: 'Field Required',
    alphanumeric: 'Invalid Format| Alphanumberic Required',
  };
  message: any = {
    equipmentUpdated: 'Equipment Successfully Updated',
    equipmentUpdateFailed: 'Equipment Update Failed',
    equipmentDeleted: 'Equipment Successfully Deleted',
    equipmentDeleteFailed: 'Equipment Delete Failed',
}
  constructor(private store: Store, private toastrService: NbToastrService, protected ref: NbDialogRef<EditEquipmentComponent>) { }

  files: File[] = [];

  ngOnInit() {
    this.store.dispatch(new ReadSelectedEquipment(this.id)).subscribe((res) => {
      this.equipment = res.equipments.selectedEquipmentInstance[0];
      this.equipmentsForm = new FormGroup({
        'name': new FormControl(this.equipment.name, [Validators.required, Validators.minLength(2), Validators.pattern(`[a-zA-Z0-9', ]*`)]),
        'description': new FormControl(this.equipment.description, [Validators.required, Validators.pattern(`[a-zA-Z0-9', ]*`)]),
        'quantity': new FormControl(this.equipment.quantity, [Validators.required]),
        'costPrice': new FormControl(this.equipment.costPrice, [Validators.required]),
        'category': new FormControl(this.equipment.category, [Validators.required]),
      });
    });
  }

  UpdateEquipment(payload: any, id: number) {
    if (this.files.length > 0) {
      this.store.dispatch(new UpdateEquipmentImage(payload, id)).subscribe(() => {
        this.store.dispatch(new ReadEquipment());
        this.showToast('top-right', 
                       'success', 
                      this.message.equipmentUpdated);
        this.dismiss();
      });
    } else {
      this.store.dispatch(new UpdateEquipment({...payload}, id)).subscribe(() => {
      this.store.dispatch(new ReadEquipment());
      this.showToast('top-right', 
                       'success', 
                      this.message.equipmentUpdated);
      this.dismiss();
    });
    }

  }

  onSubmit = (payload: Equipment): void => {
    const fd = new FormData();
    if (this.files.length > 0) {
      fd.append('file', this.files[0], this.files[0].name);
      fd.append('name', payload.name);
      fd.append('description', payload.description);
      fd.append('quantity', payload.quantity);
      fd.append('category', payload.category);
      fd.append('costPrice', Number(payload.costPrice).toFixed(2));
      this.UpdateEquipment(fd, this.id);
    } else {
      this.UpdateEquipment(payload, this.id);
    }

  }

  onArchive() {
    this.store.dispatch(new DeleteEquipment(this.id)).subscribe(() => {
      this.store.dispatch(new ReadEquipment());
      this.showToast('top-right', 
                       'success', 
                       this.message.equipmentDeleted);
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
