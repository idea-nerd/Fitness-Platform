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
import { ThemeModule } from '../../../@theme/theme.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { LayoutRoutingModule } from './sales-routing.module';
import { LoaderModule } from './../../../@theme/components/loader/loader.module';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { AddSaleComponent } from './add-sale/add-sale.component';
import { EditSaleComponent } from './edit-sale/edit-sale.component';
import { ViewSaleComponent } from './view-sale/view-sale.component';
import { ShowSaleComponent } from './show-sale/show-sale.component';
import { SalesComponent } from './sales.component';


@NgModule({
  declarations: [
    SalesComponent,
    AddSaleComponent,
    EditSaleComponent,
    ViewSaleComponent,
    ShowSaleComponent,
  ],
  imports: [
    CommonModule,
    LoaderModule,
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
    AddSaleComponent,
    EditSaleComponent,
    ShowSaleComponent,
  ],
})
export class SalesModule { }
