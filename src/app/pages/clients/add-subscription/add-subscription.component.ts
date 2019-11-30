import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { Subscription } from './../../../models/subscriptions.model';
import { Store, Select } from '@ngxs/store';
import { Plan } from './../../../models/plans.model';
import { PlanState } from './../../../state/plan.state';
import { Observable } from 'rxjs/Observable';
import { ReadPlan } from './../../../actions/plan.actions';
import { CreateSubscription, ReadSelectedClientSubscription } from './../../../actions/subscription.actions';
import { generateCode } from '../../../helpers/helpers';
import * as moment from 'moment';

@Component({
  selector: 'ngx-add-subscription',
  templateUrl: './add-subscription.component.html',
  styleUrls: ['./add-subscription.component.scss'],
})
export class AddSubscriptionComponent implements OnInit {
  @Input() id: any;
  @Input() code: any;
  @Input() data: any;
  @Select(PlanState.getPlans) plans$: Observable<Plan>;
  addDiscount: boolean;
  additionalFeesCharge: boolean;
  planExpirationPenalty: boolean;
  willChargePlanExpirationPenalty: boolean;
  selectedPlan: any;
  selectedDiscount: any;
  subscriptionsForm: FormGroup;
  validations: any = {
    length: 'Minimum 2 alpha characters',
    email: 'Invalid Email Format',
    phone: 'Invalid Phone Format| XXX-XXX-XXXX',
    required: 'Field Required',
    alphanumeric: 'Invalid Format| Alphanumberic Required',
  };

  constructor(private store: Store, private toastrService: NbToastrService, protected ref: NbDialogRef<AddSubscriptionComponent>) { }

  files: File[] = [];

  ngOnInit() {
    this.store.dispatch(new ReadPlan());
    this.subscriptionsForm = new FormGroup({
      'notes': new FormControl(null, [Validators.required, Validators.minLength(2), Validators.pattern(`[a-zA-Z0-9,' ]*`)]),
      'plans': new FormControl(),
      'discountAmount': new FormControl(),
      'additionalFees': new FormControl(),
    });

    this.addDiscount = false;
    this.additionalFeesCharge = false;

    // Verify If Account Is In Penalty
    const limit = moment("2 months ago", 'yyyy-mm-dd');
    const endDate = moment(this.data.endDate, "YYYYMMDD").fromNow();

    if (moment(endDate, 'yyyy-mm-dd').isAfter(limit)){
        this.planExpirationPenalty = true;
        this.willChargePlanExpirationPenalty = true;
    }
    else {
      this.planExpirationPenalty = false;
      this.willChargePlanExpirationPenalty = false;
    }
  }

  CreateSubscription(payload: Subscription) {
    this.store.dispatch(new CreateSubscription({...payload})).subscribe(() => {
      this.store.dispatch(new ReadSelectedClientSubscription(this.code));
      this.showToast('top-right', 'success');
      this.dismiss();
    });
  }

  onSubmit = (payload: Subscription): void => {
    const today = new Date();
    payload.subscriptionCode = generateCode('sub');
    payload.clientCode = this.code;
    payload.status = 'Active';
    payload.amount = this.calculatePrice().toString();
    payload.startDate = moment(today).format('YYYY/MM/DD').toString();
    payload.endDate = moment(today).add(1, 'M').format('YYYY/MM/DD').toString();
    const plan = this.subscriptionsForm.value.plans.split('|');
    payload.planCode = plan[0];
    payload.planId = plan[2];
    delete payload.plans;
    this.CreateSubscription(payload);
  }

  calculatePrice() {
    const plan = this.subscriptionsForm.value.plans.split('|');
    const planPrice = plan[1];
    const salePrice = planPrice;
    let cost = ((salePrice) - this.subscriptionsForm.value.discountAmount ).toFixed(2);
    // If additional fees
    if(this.additionalFeesCharge){
      let finalPrice: any;
      let fees = Number(this.subscriptionsForm.value.additionalFees);
      const calCost = Number(cost);
      finalPrice = (calCost + fees).toFixed(2);
      cost = finalPrice;
    } 
    // If In Penalty
    if(this.willChargePlanExpirationPenalty){
      let finalPrice: any;
      let penalty = Number(30.00);
      const calCost = Number(cost);
      finalPrice = (calCost + penalty).toFixed(2);
      return finalPrice;
    } else {
      return cost;
    }
  }

  onPenaltyCheckedChanged(args) {
    this.willChargePlanExpirationPenalty = !this.willChargePlanExpirationPenalty;
  }

  onFeesCheckedChanged(args) {
    this.additionalFeesCharge = !this.additionalFeesCharge;
  }

  onDiscountCheckedChanged(args) {
    this.addDiscount = !this.addDiscount;
  }

  dismiss() { this.ref.close(); }

  onSelect(event) {
    if (event.addedFiles)
      this.files.push(...event.addedFiles);
  }

  onRemove(event) { this.files.splice(this.files.indexOf(event), 1); }

  showToast(position, status) {
    if(status == 'success') {
      this.toastrService.show(
       status || 'Success',
       `New Subscription Added`,
       { position, status });
    } else if(status == 'danger') {
     this.toastrService.show(
       status || 'Success',
       `Failure To Add Subscription`,
       { position, status });
    }
   }

}
