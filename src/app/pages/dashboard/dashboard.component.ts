import { OnInit, Component } from '@angular/core';
import { EventSettingsModel, View } from '@syncfusion/ej2-angular-schedule';
import { DayService, WeekService, WorkWeekService, MonthService, AgendaService } from '@syncfusion/ej2-angular-schedule';
import { LocalDataSource } from 'ng2-smart-table';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { Observable } from 'rxjs/Observable';
import { Store, Select } from '@ngxs/store';
import { DashboardState} from './../../state/dashboard.state';
import { Read } from './../../actions/dashboard.actions';
import { ReadAppointment } from '../../actions/appointment.actions';
import {Router} from "@angular/router"

import { Expense, Subscriptions, Birthday, Leads, Clients } from './settings';
@Component({
  selector: 'ngx-ecommerce',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService],
})
export class DashboardComponent implements OnInit {

  @Select(DashboardState.getDashboard) dashboards$: Observable<[]>;

  Owner: any;
  Trainer: any;
  Manager: any;
  
  user: any;
  managers: any;
  dashboard: any;
  source: LocalDataSource;
  expenseSettings: any = Expense;
  subscriptionsSettings: any = Subscriptions;
  birthdaySettings: any = Birthday;
  leadSettings: any = Leads;
  clientSettings: any = Clients;

  themeSubscription: any;

  public eventSettings: EventSettingsModel;
  public currentView: View = 'Agenda';

  constructor(private store: Store, private authService: NbAuthService, private router: Router) {

    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => { 
        if (token.isValid()) { console.log('test', token)
          this.user = token.getPayload(); 
          this.user = this.user.payload[0];
          switch (this.user.role) { 
            case 'Owner':
              this.Owner = true;
              break;
            case 'Trainer':
              this.Trainer = true;
              break;
            case 'Manager':
              this.Manager = true;
              break;
          }
        }
    });
}

ngOnInit() {

  if(this.Owner == true) {
    this.router.navigate(['/pages/owners/reports/revenue'])
  } else {
      this.store.dispatch(new Read()).subscribe((res) => {
      this.dashboard = res.dashboards.dashboard;
      if(this.Manager == true) {
        this.managers = this.dashboard[7].manager_client; console.log('test', this.managers)
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
    }, (error) =>{
      console.log('error here', error)
    });
  }

  
}

oncellClick = (args) => args.cancel = true
onCellDoubleClick = (args) => args.cancel = true 

}
