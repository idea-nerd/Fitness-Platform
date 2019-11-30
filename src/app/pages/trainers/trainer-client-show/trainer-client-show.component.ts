import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

import { Store } from '@ngxs/store';
import { Client } from './../../../models/clients.model';
import { ReadSelectedClient } from './../../../actions/client.actions';



@Component({
  selector: 'ngx-trainer-client-show',
  templateUrl: './trainer-client-show.component.html',
  styleUrls: ['./trainer-client-show.component.scss']
})
export class TrainerClientShowComponent implements OnInit {
  @Input() id: any;
  @Input() code: any;
  client: Client;
  clientsPresent: boolean;

  constructor(private store: Store, protected ref: NbDialogRef<TrainerClientShowComponent>) {}

  ngOnInit() {
    this.store.dispatch(new ReadSelectedClient(this.id)).subscribe((res) => {
      this.client = res.clients.selectedClientInstance[0];
      this.clientsPresent = res.clients.selectedClientInstance[0].length > 0;
    });
  }

  dismiss() { this.ref.close(); }

}