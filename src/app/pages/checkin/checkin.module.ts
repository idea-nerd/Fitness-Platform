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
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { LayoutRoutingModule } from './checkin-routing.module';

import { CheckinComponent } from './checkin.component';


@NgModule({
  declarations: [
    CheckinComponent,
  ],
  imports: [
    ThemeModule,
    CommonModule,
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
    Ng2SmartTableModule,
    LayoutRoutingModule,
    ZXingScannerModule,
  ],
  entryComponents: []
})
export class CheckinModule { }
