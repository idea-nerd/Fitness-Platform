/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NbSecurityModule } from '@nebular/security';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';

import { ClientState } from './state/client.state';
import { ClientDetailState } from './state/clientDetails.state';
import { EquipmentState } from './state/equipment.state';
import { SubscriptionState } from './state/subscription.state';
import { AppointmentState } from './state/appointment.state';
import { AttendanceState } from './state/attendance.state';
import { ExpenseState } from './state/expense.state';
import { DashboardState } from './state/dashboard.state';
import { PaymentState } from './state/payment.state';
import { LeadState } from './state/lead.state';
import { UserState } from './state/user.state';
import { ServiceState } from './state/service.state';
import { ProductState } from './state/product.state';
import { SaleState } from './state/sale.state';
import { PlanState } from './state/plan.state';
import { ReportState } from './state/report.state';
import { TrainerState } from './state/trainer.state';
import { RoleState } from './state/roles.state';

import { AuthGuardService } from './services/authGuard/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,

    NgxsModule.forRoot([
      DashboardState,
      ClientState,
      ClientDetailState,
      UserState,
      EquipmentState,
      SubscriptionState,
      ExpenseState,
      AppointmentState,
      AttendanceState,
      PaymentState,
      LeadState,
      ServiceState,
      ProductState,
      SaleState,
      PlanState,
      ReportState,
      RoleState,
      TrainerState
    ]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),

    ThemeModule.forRoot(),

    NbSecurityModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    CoreModule.forRoot(),
  ],
  bootstrap: [AppComponent],
  providers: [ AuthGuardService ],
})
export class AppModule {
}
