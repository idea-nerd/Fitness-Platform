import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeadsComponent } from './leads.component';
import { AddLeadComponent } from './add-lead/add-lead.component';
import { EditLeadComponent } from './edit-lead/edit-lead.component';
import { ViewLeadsComponent } from './view-leads/view-leads.component';

const routes: Routes = [{
  path: '',
  component: LeadsComponent,
  children: [
    {
      path: 'leads',
      component: LeadsComponent,
    },
    {
      path: 'add',
      component: AddLeadComponent,
    },
    {
      path: 'edit',
      component: EditLeadComponent,
    },
    {
      path: 'view',
      component: ViewLeadsComponent,
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
