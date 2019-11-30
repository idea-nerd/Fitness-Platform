import { OnInit, AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { Store } from '@ngxs/store';
import { ReadRevenue } from '../../../../actions/report.actions';

@Component({
  selector: 'ngx-revenue',
  templateUrl: './revenue.component.html',
  styleUrls: ['./revenue.component.scss']
})

export class RevenueComponent implements OnInit, AfterViewInit, OnDestroy {

  themeSubscription: any;

  profit: string;
  revenue: string;
  expense: string;
  report: any[];
  reportLabel: any[];
  options: any = {};

  constructor(private store: Store, private theme: NbThemeService) { }

  ngOnInit() {
    this.store.dispatch(new ReadRevenue()).subscribe((res) => {
        this.profit = res.reports.revenueReport[3].profit
        this.revenue = res.reports.revenueReport[1].revenue
        this.expense = res.reports.revenueReport[2].expenses
        this.report = res.reports.revenueReport[0].revenuePie
        this.reportLabel = res.reports.revenueReport[0].revenuePie[3].title

        this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

          const colors: any = config.variables;
          const echarts: any = config.variables.echarts;
    
          this.options = {
            backgroundColor: echarts.bg,
            color: ['#A947FF'],
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow',
              },
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true,
            },
            xAxis: [
              {
                type: 'category',
                data: this.reportLabel,
                axisTick: {
                  alignWithLabel: true,
                },
                axisLine: {
                  lineStyle: {
                    color: echarts.axisLineColor,
                  },
                },
                axisLabel: {
                  textStyle: {
                    color: echarts.textColor,
                  },
                },
              },
            ],
            yAxis: [
              {
                type: 'value',
                axisLine: {
                  lineStyle: {
                    color: echarts.axisLineColor,
                  },
                },
                splitLine: {
                  lineStyle: {
                    color: echarts.splitLineColor,
                  },
                },
                axisLabel: {
                  textStyle: {
                    color: echarts.textColor,
                  },
                },
              },
            ],
            series: [
              {
                name: 'Revenue',
                type: 'bar',
                barWidth: '60%',
                smooth: true,
                data: [ this.report[0].registrations, this.report[1].store, this.report[2].subscriptions ],
              },
            ],
          };
        });
    });
  }

  ngAfterViewInit() { }

  ngOnDestroy(): void {
      this.themeSubscription.unsubscribe();
  }

}
