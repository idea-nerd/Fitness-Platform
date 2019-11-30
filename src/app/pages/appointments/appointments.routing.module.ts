import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppointmentsComponent } from './appointments.component';
import { TrainerScheduleComponent } from './trainer-schedule/trainer-schedule.component';
import { ViewAppointmentsComponent } from './view-appointments/view-appointments.component';

const routes: Routes = [{
  path: '',
  component: AppointmentsComponent,
  children: [
    {
      path: 'appointments',
      component: AppointmentsComponent,
    },
    {
      path: 'trainers',
      component: TrainerScheduleComponent,
    },
    {
      path: 'view',
      component: ViewAppointmentsComponent,
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
