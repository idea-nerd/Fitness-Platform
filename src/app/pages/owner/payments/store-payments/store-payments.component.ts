import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Store, Select } from '@ngxs/store';
import { Store as Stores } from './../../../../models/payments.model';
import { PaymentState } from './../../../../state/payment.state';
import { Observable } from 'rxjs/Observable';

import { Settings } from './settings';
import { ReadStore } from '../../../../actions/payment.actions';

@Component({
  selector: 'ngx-store-payments',
  templateUrl: './store-payments.component.html',
  styleUrls: ['./store-payments.component.scss'],
})
export class StorePaymentsComponent implements OnInit {

  @Select(PaymentState.getStore) transactions$: Observable<Stores>;

  source: LocalDataSource;
  settings: any = Settings;

  constructor(private store: Store) { }

  ngOnInit() {
    this.store.dispatch(new ReadStore());
  }

}
