import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Store, Select } from '@ngxs/store';
import { Subscription } from './../../../../models/payments.model';
import { PaymentState } from './../../../../state/payment.state';
import { Observable } from 'rxjs/Observable';

import { Settings } from './settings';
import { ReadSubscription } from '../../../../actions/payment.actions';

@Component({
  selector: 'ngx-subscription-payments',
  templateUrl: './subscription-payments.component.html',
  styleUrls: ['./subscription-payments.component.scss'],
})
export class SubscriptionPaymentsComponent implements OnInit {

  @Select(PaymentState.getSubscriptions) transactions$: Observable<Subscription>;

  source: LocalDataSource;
  settings: any = Settings;

  constructor(private store: Store) { }

  ngOnInit() {
    this.store.dispatch(new ReadSubscription());
  }

}
