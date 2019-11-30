import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { ClientDetails } from './../../../../models/clientDetails.model';
import { Store } from '@ngxs/store';
import { UpdateClientDetails, ReadClientDetails, DeleteClientDetails, ReadSelectedDetails, ReadSelectedClientDetails } from './../../../../actions/clientDetails.actions';

@Component({
  selector: 'ngx-trainer-client-details-edit',
  templateUrl: './trainer-client-details-edit.component.html',
  styleUrls: ['./trainer-client-details-edit.component.scss']
})
export class TrainerClientDetailsEditComponent implements OnInit {

  @Input() id: any;
  @Input() code: any;
  clientDetails: ClientDetails;
  clientDetailsPresent: boolean;
  clientDetailsForm: FormGroup;
  message: any = {
    clientDetailUpdated: 'Service Successfully Updated',
    clientDetailUpdateFailed: 'Service Update Failed',
    clientDetailDeleted: 'Service Successfully Deleted',
    clientDetailDeleteFailed: 'Service Delete Failed',
}
  constructor(private store: Store, private toastrService: NbToastrService, protected ref: NbDialogRef<TrainerClientDetailsEditComponent>) { }

  files: File[] = [];

  ngOnInit() {
    this.store.dispatch(new ReadSelectedDetails(this.id)).subscribe((res) => {
      this.clientDetails = res.clientDetails.selectedClientDetailInstance[0];
      this.clientDetailsPresent = res.clientDetails.selectedClientDetailInstance > 0;
      this.clientDetailsForm = new FormGroup({
        'bfp': new FormControl(this.clientDetails.bfp, [Validators.required]),
        'entryDate': new FormControl(this.clientDetails.entryDate, [Validators.required]),
        'leftArm': new FormControl(this.clientDetails.leftArm, [Validators.required]),
        'rightArm': new FormControl(this.clientDetails.rightArm, [Validators.required]),
        'chest': new FormControl(this.clientDetails.chest, [Validators.required]),
        'waist': new FormControl(this.clientDetails.waist, [Validators.required]),
        'hips': new FormControl(this.clientDetails.hips, [Validators.required]),
        'leftThigh': new FormControl(this.clientDetails.leftThigh, [Validators.required]),
        'rightThigh': new FormControl(this.clientDetails.rightThigh, [Validators.required]),
        'leftCalf': new FormControl(this.clientDetails.leftCalf, [Validators.required]),
        'rightCalf': new FormControl(this.clientDetails.rightCalf, [Validators.required]),
        'height': new FormControl(this.clientDetails.height, [Validators.required]),
        'weight': new FormControl(this.clientDetails.weight, [Validators.required]),
        'notes': new FormControl(this.clientDetails.notes, [Validators.required, Validators.minLength(2), Validators.pattern(`[a-zA-Z0-9 ]*`)]),
      });
    });
  }

  UpdateService(payload: any, id: number) {
    this.store.dispatch(new UpdateClientDetails(payload, id)).subscribe(() => {
      this.store.dispatch(new ReadSelectedClientDetails(this.code));
      this.showToast('top-right', 
                       'success', 
                      this.message.clientDetailUpdated);
      this.dismiss();
    });
  }

  onSubmit = (payload: ClientDetails): void => {
    this.UpdateService(payload, this.id);
  }

  onArchive() {
    this.store.dispatch(new DeleteClientDetails(this.id)).subscribe(() => {
      this.store.dispatch(new ReadSelectedClientDetails(this.code));
      this.showToast('top-right', 
                       'success', 
                       this.message.clientDetailDeleted);
      this.dismiss();
    });
  }

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

   dismiss() { this.ref.close(); }

}