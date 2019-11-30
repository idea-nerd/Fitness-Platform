import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { Subscription } from './../../../models/subscriptions.model';
import { ReadSelectedSubscription, CreateSubscription, ReadSelectedClientSubscription, DeleteSubscription, ArchiveSubscription } from './../../../actions/subscription.actions';
import { Store } from '@ngxs/store';
import * as moment from 'moment';
import { ReadSelectedPlan } from '../../../actions/plan.actions';


@Component({
  selector: 'ngx-renew-subscription',
  templateUrl: './renew-subscription.component.html',
  styleUrls: ['./renew-subscription.component.scss'],
})
export class RenewSubscriptionComponent implements OnInit {

  @Input() id: any;
  @Input() code: any;

  subscription: Subscription;
  subscriptionsForm: FormGroup;

  constructor(private store: Store, private toastrService: NbToastrService, protected ref: NbDialogRef<RenewSubscriptionComponent>) {}

  ngOnInit() {
    this.store.dispatch(new ReadSelectedSubscription(this.id)).subscribe((res) => {
      this.subscription = res.subscriptions.selectedSubscriptionInstance[0];
      this.store.dispatch(new ReadSelectedPlan(parseInt(this.subscription.planId))).subscribe((res) => {
        this.subscription.amount = res.plans.selectedPlanInstance[0].amount;
      });
      this.subscriptionsForm = new FormGroup({
        'months': new FormControl(null, [Validators.required]),
      });
    });
  }

  CreateSubscription(payload: Subscription) {
    this.store.dispatch(new ArchiveSubscription(this.subscription.subscriptionCode)).subscribe(() => {
      this.store.dispatch(new CreateSubscription({...payload})).subscribe(() => {
          this.store.dispatch(new ReadSelectedClientSubscription(this.code));
          this.showToast('top-right', 'success');
          this.dismiss();
      });
    });

  }

  onSubmit = (payload: Subscription): void => {
    delete this.subscription.additionalFees;
    delete this.subscription.extendedBy;
    delete this.subscription.discountAmount;
    delete this.subscription.id;
    delete this.subscription.tax;
    this.subscription.amount = this.calculatePrice().toString();

    const months = parseInt(this.subscriptionsForm.value.months);
    this.subscription.startDate = this.subscription.endDate;
    const holder = moment(this.subscription.startDate, 'YYYY/MM/DD');
    const today =  moment().format('YYYY/MM/DD').toString();
    const endDate = moment(this.subscription.startDate).format('YYYY/MM/DD').toString();

    /*
    *
    *
      Compares subscription endDate with today's date. If equal or a past date, the date is considered expired and
      the subscription is renewed starting at the current date, else if the subscription is still active subscription is renewed 30days 
      after active endDate.
    * 
    * 
    */
    if(endDate > today){ 
        this.subscription.startDate = this.subscription.endDate;
        this.subscription.endDate = moment(holder).add(months, 'M').format('YYYY/MM/DD').toString();
    } else if(endDate <= today){ 
        this.subscription.startDate = moment().format('YYYY/MM/DD').toString();
        this.subscription.endDate = moment(this.subscription.startDate).add(months, 'M').format('YYYY/MM/DD').toString();
    }
    
    this.CreateSubscription(this.subscription);
  }

  calculatePrice() { 
    return (Number(this.subscription.amount) * this.subscriptionsForm.value.months).toFixed(2); 
  }

  dismiss() { this.ref.close(); }

  showToast(position, status) {
    if(status == 'success') {
      this.toastrService.show(
       status || 'Success',
       `Successfully Renewed Subscription`,
       { position, status });
    } else if(status == 'danger') {
     this.toastrService.show(
       status || 'Success',
       `Failure To Renew Subscription`,
       { position, status });
    }
   }
}
