import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubscriptionsComponent } from './subscriptions.component';
import { ViewSubscriptionsComponent } from './view-subscriptions/view-subscriptions.component';

const routes: Routes = [{
  path: '',
  component: SubscriptionsComponent,
  children: [
    {
      path: 'subscriptions',
      component: SubscriptionsComponent,
    },
    {
      path: 'view',
      component: ViewSubscriptionsComponent,
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
