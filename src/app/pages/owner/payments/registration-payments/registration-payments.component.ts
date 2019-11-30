import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Store, Select } from '@ngxs/store';
import { Registration } from './../../../../models/payments.model';
import { PaymentState } from './../../../../state/payment.state';
import { Observable } from 'rxjs/Observable';

import { Settings } from './settings';
import { ReadRegistration } from '../../../../actions/payment.actions';

@Component({
  selector: 'ngx-registration-payments',
  templateUrl: './registration-payments.component.html',
  styleUrls: ['./registration-payments.component.scss'],
})
export class RegistrationPaymentsComponent implements OnInit {

  @Select(PaymentState.getRegistrations) registrations$: Observable<Registration>;

  source: LocalDataSource;
  settings: any = Settings;

  constructor(private store: Store) { }

  ngOnInit() {
    this.store.dispatch(new ReadRegistration());
  }

}
