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
import { LayoutRoutingModule } from './clients-routing.module';
import { LoaderModule } from './../../@theme/components/loader/loader.module';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { AddSubscriptionComponent } from './add-subscription/add-subscription.component';
import { ShowSubscriptionComponent } from './show-subscription/show-subscription.component';
import { CreateClientComponent } from './add-client/add-client.component';
import { EditClientComponent } from './edit-client/edit-client.component';
import { ViewClientsComponent } from './view-clients/view-clients.component';
import { ShowClientComponent } from './show-client/show-client.component';
import { ClientsComponent } from './clients.component';
import { RenewSubscriptionComponent } from './renew-subscription/renew-subscription.component';
import { FreezeSubscriptionComponent } from './freeze-subscription/freeze-subscription.component';
import { ArchiveSubscriptionComponent } from './archive-subscription/archive-subscription.component';
import { UnfreezeSubscriptionComponent } from './unfreeze-subscription/unfreeze-subscription.component';


@NgModule({
  declarations: [
    ClientsComponent,
    CreateClientComponent,
    EditClientComponent,
    ViewClientsComponent,
    ShowClientComponent,
    AddSubscriptionComponent,
    ShowSubscriptionComponent,
    RenewSubscriptionComponent,
    FreezeSubscriptionComponent,
    ArchiveSubscriptionComponent,
    UnfreezeSubscriptionComponent,
  ],
  imports: [
    LoaderModule,
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
    CreateClientComponent,
    EditClientComponent,
    ShowClientComponent,
    AddSubscriptionComponent,
    ShowSubscriptionComponent,
    RenewSubscriptionComponent,
    FreezeSubscriptionComponent,
    ArchiveSubscriptionComponent,
    UnfreezeSubscriptionComponent,
  ],
})
export class ClientsModule { }
