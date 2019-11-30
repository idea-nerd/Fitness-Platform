import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
} from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { LayoutRoutingModule } from './subscriptions-routing.module';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ViewSubscriptionsComponent } from './view-subscriptions/view-subscriptions.component';
import { ShowSubscriptionComponent } from './show-subscription/show-subscription.component';
import { SubscriptionsComponent } from './subscriptions.component';
import { ExpiredSubscriptionsComponent } from './expired-subscriptions/expired-subscriptions.component';


@NgModule({
  declarations: [
    SubscriptionsComponent,
    ViewSubscriptionsComponent,
    ShowSubscriptionComponent,
    ExpiredSubscriptionsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
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
    NbIconModule,
    LayoutRoutingModule,
    Ng2SmartTableModule,
  ],
  entryComponents: [
    ShowSubscriptionComponent,
  ],
})
export class SubscriptionsModule { }
