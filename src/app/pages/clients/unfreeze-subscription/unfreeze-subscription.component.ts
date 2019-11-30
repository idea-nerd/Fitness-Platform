import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { Subscription } from './../../../models/subscriptions.model';
import { ReadSelectedSubscription, CreateSubscription, ReadSelectedClientSubscription, DeleteSubscription, UpdateSubscription } from './../../../actions/subscription.actions';
import { Store } from '@ngxs/store';
import * as moment from 'moment';
import { ReadSelectedPlan } from '../../../actions/plan.actions';


@Component({
  selector: 'ngx-unfreeze-subscription',
  templateUrl: './unfreeze-subscription.component.html',
  styleUrls: ['./unfreeze-subscription.component.scss'],
})
export class UnfreezeSubscriptionComponent implements OnInit {

  @Input() id: any;
  @Input() code: any;
  @Input() status: any;

  subscription: Subscription;
  subscriptionsForm: FormGroup;

  constructor(private store: Store, private toastrService: NbToastrService, protected ref: NbDialogRef<UnfreezeSubscriptionComponent>) { }

  ngOnInit() {
    this.store.dispatch(new ReadSelectedSubscription(this.id)).subscribe((res) => {
      this.subscription = res.subscriptions.selectedSubscriptionInstance[0];
      const today = new Date();
      this.subscription.startDate = moment(today, 'YYYY/MM/DD').format('YYYY/MM/DD').toString();
      this.subscription.endDate = moment(this.subscription.startDate, 'YYYY/MM/DD').add(parseInt(this.subscription.extendedBy), 'days').format('YYYY/MM/DD').toString();
      this.subscriptionsForm = new FormGroup({
        'days': new FormControl({value: this.subscription.extendedBy, disabled: true}),
      });
    });
  }

  UnfreezeSubscription(payload: Subscription) {
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
    delete this.subscription.id;
    delete this.subscription.notes;
    delete this.subscription.planCode;
    delete this.subscription.planId;
    delete this.subscription.tax;
    this.UnfreezeSubscription(this.subscription);
  }

  dismiss() { this.ref.close(); }

  showToast(position, status) {
    if(status == 'success') {
      this.toastrService.show(
       status || 'Success',
       `Successfully UnFreeze Subscription`,
       { position, status });
    } else if(status == 'danger') {
     this.toastrService.show(
       status || 'Success',
       `Failure To UnFreeze Subscription`,
       { position, status });
    }
   }

}
