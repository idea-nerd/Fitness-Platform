import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServicesComponent } from './services.component';
import { AddServiceComponent } from './add-service/add-service.component';
import { EditServiceComponent } from './edit-service/edit-service.component';
import { ViewServicesComponent } from './view-services/view-services.component';

const routes: Routes = [{
  path: '',
  component: ServicesComponent,
  children: [
    {
      path: 'services',
      component: ServicesComponent,
    },
    {
      path: 'add',
      component: AddServiceComponent,
    },
    {
      path: 'edit',
      component: EditServiceComponent,
    },
    {
      path: 'view',
      component: ViewServicesComponent,
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
