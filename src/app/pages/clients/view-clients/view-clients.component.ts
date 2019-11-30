import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { Store, Select } from '@ngxs/store';
import { Client } from './../../../models/clients.model';
import { ClientState } from './../../../state/client.state';
import { Observable } from 'rxjs/Observable';
import { ReadClient, DeleteClient, SetSelectedClient } from './../../../actions/client.actions';

import { Settings } from './settings';

import { NbDialogService } from '@nebular/theme';
import { CreateClientComponent } from './../add-client/add-client.component';
import { EditClientComponent } from './../edit-client/edit-client.component';
import { ShowClientComponent } from './../show-client/show-client.component';

@Component({
  selector: 'ngx-view-clients',
  templateUrl: './view-clients.component.html',
  styleUrls: ['./view-clients.component.scss'],
})
export class ViewClientsComponent implements OnInit {

  @Select(ClientState.getClients) clients$: Observable<Client>;

  source: LocalDataSource;
  settings: any = Settings;
  clients: any = [];
  selected: string;
  selectedCode: string;
  clientsPresent: boolean;

  constructor(private store: Store, private dialogService: NbDialogService) { }

  ngOnInit() {
    this.store.dispatch(new ReadClient()).subscribe((res) => {
      this.clientsPresent = res.clients.clients.length > 0;
    });
    // Verify Navigation Stack IsEmpty | Checking is routed here from adding clients via leads page
    if(!(history.state.data == undefined)){
      const payload = history.state.data;
      this.onCreateSelect(payload)
    } 
  }

  deleteClient(payload: Client, id: number) {
    this.store.dispatch(new DeleteClient(id));
  }

  editClient(payload: Client) {
    this.store.dispatch(new SetSelectedClient(payload));
  }

  onCreateSelect(args: any = {}): void {
    this.dialogService.open(CreateClientComponent, {
      context: {
        data: args,
      },
    })
      .onClose.subscribe(() => {
        this.store.dispatch(new ReadClient())
      });
  }

  onViewSelect(): void {
    this.dialogService.open(ShowClientComponent, {
      context: {
        id: this.selected,
        code: this.selectedCode,
      },
    });
  }

  onEditSelect(): void {
    this.dialogService.open(EditClientComponent, {
      context: {
        id: this.selected,
      },
    });
  }

  onSelected(event): void {
    if (event.isSelected)
      this.selected = event.data.id;
      this.selectedCode = event.data.clientId;
  }

}
