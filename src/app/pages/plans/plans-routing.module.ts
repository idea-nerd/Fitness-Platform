import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlansComponent } from './plans.component';
import { AddPlanComponent } from './add-plan/add-plan.component';
import { EditPlanComponent } from './edit-plan/edit-plan.component';
import { ViewPlansComponent } from './view-plans/view-plans.component';

const routes: Routes = [{
  path: '',
  component: PlansComponent,
  children: [
    {
      path: 'plans',
      component: PlansComponent,
    },
    {
      path: 'add',
      component: AddPlanComponent,
    },
    {
      path: 'edit',
      component: EditPlanComponent,
    },
    {
      path: 'view',
      component: ViewPlansComponent,
    },
  ],
 },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {
}
