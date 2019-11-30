import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'angular2-chartjs';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbDialogModule,
  NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
  NbRouteTabsetModule
} from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { LayoutRoutingModule } from './owners-routing.module';
import { OwnerComponent } from './owner.component';
import { RegistrationPaymentsComponent } from './payments/registration-payments/registration-payments.component';
import { SubscriptionPaymentsComponent } from './payments/subscription-payments/subscription-payments.component';
import { StorePaymentsComponent } from './payments/store-payments/store-payments.component';
import { AddExpenseComponent } from './expenses/add-expense/add-expense.component';
import { EditExpenseComponent } from './expenses/edit-expense/edit-expense.component';
import { ShowExpenseComponent } from './expenses/show-expense/show-expense.component';
import { ViewExpensesComponent } from './expenses/view-expenses/view-expenses.component';
import { ClientsComponent } from './overview/clients/clients.component';
import { SubscriptionsComponent } from './overview/subscriptions/subscriptions.component';
import { ProductsComponent } from './overview/products/products.component';
import { RevenueComponent } from './overview/revenue/revenue.component';
import { ActivityComponent } from './activity/activity.component';
import { ReportsComponent } from './overview/reports.component';
import { TrainersComponent } from './trainers/trainers.component';
import { TrainerStatsComponent } from './trainers/trainer-stats/trainer-stats.component';


@NgModule({
  declarations: [
    OwnerComponent,
    RegistrationPaymentsComponent,
    SubscriptionPaymentsComponent,
    StorePaymentsComponent,
    AddExpenseComponent,
    EditExpenseComponent,
    ShowExpenseComponent,
    ViewExpensesComponent,
    ClientsComponent,
    SubscriptionsComponent,
    ProductsComponent,
    RevenueComponent,
    ActivityComponent,
    ReportsComponent,
    TrainersComponent,
    TrainerStatsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ThemeModule,
    NbInputModule,
    NbCardModule,
    NbDialogModule.forRoot(),
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    NbSelectModule,
    NbRouteTabsetModule,
    NbIconModule,
    LayoutRoutingModule,
    Ng2SmartTableModule,
    NgxEchartsModule,
    NgxChartsModule,
    ChartModule,
  ],
  entryComponents: [
    AddExpenseComponent,
    EditExpenseComponent,
    ShowExpenseComponent
  ],
})
export class OwnerModule { }
