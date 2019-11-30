import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

import { Store } from '@ngxs/store';
import { Plan } from './../../../models/plans.model';
import { ReadSelectedPlan } from './../../../actions/plan.actions';



@Component({
  selector: 'ngx-show-plan',
  templateUrl: './show-plan.component.html',
  styleUrls: ['./show-plan.component.scss'],
})
export class ShowPlanComponent implements OnInit {

  @Input() id: any;
  plan: Plan;

  constructor(private store: Store, protected ref: NbDialogRef<ShowPlanComponent>) { }

  ngOnInit() {
    this.store.dispatch(new ReadSelectedPlan(this.id)).subscribe((res) => {
      this.plan = res.plans.selectedPlanInstance[0];
    });
  }

  dismiss() {
    this.ref.close();
  }

}
