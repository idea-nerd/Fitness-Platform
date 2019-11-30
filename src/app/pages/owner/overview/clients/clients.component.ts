import { OnInit, AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { Store } from '@ngxs/store';
import { ReadClients } from '../../../../actions/report.actions';

@Component({
  selector: 'ngx-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit, AfterViewInit, OnDestroy {

  data: any;
  options: any;
  themeSubscription: any;

  newClients: string;
  activeClients: string;
  inactiveClients: string;
  clientLabel: any[];

  constructor(private store: Store, private theme: NbThemeService) { }

  ngOnInit() {
    this.store.dispatch(new ReadClients()).subscribe((res) => {
      this.newClients = res.reports.clientReport[0].clientCharts[0].newClients
      this.activeClients = res.reports.clientReport[0].clientCharts[1].activeClients
      this.inactiveClients = res.reports.clientReport[0].clientCharts[2].inactiveClients
      this.clientLabel = res.reports.clientReport[0].clientCharts[3].title

      this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

        const colors = config.variables;
        const echarts: any = config.variables.echarts;
  
        this.options = {
          backgroundColor: echarts.bg,
          color: ['#A947FF', '#24DEFF', '#EAC435'],
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)',
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: this.clientLabel,
            textStyle: {
              color: echarts.textColor,
            },
          },
          series: [
            {
              name: 'Clients',
              type: 'pie',
              radius: '80%',
              center: ['50%', '50%'],
              data: [
                { value: this.newClients, name: this.clientLabel[0] },
                { value: this.activeClients, name: this.clientLabel[1] },
                { value: this.inactiveClients, name: this.clientLabel[2] },
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

  ngOnDestroy(): void { this.themeSubscription.unsubscribe(); }

}
