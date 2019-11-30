import { NgModule } from '@angular/core';
import {
  NbButtonModule,
  NbCardModule,
  NbProgressBarModule,
  NbTabsetModule,
  NbUserModule,
  NbIconModule,
  NbSelectModule,
  NbListModule,
  NbBadgeModule,
  NbCalendarModule,
} from '@nebular/theme';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { ChartModule } from 'angular2-chartjs';
import { ECommerceProgressSectionComponent } from './progress-section/progress-section.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { RouterModule } from '@angular/router';
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { ScheduleAllModule, RecurrenceEditorAllModule } from '@syncfusion/ej2-angular-schedule';
import { TimelineViewsService, TimelineMonthService, DayService, ResizeService, DragAndDropService } from '@syncfusion/ej2-angular-schedule';

@NgModule({
  imports: [
    ThemeModule,
    NbCardModule,
    NbUserModule,
    NbButtonModule,
    NbIconModule,
    NbTabsetModule,
    NbSelectModule,
    NbBadgeModule,
    NbListModule,
    NbCalendarModule,
    ChartModule,
    NbProgressBarModule,
    NgxEchartsModule,
    NgxChartsModule,
    LeafletModule,
    Ng2SmartTableModule,
    RouterModule,
    ScheduleModule,
    ScheduleAllModule, 
    RecurrenceEditorAllModule,
  ],
  declarations: [
    DashboardComponent,
    ECommerceProgressSectionComponent,
  ],
  providers: [DayService, TimelineViewsService, TimelineMonthService, ResizeService, DragAndDropService],
})
export class DashboardModule { }
