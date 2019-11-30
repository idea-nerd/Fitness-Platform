import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { Store, Select } from '@ngxs/store';
import { Client } from './../../../models/clients.model';
import { ClientState } from './../../../state/client.state';
import { Observable } from 'rxjs/Observable';
import { ReadTrainersClients } from './../../../actions/client.actions';

import { Settings } from './settings';

import { NbDialogService } from '@nebular/theme';
import { TrainerClientDetailsComponent } from './../trainer-client-details/trainer-client-details.component';
import { TrainerClientShowComponent } from '../trainer-client-show/trainer-client-show.component';

@Component({
  selector: 'ngx-trainer-clients',
  templateUrl: './trainer-clients.component.html',
  styleUrls: ['./trainer-clients.component.scss'],
})
export class TrainerClientsComponent implements OnInit {
  @Select(ClientState.getTrainersClients) clients$: Observable<Client>;

  source: LocalDataSource;
  settings: any = Settings;
  clients: any = [];
  selected: string;
  selectedCode: string;
  clientsPresent: boolean;

  constructor(private store: Store, private dialogService: NbDialogService) { }

  ngOnInit() {
    this.store.dispatch(new ReadTrainersClients()).subscribe((res) => {
      this.clientsPresent = res.clients.trainersClients.length > 0;
    });
  }

  onViewSelect(): void {
    this.dialogService.open(TrainerClientShowComponent, {
      context: {
        id: this.selected,
        code: this.selectedCode,
      },
    });
  }

  onDetailSelect(): void {
    this.dialogService.open(TrainerClientDetailsComponent, {
      context: {
        id: this.selected,
        code: this.selectedCode,
      },
    });
  }

  onSelected(event): void {
    if (event.isSelected)
      this.selected = event.data.id;
      this.selectedCode = event.data.clientCode;
  }

}
