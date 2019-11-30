import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { Subscription } from './../../../models/subscriptions.model';
import { ReadSelectedSubscription, CreateSubscription, ReadSelectedClientSubscription, DeleteSubscription, UpdateSubscription } from './../../../actions/subscription.actions';
import { Store } from '@ngxs/store';
import * as moment from 'moment';
import { ReadSelectedPlan } from '../../../actions/plan.actions';


@Component({
  selector: 'ngx-freeze-subscription',
  templateUrl: './freeze-subscription.component.html',
  styleUrls: ['./freeze-subscription.component.scss'],
})
export class FreezeSubscriptionComponent implements OnInit {

  @Input() id: any;
  @Input() code: any;
  @Input() status: any;

  subscription: Subscription;
  subscriptionsForm: FormGroup;

  constructor(private store: Store, private toastrService: NbToastrService, protected ref: NbDialogRef<FreezeSubscriptionComponent>) {

  }

  ngOnInit() {
    this.store.dispatch(new ReadSelectedSubscription(this.id)).subscribe((res) => {
      this.subscription = res.subscriptions.selectedSubscriptionInstance[0];
      const startDate = moment(this.subscription.startDate, 'YYYY/MM/DD');
      const endDate = moment(this.subscription.endDate, 'YYYY/MM/DD');
      const remainingDays = endDate.diff(startDate, 'days');
      this.subscription.extendedBy = remainingDays.toString();
      this.subscriptionsForm = new FormGroup({
        'days': new FormControl({value: remainingDays, disabled: true}),
      });
    });
  }

  FreezeSubscription(payload: Subscription) {
    this.store.dispatch(new UpdateSubscription({...payload}, this.subscription.subscriptionCode)).subscribe(() => {
        this.store.dispatch(new ReadSelectedClientSubscription(this.code));
        this.showToast('top-right', 'success');
        this.dismiss();
    });
  }

  onSubmit = (payload: Subscription): void => {
    delete this.subscription.additionalFees;
    delete this.subscription.amount;
    delete this.subscription.clientCode;
    delete this.subscription.discountAmount;
    delete this.subscription.discountPercent;
    delete this.subscription.endDate;
    delete this.subscription.id;
    delete this.subscription.notes;
    delete this.subscription.planCode;
    delete this.subscription.planId;
    delete this.subscription.startDate;
    delete this.subscription.tax;
    this.FreezeSubscription(this.subscription);
  }

  dismiss() {
    this.ref.close();
  }

  showToast(position, status) {
    if(status == 'success') {
      this.toastrService.show(
       status || 'Success',
       `Successfully Freeze Subscription`,
       { position, status });
    } else if(status == 'danger') {
     this.toastrService.show(
       status || 'Success',
       `Failure To Freeze Subscription`,
       { position, status });
    }
   }

}
