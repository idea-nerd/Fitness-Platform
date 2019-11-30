import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientsComponent } from './clients.component';
import { CreateClientComponent } from './add-client/add-client.component';
import { AddSubscriptionComponent } from './add-subscription/add-subscription.component';
import { EditClientComponent } from './edit-client/edit-client.component';
import { ShowSubscriptionComponent } from './show-subscription/show-subscription.component';
import { ViewClientsComponent } from './view-clients/view-clients.component';

const routes: Routes = [{
  path: '',
  component: ClientsComponent,
  children: [
    {
      path: 'clients',
      component: ClientsComponent,
    },
    {
      path: 'add',
      component: CreateClientComponent,
    },
    {
      path: 'edit',
      component: EditClientComponent,
    },
    {
      path: 'view',
      component: ViewClientsComponent,
    },
    {
      path: 'subscription/add',
      component: AddSubscriptionComponent,
    },
    {
      path: 'subscription/show',
      component: ShowSubscriptionComponent,
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
