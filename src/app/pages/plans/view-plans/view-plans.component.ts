import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { Store, Select } from '@ngxs/store';
import { Plan } from './../../../models/plans.model';
import { PlanState } from './../../../state/plan.state';
import { Observable } from 'rxjs/Observable';
import { ReadPlan, DeletePlan, SetSelectedPlan } from './../../../actions/plan.actions';

import { Settings } from './settings';

import { NbDialogService } from '@nebular/theme';
import { AddPlanComponent } from './../add-plan/add-plan.component';
import { EditPlanComponent } from './../edit-plan/edit-plan.component';
import { ShowPlanComponent } from './../show-plan/show-plan.component';


@Component({
  selector: 'ngx-view-plans',
  templateUrl: './view-plans.component.html',
  styleUrls: ['./view-plans.component.scss'],
})
export class ViewPlansComponent implements OnInit {

  @Select(PlanState.getPlans) plans$: Observable<Plan>;

  source: LocalDataSource;
  settings: any = Settings;
  plans: any = [];
  selected: string;
  plansPresent: boolean;

  constructor(private store: Store, private dialogService: NbDialogService) { }

  ngOnInit() {
    this.store.dispatch(new ReadPlan()).subscribe((res) => {
      this.plansPresent = res.plans.plans.length > 0;
    });
  }

  deletePlan(id: number) {
    this.store.dispatch(new DeletePlan(id));
  }

  editPlan(payload: Plan) {
    this.store.dispatch(new SetSelectedPlan(payload));
  }

  onCreateSelect(): void {
    this.dialogService.open(AddPlanComponent)
    .onClose.subscribe(() => {
      this.store.dispatch(new ReadPlan())
    });
  }

  onViewSelect(): void {
    this.dialogService.open(ShowPlanComponent, {
      context: {
        id: this.selected,
      },
    });
  }

  onEditSelect(): void {
    this.dialogService.open(EditPlanComponent, {
      context: {
        id: this.selected,
      },
    });
  }

  onSelected(event): void {
    if (event.isSelected)
      this.selected = event.data.id;
  }

}
