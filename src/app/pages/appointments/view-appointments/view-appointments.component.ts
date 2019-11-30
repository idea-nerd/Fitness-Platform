import { Component, OnInit } from '@angular/core';
import { EventSettingsModel, View } from '@syncfusion/ej2-angular-schedule';

import { DayService, WeekService, WorkWeekService, MonthService, AgendaService } from '@syncfusion/ej2-angular-schedule';

import { Store } from '@ngxs/store';
import { ReadAppointment } from '../../../actions/appointment.actions';

@Component({
  selector: 'ngx-view-appointments',
  templateUrl: './view-appointments.component.html',
  styleUrls: ['./view-appointments.component.scss'],
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService],
})
export class ViewAppointmentsComponent implements OnInit {

  public eventSettings: EventSettingsModel;
  public currentView: View = 'Agenda';

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(new ReadAppointment()).subscribe((res) => {
      for (const [key, value] of Object.entries(res.appointments.appointments)) {
            value['Id'] = parseInt(value['Id']);
            value['ClientID'] = parseInt(value['ClientID']);
            value['EmployeeId'] = parseInt(value['EmployeeId']);
            value['StartTime'] = new Date(value['StartTime']);
            value['EndTime'] = new Date(value['EndTime']);
      }
      this.eventSettings = { dataSource: res.appointments.appointments };
      console.log(this.eventSettings);
    });
  }

}
