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
import { LayoutRoutingModule } from './trainers-routing.module';
import { LoaderModule } from './../../@theme/components/loader/loader.module';
import { TrainerClientsComponent } from './trainer-clients/trainer-clients.component';
import { TrainerClientDetailsComponent } from './trainer-client-details/trainer-client-details.component';
import { TrainersComponent } from './trainers.component';
import { TrainerClientShowComponent } from './trainer-client-show/trainer-client-show.component';
import { TrainerClientDetailsAddComponent } from './trainer-client-details/trainer-client-details-add/trainer-client-details-add.component';
import { TrainerClientDetailsShowComponent } from './trainer-client-details/trainer-client-details-show/trainer-client-details-show.component';
import { TrainerClientDetailsEditComponent } from './trainer-client-details/trainer-client-details-edit/trainer-client-details-edit.component';

@NgModule({
  declarations: [
    TrainerClientsComponent, 
    TrainerClientDetailsComponent, 
    TrainersComponent,
    TrainerClientShowComponent,
    TrainerClientDetailsAddComponent,
    TrainerClientDetailsShowComponent,
    TrainerClientDetailsEditComponent
  ],
  imports: [
    CommonModule,
    LoaderModule,
    LayoutRoutingModule,
    Ng2SmartTableModule,
    NbActionsModule,
    NbButtonModule,
    NbCardModule,
    NbDialogModule.forRoot(),
    NbCheckboxModule,
    NbDatepickerModule,
    NbDialogModule,
    NbIconModule,
    NbInputModule,
    NbRadioModule,
    NbSelectModule,
    NbUserModule,
    ThemeModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  entryComponents: [
    TrainerClientDetailsComponent, 
    TrainerClientShowComponent,
    TrainerClientDetailsAddComponent,
    TrainerClientDetailsShowComponent,
    TrainerClientDetailsEditComponent
  ],
})
export class TrainersModule { }
