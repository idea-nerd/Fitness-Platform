import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

import { Store } from '@ngxs/store';
import { ClientDetails } from './../../../../models/clientDetails.model';
import { ReadSelectedDetails } from './../../../../actions/clientDetails.actions';

@Component({
  selector: 'ngx-trainer-client-details-show',
  templateUrl: './trainer-client-details-show.component.html',
  styleUrls: ['./trainer-client-details-show.component.scss']
})
export class TrainerClientDetailsShowComponent implements OnInit {

  @Input() id: any;
  @Input() code: any;

  clientDetails: ClientDetails;
  clientDetailsPresent: boolean;

  constructor(private store: Store, protected ref: NbDialogRef<TrainerClientDetailsShowComponent>) {}

  ngOnInit() {
    this.store.dispatch(new ReadSelectedDetails(this.id)).subscribe((res) => {
      this.clientDetails = res.clientDetails.selectedClientDetailInstance[0];
      this.clientDetailsPresent = res.clientDetails.selectedClientDetailInstance > 0;
    });
  }

  dismiss() {
    this.ref.close();
  }

}
