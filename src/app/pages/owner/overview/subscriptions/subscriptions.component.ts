import { OnInit, AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { Store } from '@ngxs/store';
import { ReadSubscriptions } from '../../../../actions/report.actions';

@Component({
  selector: 'ngx-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss']
})
export class SubscriptionsComponent implements OnInit {

  data: any;
  options: any;
  themeSubscription: any;

  activeSubscriptions: string;
  expiredSubscriptions: string;
  frozenSubscriptions: string;
  newSubscriptions: string;

  constructor(private store: Store, private theme: NbThemeService) { }

  ngOnInit() {
    this.store.dispatch(new ReadSubscriptions()).subscribe((res) => {
      this.activeSubscriptions = res.reports.subscriptionsReport[0].activeSubscriptions
      this.expiredSubscriptions = res.reports.subscriptionsReport[1].expiredSubscriptions
      this.frozenSubscriptions = res.reports.subscriptionsReport[2].frozenSubscriptions
      this.newSubscriptions = res.reports.subscriptionsReport[3].newSubscriptions

      this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

        const colors = config.variables;
        const echarts: any = config.variables.echarts;
  
        this.options = {
          backgroundColor: echarts.bg,
          color: ['#A947FF', '#24DEFF', '#EAC435', '#03CEA4'],
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)',
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['Active Subscription', 'Expired Subscription', 'Frozen Subscription', 'New Subscription'],
            textStyle: {
              color: echarts.textColor,
            },
          },
          series: [
            {
              name: 'Subscription',
              type: 'pie',
              radius: '80%',
              center: ['50%', '50%'],
              data: [
                { value: this.activeSubscriptions, name: 'Active Subscription' },
                { value: this.expiredSubscriptions, name: 'Expired Subscription' },
                { value: this.frozenSubscriptions, name: 'Frozen Subscription' },
                { value: this.newSubscriptions, name: 'New Subscription' },
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: echarts.itemHoverShadowColor,
                },
              },
              label: {
                normal: {
                  textStyle: {
                    color: echarts.textColor,
                  },
                },
              },
              labelLine: {
                normal: {
                  lineStyle: {
                    color: echarts.axisLineColor,
                  },
                },
              },
            },
          ],
        };
      });
    });
  }

  ngAfterViewInit() { }

  /*ngOnDestroy(): void {
      this.themeSubscription.unsubscribe();
  }*/

}
