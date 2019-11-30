import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrainerClientsComponent } from './trainer-clients/trainer-clients.component';

const routes: Routes = [{
  path: '',
  component: TrainerClientsComponent,
  children: [
    {
      path: 'clients/view',
      component: TrainerClientsComponent,
    }
  ],
 },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {
}
