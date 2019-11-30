import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { Store } from '@ngxs/store';
import { ClientDetails } from '../../../../models/clientDetails.model';
import { CreateClientDetails, ReadSelectedClientDetails } from '../../../../actions/clientDetails.actions';

import { generateCode } from '../../../../helpers/helpers';

@Component({
  selector: 'ngx-trainer-client-details-add',
  templateUrl: './trainer-client-details-add.component.html',
  styleUrls: ['./trainer-client-details-add.component.scss']
})
export class TrainerClientDetailsAddComponent implements OnInit {
  
  @Input() id: any;
  @Input() code: any;

  clientDetailsForm: FormGroup;

  constructor(private store: Store, private toastrService: NbToastrService, protected ref: NbDialogRef<TrainerClientDetailsAddComponent>) {}

   ngOnInit() {
    this.clientDetailsForm = new FormGroup({
      'bfp': new FormControl(null, [Validators.required]),
      'entryDate': new FormControl(null, [Validators.required]),
      'leftArm': new FormControl(null, [Validators.required]),
      'rightArm': new FormControl(null, [Validators.required]),
      'chest': new FormControl(null, [Validators.required]),
      'waist': new FormControl(null, [Validators.required]),
      'hips': new FormControl(null, [Validators.required]),
      'leftThigh': new FormControl(null, [Validators.required]),
      'rightThigh': new FormControl(null, [Validators.required]),
      'leftCalf': new FormControl(null, [Validators.required]),
      'rightCalf': new FormControl(null, [Validators.required]),
      'height': new FormControl(null, [Validators.required]),
      'weight': new FormControl(null, [Validators.required]),
      'notes': new FormControl(null, [Validators.required, Validators.minLength(2), Validators.pattern(`[a-zA-Z0-9 ]*`)]),
    });
  }

  CreateLead(payload: ClientDetails) {
    this.store.dispatch(new CreateClientDetails({ ...payload})).subscribe(() => {
      this.store.dispatch(new ReadSelectedClientDetails(this.code));
      this.showToast('top-right', 'success');
      this.dismiss();
    });
  }

  onSubmit = (payload: ClientDetails): void => {
    payload.status = 'Active';
    payload.clientCode = this.code;
    payload.clientDetailsCode = generateCode('cldet');
    this.CreateLead(payload);
  }

  showToast(position, status) {
    if(status == 'success') {
      this.toastrService.show(
       status || 'Success',
       `New Client Measurement Detail Added`,
       { position, status });
    } else if(status == 'danger') {
     this.toastrService.show(
       status || 'Success',
       `Failure To Add Client Measurement Detail`,
       { position, status });
    }
   }
   
   dismiss() { this.ref.close(); }

}
