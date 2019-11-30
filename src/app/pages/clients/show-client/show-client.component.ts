import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { NbDialogService } from '@nebular/theme';
import { Store, Select } from '@ngxs/store';
import { Client } from './../../../models/clients.model';
import { ReadSelectedClient } from './../../../actions/client.actions';
import { AddSubscriptionComponent } from '../add-subscription/add-subscription.component';
import { ShowSubscriptionComponent } from '../show-subscription/show-subscription.component';
import { RenewSubscriptionComponent } from '../renew-subscription/renew-subscription.component';
import { Settings } from './settings';
import { LocalDataSource } from 'ng2-smart-table';
import { Observable } from 'rxjs/Observable';
import { Subscription } from './../../../models/subscriptions.model';
import { SubscriptionState } from './../../../state/subscription.state';
import { ReadSelectedClientSubscription } from './../../../actions/subscription.actions';
import { FreezeSubscriptionComponent } from '../freeze-subscription/freeze-subscription.component';
import { ArchiveSubscriptionComponent } from '../archive-subscription/archive-subscription.component';
import { UnfreezeSubscriptionComponent } from '../unfreeze-subscription/unfreeze-subscription.component';
import * as moment from 'moment';


@Component({
  selector: 'ngx-show-client',
  templateUrl: './show-client.component.html',
  styleUrls: ['./show-client.component.scss'],
})
export class ShowClientComponent implements OnInit {

  @Select(SubscriptionState.getSelectedClientSubscriptionInstance) clientSubscriptions$: Observable<Subscription>;

  @Input() id: any;
  @Input() code: any;
  source: LocalDataSource;
  settings: any = Settings;
  client: Client;
  selected: string;
  selectedData: string;
  selectedStatus: string;
  selectedExpired: boolean;
  subscriptionsPresent: boolean;

  constructor(private store: Store, private dialogService: NbDialogService, protected ref: NbDialogRef<ShowClientComponent>) {}

  ngOnInit() {
    this.store.dispatch(new ReadSelectedClientSubscription(this.code)).subscribe((res) => {
      this.subscriptionsPresent = res.subscriptions.selectedClientSubscriptionInstance.length > 0;
    });
    this.store.dispatch(new ReadSelectedClient(this.id)).subscribe((res) => {
      this.client = res.clients.selectedClientInstance[0];
    });
  }

  onAddSubscription() {
    this.dialogService.open(AddSubscriptionComponent, {
      context: {
        id: this.id,
        code: this.code,
        data: this.selectedData,
      },
    });
  }

  onViewSubscription() {
    this.dialogService.open(ShowSubscriptionComponent, {
      context: {
        id: this.selected,
      },
    });
  }

  onRenewSubscription() {
    this.dialogService.open(RenewSubscriptionComponent, {
      context: {
        id: this.selected,
        code: this.code,
      },
    });
  }

  onFreezeSubscription() {
    this.dialogService.open(FreezeSubscriptionComponent, {
      context: {
        id: this.selected,
        code: this.code,
        status: this.selectedStatus,
      },
    });
  }

  onUnFreezeSubscription() {
    this.dialogService.open(UnfreezeSubscriptionComponent, {
      context: {
        id: this.selected,
        code: this.code,
        status: this.selectedStatus,
      },
    });
  }

  onArchiveSubscription() {
    this.dialogService.open(ArchiveSubscriptionComponent, {
      context: {
        id: this.selected,
        code: this.code,
      },
    });
  }

  /*
  *
    Retrieves Subscriptions expiration date and compares to today's date
    If expiration date is less than or equal to today's date it is flagged as expired.
  *  
  */
  onSelected(event) { 
    this.selected = event.data.id;
    this.selectedData = event.data;
    this.selectedStatus = event.data.status;
    const today =  moment(new Date()).format('YYYY/MM/DD');
    const endDate = moment(new Date(event.data.endDate)).format('YYYY/MM/DD');

    if(today >= endDate) {
      this.selectedExpired = true;
    } else {
      this.selectedExpired = false;
    }
  }

  dismiss() { this.ref.close(); }

}
