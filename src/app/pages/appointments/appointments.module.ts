import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbCardModule } from '@nebular/theme';
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { LayoutRoutingModule } from './appointments.routing.module';
import { TrainerScheduleComponent } from './trainer-schedule/trainer-schedule.component';
import { ViewAppointmentsComponent } from './view-appointments/view-appointments.component';
import { AppointmentsComponent } from './appointments.component';

import { ScheduleAllModule, RecurrenceEditorAllModule } from '@syncfusion/ej2-angular-schedule';
import {
  EventSettingsModel, View, GroupModel, TimelineViewsService, TimelineMonthService, DayService,
  ResizeService, DragAndDropService, ResourceDetails, ScheduleComponent,
} from '@syncfusion/ej2-angular-schedule';


@NgModule({
  declarations: [
    AppointmentsComponent,
    TrainerScheduleComponent,
    ViewAppointmentsComponent,
  ],
  imports: [
    CommonModule,
    NbCardModule,
    ScheduleModule,
    ScheduleAllModule, RecurrenceEditorAllModule,
    LayoutRoutingModule,
  ],
  providers: [DayService, TimelineViewsService, TimelineMonthService, ResizeService, DragAndDropService],
})
export class AppointmentsModule { }
