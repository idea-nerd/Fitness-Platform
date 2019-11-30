import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'admin-dashboard',
      component: DashboardComponent,
    },
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'products',
      loadChildren: () => import('./store/products/products.module')
        .then(m => m.ProductsModule),
    },
    {
      path: 'sales',
      loadChildren: () => import('./store/sales/sales.module')
        .then(m => m.SalesModule),
    },
    {
      path: 'equipments',
      loadChildren: () => import('./inventory/equipment/equipment.module')
        .then(m => m.EquipmentModule),
    },
    {
      path: 'clients',
      loadChildren: () => import('./clients/clients.module')
        .then(m => m.ClientsModule),
    },
    {
      path: 'leads',
      loadChildren: () => import('./leads/leads.module')
        .then(m => m.LeadsModule),
    },
    {
      path: 'subscriptions',
      loadChildren: () => import('./subscriptions/subscriptions.module')
        .then(m => m.SubscriptionsModule),
    },
    {
      path: 'appointments',
      loadChildren: () => import('./appointments/appointments.module')
        .then(m => m.AppointmentsModule),
    },
    {
      path: 'plans',
      loadChildren: () => import('./plans/plans.module')
        .then(m => m.PlansModule),
    },
    {
      path: 'services',
      loadChildren: () => import('./services/services.module')
        .then(m => m.ServicesModule),
    },
    {
      path: 'users',
      loadChildren: () => import('./users/users.module')
        .then(m => m.UsersModule),
    },
    {
      path: 'owners',
      loadChildren: () => import('./owner/owner.module')
        .then(m => m.OwnerModule),
    },
    {
      path: 'payments',
      loadChildren: () => import('./owner/owner.module')
        .then(m => m.OwnerModule),
    },
    {
      path: 'expenses',
      loadChildren: () => import('./owner/owner.module')
        .then(m => m.OwnerModule),
    },
    {
      path: 'checkin',
      loadChildren: () => import('./checkin/checkin.module')
        .then(m => m.CheckinModule),
    },
    {
      path: 'trainers',
      loadChildren: () => import('./trainers/trainers.module')
        .then(m => m.TrainersModule),
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
