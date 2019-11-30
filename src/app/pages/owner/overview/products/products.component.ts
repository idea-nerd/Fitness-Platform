import { OnInit, AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { Observable } from 'rxjs/Observable';
import { Store, Select } from '@ngxs/store';
import { DashboardState } from '../../../../state/dashboard.state';
import { Read } from '../../../../actions/dashboard.actions';

@Component({
  selector: 'ngx-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  @Select(DashboardState.getDashboard) dashboards$: Observable<[]>;

  Owner: any;
  Trainer: any;
  Manager: any;
  Client: any;
  User: any;
  user: any;
  managers: any;
  dashboard: any;
  pieOptions: any = {};
  barOptions: any = {};


  themeSubscription: any;

  data: {};
  options: any;

  constructor(private store: Store, private theme: NbThemeService, private authService: NbAuthService) {

    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
        if (token.isValid()) {
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
            case 'Client':
              this.User = true;
              break;
          }
        }
      });
  }

  ngOnInit() {
    this.store.dispatch(new Read()).subscribe((res) => {
      this.dashboard = res.dashboards.dashboard; console.log('dash', this.dashboard)
      if (this.Owner == true && this.dashboard) {
        if (!(this.dashboard.length == 17)) {
          this.store.dispatch(new Read()).subscribe((res) => {
            this.dashboard = res.dashboards.dashboard;
          })
        } else if (this.dashboard.length == 17) {
          this.managers = this.dashboard[16].manager_client;
          this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

            const colors: any = config.variables;
            const chartjs: any = config.variables.chartjs;

            this.data = {
              labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
              datasets: [{
                label: 'Subscription Renewals',
                data: [this.random(), this.random(), this.random(), this.random(), this.random(), this.random()],
                borderColor: colors.info,
                backgroundColor: colors.info,
                fill: false,
                pointRadius: 8,
                pointHoverRadius: 10,
              }, {
                label: 'Product Sales',
                data: [this.random(), this.random(), this.random(), this.random(), this.random(), this.random()],
                borderColor: colors.success,
                backgroundColor: colors.success,
                fill: false,
                pointRadius: 8,
                pointHoverRadius: 10,
              }],
            };

            this.options = {
              responsive: true,
              maintainAspectRatio: false,
              legend: {
                position: 'bottom',
                labels: {
                  fontColor: chartjs.textColor,
                },
              },
              hover: {
                mode: 'index',
              },
              scales: {
                xAxes: [
                  {
                    display: true,
                    scaleLabel: {
                      display: true,
                      labelString: 'Work Days',
                    },
                    gridLines: {
                      display: true,
                      color: chartjs.axisLineColor,
                    },
                    ticks: {
                      fontColor: chartjs.textColor,
                    },
                  },
                ],
                yAxes: [
                  {
                    display: true,
                    scaleLabel: {
                      display: true,
                      labelString: 'Amount Sold',
                    },
                    gridLines: {
                      display: true,
                      color: chartjs.axisLineColor,
                    },
                    ticks: {
                      fontColor: chartjs.textColor,
                    },
                  },
                ],
              },
            };
          });

        }
      } //End Owner
    });
  }

  ngAfterViewInit() {

  }

  ngOnDestroy(): void {
    if (this.Owner == true) {
      this.themeSubscription.unsubscribe();
    }
  }

  test() {
    alert('5');
  }

  private random() {
    return Math.round(Math.random() * 100);
  }
}
