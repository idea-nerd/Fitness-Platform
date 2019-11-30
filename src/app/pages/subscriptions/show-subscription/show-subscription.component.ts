import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

import { Store } from '@ngxs/store';
import { Subscription } from './../../../models/subscriptions.model';
import { ReadSelectedSubscription } from './../../../actions/subscription.actions';


@Component({
  selector: 'ngx-show-subscription',
  templateUrl: './show-subscription.component.html',
  styleUrls: ['./show-subscription.component.scss'],
})
export class ShowSubscriptionComponent implements OnInit {

  @Input() id: any;
  subscription: Subscription;

  constructor(private store: Store, protected ref: NbDialogRef<ShowSubscriptionComponent>) {}

  ngOnInit() {
    this.store.dispatch(new ReadSelectedSubscription(this.id)).subscribe((res) => {
      this.subscription = res.subscriptions.selectedSubscriptionInstance[0];
    });
  }

  onAddSubscription(id: number) {
    console.log('Add Subscription', id);
  }

  onViewSubscription(id: number) {
    console.log('View Subscription', id);
  }

  onRenewSubscription(id: number) {
    console.log('Renew Subscription', id);
  }

  onArchiveSubscription(id: number) {
    console.log('Archive Subscription', id);
  }

  dismiss() {
    this.ref.close();
  }

}
