import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalesComponent } from './sales.component';
import { AddSaleComponent } from './add-sale/add-sale.component';
import { EditSaleComponent } from './edit-sale/edit-sale.component';
import { ViewSaleComponent } from './view-sale/view-sale.component';

const routes: Routes = [{
  path: '',
  component: SalesComponent,
  children: [
    {
      path: 'sales',
      component: SalesComponent,
    },
    {
      path: 'add',
      component: AddSaleComponent,
    },
    {
      path: 'edit',
      component: EditSaleComponent,
    },
    {
      path: 'view',
      component: ViewSaleComponent,
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
