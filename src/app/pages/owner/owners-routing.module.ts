import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OwnerComponent } from './owner.component';
import { RegistrationPaymentsComponent } from './payments/registration-payments/registration-payments.component';
import { StorePaymentsComponent } from './payments/store-payments/store-payments.component';
import { SubscriptionPaymentsComponent } from './payments/subscription-payments/subscription-payments.component';
import { ViewExpensesComponent } from './expenses/view-expenses/view-expenses.component';
import { ClientsComponent } from './overview/clients/clients.component';
import { SubscriptionsComponent } from './overview/subscriptions/subscriptions.component';
import { ProductsComponent } from './overview/products/products.component';
import { RevenueComponent } from './overview/revenue/revenue.component';
import { ActivityComponent } from './activity/activity.component';
import { ReportsComponent } from './overview/reports.component';
import { TrainersComponent } from './trainers/trainers.component';

const routes: Routes = [{
  path: '',
  component: OwnerComponent,
  children: [
    {
      path: 'activity',
      component: ActivityComponent,
      children: [
          {
            path: 'registration',
            component: RegistrationPaymentsComponent,
          },
          {
            path: 'subscription',
            component: SubscriptionPaymentsComponent,
          },
          {
            path: 'store',
            component: StorePaymentsComponent,
          },
          
      ]
    },
    {
      path: 'reports',
      component: ReportsComponent,
      children: [
        {
          path: 'clients',
          component: ClientsComponent,
        },
        {
          path: 'subscriptions',
          component: SubscriptionsComponent,
        },
        {
          path: 'revenue',
          component: RevenueComponent,
        },
        {
          path: 'products',
          component: ProductsComponent,
        },
      ]
    },
    {
      path: 'view',
      component: ViewExpensesComponent,
    },
    {
      path: 'trainers',
      component: TrainersComponent,
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
