import { Component, Input, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { Store, Select } from '@ngxs/store';
import { ClientDetails } from './../../../models/clientDetails.model';
import { ClientDetailState } from './../../../state/clientDetails.state';
import { Observable } from 'rxjs/Observable';

import { Settings } from './settings';

import { NbDialogService, NbDialogRef } from '@nebular/theme';
import { ReadSelectedClientDetails } from '../../../actions/clientDetails.actions';
import { TrainerClientDetailsAddComponent } from './trainer-client-details-add/trainer-client-details-add.component';
import { TrainerClientDetailsShowComponent } from './trainer-client-details-show/trainer-client-details-show.component';
import { TrainerClientDetailsEditComponent } from './trainer-client-details-edit/trainer-client-details-edit.component';


@Component({
  selector: 'ngx-trainer-client-details',
  templateUrl: './trainer-client-details.component.html',
  styleUrls: ['./trainer-client-details.component.scss'],
})
export class TrainerClientDetailsComponent implements OnInit {

  @Select(ClientDetailState.getSelectedClientDetails) clientDetails$: Observable<ClientDetails>;

  @Input() id: any;
  @Input() code: any;

  source: LocalDataSource;
  settings: any = Settings;
  selected: string;
  selectedCode: string;
  clientDetails: ClientDetails[];
  clientDetailsPresent: boolean;
  

  constructor(private store: Store, private dialogService: NbDialogService, protected ref: NbDialogRef<TrainerClientDetailsComponent>) { }

  ngOnInit() {
    this.store.dispatch(new ReadSelectedClientDetails(this.code)).subscribe((res) => {
      this.clientDetails = res.clientDetails.selectedClientDetails;
      this.clientDetailsPresent = res.clientDetails.selectedClientDetails.length > 0;
    });
  }

  onAddMeasurement(): void {
    this.dialogService.open(TrainerClientDetailsAddComponent, {
      context: {
        id: this.id,
        code: this.code,
      },
    });
  }

  onViewMeasurement(): void {
    this.dialogService.open(TrainerClientDetailsShowComponent, {
      context: {
        id: this.selected,
        code: this.selectedCode,
      },
    });
  }

  onEditMeasurement(): void {
    this.dialogService.open(TrainerClientDetailsEditComponent, {
      context: {
        id: this.selected,
        code: this.selectedCode,
      },
    });
  }

  onSelected(event): void {
    if (event.isSelected) {
      this.selected = event.data.id;
      this.selectedCode = event.data.clientCode;
    } 
  }

  dismiss() { this.ref.close(); }

}
